# PanelDeck Modern Bento Glassmorphism Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul PanelDeck into a Modern Bento Glassmorphic personal dashboard with a dedicated pinned shelf, spotlight search (`Ctrl+K`/`/`), dynamic filter bar with tag aggregation, view density switcher (Bento Grid vs. Compact List), redesigned modal with visual mini-pickers, and smooth micro-interactions while preserving its 100% single-file, zero-dependency architecture.

**Architecture:** Modern CSS design tokens (`color-mix()`, `backdrop-filter`, radial atmospheric auras, specular border highlights), CSS Grid bento layout, responsive card density views, and modular vanilla JavaScript state/render cycles with backward-compatible localStorage migration.

**Tech Stack:** HTML5, CSS3 (Custom Properties, CSS Grid, Flexbox, Backdrop Filter), Vanilla JavaScript (ES6+), SVG Icons.

**Spec:** `docs/superpowers/specs/2026-09-19-paneldeck-modern-bento-glassmorphism-design.md`


> **Status: COMPLETED & MERGED TO MASTER** (Commits: 6596ec through 36b827, merged in fast-forward to master)

## Global Constraints
- Single-file delivery in `PanelDeck.html`. Zero external runtime or stylesheet dependencies (no npm, no external CDNs).
- 100% backward compatible with existing localStorage key (`paneldeck.v1`) and JSON backups.
- Works fully offline and in local file contexts (`file:///` protocol and Obsidian vault embedding).

---

### Task 1: Glassmorphic Design System & Atmospheric Auras (CSS Foundation)

**Files:**
- Modify: `PanelDeck.html` (lines 7–242)

**Interfaces:**
- Produces: Global CSS variables (`--bg`, `--bg2`, `--card`, `--card-glass`, `--border-glass`, `--specular`, `--shadow-glass`, `--radius-bento`), atmospheric background auras, and modern typographic rules.
- Consumes: None.

- [x] **Step 1: Update design tokens and base styles in `<style>`**
  Add modern frosted glass custom properties, enhanced atmospheric radial aura meshes, smooth scrollbar, and modern typography rules in `PanelDeck.html`:
  ```css
  :root {
    --bg: #0b0f17;
    --bg2: rgba(18, 24, 38, 0.85);
    --card: rgba(22, 30, 46, 0.65);
    --card2: rgba(30, 41, 62, 0.75);
    --card-glass: rgba(255, 255, 255, 0.045);
    --card-glass-hover: rgba(255, 255, 255, 0.08);
    --text: #f0f4fc;
    --muted: #8b99b0;
    --border: rgba(255, 255, 255, 0.08);
    --border2: rgba(255, 255, 255, 0.14);
    --specular: inset 0 1px 0 rgba(255, 255, 255, 0.12);
    --accent: #4f8cff;
    --accent-glow: rgba(79, 140, 255, 0.28);
    --danger: #ff5c5c;
    --shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
    --shadow-glass: 0 16px 40px rgba(0, 0, 0, 0.35);
    --radius: 16px;
  }
  html[data-theme="light"] {
    --bg: #f4f6fb;
    --bg2: rgba(255, 255, 255, 0.88);
    --card: rgba(255, 255, 255, 0.72);
    --card2: rgba(240, 244, 250, 0.85);
    --card-glass: rgba(255, 255, 255, 0.75);
    --card-glass-hover: rgba(255, 255, 255, 0.92);
    --text: #141b2b;
    --muted: #5e6d84;
    --border: rgba(0, 0, 0, 0.08);
    --border2: rgba(0, 0, 0, 0.14);
    --specular: inset 0 1px 0 rgba(255, 255, 255, 0.9);
    --accent-glow: rgba(79, 140, 255, 0.2);
    --shadow: 0 10px 30px rgba(25, 40, 75, 0.08);
    --shadow-glass: 0 14px 34px rgba(25, 40, 75, 0.10);
  }
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(850px 450px at 12% -8%, rgba(79, 140, 255, 0.18), transparent 70%),
      radial-gradient(800px 450px at 88% 2%, rgba(168, 85, 247, 0.14), transparent 65%),
      radial-gradient(650px 350px at 50% 100%, rgba(20, 184, 166, 0.07), transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  ```

- [x] **Step 2: Verify styles syntax and theme token rendering**
  Inspect `PanelDeck.html` in browser or headless node test to ensure CSS parsing has no syntax errors and custom properties resolve cleanly.

---

### Task 2: Header Modernization, Spotlight Search (`Ctrl+K`/`/`) & View Switcher

**Files:**
- Modify: `PanelDeck.html` (`<header>` markup, toolbar CSS, and search/keyboard JS)

**Interfaces:**
- Produces: `#search` with `Ctrl+K` and `/` hotkeys, clear button `#searchClear`, Google fallback `#searchGoogleBtn`, `#viewToggle` button for Grid/List switching.
- Consumes: Global CSS tokens.

- [x] **Step 1: Update `<header>` markup in `PanelDeck.html`**
  Add hotkey indicator badge (`<kbd class="hotkey-badge">Ctrl K</kbd>`), View Switcher button (`#viewToggleBtn` with grid and list SVG icons), and modernized button styles.

- [x] **Step 2: Add Spotlight hotkey and view toggle handlers in JS**
  Implement the global shortcut listener for `Ctrl+K` (or `Cmd+K`) and `/` (when not typing in an input) to focus search:
  ```javascript
  document.addEventListener('keydown', function(e) {
    var tag = (e.target.tagName || '').toLowerCase();
    var isInput = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      $('#search').focus();
      $('#search').select();
    } else if (e.key === '/' && !isInput) {
      e.preventDefault();
      $('#search').focus();
      $('#search').select();
    }
  });
  ```
  Implement `#viewToggleBtn` click handler to toggle `state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid'` and call `save()` and `render()`.

- [x] **Step 3: Test header interactions**
  Verify pressing `Ctrl+K` or `/` focuses search; verify `Escape` clears and blurs search; verify `#viewToggleBtn` switches view mode.

---

### Task 3: Dynamic Filter Bar & Tag Aggregation System

**Files:**
- Modify: `PanelDeck.html` (Add `<nav id="filterBar">`, CSS styling, and JS aggregation)

**Interfaces:**
- Produces: `state.filter = { type: 'all', tag: null }`, `renderFilterBar()`, and dynamic tag calculation.
- Consumes: `state.panels`.

- [x] **Step 1: Add Filter Bar container to HTML and CSS**
  Add `<nav class="filter-bar" id="filterBar"></nav>` directly between `<header>` and `<main>`. Add styles for frosted glass filter pills with active glowing accent states:
  ```css
  .filter-bar {
    position: sticky;
    top: 65px;
    z-index: 40;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    background: color-mix(in srgb, var(--bg) 82%, transparent);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .filter-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--muted);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.18s;
  }
  .filter-pill:hover { border-color: var(--border2); color: var(--text); }
  .filter-pill.active {
    background: color-mix(in srgb, var(--accent) 18%, transparent);
    border-color: var(--accent);
    color: var(--accent);
    box-shadow: 0 0 12px var(--accent-glow);
  }
  ```

- [x] **Step 2: Implement tag aggregation and filter logic in JS**
  Add dynamic computation of tag frequencies and panel types:
  ```javascript
  function getFilterStats() {
    var counts = { all: state.panels.length, web: 0, folders: 0, apps: 0 };
    var tags = {};
    state.panels.forEach(function(p) {
      if (p.mode === 'run') counts.apps++;
      else if (isWeb(p.path)) counts.web++;
      else counts.folders++;
      (p.tags || []).forEach(function(t) {
        var clean = t.trim().toLowerCase();
        if (clean) tags[clean] = (tags[clean] || 0) + 1;
      });
    });
    return { counts: counts, tags: tags };
  }
  ```
  Update `visible()` to filter by active type and active tag in addition to search query.

- [x] **Step 3: Test filter pill selection and counts**
  Verify clicking `Web` shows only web panels; clicking a tag pill filters to tagged panels; clicking active pill clears filter; verify counts are accurate.

---

### Task 4: Pinned Shelf, Bento Grid & Compact List View

**Files:**
- Modify: `PanelDeck.html` (`<main>` HTML markup, grid/list CSS, and rendering logic)

**Interfaces:**
- Produces: `<section id="pinnedShelf">`, `#grid` rendering, and compact list layout support.
- Consumes: `state.panels`, `state.viewMode`, `state.filter`.

- [x] **Step 1: Update main layout HTML and CSS**
  Update `<main>` in `PanelDeck.html` to include the pinned shelf section:
  ```html
  <main>
    <section id="pinnedShelf" style="display:none">
      <div class="section-header">
        <span class="section-title"><svg class="ic"><use href="#i-pin"/></svg>Pinned</span>
        <span class="section-count" id="pinnedCount"></span>
      </div>
      <div class="bento-grid" id="pinnedGrid"></div>
      <div class="section-divider"></div>
    </section>
    <section id="mainSection">
      <div class="bento-grid" id="grid"></div>
    </section>
  </main>
  ```
  Add CSS for `.bento-grid.list-view` and compact list row styling (`.card.view-list`).

- [x] **Step 2: Update render() to partition pinned vs unpinned panels and handle list mode**
  Update `render()` in JS:
  ```javascript
  function render() {
    var list = visible();
    var pinned = list.filter(function(p) { return p.pinned; });
    var unpinned = list.filter(function(p) { return !p.pinned; });
    var isList = state.viewMode === 'list';

    var pinnedShelf = $('#pinnedShelf');
    if (pinned.length > 0) {
      pinnedShelf.style.display = 'block';
      $('#pinnedCount').textContent = pinned.length;
      $('#pinnedGrid').className = 'bento-grid' + (isList ? ' list-view' : '');
      $('#pinnedGrid').innerHTML = pinned.map(cardHTML).join('');
    } else {
      pinnedShelf.style.display = 'none';
    }

    var grid = $('#grid');
    grid.className = 'bento-grid' + (isList ? ' list-view' : '');
    grid.innerHTML = unpinned.map(cardHTML).join('');
    ...
  }
  ```

- [x] **Step 3: Test pinned shelf and list mode toggle**
  Pin a panel; verify it appears in `#pinnedShelf`; unpin it; verify `#pinnedShelf` hides; toggle List view; verify both sections render as high-density list rows.

---

### Task 5: Modernized Bento Cards & Floating Frosted Glass Action Toolbar

**Files:**
- Modify: `PanelDeck.html` (`cardHTML()`, CSS `.card`, `.tools`, layout styles)

**Interfaces:**
- Produces: Floating frosted glass toolbar (`data-act="pin"`, `data-act="size"`, `data-act="edit"`, `data-act="del"`), tags rendering on cards, and dynamic `--paccent` hover aura.
- Consumes: Panel object fields (`p.pinned`, `p.tags`, `p.accent`, etc.).

- [x] **Step 1: Add SVG Pin icon symbol to `<svg>` library**
  Add `#i-pin` SVG symbol to the embedded icon `<defs>`:
  ```html
  <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 17v5M5 9l4-4 8 8-4 4M9 5l2-2 4 4-2 2M15 11l4 4-2 2-4-4"/></symbol>
  ```

- [x] **Step 2: Modernize card CSS and floating toolbar pill**
  Style `.card` with `backdrop-filter: blur(16px)`, `box-shadow: var(--specular)`, and smooth spring transitions. Style `.tools` as a floating frosted glass pill:
  ```css
  .tools {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 6;
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 3px 5px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(14, 18, 27, 0.78);
    backdrop-filter: blur(12px);
    opacity: 0;
    transform: translateY(-4px);
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .card:hover .tools, .card:focus-within .tools {
    opacity: 1;
    transform: none;
  }
  .tools button {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: #eef2f8;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .tools button:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  .tools button.pin-active {
    color: var(--accent);
  }
  ```

- [x] **Step 3: Update `cardHTML()` to generate tags and pin button**
  In `cardHTML(p)`:
  - Add pin action button to `.tools` with `.pin-active` class when `p.pinned` is true.
  - Add tag chips container inside `.body`: `(p.tags && p.tags.length ? '<div class="card-tags">' + p.tags.map(function(t){ return '<span class="card-tag">#'+esc(t)+'</span>'; }).join('') + '</div>' : '')`.

- [x] **Step 4: Add pin click action handler in grid event listener**
  Add handler for `act === 'pin'`:
  ```javascript
  if (act === 'pin') {
    p.pinned = !p.pinned;
    save();
    render();
    renderFilterBar();
    toast(p.pinned ? 'Panel pinned to top shelf' : 'Panel unpinned');
    return;
  }
  ```

- [x] **Step 5: Test card interactions and layout styles**
  Verify clicking pin toggles pinned state; verify hover glow radiates `--paccent`; verify tags appear on card; verify size cycle and delete work smoothly.

---

### Task 6: Modal Redesign: Visual Layout/Size Pickers, Tagging & Real-Time Preview

**Files:**
- Modify: `PanelDeck.html` (modal form HTML markup, CSS, and modal JS)

**Interfaces:**
- Produces: Tag input with preview chips, pin checkbox, visual size selector, visual layout selector, and real-time live preview.
- Consumes: Active panel data.

- [x] **Step 1: Redesign modal HTML in `PanelDeck.html`**
  - Add `<div class="field"><label for="fTags">Tags (comma-separated)</label><input id="fTags" type="text" placeholder="e.g. work, lotus, tools"><div class="tag-chips-preview" id="tagChipsPreview"></div></div>`.
  - Add `<label class="pin-check-label"><input type="checkbox" id="fPinned"> Pin this panel to the top shelf</label>`.
  - Upgrade size selector buttons with mini SVG glyphs.
  - Upgrade style selector buttons with mini diagram previews for all 8 layout styles.

- [x] **Step 2: Implement modal CSS transitions and visual picker styling**
  Add scale + backdrop-blur entrance animation for `.overlay` and `.modal`:
  ```css
  .overlay {
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .overlay.open {
    opacity: 1;
    display: flex;
  }
  .modal {
    transform: scale(0.95);
    transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .overlay.open .modal {
    transform: scale(1);
  }
  ```

- [x] **Step 3: Update `openModal()`, live preview, and form submission**
  - Populate `#fTags` with `(p.tags || []).join(', ')` and `#fPinned.checked = !!p.pinned`.
  - Add live input listener on `#fTags` to render preview chips dynamically.
  - In form submit handler, save `pinned: $('#fPinned').checked` and `tags: $('#fTags').value.split(',').map(function(s){ return s.trim(); }).filter(Boolean)`.

- [x] **Step 4: Test modal editing flow**
  Open modal for an existing panel; change tags, toggle pin, pick a new size and style using visual pickers; save and verify panel updates instantly on dashboard.

---

### Task 7: Data Schema Migration, Example Data & Comprehensive End-to-End Verification

**Files:**
- Modify: `PanelDeck.html` (`normalize()`, `loadExamples()`, export/import)

**Interfaces:**
- Produces: Robust backward compatibility for legacy data, updated rich default examples, and flawless end-to-end operation.
- Consumes: Existing localStorage data.

- [x] **Step 1: Update `normalize()` for automatic schema migration**
  Ensure any existing saved card without `pinned` or `tags` is cleanly sanitized:
  ```javascript
  p.pinned = Boolean(p.pinned);
  p.tags = Array.isArray(p.tags) ? p.tags : (typeof p.tags === 'string' && p.tags ? p.tags.split(',').map(function(s){ return s.trim(); }).filter(Boolean) : []);
  ```
  Ensure `state.viewMode = state.viewMode === 'list' ? 'list' : 'grid'`.

- [x] **Step 2: Update `loadExamples()` with modern tags, layouts, and pinned panel**
  Update the example panels to showcase the new features (e.g. GitHub tagged `#dev, #code` and pinned; Wikipedia tagged `#reference`; Obsidian/Local folder tagged `#notes, #work`).

- [x] **Step 3: Comprehensive verification test**
  Run complete functional validation:
  1. Boot up page: verify atmospheric auras, header, filter bar, and grid render cleanly with zero JS console errors.
  2. Test CRUD: Add panel with tags, edit, pin, resize, and delete.
  3. Test filtering: Click type pills and tag pills; verify counts.
  4. Test search: Press `Ctrl+K` and `/`; test substring matching and clear button.
  5. Test View density: Toggle between Bento Grid and Compact List.
  6. Test Theme: Toggle Dark / Light theme.
  7. Test Export / Import: Export backup JSON, reset dashboard, re-import backup JSON, and verify complete restoration.
