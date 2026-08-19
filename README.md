# Sam's Personal Resources

Standalone personal page — books, job boards, links, videos, and people to follow.

**Unaffiliated with the Samcast MLB dashboard.** No shared code, no shared auth, no shared data. Moves freely to its own host later.

---

## 🚀 TODO when ready to release

This folder is **not tracked by git** — the parent `mongo_dash` repo has `external/` in its `.gitignore`, so everything here lives only on your local disk.

When you're ready to publish this as a real site:

1. `cd external/sams_personal_resources`
2. `git init && git add . && git commit -m "Initial commit"`
3. Create a new GitHub repo (e.g. `sam-ehrlich/sams-personal-resources`) and push.
4. Pick a host — Vercel, Netlify, Cloudflare Pages, and GitHub Pages all handle Vite out of the box. Build command: `npm run build`. Publish directory: `dist/`.
5. Update the `<title>` and `<meta description>` in `index.html` (repo root) if desired.
6. For GitHub Pages on a custom domain: name the repo `<user>.github.io`, add a `CNAME` file
   containing the bare domain, and point the domain's DNS at GitHub. Pages hosting is free; the
   domain is the only paid part.

Until then: only your machine has this. **Back it up elsewhere if it matters.**

---

## Run

```
./run_sams_personal_resources.sh
```

Or manually:

```
npm install
npm run dev
```

Dev server: http://localhost:3001 (`strictPort`, so a busy 3001 fails instead of moving).

Production build: `npm run build` (typechecks first, then bundles to `dist/`), preview with `npm run preview`.

## Structure

- `index.html` — Vite entry point, at the repo root (not `public/`)
- `src/index.tsx` — mount point, loaded as a module from `index.html`
- `src/App.tsx` — the full page
- `src/resources.css` — styles (self-contained, no Samcast vars)
- `src/index.css` — base reset + font family
- `src/assets/` — book covers, job-listing logos, link logos, Twitter avatars, video-profile thumbnails
- `public/` — served at the site root; holds the favicon set
- `public/favicon.ico` + PNG/apple-touch icons — the Samcast mark, copied from the
  `dl-bi-baseball-01-classic-horseshoe-orange-seams` bundle in the main repo (the same file the
  Samcast app serves). Re-copy from there if the brand mark changes; this project keeps its own copy.

Layout is driven entirely from `resources.css`. Each section's `<div className="resources-items-grid resources-grid--{books|jobs|links|video|people}">`
picks the column density and card size for that section, so card markup stays identical everywhere — to
retune a section, edit its `.resources-grid--*` block rather than the cards. The nav is sticky and
highlights the section in view via a scroll listener over the `SECTIONS` list in `App.tsx`.

Motion is CSS-only (no animation dependency). Cards and section headers start hidden and are
revealed by an `IntersectionObserver` in `App.tsx` that adds `is-revealed`, staggered by
position within each entering batch. Three contracts to keep in mind when editing:

- `SECTION_ANCHOR_OFFSET` in `App.tsx` must equal `scroll-margin-top` on `.resources-section`.
  An anchor click lands the section top at that offset; if the active-tab threshold drifts above
  it, the nav highlights the previous section.
- Every card is one stretched link: `.resources-item-title-link::after` covers the card, so the
  whole surface is clickable while the tab order keeps exactly one link per card. Any *second*
  link inside a card needs `position: relative; z-index: 2` to sit above that overlay — see
  `.resources-item-link`. The focus ring is drawn on the card via `:has()`, not on the title text.
- Card reveal animates `translate`, hover animates `transform`. They are deliberately different
  properties so a 200ms hover lift can compose with the 420ms entrance instead of fighting it.

## Notes

- No auth, no routing, no API calls.
- Build tooling: Vite 6 + `@vitejs/plugin-react` (migrated off Create React App 2026-08-19).
  Vite 6 rather than 7 because this box runs Node 18 and Vite 7 requires Node 20+.
  `package.json` is `"type": "module"`, which is what keeps `vite.config.ts` off the deprecated
  CJS config path.
- Lifted out of the Samcast frontend on 2026-04-22 (see `docs/frontend_design_decisions.md` in the main repo).
