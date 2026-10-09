(function () {
  "use strict";

  const sectionsRoot = document.getElementById("sections");
  const pillsRoot = document.getElementById("filter-pills");
  const searchInput = document.getElementById("search-input");
  const noResults = document.getElementById("no-results");
  const tickerTrack = document.getElementById("ticker-track");

  let activeModel = "all";
  let query = "";

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

  // ---------- Build filter pills ----------
  function buildPills() {
    const all = document.createElement("button");
    all.className = "pill active";
    all.textContent = "All";
    all.dataset.model = "all";
    pillsRoot.appendChild(all);

    PROMPT_DATA.forEach((model) => {
      const pill = document.createElement("button");
      pill.className = "pill";
      pill.textContent = model.name;
      pill.dataset.model = model.id;
      pillsRoot.appendChild(pill);
    });

    pillsRoot.addEventListener("click", (e) => {
      const btn = e.target.closest(".pill");
      if (!btn) return;
      activeModel = btn.dataset.model;
      [...pillsRoot.children].forEach((c) => c.classList.toggle("active", c === btn));
      applyFilters();
      if (activeModel !== "all") {
        const target = document.getElementById("section-" + activeModel);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // ---------- Build sections ----------
  function buildSections() {
    PROMPT_DATA.forEach((model) => {
      const section = document.createElement("section");
      section.className = "model-section";
      section.id = "section-" + model.id;
      section.style.setProperty("--m-accent", model.accent);
      section.style.setProperty("--m-accent2", model.accent2);

      section.innerHTML = `
        <div class="wrap">
          <div class="model-head">
            <div class="model-head-left">
              <span class="model-dot"></span>
              <h2>${escapeHtml(model.name)}</h2>
              <span class="model-maker">${escapeHtml(model.maker)}</span>
            </div>
            <span class="model-count">${model.prompts.length} prompts</span>
          </div>
          <p class="model-blurb">${escapeHtml(model.blurb)}</p>
          <hr class="model-rule">
          <div class="card-grid" data-model="${model.id}"></div>
        </div>
      `;

      const grid = section.querySelector(".card-grid");
      model.prompts.forEach((prompt, idx) => {
        grid.appendChild(buildCard(model, prompt, idx));
      });

      sectionsRoot.appendChild(section);
    });
  }

  function buildCard(model, prompt, idx) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.model = model.id;
    card.dataset.search = (prompt.title + " " + prompt.tag + " " + prompt.text).toLowerCase();

    card.innerHTML = `
      <div class="card-preview">${buildPreviewSvg(model, idx, prompt.tag)}</div>
      <div class="card-body">
        <div class="card-top">
          <span class="card-title">${escapeHtml(prompt.title)}</span>
          <span class="tag-chip">${escapeHtml(prompt.tag)}</span>
        </div>
        <p class="card-text">${escapeHtml(prompt.text)}</p>
        <div class="card-foot">
          <button class="copy-btn" type="button">Copy prompt</button>
        </div>
      </div>
    `;

    const btn = card.querySelector(".copy-btn");
    btn.addEventListener("click", () => copyPrompt(prompt.text, btn));
    return card;
  }

  function copyPrompt(text, btn) {
    const done = () => {
      const original = "Copy prompt";
      btn.textContent = "Copied";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("copied");
      }, 1600);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* no-op */ }
    document.body.removeChild(ta);
    done();
  }

  // ---------- Ticker ----------
  function buildTicker() {
    const picks = [];
    PROMPT_DATA.forEach((model) => {
      model.prompts.slice(0, 2).forEach((p) => {
        picks.push({ label: model.name + " — " + p.title, color: model.accent });
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

    document.querySelectorAll(".model-section").forEach((section) => {
      const modelId = section.id.replace("section-", "");
      const modelMatches = activeModel === "all" || activeModel === modelId;
      let sectionHasVisible = false;

      section.querySelectorAll(".card").forEach((card) => {
        const textMatches = !query || card.dataset.search.includes(query);
        const visible = modelMatches && textMatches;
        card.style.display = visible ? "" : "none";
        if (visible) sectionHasVisible = true;
      });

      section.style.display = sectionHasVisible ? "" : "none";
      if (sectionHasVisible) anyVisible = true;
    });

    noResults.style.display = anyVisible ? "none" : "block";
  }

  searchInput.addEventListener("input", applyFilters);

  // ---------- Init ----------
  buildPills();
  buildSections();
  buildTicker();
  applyFilters();
})();
