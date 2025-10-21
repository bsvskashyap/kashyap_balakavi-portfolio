# Kashyap Balakavi — Portfolio

This repository contains a single-page portfolio built with plain HTML, CSS, and vanilla JavaScript. It is designed to be lightweight, accessible, and easy to host anywhere (GitHub Pages, Netlify, S3, etc.). This project is open-source and available under the MIT License.

## Overview

- `portfolio.html` — main single-file page (references `assets/` for styles, scripts, and images)
- `assets/styles.css` — site styles, theme variables, responsive layout
- `assets/main.js` — small JS helpers: mobile nav, smooth scroll, IntersectionObservers, modal previews, back-to-top
- `assets/images/` — hero photo and project thumbnails

## Preview

- Open `portfolio.html` in your browser (double-click) for a quick local preview.
- Or serve the directory with a simple HTTP server to avoid mixed-content blocking for some browsers.

## Run locally (recommended)

1. Using Python 3 (built-in HTTP server):

```powershell
python -m http.server 8000
Start-Process "http://localhost:8000/portfolio.html"
```

2. Using a simple Node static server (if you have Node installed):

```powershell
# from the project folder
npx http-server -c-1 . -p 8000
Start-Process "http://localhost:8000/portfolio.html"
```

## Git & GitHub (one-time steps)

1. Install Git (if you don't have it): https://git-scm.com/download/win
2. Initialize, commit, and push (run from the project folder):

```powershell
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If you have GitHub CLI (`gh`) and want to create the repo and push in one step:

```powershell
gh repo create <your-username>/<your-repo> --public --source=. --remote=origin --push
```

## Publish to GitHub Pages (optional)

1. Add this GitHub Actions workflow to `.github/workflows/pages.yml` to deploy from `main` to GitHub Pages automatically.

```yaml
name: Deploy to GitHub Pages

on:
	push:
		branches: [ main ]

jobs:
	deploy:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- name: Setup Pages
				uses: actions/configure-pages@v4
			- name: Upload artifact
				uses: actions/upload-pages-artifact@v1
				with:
					path: '.'
			- name: Deploy
				uses: actions/deploy-pages@v1
```

## Notes

- No build step is required — this is a static site.
- The site uses CSS custom properties and respects `prefers-reduced-motion`.
- `assets/main.js` contains unobtrusive JS to make the site interactive and accessible.

## Testing checklist

- Mobile/responsive: shrink the browser width and use the hamburger navigation.
- Keyboard: Tab through the page; use the Skip link to jump to content.
- Modals: click project links with the `data-preview` attribute to open previews.

## Troubleshooting

- If thumbnails don't appear, verify `assets/images/` contains the referenced files.
- If push fails, ensure your remote URL is correct and you have permission to push to the repo.

## Contact

- Email: kashyap.balakavi@gmail.com

## License

This project is licensed under the MIT License.

MIT License

Copyright (c) 2025 Kashyap Balakavi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
