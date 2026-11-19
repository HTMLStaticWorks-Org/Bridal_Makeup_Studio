# Support & Troubleshooting Guide — Aurelle Bridal Studio

## Common Questions

### 1. Why aren't WebP images or fonts loading if I double-click `file://` in Safari?
While all assets use relative paths (`../assets/...`), modern browsers enforce strict CORS rules on `file://` URLs for `@font-face` and `localStorage`. Always preview using a local HTTP server (`python -m http.server 8080` or VS Code Live Server).

### 2. How do I reset the demo booking or theme state in `localStorage`?
Open your browser DevTools Console and run:
```js
localStorage.removeItem('aurelle_theme');
localStorage.removeItem('aurelle_dir');
localStorage.removeItem('aurelle_last_booking');
```

### 3. How do I disable 3D Tilt for specific cards?
`AurelleTilt` automatically disables itself when the operating system has `prefers-reduced-motion: reduce` enabled. To adjust tilt intensity on a specific card, add `data-tilt-max="6"` to the `.tilt-card` element.
