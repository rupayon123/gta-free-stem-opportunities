#!/usr/bin/env bash
set -euo pipefail

# This function is parsed before execution because retrying replaces files in the
# disposable checkout, including potentially this script. Never run in a local
# working copy: a retry intentionally discards the bot's generated commit.
publish_refreshed_opportunities() {
  if [[ "${GITHUB_ACTIONS:-}" != "true" || "${RUNNER_ENVIRONMENT:-}" != "github-hosted" || "${GITHUB_REF_TYPE:-}" != "branch" || -z "${GITHUB_WORKSPACE:-}" || -z "${GITHUB_REF_NAME:-}" ]]; then
    echo "Publication is restricted to a disposable GitHub-hosted branch checkout." >&2
    return 1
  fi

  local root workspace branch
  root="$(git rev-parse --show-toplevel)"
  root="$(cd "$root" && pwd -P)"
  workspace="$(cd "$GITHUB_WORKSPACE" && pwd -P)"
  branch="$GITHUB_REF_NAME"
  if [[ "$PWD" != "$root" || "$workspace" != "$root" ]] || ! git check-ref-format "refs/heads/$branch" || [[ "$(git symbolic-ref --quiet --short HEAD)" != "$branch" ]]; then
    echo "The publication checkout does not match the GitHub workspace and branch." >&2
    return 1
  fi

  local generated=(lib/generatedLibraryOpportunities.ts lib/generatedDiscoveryReview.ts public/opportunities.json)
  local attempt changed base push_output tip
  git config user.name "gta-free-stem-bot"
  git config user.email "gta-free-stem-bot@users.noreply.github.com"

  for attempt in 1 2 3; do
    # Only the three generated files may be discarded by the retry below.
    while IFS= read -r changed; do
      case "$changed" in
        lib/generatedLibraryOpportunities.ts|lib/generatedDiscoveryReview.ts|public/opportunities.json) ;;
        *) echo "Unexpected tracked changes; refusing publication or reset." >&2; return 1 ;;
      esac
    done < <(git diff --name-only HEAD)

    if git diff --quiet HEAD -- "${generated[@]}"; then
      echo "No opportunity database changes found."
      return 0
    fi

    base="$(git rev-parse HEAD)"
    git add -- "${generated[@]}"
    git commit -m "Refresh generated public opportunities"
    if push_output="$(git push --porcelain origin "HEAD:refs/heads/$branch" 2>&1)"; then
      printf '%s\n' "$push_output"
      return 0
    fi
    printf '%s\n' "$push_output" >&2

    # Git's porcelain rejection distinguishes a concurrent branch advance from
    # authentication, network, protected-branch, and other failures. Those must
    # fail without resetting or retrying publication.
    if ! printf '%s\n' "$push_output" | grep -Eq '^![[:space:]]+[^[:space:]]+[[:space:]]+\[rejected\] \((fetch first|non-fast-forward)\)$'; then
      echo "Publication failed for a reason other than a concurrent branch advance." >&2
      return 1
    fi
    if [[ "$attempt" == 3 ]]; then
      echo "Publication still conflicts after three attempts; keeping the published database unchanged." >&2
      return 1
    fi

    git fetch --no-tags origin "refs/heads/$branch"
    tip="$(git rev-parse FETCH_HEAD)"
    if [[ "$tip" == "$base" ]] || ! git merge-base --is-ancestor "$base" "$tip"; then
      echo "Remote did not advance normally from the original base; refusing reset." >&2
      return 1
    fi

    echo "The branch advanced during refresh. Regenerating against its new tip (attempt $((attempt + 1))/3)."
    git reset --hard "$tip"
    # Repeat every original gate using the workflow's unchanged job-level
    # health settings. Never merge conflicting generated data or force-push.
    npm ci
    npm audit --omit=dev --audit-level=high
    npm run engine:refresh
    npm run build
  done
}

publish_refreshed_opportunities "$@"
