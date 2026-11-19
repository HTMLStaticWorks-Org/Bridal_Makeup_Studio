# Aurelle Bridal Studio — Multi-Page Luxury Bridal Makeup Template + Bride & Admin Dashboards

**"Where every bride becomes a masterpiece."**

Aurelle Bridal Studio is a complete, production-ready, zero-dependency HTML5 / CSS3 / ES6+ JavaScript website and dual-portal suite crafted for luxury bridal makeup studios, editorial hair architects, and destination wedding beauty houses.

---

## Key Architectural Highlights

1. **Strict Section Ownership (Zero Repeated Sections Across Pages)**: Every section lives on its designated page only. Home 1 (*Cinematic Arch Edition*) and Home 2 (*Editorial Collage Edition*) feature completely distinct heroes, layout grids, interactive widgets, copy, and photography.
2. **100% Local Photographic Asset Library (`assets/images/`)**:
   - 102 unique editorial bridal beauty photographs (204 files: `.webp` + `.jpg` fallbacks via `<picture>`).
   - Zero hotlinked external URLs, zero illustrations/vectors/3D renders, and 100% unique SHA-256 file hashes verified across the entire repository.
3. **"Ivory Rouge" Light Mode & "Midnight Plum" Dark Mode**:
   - Unconventional luxury bridal palette (`#2A0F1C` mulberry-black ink, `#7B1E3A` oxblood rose primary, `#C9A66B` antique champagne gold, `#E8B4B8` blush petal, `#FFF8F3` warm ivory).
   - System `prefers-color-scheme` detection + `localStorage` persistence + Full RTL (`dir="rtl"`) mirroring.
4. **3D Perspective Tilt & Bridal Motion on Every Card**:
   - Mouse-driven 3D perspective tilt (`1000px`) with radial glare layer, `translateZ` depth hierarchy, touch/press fallback, and `prefers-reduced-motion` compliance.
   - Center-aligned card icons, tags, headings, body text, sub-text, and baseline-pinned footer buttons across all viewports.
   - Responsive alignment rules: Mobile (`<640px`) and Tablet (`640px–1024px`) center-align all eyebrows/tags, headings, and buttons, with a unified `52px` button height system.
5. **Complete Bride Dashboard & Studio Admin Suite**:
   - 8 Bride Portal pages (`pages/dashboard/*.html`) + 8 Studio Admin pages (`pages/dashboard/admin/*.html`) with interactive charts, live chat, moodboard comparison, trial rescheduling, and invoice downloads.

---

## Quick Start

No build step or Node.js bundler is required. Open `index.html` or serve the root folder with any static web server:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080/pages/index.html`.

---

## Documentation Index (`documentation/`)

- [`documentation/installation.md`](documentation/installation.md) — Local preview, hosting, and deployment guide
- [`documentation/customization.md`](documentation/customization.md) — Customizing colors, self-hosted fonts, brand name, and integrations
- [`documentation/page-structure.md`](documentation/page-structure.md) — Complete Section Ownership Map across all 36 HTML pages
- [`documentation/image-manifest.md`](documentation/image-manifest.md) — Complete inventory of all 102 unique local `.webp`/`.jpg` photo pairs, usage locations, dimensions, and alt texts
- [`documentation/credits.md`](documentation/credits.md) — Typography, icon, and photography licensing credits
- [`documentation/changelog.md`](documentation/changelog.md) — Version history
- [`documentation/support.md`](documentation/support.md) — Support & troubleshooting guide
