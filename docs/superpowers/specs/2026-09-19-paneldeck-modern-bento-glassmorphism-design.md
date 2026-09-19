# PanelDeck Modern Bento Glassmorphism Design Specification

- **Date:** 2026-09-19
- **Status:** Approved by User
- **Target File:** `PanelDeck.html`

---

## 1. Overview & Goals

PanelDeck is a self-contained, zero-dependency personal dashboard and launcher designed to live inside an Obsidian vault or be run standalone in any browser.

This design specification details the complete visual and functional modernization of PanelDeck into a **Modern Bento Glassmorphic** aesthetic, complemented by an expanded suite of productivity features:
* **Visual Overhaul:** High-grade frosted glass materials (`backdrop-filter`), atmospheric glowing auras, specular inner borders, refined typography, and smooth physics-based micro-interactions.
* **Pinned Bento Shelf:** Dedicated quick-access shelf for favorite/pinned panels.
* **Spotlight Search & Dynamic Filter Bar:** Keyboard-accessible search (`Ctrl+K` / `/`), built-in type filters (*All*, *Web*, *Folders*, *Apps*), and dynamically aggregated custom tag chips.
* **View Density Switcher:** Instant toggle between Bento Grid and Compact List view.
* **Modernized Modal:** Smooth entrance animation, visual miniature icons for sizes and layouts, tag input with preview chips, and real-time live preview.
* **Zero-Dependency & Continuity:** Maintains 100% single-file portable architecture with automatic backward-compatible migration for existing `localStorage` data and JSON backups.

---

## 2. Architecture & Design System

### 2.1 Single-File Native Architecture
* All HTML, CSS, and vanilla JS remain encapsulated in `PanelDeck.html`.
* Embedded SVG symbol library provides offline vector icons without any external network requests.
* Fully compatible with local `file:///` viewing, local web servers, and Obsidian vault iframe embedding.

### 2.2 Design Tokens & Glass Materials

#### Atmospheric Background Auras
* **Dark Theme (Default):**
  * Base background: `#0b0f17`
  * Primary aura: `radial-gradient(850px 400px at 15% -10%, rgba(79, 140, 255, 0.18), transparent 70%)`
  * Secondary aura: `radial-gradient(750px 400px at 85% 5%, rgba(168, 85, 247, 0.15), transparent 65%)`
  * Subtle ambient mesh: `radial-gradient(600px 300px at 50% 100%, rgba(20, 184, 166, 0.08), transparent 70%)`
* **Light Theme:**
  * Base background: `#f5f7fb`
  * Primary aura: `radial-gradient(850px 400px at 15% -10%, rgba(79, 140, 255, 0.12), transparent 70%)`
  * Secondary aura: `radial-gradient(750px 400px at 85% 5%, rgba(168, 85, 247, 0.10), transparent 65%)`

#### Glass Surface Specifications
* **Card Material:** `background: rgba(255, 255, 255, 0.04)` (dark) / `rgba(255, 255, 255, 0.72)` (light).
* **Backdrop Filter:** `backdrop-filter: blur(16px) saturate(160%)`.
* **Borders & Specular Highlights:**
  * Outer border: `1px solid rgba(255, 255, 255, 0.08)` (dark) / `1px solid rgba(0, 0, 0, 0.08)` (light).
  * Inner specular edge highlight: `box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12)`.
* **Dynamic Hover Glow:**
  * Ambient colored glow radiating from each panel's `--paccent` custom property:
    `box-shadow: 0 14px 34px rgba(0, 0, 0, 0.42), 0 0 22px color-mix(in srgb, var(--paccent) 26%, transparent)`.

#### Typography
* Font family: `system-ui, -apple-system, 'Segoe UI Variable Display', 'Segoe UI', Inter, sans-serif`.
* Headings: Crisp letter tracking (`letter-spacing: -0.025em`).
* Subtext / Paths: Legible secondary muted color meeting WCAG AA contrast standards.

---

## 3. Dashboard Layout & Bento Grid

### 3.1 Layout Structure
```
+-------------------------------------------------------------------+
|  Header (Brand, Editable Title, Search with Hotkey, Actions)       |
+-------------------------------------------------------------------+
|  Dynamic Filter Bar (All, Web, Folders, Apps, Custom Tags...)     |
+-------------------------------------------------------------------+
|  [Optional] Pinned Shelf (Shown only when pinned items exist)     |
|  +--------+ +----------------+ +--------+                         |
|  | Card 1 | | Card 2 (Wide)  | | Card 3 |                         |
|  +--------+ +----------------+ +--------+                         |
+-------------------------------------------------------------------+
|  Main Dashboard (Bento Grid or Compact List View)                 |
|  +--------+ +--------+ +----------------+                         |
|  | Card 4 | | Card 5 | | Card 6 (Tall)  |                         |
|  +--------+ +--------+ |                |                         |
|  | Card 7 (Large)    | +----------------+                         |
|  +-------------------+                                            |
+-------------------------------------------------------------------+
|  Footer                                                           |
+-------------------------------------------------------------------+
```

### 3.2 Bento Grid & Sizing
* Container: max-width `1360px`, centered, responsive horizontal padding.
* Grid Template: `grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))`, `grid-auto-rows: 215px`, `gap: 18px`.
* Border radius: `16px`.
* Bento Tile Sizes:
  * `sz-sm`: 1 col × 1 row (standard tile)
  * `sz-wide`: 2 col × 1 row
  * `sz-tall`: 1 col × 2 row
  * `sz-lg`: 2 col × 2 row
* Responsive behavior: Downscales multi-column spans automatically on viewports `<540px`.

### 3.3 Dedicated Pinned Bento Shelf
* Renders dynamically when `state.panels.some(p => p.pinned)`.
* Section title: `📌 Pinned` with a count badge.
* Displays pinned cards with full interactive capabilities and identical layout variants.
* Unpinning the last item automatically collapses the shelf smoothly.

### 3.4 View Density Switcher (Bento Grid vs. Compact List)
* Header toggle switch to switch between `grid` and `list` modes.
* In **Compact List Mode**:
  * Panels render as high-density rows (`54px` height).
  * Displays 36px icon/monogram thumbnail, bold title, clamped description, tag badges, destination link, and hover action toolbar.
  * Preserved in `state.viewMode`.

---

## 4. Navigation, Search & Dynamic Filtering

### 4.1 Header Toolbar
* Sticky glass container (`backdrop-filter: blur(20px)`).
* Click-to-edit dashboard title with inline keyboard handling.
* Luminous `+ Add panel` button with gradient accent.
* View Switcher (`Grid` / `List`).
* Theme Switcher (`Dark` / `Light`).
* Export / Import JSON buttons.
* Help & Tips button.

### 4.2 Spotlight Search Bar
* Keyboard Hotkeys: Pressing `Ctrl+K` (or `Cmd+K` on Mac) or `/` anywhere focuses the search input.
* Visible hotkey badge inside the input container.
* Live substring filtering across panel names, descriptions, paths, and tags.
* Clear button (`×`) when query is present.
* Embedded Google search fallback button (`Enter` or click).

### 4.3 Dynamic Filter Bar
* Automatically computes item counts for:
  * Built-in types: `All (N)`, `Web (N)`, `Folders (N)`, `Apps (N)`.
  * Dynamic custom tags: e.g. `#work (N)`, `#dev (N)`, `#tools (N)`.
* Clicking a filter pill activates it with an accent glow; clicking again or clicking `All` resets the filter.
* Filters compose seamlessly with the search query.

---

## 5. Card Component & Micro-Interactions

### 5.1 Card Layout Variants
Modernized bento styling across all 8 variants:
1. `ly-top`: Media plate top (56% height), glass body bottom.
2. `ly-side`: Media plate left (44% width), glass body right.
3. `ly-overlay`: Full-bleed background media with glass gradient overlay.
4. `ly-mini`: Horizontal compact row with rounded 64px media thumbnail.
5. `ly-tile`: Centered app launcher icon plate with bold label.
6. `ly-glass`: Frosted glass capsule floating over full-bleed media.
7. `ly-banner`: Left accent edge strip with horizontal side-shaded imagery.
8. `ly-note`: Editorial card with top-right thumbnail and left accent spine.

### 5.2 Floating Frosted Glass Action Toolbar
* Replaces the former separate corner buttons with a unified floating glass pill in the top-right corner.
* Glass pill: `backdrop-filter: blur(12px)`, `background: rgba(14, 18, 27, 0.75)`, `border: 1px solid rgba(255, 255, 255, 0.15)`.
* Actions:
  1. **Pin/Unpin**: Toggles `pinned` state. Shows active glowing accent when pinned.
  2. **Cycle Size**: Cycles between `sm` → `wide` → `tall` → `lg`.
  3. **Edit**: Opens the modal editor.
  4. **Delete**: Confirms and removes the panel.
* Transition: Smoothly glides in on card hover or keyboard focus-within.

### 5.3 Micro-Interactions & Accessibility
* Card hover: `transform: translateY(-4px) scale(1.01)`, dynamic accent aura diffusion.
* Drag-and-drop: Reorders cards natively; automatically disabled while filtering/searching to protect order.
* Focus state: Prominent accent outline (`outline: 2px solid var(--accent); outline-offset: 3px`).
* Pressing `Enter` on a focused card launches the panel.

---

## 6. Modal Dialog & Form Controls

### 6.1 Modal Experience
* Entrance animation: Smooth backdrop blur fade-in and dialog scale transition (`scale(0.95) → scale(1)`).
* Responsive layout with structured sections.

### 6.2 Fields & Visual Pickers
* **Name, Description, and Link/Path:** Standard inputs with automatic executable detection hint for `.exe`, `.lnk`, `.bat`, etc.
* **Tags Input:** Dedicated input for comma-separated tags (e.g. `work, dev, lotus`) with live rendered tag chips.
* **Pin Toggle:** Quick checkbox to pin card to top shelf.
* **Picture & Icon Tabs:** 5 media tabs (Icons, Gradients, Wallpapers, Upload, URL) plus monogram fallback.
* **Visual Size Picker:** Geometric mini-diagram buttons for Small, Wide, Tall, and Large.
* **Visual Style Picker:** Visual miniature layout cards for all 8 layouts.
* **Click Action:** Open link vs Run file.
* **Accent Color:** Auto (generated from name) or custom color picker.
* **Real-time Live Preview:** Instantly reflects active icon/gradient/image and accent color.

---

## 7. Data Schema & Backward Compatibility

### 7.1 Panel Data Structure
```typescript
interface Panel {
  id: string;
  name: string;
  path: string;
  desc: string;
  img: string | null;
  size: 'sm' | 'wide' | 'tall' | 'lg';
  style: 'top' | 'side' | 'overlay' | 'mini' | 'tile' | 'glass' | 'banner' | 'note';
  mode: 'link' | 'run';
  accent: string;
  pinned: boolean; // default: false
  tags: string[];  // default: []
}

interface AppState {
  title: string;
  theme: 'dark' | 'light';
  viewMode: 'grid' | 'list';
  panels: Panel[];
}
```

### 7.2 Normalization & Migration
`normalize()` ensures zero data breakage for existing users:
* `p.pinned = Boolean(p.pinned);`
* `p.tags = Array.isArray(p.tags) ? p.tags : (typeof p.tags === 'string' && p.tags ? p.tags.split(',').map(s => s.trim()).filter(Boolean) : []);`
* `state.viewMode = state.viewMode === 'list' ? 'list' : 'grid';`
* LocalStorage key remains `'paneldeck.v1'`.
* JSON import/export handles both legacy and extended formats transparently.

---

## 8. Verification Plan

### 8.1 Automated / Code Structure Checks
* Validate standalone HTML syntax, CSS validity, and ES6+ JavaScript execution.
* Ensure zero console errors or broken SVG references on page boot.

### 8.2 Functional Verification
1. **CRUD & Interactions:** Create a new card with tags, edit an existing card, cycle size, delete, and test drag reordering.
2. **Pinned Shelf:** Pin/unpin cards; verify shelf appears/collapses properly.
3. **Filtering & Search:** Test type filters (*All*, *Web*, *Folders*, *Apps*), tag pills, search hotkey (`Ctrl+K` / `/`), and Google search fallback.
4. **View Density:** Toggle between Bento Grid and Compact List view; verify layout consistency.
5. **Theme & Storage:** Toggle dark/light themes; confirm localStorage persistence across reloads; verify JSON export and re-import.
