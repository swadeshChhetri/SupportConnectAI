// public/widget-loader.js
(function () {
  const SCRIPT = document.currentScript;

  // 🔐 REQUIRED: widget API key (support both names for compatibility)
  const apiKey =
    SCRIPT?.getAttribute("data-api-key") ||
    SCRIPT?.getAttribute("data-widget-key") ||
    SCRIPT?.dataset?.apiKey ||
    SCRIPT?.dataset?.widgetKey;

  if (!apiKey) {
    console.error(
      "[Widget] Missing data-api-key or data-widget-key on embed script"
    );
    return;
  }

  // ✅ Use the script's origin to find widget.html (so it works cross-origin)
  const scriptUrl = new URL(SCRIPT.src, location.href);
  const frameUrl = new URL("/widget.html", scriptUrl.origin);
  frameUrl.searchParams.set("apiKey", apiKey);

  // container
  const container = document.createElement("div");
  container.id = "qyoob-widget-outer";
  container.style.position = "fixed";
  container.style.zIndex = "999999";
  container.style.bottom = "20px";
  container.style.right = "20px";
  document.body.appendChild(container);

  // launcher button
  const launcherId =
    SCRIPT?.getAttribute("data-launcher-id") || SCRIPT?.dataset?.launcherId;

  let btn = launcherId ? document.getElementById(launcherId) : null;

  if (!btn) {
    // Create default floating launcher button
    btn = document.createElement("button");

    btn.innerHTML = `
<svg width="26" height="26" viewBox="0 0 24 24" fill="none">
  <path d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4v8z"
    stroke="white"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"/>
</svg>
`;
    btn.style.width = "56px";
    btn.style.height = "56px";
    btn.style.borderRadius = "50%";
    btn.style.border = "none";
    btn.style.background = "#2563eb";
    btn.style.color = "white";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 8px 26px rgba(37,99,235,0.18)";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.fontSize = "24px";
    container.appendChild(btn);
  }

  // iframe
  const iframe = document.createElement("iframe");
  iframe.src = frameUrl.toString();
  iframe.style.width = "360px";
  iframe.style.height = "520px";
  iframe.style.border = "none";
  iframe.style.display = "none";
  iframe.style.borderRadius = "12px";
  iframe.style.overflow = "hidden";
  iframe.style.background = "white";
  iframe.style.boxShadow = "0 12px 40px rgba(2,6,23,0.12)";
  iframe.style.marginBottom = "10px";

  // If using an external launcher, we might want the iframe to be fixed
  // or relative to the launcher. For now, keep it in the container.
  container.appendChild(iframe);

  // toggle widget
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    const isHidden = iframe.style.display === "none";
    iframe.style.display = isHidden ? "block" : "none";
  });

  // close on outside click
  document.addEventListener("click", function (e) {
    if (!container.contains(e.target)) {
      iframe.style.display = "none";
    }
  });
})();
