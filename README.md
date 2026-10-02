# SmartGrow — Website

Public marketing site for SmartGrow, an automated indoor hydroponic
growing system. Single-page, no build step, no dependencies to install.

## What's in here

| File | What it does |
|---|---|
| `index.html` | The whole page — HTML, animations and JS |
| `styles.css` | Compiled Tailwind styles (replaces the Tailwind CDN script) |
| `images/` | All website photos — see `images/README.md` for names |
| `manifest.json` | Makes the site installable to a phone home screen |
| `sw.js` | Service worker. **Network-first** — see the note below |
| `icon-192.png` / `icon-512.png` | App icons |
| `icon-maskable-512.png` | Android adaptive icon (extra padding for circle crops) |
| `robots.txt` | Lets search engines index the site |
| `tailwind.config.js` / `tailwind.input.css` | Only needed to regenerate `styles.css` |
| `.nojekyll` | Stops GitHub Pages running Jekyll on the files |

## Publishing (GitHub Pages)

1. Create a **public** repo named `smartgrow`.
2. Upload everything in this folder to the repo root — not inside a
   subfolder. `index.html` must sit at the top level.
3. Repo → **Settings** → **Pages**.
4. Source: **Deploy from a branch**. Branch: `main`. Folder: `/ (root)`. Save.
5. Wait 1–2 minutes. The live link appears at the top of that page:
   `https://<username>.github.io/smartgrow/`

## Updating

Edit `index.html` in GitHub (pencil icon) or re-upload it, then commit.
The change is live for everyone within about a minute — visitors just
refresh. Nothing to rebuild.

## About the service worker

`sw.js` is deliberately **network-first**: every request goes to the
network, and the cache is only used when someone is offline. A
cache-first worker is the usual reason a site keeps showing an old
version on people's phones for days after an update.

If you ever edit `sw.js` itself, bump the version string inside it
(`smartgrow-site-v1` → `smartgrow-site-v2`). That forces every browser
to discard its old cache.

## Photos

All photos live in `images/`. To change one, upload a new file with the
same name into that folder. The full list of names and where each one
appears is in `images/README.md`.

## Styles (styles.css)

`styles.css` is generated from the Tailwind classes in `index.html`.
Editing text, links or photos needs nothing extra. If you add a **new**
Tailwind class that the page didn't use before, it won't have a style
until `styles.css` is regenerated:

    npx tailwindcss@3 -c tailwind.config.js -i tailwind.input.css -o styles.css --minify
