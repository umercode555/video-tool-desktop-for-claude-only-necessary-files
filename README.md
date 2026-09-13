# HOOK & SHOWCASE — Desktop app

> **Note on `app/app.js` (was `app/app.min.js`):** this file was mechanically
> de-minified and lightly annotated — see the big comment block at the very
> top of `app/app.js` for exactly what changed and how it was verified.
> Nothing about how the app behaves was touched: same variable values, same
> control flow, same string/number literals, checked by diffing the parsed
> syntax tree against the original minified file. Only identifier names (for
> the ~221 `document.getElementById(...)` references) and comments changed.
> `index.html` and `sw.js` were updated to reference the new filename.

Same app, same files (`app/index.html`, `app/app.min.js`, `app/styles.min.css` —
untouched). This is only a native window wrapper around them.

## Why this instead of just the browser

The freeze you saw switching to Instagram is real Chromium background-tab
throttling — normal browser tabs can't turn that off. This app can, because
`main.js` launches its own Chromium with `--disable-background-timer-throttling`,
`--disable-backgrounding-occluded-windows`, and `--disable-renderer-backgrounding`
switches set. Same rendering engine your browser uses, just no throttling —
switching to Instagram, minimizing the window, or leaving it in the
background will no longer pause a render.

Hardware acceleration is turned off in `main.js` on purpose — your MacBook's
Intel HD 4000 (2012) doesn't reliably support the video-encode path Chromium
tries by default, and forcing software encoding avoids silent stalls/failures
on that GPU. It will run at CPU speed either way — an iGPU that old wasn't
going to accelerate this regardless.

## Run it (development mode — start here)

Open Terminal, `cd` into this folder, then:

```bash
npm install
npm start
```

First `npm install` will download Electron itself (~150-200MB) — needs
internet, takes a few minutes on first run only.

## Build a real double-clickable .app

Once `npm start` works and looks right:

```bash
npm run dist:mac
```

This produces a `.dmg` in `dist/` — open it, drag HOOK & SHOWCASE into
Applications, done. `--x64` is set deliberately: your 2012 MacBook Pro is
Intel, not Apple Silicon, so the build has to target `x64`, not the arm64
default electron-builder would otherwise try.

## Important — this Electron version is pinned on purpose

`package.json` pins `"electron": "^32.0.0"`. Electron 33+ dropped support
for macOS Catalina entirely — it will not launch on your machine. Don't
run `npm update` / let anything bump this past the 32.x line, or the app
stops opening on this Mac. (It'll be fine on a newer macOS if you ever
move to one — you could bump the version then.)

## Using it in the browser too

Nothing about the browser version changes — the same `index.html` /
`styles.min.css` / `app.min.js` in `app/` still open directly in Chrome
exactly as before. Use the app for auto-prepare batches you want to walk
away from; use the browser for quick one-off edits. Same IndexedDB storage
note applies to both: each is its own separate origin/storage, so a
project saved in the app won't show up in the browser version or vice
versa — they don't share data.
