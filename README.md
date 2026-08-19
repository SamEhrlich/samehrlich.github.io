# Sam's Personal Resources

Personal page collecting books, job boards, links, video channels, and people worth following.

- Repo: <https://github.com/SamEhrlich/samehrlich.github.io> (private)
- Stack: React 19 + Vite 6, TypeScript. No backend, no auth, no routing, no API calls.
- Working copy lives at `external/sams_personal_resources` inside `mongo_dash`, which the parent
  repo gitignores — so this is its own independent git repo, not a submodule.

## Run

```
npm install
npm run dev
```

Dev server: <http://localhost:3001> (`strictPort`, so a busy 3001 fails instead of silently moving).

`npm run build` typechecks with `tsc --noEmit` first, then bundles to `dist/`. `npm run preview`
serves that build. `./run_sams_personal_resources.sh` does install-if-needed plus `npm run dev`.

## Deploy

Cloudflare Pages, connected to the GitHub repo. Free tier serves private repos, so the source
stays private. Project settings: framework preset **Vite**, build command `npm run build`, output
directory `dist/`. Pushes to `main` deploy automatically.

Two things to avoid:

- No `CNAME` file. That is a GitHub Pages mechanism; Cloudflare sets the custom domain in its own
  dashboard.
- Do not also enable GitHub Pages. A private repo on the Free plan will not serve, and running both
  would split deploys.

This box runs Node 18, which is why Vite is pinned to 6 (Vite 7 requires Node 20+). Vite 6 builds
fine on Cloudflare's newer default Node; pin `NODE_VERSION` in the Pages project if that ever drifts.

## Structure

- `index.html` — Vite entry point, at the repo root (not `public/`)
- `src/index.tsx` — mount point, loaded as a module from `index.html`
- `src/App.tsx` — the full page
- `src/resources.css` — all layout and motion
- `src/index.css` — base reset + font family
- `src/assets/` — book covers, job-listing logos, link logos, profile pictures, video thumbnails
- `public/` — served at the site root; holds the favicon set

The favicon is the Samcast mark, copied from the
`dl-bi-baseball-01-classic-horseshoe-orange-seams` bundle in the `mongo_dash` repo (byte-identical
to the file the Samcast app serves). Re-copy from there if the brand mark changes.

## How the page works

Layout is driven entirely from `resources.css`. Each section's
`<div className="resources-items-grid resources-grid--{books|jobs|links|video|people}">` picks the
column density and card size for that section, so card markup stays identical everywhere. To retune
a section, edit its `.resources-grid--*` block rather than the cards.

The nav is sticky and highlights the section in view via a scroll listener over the `SECTIONS` list
in `App.tsx`. Motion is CSS-only, no animation dependency: cards and section headers start hidden
and are revealed by an `IntersectionObserver` that adds `is-revealed`, staggered by position within
each entering batch.

Four contracts worth knowing before editing:

- `SECTION_ANCHOR_OFFSET` in `App.tsx` must equal `scroll-margin-top` on `.resources-section`. An
  anchor click lands the section top at that offset; if the active-tab threshold drifts above it,
  the nav highlights the previous section.
- `.resources-section:last-of-type` carries a `min-height` so the final section can scroll up under
  the nav. Without it the page bottoms out early and the last two tabs share one scroll position,
  which no amount of tuning the active-tab detection can disambiguate.
- Every card is one stretched link: `.resources-item-title-link::after` covers the card, so the
  whole surface is clickable while the tab order keeps exactly one link per card. Any *second* link
  inside a card needs `position: relative; z-index: 2` to sit above that overlay — see
  `.resources-item-link`. The focus ring is drawn on the card via `:has()`, not the title text.
- Card reveal animates `translate`; hover animates `transform`. Deliberately different properties,
  so a 200ms hover lift composes with the 420ms entrance instead of fighting it.

`prefers-reduced-motion: reduce` forces cards visible and drops the animation.

## Notes

- Migrated off Create React App to Vite on 2026-08-19. `package.json` is `"type": "module"`, which
  is what keeps `vite.config.ts` off the deprecated CJS config path.
- Lifted out of the Samcast frontend on 2026-04-22 (see `docs/frontend_design_decisions.md` in the
  `mongo_dash` repo).
