/**
 * Keep this function self-contained: its browser source is placed directly in
 * the head, so recovery does not depend on any client bundle loading.
 */
function installAssetRecovery(assetOrigin: string | null) {
  var installedWindow = window as Window & { __gtaAssetRecoveryInstalled?: boolean };
  if (installedWindow.__gtaAssetRecoveryInstalled) return;
  installedWindow.__gtaAssetRecoveryInstalled = true;

  var retryKey = "gta-stem-asset-recovery-at";
  var retryWindowMs = 60000;
  var failureHandled = false;
  var fallbackPending = false;
  var observer: PerformanceObserver | null = null;

  function assetUrl(node: EventTarget | null) {
    var source = "";
    if (node instanceof HTMLScriptElement) source = node.src;
    else if (node instanceof HTMLLinkElement && node.relList.contains("stylesheet")) source = node.href;
    else return null;
    if (!source) return null;
    try {
      var url = new URL(source, window.location.href);
      var allowedOrigin = url.origin === window.location.origin || (assetOrigin !== null && url.origin === assetOrigin);
      return allowedOrigin && url.pathname.indexOf("/_next/static/") === 0 ? url.href : null;
    } catch {
      return null;
    }
  }

  function showFallback() {
    if (document.getElementById("gta-site-reload-notice") || fallbackPending) return;
    if (!document.body) {
      fallbackPending = true;
      document.addEventListener("DOMContentLoaded", function () {
        fallbackPending = false;
        showFallback();
      }, { once: true });
      return;
    }
    var alert = document.createElement("div");
    alert.id = "gta-site-reload-notice";
    alert.setAttribute("role", "alert");
    alert.setAttribute("aria-live", "assertive");
    alert.setAttribute("aria-atomic", "true");
    alert.setAttribute("lang", "en");
    alert.style.cssText = "position:fixed;z-index:2147483647;left:16px;right:16px;bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;box-sizing:border-box;margin:0;padding:16px 20px;background:#fefefb;color:#0a2e47;border:2px solid #0d6673;border-radius:12px;box-shadow:0 4px 24px #0a2e4733;font:16px/1.5 system-ui,-apple-system,BlinkMacSystemFont,Arial,sans-serif;text-align:left;";
    var message = document.createElement("p");
    message.textContent = "Part of this page couldn’t load. Reload to try again.";
    message.style.cssText = "display:block;margin:0;max-width:100%;color:#0a2e47;font:600 16px/1.5 system-ui,-apple-system,BlinkMacSystemFont,Arial,sans-serif;";
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = "Reload page";
    button.style.cssText = "display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:88px;min-height:44px;margin:0;padding:10px 16px;background:#0d6673;color:#ffffff;border:2px solid #0d6673;border-radius:8px;font:600 16px/1.25 system-ui,-apple-system,BlinkMacSystemFont,Arial,sans-serif;cursor:pointer;outline-offset:3px;";
    button.addEventListener("focus", function () { button.style.outline = "3px solid #0a2e47"; });
    button.addEventListener("blur", function () { button.style.outline = ""; });
    button.addEventListener("click", function () { window.location.reload(); });
    alert.appendChild(message);
    alert.appendChild(button);
    document.body.appendChild(alert);
  }

  function recover() {
    if (failureHandled) return;
    failureHandled = true;
    if (observer) observer.disconnect();
    try {
      var now = Date.now();
      var lastRetry = Number(window.sessionStorage.getItem(retryKey));
      if (lastRetry && now - lastRetry < retryWindowMs) {
        showFallback();
        return;
      }
      window.sessionStorage.setItem(retryKey, String(now));
      if (window.sessionStorage.getItem(retryKey) !== String(now)) {
        showFallback();
        return;
      }
    } catch {
      showFallback();
      return;
    }
    window.location.reload();
  }

  window.addEventListener("error", function (event) {
    if (assetUrl(event.target)) recover();
  }, true);

  // Next hoists resource tags ahead of custom head children. Buffered timing
  // covers an asset 404 that completed before this inline listener executed.
  // Only actual script/stylesheet elements and their own requests qualify.
  function checkCompletedResource(entry: PerformanceEntry) {
    var resource = entry as PerformanceResourceTiming & { responseStatus?: number };
    if (failureHandled || typeof resource.responseStatus !== "number" || resource.responseStatus < 400 ||
        (resource.initiatorType !== "script" && resource.initiatorType !== "link")) return;
    var nodes = document.querySelectorAll('script[src],link[rel~="stylesheet"][href]');
    for (var index = 0; index < nodes.length; index++) {
      if (assetUrl(nodes[index]) === resource.name) {
        recover();
        return;
      }
    }
  }
  try {
    if (typeof PerformanceObserver === "function") {
      observer = new PerformanceObserver(function (list) {
        list.getEntries().forEach(checkCompletedResource);
      });
      observer.observe({ type: "resource", buffered: true });
    }
    if (window.performance && window.performance.getEntriesByType) {
      window.performance.getEntriesByType("resource").forEach(checkCompletedResource);
    }
  } catch {
    // Resource error capture remains active without resource timing support.
  }
}

export function createAssetRecoveryScript(assetOrigin?: string) {
  var originLiteral = JSON.stringify(assetOrigin ?? null).replace(/</g, "\\u003c");
  return "(" + installAssetRecovery.toString() + ")(" + originLiteral + ");";
}
