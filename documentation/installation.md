# Installation & Deployment Guide — Aurelle Bridal Studio

## 1. Prerequisites
Aurelle Bridal Studio is built with pure **HTML5, CSS3 (CSS Custom Properties), and Vanilla ES6+ JavaScript**.
- **Zero runtime CDN dependencies**: All fonts (`assets/fonts/`), plugins (`assets/js/plugins/`), stylesheets (`assets/css/`), and 102 photographic image pairs (`assets/images/`) are bundled locally.
- **Zero build step required**: You can edit and deploy files directly without Webpack, Vite, or npm.

## 2. Running Locally
1. Unzip or clone the `aurelle-bridal-studio` directory.
2. Start any static HTTP server from the root folder:
   - **Python 3**: `python -m http.server 8080`
   - **VS Code**: Use the *Live Server* extension on `index.html` or `pages/index.html`.
3. Open `http://localhost:8080` in Chrome, Firefox, Safari, or Edge.

## 3. Deploying to Production (Netlify / Vercel / Apache / Nginx)
- **Netlify / Cloudflare Pages / Vercel**: Drag and drop the root folder or connect your Git repository. Set the publish directory to `.` (root) and leave the build command blank.
- **cPanel / Apache / Nginx**: Upload all files and folders (`index.html`, `pages/`, `assets/`, `sitemap.xml`, `robots.txt`) directly to your `public_html` or web root directory.
- Enable Gzip/Brotli compression and cache headers for `.woff`, `.webp`, `.css`, and `.js` assets to achieve 95+ PageSpeed scores.
