(function () {
  "use strict";

  const sectionsRoot = document.getElementById("sections");
  const categoryPillsRoot = document.getElementById("category-pills");
  const searchInput = document.getElementById("search-input");
  const noResults = document.getElementById("no-results");
  const resultsStatus = document.getElementById("results-status");
  const tickerTrack = document.getElementById("ticker-track");
  const themeToggle = document.getElementById("theme-toggle");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const headerControls = document.getElementById("header-controls");
  const copyrightYear = document.getElementById("copyright-year");

  let activeCategory = "all";
  let query = "";
  let searchAnalyticsTimer = null;

  function trackEvent(name, params) {
    if (typeof window.gtag === "function") window.gtag("event", name, params || {});
  }

  function getVisiblePromptCount() {
    return [...document.querySelectorAll(".card")].filter((card) => card.style.display !== "none").length;
  }

  function setMobileMenuOpen(isOpen) {
    headerControls.classList.toggle("is-open", isOpen);
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenuToggle.querySelector(".mobile-menu-label").textContent = isOpen ? "Close" : "Menu";
    mobileMenuToggle.querySelector(".mobile-menu-icon").textContent = isOpen ? "×" : "☰";
  }

  mobileMenuToggle.addEventListener("click", () => {
    setMobileMenuOpen(mobileMenuToggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenuToggle.getAttribute("aria-expanded") === "true") {
      setMobileMenuOpen(false);
      mobileMenuToggle.focus();
    }
  });

  copyrightYear.textContent = String(new Date().getFullYear());

  function setTheme(theme) {
    const isLight = theme === "light";
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').setAttribute("content", isLight ? "#f7f3eb" : "#15130f");
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    themeToggle.querySelector(".theme-toggle-icon").textContent = isLight ? "◐" : "☀";
    themeToggle.querySelector(".theme-toggle-label").textContent = isLight ? "Dark mode" : "Light mode";
  }

  function initializeTheme() {
    const savedTheme = localStorage.getItem("promptfolio-theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTheme(savedTheme || preferredTheme);
  }

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("promptfolio-theme", nextTheme);
  });

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // Maps each prompt "tag" to one of the hand-drawn icon symbols defined
  // in index.html, used to build an abstract preview swatch per card.
  const TAG_ICON = {
    "Figurine": "cube",
    "Portrait": "camera",
    "Fashion": "person",
    "Travel": "mountain",
    "3D scene": "cube",
    "Restoration": "sparkle",
    "Text & layout": "text",
    "Illustration": "palette",
    "3D style": "cube",
    "Poster": "mountain",
    "Product": "box",
    "Comic": "bubble",
    "Interior": "building",
    "Icon design": "grid",
    "Concept art": "palette",
    "Environment": "mountain",
    "Still life": "flower",
    "Macro": "target",
    "Anime": "palette",
    "Food": "bowl",
    "Text render": "text"
  };

  // Builds an original abstract preview (gradient + icon) so people get a
  // feel for a prompt's mood at a glance. It is not a real model output —
  // just a visual cue, procedurally generated so nothing needs to be
  // downloaded, hosted, or attributed.
  function buildPreviewSvg(model, idx, tag) {
    const iconKey = TAG_ICON[tag] || "sparkle";
    const angle = (idx * 47 + 20) % 360;
    const gradId = "grad-" + model.id + "-" + idx;
    const dotId = "dots-" + model.id + "-" + idx;
    return `
      <svg class="card-preview-svg" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${escapeHtml(tag)} style preview">
        <defs>
          <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${angle} 0.5 0.5)">
            <stop offset="0" stop-color="${model.accent}"/>
            <stop offset="1" stop-color="${model.accent2}"/>
          </linearGradient>
          <pattern id="${dotId}" width="13" height="13" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.3" fill="#15130f" fill-opacity="0.18"/>
          </pattern>
        </defs>
        <rect width="400" height="220" fill="url(#${gradId})"/>
        <rect width="400" height="220" fill="url(#${dotId})"/>
        <circle cx="200" cy="110" r="33" fill="#15130f" fill-opacity="0.8"/>
        <use href="#icon-${iconKey}" xlink:href="#icon-${iconKey}" x="188" y="98" width="24" height="24" style="color:#f2ede4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  // ---------- Build category filters ----------
  function buildCategoryPills() {
    const categories = [...new Set(PROMPT_DATA.map((prompt) => prompt.category))];
    const all = document.createElement("button");
    all.className = "pill active";
    all.textContent = "All categories";
    all.dataset.category = "all";
    all.setAttribute("aria-pressed", "true");
    categoryPillsRoot.appendChild(all);

    categories.forEach((category) => {
      const pill = document.createElement("button");
      pill.className = "pill";
      pill.textContent = category;
      pill.dataset.category = category;
      pill.setAttribute("aria-pressed", "false");
      categoryPillsRoot.appendChild(pill);
    });

    categoryPillsRoot.addEventListener("click", (e) => {
      const btn = e.target.closest(".pill");
      if (!btn) return;
      const nextCategory = btn.dataset.category;
      if (nextCategory !== activeCategory) {
        activeCategory = nextCategory;
        trackEvent("category_filter", {
          category: activeCategory,
          page_type: "catalog"
        });
      }
      [...categoryPillsRoot.children].forEach((categoryButton) => {
        const isActive = categoryButton === btn;
        categoryButton.classList.toggle("active", isActive);
        categoryButton.setAttribute("aria-pressed", String(isActive));
      });
      applyFilters();
      setMobileMenuOpen(false);
    });
  }

  // ---------- Build sections ----------
  function buildSections() {
    const prompts = PROMPT_DATA;
    const catalog = {
      id: "all",
      accent: "#e8b94b",
      accent2: "#f0cd7c"
    };
    const section = document.createElement("section");
    section.className = "model-section";
    section.id = "section-prompts";
    section.style.setProperty("--m-accent", catalog.accent);
    section.style.setProperty("--m-accent2", catalog.accent2);
    section.innerHTML = `
      <div class="wrap">
        <div class="model-head">
          <div class="model-head-left">
            <span class="model-dot"></span>
            <h2>All prompts</h2>
            <span class="model-maker">For Gemini, ChatGPT, and other AI image tools</span>
          </div>
          <span class="model-count">${prompts.length} prompts</span>
        </div>
        <p class="model-blurb">A hand-curated selection of image-generation and photo-editing prompts, ready to copy and adapt to your preferred AI tool.</p>
        <hr class="model-rule">
        <div class="card-grid" data-catalog="all"></div>
      </div>
    `;

    const grid = section.querySelector(".card-grid");
    prompts.forEach((prompt, idx) => grid.appendChild(buildCard(catalog, prompt, idx)));
    sectionsRoot.appendChild(section);
  }

  function buildCard(model, prompt, idx) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.model = model.id;
    card.dataset.category = prompt.category;
    card.dataset.search = (prompt.title + " " + prompt.tag + " " + prompt.category + " " + prompt.text).toLowerCase();
    const preview = prompt.image
      ? `<img class="card-sample-image" src="${escapeHtml(prompt.image)}" alt="${escapeHtml(prompt.title)} sample image" loading="lazy">`
      : buildPreviewSvg(model, idx, prompt.tag);

    card.innerHTML = `
      <div class="card-preview">${preview}</div>
      <div class="card-body">
        <div class="card-top">
          <div>
            <h3 class="card-title">${escapeHtml(prompt.title)}</h3>
            ${prompt.badge ? `<span class="prompt-badge">${escapeHtml(prompt.badge)}</span>` : ""}
          </div>
          <span class="tag-chip">${escapeHtml(prompt.category)}</span>
        </div>
        <p class="card-text">${escapeHtml(prompt.text)}</p>
        <div class="card-foot">
          <button class="copy-btn" type="button">Copy prompt</button>
          <span class="copy-status" role="status" aria-live="polite"></span>
        </div>
      </div>
    `;

    const btn = card.querySelector(".copy-btn");
    btn.addEventListener("click", async () => {
      const copied = await copyPrompt(prompt.text, btn, card.querySelector(".copy-status"));
      if (copied) {
        trackEvent("prompt_copy", {
          prompt_title: prompt.title,
          prompt_category: prompt.category,
          page_type: "catalog"
        });
      }
    });

    const sampleImage = card.querySelector(".card-sample-image");
    if (sampleImage) {
      sampleImage.addEventListener("error", () => {
        sampleImage.parentElement.innerHTML = buildPreviewSvg(model, idx, prompt.tag);
      });
    }
    return card;
  }

  async function copyPrompt(text, btn, status) {
    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch (error) {
        copied = fallbackCopy(text, btn);
      }
    } else {
      copied = fallbackCopy(text, btn);
    }
    showCopyFeedback(btn, status, copied);
    return copied;
  }

  function fallbackCopy(text, btn) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    ta.setAttribute("aria-hidden", "true");
    ta.setAttribute("tabindex", "-1");
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }
    document.body.removeChild(ta);
    btn.focus();
    return copied;
  }

  function showCopyFeedback(btn, status, copied) {
    btn.textContent = copied ? "Copied" : "Copy failed";
    btn.classList.toggle("copied", copied);
    btn.classList.toggle("copy-failed", !copied);
    status.textContent = copied
      ? "Prompt copied to clipboard."
      : "Copy failed. Select and copy the prompt manually.";
    window.setTimeout(() => {
      btn.textContent = "Copy prompt";
      btn.classList.remove("copied", "copy-failed");
      status.textContent = "";
    }, 4000);
  }

  // ---------- Ticker ----------
  function buildTicker() {
    const picks = [];
    PROMPT_DATA.slice(0, 8).forEach((prompt, index) => {
      picks.push({
        label: prompt.title,
        color: index % 2 === 0 ? "#e8b94b" : "#74aa9c"
      });
    });
    // duplicate the list so the CSS animation (translateX -50%) loops seamlessly
    const doubled = picks.concat(picks);
    tickerTrack.innerHTML = doubled
      .map(
        (p) =>
          `<span class="ticker-item"><span class="ticker-dot" style="background:${p.color}"></span>${escapeHtml(p.label)}</span>`
      )
      .join("");
  }

  // ---------- Filtering ----------
  function applyFilters() {
    query = searchInput.value.trim().toLowerCase();
    let anyVisible = false;
    let visibleCount = 0;

    document.querySelectorAll(".model-section").forEach((section) => {
      let sectionHasVisible = false;

      section.querySelectorAll(".card").forEach((card) => {
        const textMatches = !query || card.dataset.search.includes(query);
        const categoryMatches = activeCategory === "all" || activeCategory === card.dataset.category;
        const visible = categoryMatches && textMatches;
        card.style.display = visible ? "" : "none";
        if (visible) {
          sectionHasVisible = true;
          visibleCount += 1;
        }
      });

      section.style.display = sectionHasVisible ? "" : "none";
      if (sectionHasVisible) anyVisible = true;
    });

    noResults.style.display = anyVisible ? "none" : "block";
    resultsStatus.textContent = anyVisible
      ? `${visibleCount} ${visibleCount === 1 ? "prompt" : "prompts"} found.`
      : "No prompts match your search and category filters.";
  }

  searchInput.addEventListener("input", () => {
    applyFilters();
    window.clearTimeout(searchAnalyticsTimer);
    const searchLength = searchInput.value.trim().length;
    if (searchLength === 0) return;
    searchAnalyticsTimer = window.setTimeout(() => {
      trackEvent("prompt_search", {
        search_length: searchLength,
        result_count: getVisiblePromptCount(),
        page_type: "catalog"
      });
    }, 600);
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    let destination;
    try { destination = new URL(link.href, window.location.href); } catch (error) { return; }
    if (destination.origin === window.location.origin || !/^https?:$/.test(destination.protocol)) return;
    trackEvent("outbound_tool_click", {
      destination_domain: destination.hostname,
      link_text: (link.textContent || "").trim().slice(0, 100),
      page_type: "catalog"
    });
  });

  // ---------- Init ----------
  initializeTheme();
  buildCategoryPills();
  buildSections();
  buildTicker();
  applyFilters();
})();
