"""REVIEW DRAFT: external Linux guard for one immutable approved phase.

No execution is authorized by this source file. No subsequent stage or retry.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import signal
import subprocess
import sys
import time

CAP_BYTES = 4 * 1024 * 1024 * 1024
MIN_FREE_PERCENT = 35
TIME_LIMIT_SECONDS = 1200


def overlaps(left, right):
    return left == right or left in right.parents or right in left.parents


def free_percent():
    # Linux VM metric, not macOS memory_pressure or a claim about the Mac.
    values = {}
    for line in Path("/proc/meminfo").read_text().splitlines():
        key, value = line.split(":", 1)
        values[key] = int(value.split()[0])
    return 100 * values["MemAvailable"] // values["MemTotal"]


def process_rows():
    with subprocess.Popen(["ps", "-axo", "pid=,ppid=,pgid=,rss="], stdout=subprocess.PIPE,
                          stderr=subprocess.PIPE, text=True) as query:
        stdout, stderr = query.communicate(timeout=5)
        if query.returncode != 0:
            raise RuntimeError("Process inventory failed: " + stderr)
        rows = [tuple(map(int, line.split())) for line in stdout.splitlines()]
        # ps observes itself, but has already exited when this snapshot returns.
        return [row for row in rows if row[0] != query.pid]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    for name in ["new-guard-receipt"]:
        parser.add_argument("--" + name, type=Path, required=True)
    parser.add_argument("--timeout-seconds", type=int, required=True)
    parser.add_argument("command", nargs=argparse.REMAINDER)
    args = parser.parse_args()
    if args.timeout_seconds < 1 or args.timeout_seconds > 1200:
        raise RuntimeError("Invalid reviewed phase timeout")
    command = args.command[1:] if args.command[:1] == ["--"] else args.command
    if not command:
        raise RuntimeError("Missing exact reviewed command")
    receipt = args.new_guard_receipt.resolve()
    log = receipt.with_suffix(receipt.suffix + ".log")
    if receipt.exists() or log.exists() or not receipt.parent.is_dir():
        raise RuntimeError("Require new phase evidence")
    child = None
    known = {os.getpid()}
    peak = 0
    minimum = None
    reason = None
    guard_error = None
    cleanup_errors = []
    remaining = []
    started = time.monotonic()
    initial = None

    def owned_rows(rows):
        live = {row[0] for row in rows}
        known.intersection_update(live)
        known.add(os.getpid())
        if child:
            known.add(child.pid)
            known.update(pid for pid, _, group, _ in rows if group == child.pid)
        for _ in range(len(rows) + 1):
            found = {pid for pid, parent, _, _ in rows if parent in known}
            if found <= known:
                break
            known.update(found)
        return [row for row in rows if row[0] in known]

    def sample():
        nonlocal peak, minimum
        rows = owned_rows(process_rows())
        peak = max(peak, sum(row[3] * 1024 for row in rows))
        current = free_percent()
        minimum = current if minimum is None else min(minimum, current)

    try:
        initial = minimum = free_percent()
        if initial <= MIN_FREE_PERCENT:
            reason = "Linux VM available memory at/below 35% before launch"
        else:
            with log.open("xb") as stream:
                child = subprocess.Popen(command, stdout=None, stderr=None, start_new_session=True)
                while True:
                    sample()
                    if peak > CAP_BYTES:
                        reason = "Total owned RSS exceeded 4 GiB"
                    elif minimum <= MIN_FREE_PERCENT:
                        reason = "Linux VM available memory at/below 35%"
                    elif time.monotonic() - started > args.timeout_seconds:
                        reason = "Reviewed Linux phase wall limit exceeded"
                    elif child.poll() is not None and child.returncode != 0:
                        reason = "Preparation exited unsuccessfully"
                    if reason is not None or child.poll() is not None:
                        break
                    time.sleep(0.2)
    except Exception as error:
        guard_error = repr(error)
        if reason is None:
            reason = "Guard or launch error"
    finally:
        if child is not None:
            # Kill descendants even when their group leader has already exited.
            # Cleanup errors are separate and never replace the original trigger.
            for sig in [signal.SIGTERM, signal.SIGKILL]:
                try:
                    rows = owned_rows(process_rows())
                    targets = [row for row in rows if row[0] != os.getpid()]
                    if not targets:
                        break
                    if any(row[2] == child.pid for row in targets):
                        try:
                            os.killpg(child.pid, sig)
                        except ProcessLookupError:
                            pass
                        except OSError as error:
                            cleanup_errors.append("killpg: " + repr(error))
                    for pid, _, group, _ in targets:
                        if group != child.pid:
                            try:
                                os.kill(pid, sig)
                            except ProcessLookupError:
                                pass
                            except OSError as error:
                                cleanup_errors.append("kill descendant: " + repr(error))
                    try:
                        child.wait(timeout=1)
                    except subprocess.TimeoutExpired:
                        pass
                    time.sleep(0.1)
                except Exception as error:
                    cleanup_errors.append("cleanup inventory: " + repr(error))
            try:
                remaining = [row[0] for row in owned_rows(process_rows()) if row[0] != os.getpid()]
            except Exception as error:
                cleanup_errors.append("terminal inventory: " + repr(error))
                remaining = ["unverified"]
        result = {"stage": "single-guarded-Ubuntu-phase", "started": child is not None,
                  "exit": child.poll() if child is not None else None,
                  "originalStopReason": reason, "guardError": guard_error,
                  "cleanupErrors": cleanup_errors, "remainingOwnedPids": remaining,
                  "peakTotalOwnedRSSBytes": peak, "initialHostFreePercent": initial,
                  "minimumHostFreePercent": minimum, "seconds": round(time.monotonic() - started, 3),
                  "capBytes": CAP_BYTES, "minimumAvailablePercentExclusive": MIN_FREE_PERCENT, "timeLimitSeconds": args.timeout_seconds,
                  "noNextStage": True, "terminalRelease": not remaining}
        result["accepted"] = (child is not None and result["exit"] == 0 and reason is None
                              and guard_error is None and not cleanup_errors and not remaining
                              and peak <= CAP_BYTES and minimum is not None and minimum > MIN_FREE_PERCENT)
        with receipt.open("x") as stream:
            json.dump(result, stream, indent=2)
            stream.write("\n")
        print(json.dumps(result))
    return 0 if result["accepted"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
