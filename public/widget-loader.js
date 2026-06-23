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

  // Inject style block for premium widget styles and transitions
  const style = document.createElement("style");
  style.textContent = `
    #qyoob-widget-outer {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .qyoob-launcher-btn {
      width: 60px !important;
      height: 60px !important;
      border-radius: 50% !important;
      border: none !important;
      background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
      color: white !important;
      cursor: pointer !important;
      box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4), 0 8px 16px -6px rgba(99, 102, 241, 0.4) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      position: relative !important;
      padding: 0 !important;
      outline: none !important;
      transform: scale(1);
    }
    .qyoob-launcher-btn:hover {
      transform: scale(1.08) translateY(-3px) !important;
      box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.5), 0 10px 10px -5px rgba(99, 102, 241, 0.4) !important;
      background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
    }
    .qyoob-launcher-btn:active {
      transform: scale(0.95) translateY(-1px) !important;
    }
    .qyoob-icon-wrapper {
      position: relative;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qyoob-icon-chat, .qyoob-icon-close {
      position: absolute;
      transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      width: 28px;
      height: 28px;
    }
    .qyoob-icon-chat {
      opacity: 1;
      transform: rotate(0deg) scale(1);
    }
    .qyoob-icon-close {
      opacity: 0;
      transform: rotate(-90deg) scale(0);
    }
    /* State when widget is open */
    .qyoob-widget-open .qyoob-launcher-btn {
      background: linear-gradient(135deg, #ef4444, #dc2626) !important;
      box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.4), 0 8px 16px -6px rgba(239, 68, 68, 0.4) !important;
    }
    .qyoob-widget-open .qyoob-launcher-btn:hover {
      background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
      box-shadow: 0 20px 25px -5px rgba(239, 68, 68, 0.5), 0 10px 10px -5px rgba(239, 68, 68, 0.4) !important;
    }
    .qyoob-widget-open .qyoob-icon-chat {
      opacity: 0;
      transform: rotate(90deg) scale(0);
    }
    .qyoob-widget-open .qyoob-icon-close {
      opacity: 1;
      transform: rotate(0deg) scale(1);
    }
    /* Iframe opening animation */
    .qyoob-iframe {
      width: 380px !important;
      height: 600px !important;
      border: none !important;
      display: none;
      border-radius: 20px !important;
      overflow: hidden !important;
      background: transparent !important;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
      margin-bottom: 16px !important;
      transform-origin: bottom right;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
      opacity: 0;
      transform: scale(0.85) translateY(20px);
    }
    .qyoob-iframe.show {
      display: block !important;
      opacity: 1 !important;
      transform: scale(1) translateY(0) !important;
    }
    @media (max-width: 480px) {
      .qyoob-iframe {
        width: calc(100vw - 40px) !important;
        height: calc(100vh - 120px) !important;
        max-height: 600px !important;
      }
    }
  `;
  document.head.appendChild(style);

  // container
  const container = document.createElement("div");
  container.id = "qyoob-widget-outer";
  container.style.position = "fixed";
  container.style.zIndex = "999999";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "flex-end";
  document.body.appendChild(container);

  // launcher button
  const launcherId =
    SCRIPT?.getAttribute("data-launcher-id") || SCRIPT?.dataset?.launcherId;

  let btn = launcherId ? document.getElementById(launcherId) : null;

  if (!btn) {
    // Create default floating launcher button
    btn = document.createElement("button");
    btn.className = "qyoob-launcher-btn";
    btn.setAttribute("aria-label", "Toggle Support Chat");

    btn.innerHTML = `
      <div class="qyoob-icon-wrapper">
        <!-- Modern Glowing Chat Icon (overlapping bubbles) -->
        <svg class="qyoob-icon-chat" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3c-4.97 0-9 3.58-9 8 0 1.83.71 3.51 1.91 4.83L3.5 19.5c-.32.48-.05 1.13.51 1.23.1.02.2.02.3 0l3.87-1.12c1.17.61 2.49.95 3.82.95 4.97 0 9-3.58 9-8s-4.03-8-9-8z" fill="white" fill-opacity="0.15" stroke="white" stroke-width="2" stroke-linejoin="round"/>
          <circle cx="9" cy="11" r="1.25" fill="white" />
          <circle cx="12" cy="11" r="1.25" fill="white" />
          <circle cx="15" cy="11" r="1.25" fill="white" />
        </svg>
        <!-- Close Icon -->
        <svg class="qyoob-icon-close" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    `;
    container.appendChild(btn);
  }

  // iframe
  const iframe = document.createElement("iframe");
  iframe.src = frameUrl.toString();
  iframe.className = "qyoob-iframe";
  container.appendChild(iframe);

  // toggle widget
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    const isHidden = !container.classList.contains("qyoob-widget-open");
    if (isHidden) {
      container.classList.add("qyoob-widget-open");
      iframe.style.display = "block";
      // Reflow for transition
      iframe.offsetHeight;
      iframe.classList.add("show");
    } else {
      container.classList.remove("qyoob-widget-open");
      iframe.classList.remove("show");
      setTimeout(() => {
        if (!container.classList.contains("qyoob-widget-open")) {
          iframe.style.display = "none";
        }
      }, 300);
    }
  });

  // close on outside click
  document.addEventListener("click", function (e) {
    if (!container.contains(e.target)) {
      if (container.classList.contains("qyoob-widget-open")) {
        container.classList.remove("qyoob-widget-open");
        iframe.classList.remove("show");
        setTimeout(() => {
          if (!container.classList.contains("qyoob-widget-open")) {
            iframe.style.display = "none";
          }
        }, 300);
      }
    }
  });
})();
