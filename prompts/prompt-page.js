(function () {
  var measurementId = "G-WWH5ZLL6W2";
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    var tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
    document.head.appendChild(tag);
  }
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const button = document.querySelector("[data-copy]");
  const prompt = document.getElementById("prompt-text");
  const status = document.getElementById("copy-status");
  if (!button || !prompt || !status) return;

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.setAttribute("aria-hidden", "true");
    textarea.setAttribute("tabindex", "-1");
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    textarea.remove();
    button.focus();
    return copied;
  }

  function showFeedback(copied) {
    button.textContent = copied ? "Copied" : "Copy failed";
    button.classList.toggle("copied", copied);
    button.classList.toggle("copy-failed", !copied);
    status.textContent = copied
      ? "Prompt copied to clipboard."
      : "Copy failed. Select and copy the prompt manually.";

    window.setTimeout(() => {
      button.textContent = "Copy prompt";
      button.classList.remove("copied", "copy-failed");
      status.textContent = "";
    }, 4000);
  }

  button.addEventListener("click", async () => {
    const text = prompt.textContent.trim();
    let copied = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch (error) {
        copied = fallbackCopy(text);
      }
    } else {
      copied = fallbackCopy(text);
    }

    showFeedback(copied);
  });
}());
