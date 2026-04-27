# jiojio · Brand & Design System

Internal brand guideline + design system for **jiojio**.
Single-page interactive document, no build step — just open `index.html`.

---

## Quick start

```bash
# Local
open index.html
# or
python3 -m http.server 8000 && open http://localhost:8000

# Push to GitHub
git init
git add .
git commit -m "init: jiojio brand & design system"
git remote add origin https://github.com/jiojio-lab/jiojio-brand-design.git
git push -u origin main
```

---

## What's inside

12 tabs across 4 groups, accessible from the left sidebar:

### Brand
- **01 · Brand** — mission, four operating principles, voice scale (5 axes), copy examples, non-negotiables
- **02 · Logo** — wordmark default (`jio`, EB Garamond, lowercase), 吉 seal mark, lockup, clear-space, size ladder, do/don't, color binding to `--accent`

### Foundations
- **03 · Tokens** — three-layer architecture (primitive → semantic → component), live registry, W3C DTCG `tokens.json` + CSS vars export, governance rules
- **04 · Color** — Fawn 10-step OKLCH-tuned scale, warm Neutral 10-step scale, four semantic families (info / success / warn / danger) at matched lightness, light/dark pairing, WCAG 2.2 contrast matrix, usage do/don't, quick reference
- **05 · Typography** — three faces (Source Serif 4 / DM Sans / JetBrains Mono), 16-step ramp with leading & tracking, CN/EN mixing rules, OpenType features (`tnum` / `kern` / `ss01` / `halt`), vertical rhythm, hard rules
- **06 · Layout** — grid, breakpoints, container widths
- **07 · Icons** — icon set, sizing, stroke rules

### UI
- **08 · Components** — buttons, cards, inputs, tabs, badges, toasts
- **09 · States** — empty, loading, error, success patterns
- **10 · Forms** — inputs, checkbox, radio, toggle, select, validation

### UX
- **11 · Motion** — easing curves, duration scale, principles, examples
- **12 · Accessibility** — WCAG matrix, keyboard paths, screen reader patterns

---

## Theme controls (in the sidebar)

- **Light / Dark** — `Paper` (`#FAF8F2`) ↔ `Bark` (`#2D271C`)
- **Accent swatcher** — 24 curated accents on the same warm-paper basis. Default is **Fawn** (`#A07E58`).
- **Dark Paper picker** (visible in dark mode) — 6 warm dark surfaces. Default is **Bark** (`#2D271C`).

All accent / paper changes propagate live through `var(--accent)` / `var(--bg)` token chains, so every component (including the logo wordmark and seal) recolors instantly.

---

## File map

```
index.html           — entry point, CSS tokens (:root + [data-theme="dark"])
src/
  app.jsx            — sidebar nav, theme toggle, accent / dark-paper pickers
  shared.jsx         — Icon, PageHeader, Section, Copyable, DoDontRow
  brand.jsx          — Brand tab
  logo.jsx           — Logo tab
  tokens.jsx         — Tokens tab (architecture + export)
  color.jsx          — Color tab
  type.jsx           — Typography tab
  layout.jsx         — Layout tab
  icon.jsx           — Icons tab
  components.jsx     — Components tab
  states.jsx         — States tab
  forms.jsx          — Forms tab
  motion.jsx         — Motion tab
  a11y.jsx           — Accessibility tab
```

No bundler, no npm. React 18 + Babel Standalone are loaded from unpkg with pinned integrity hashes.

---

## Brand fundamentals

| | |
|---|---|
| **Wordmark** | `jio` · EB Garamond 500 · lowercase · `var(--accent)` |
| **Mark** | 吉 (seal · Noto Serif SC) on Fawn-Deep (`#7A5E3E`) ground |
| **Accent** | Fawn `#A07E58` (canonical, step 400 of the Fawn scale) |
| **Paper · light** | `#FAF8F2` |
| **Paper · dark** | Bark `#2D271C` |
| **Type stack** | Source Serif 4 (display) · DM Sans (UI) · JetBrains Mono (data) |

### Four operating principles
1. Clean over decorated
2. No emoji in product surfaces
3. Numbers always tabular (mono + `tnum`)
4. Fawn = output / interaction; Ink = input / fact

---

Generated as an internal artifact. Update in place — there's no separate "source" file.
