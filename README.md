# R.W Electrical — website

Single-page site for R.W Electrical, electrical contractors in Guernsey. Plain HTML + Tailwind CSS v3 (compiled and committed), vanilla JS, no frameworks or runtime CDNs.

Live draft: https://tobygregg.github.io/r-w-electrical/

## Folder layout

```
index.html              ← the whole site; sections separated by big comment banners
thanks.html             ← shown after the quote form is sent (FormSubmit _next)
404.html                ← GitHub Pages "not found" page
assets/css/styles.css   ← compiled Tailwind — don't edit by hand, run npm run build
assets/js/main.js       ← menu, header, scroll reveals, services explorer, sticky bar, form validation
assets/fonts/           ← self-hosted Saira + Public Sans (woff2) with their OFL licences
images/brand/           ← logo.svg, logo-white.svg (footer), mark-rw.svg — redrawn from the Facebook logo
images/illustrations/   ← hero + service line drawings (reference copies; the live ones are inline in index.html so they can animate)
images/                 ← favicons, og-image.jpg (1200×630 share card), site.webmanifest
src/input.css           ← Tailwind source, @font-face, components, keyframes
tailwind.config.js      ← brand colours, fonts, animations
sitemap.xml, robots.txt
_fb-pack/               ← the Facebook source pack (not published — underscore folders are ignored by Pages)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| `volt-500` | `#0D21FF` | Logo bracket blue — buttons, links, accents, illustration current |
| `volt-50` | `#EEF0FF` | Illustration panels, icon tiles |
| `volt-400` | `#5B6BFF` | Blue on dark backgrounds |
| `ink` | `#0B0C10` | "ELECTRICAL" wordmark black — headings, line-art strokes, dark bands |
| `graphite` | `#565656` | Outlined "RW" grey — body copy |
| `graphite-line` | `#D9DBE3` | Borders and hairlines |
| `paper` | `#F7F8FB` | Page background |
| `glow` | `#FFCF4A` | Lamp light inside the illustrations only |

- **Fonts:** Saira (display, slightly expanded to echo the wide logo lettering) and Public Sans (body), both OFL, self-hosted.
- **Logo:** traced to SVG from the 1200px Facebook image so it stays sharp at every size (`images/brand/logo.svg`). Same lettering, layout and colours — nothing redesigned. Favicons use the outlined "RW" in white on the logo blue.
- **Graphics:** flat 2.5px line-art in the logo colours, drawn in the style of the logo's draughting lines (corner construction ticks, the open blue bracket). The hero loops: breaker flips on → current runs along the cables → lamp and socket light up.

## Editing

- **Text:** edit `index.html` directly. Every section has a banner comment (`HERO`, `SERVICES`, `HOW A JOB RUNS`, `CALL BAND`, `ABOUT`, `CONTACT`, `FOOTER`).
- **Colours:** change them in `tailwind.config.js`, then run `npm install && npm run build`.
- **Services explorer:** each service is a `<button role="tab">` in the tab list plus a matching `<div role="tabpanel">` (ids `tab-xxx` / `panel-xxx`). To add one, copy a button and a panel, give both a new id, and add the service name to the `<select id="f-service">` in the form. The "Ask about…" link's `data-service` must match the dropdown text exactly to pre-select it.
- **Adding work photos:** there is no gallery yet because the Facebook page has no job photos. When the client supplies some, export each as `images/work/name.webp` (~1600px) and `name-sm.webp` (~800px) and add a "Recent work" section after Services with `srcset`, `width`/`height`, alt text and `loading="lazy"`. A before/after slider isn't appropriate for an electrician.
- **Illustrations:** the SVGs are inline in `index.html`; copies live in `images/illustrations/` for reference.

## Before going live — checklist

- [ ] Swap `https://tobygregg.github.io/r-w-electrical/` for the real domain everywhere: canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD (`@id`, `url`, `logo`, `image`), `sitemap.xml`, `robots.txt` and the form's `_next`.
- [ ] **When the client goes ahead, switch the form from Toby's email to the client's** (`action="https://formsubmit.co/…"` in `index.html`), update the `_subject` (drop "website draft"), then send a test enquiry and click FormSubmit's activation email.
- [ ] Confirm phone **07781 465385** (also used for WhatsApp) and email **r.welectrical@hotmail.com**.
- [ ] Get the client to sign off the **services wording**. The Facebook page only says "we cover all aspects of electrical to a high professional standard", so the six services and their "what's included" lists are standard electrician work written for them. In particular check: EICR / periodic testing, landlord and pre-purchase checks, cooker/appliance connections, garden and security lighting, and commercial work (shops, offices, workshops).
- [ ] Check the **"How a job runs"** steps match how they actually work (site visit before quoting, price agreed before work starts).
- [ ] Assumptions to confirm: they work island-wide (Facebook lists "Guernsey, Saint Peter Port" as the service area); "Domestic & commercial" (taken from "Electrical contractors" on the logo); the team is qualified electricians (from their hiring post).
- [ ] Ask for **job photos** (fuse boards, lighting, finished installs, the team) — the site would benefit most from a Recent work gallery and a real photo in the hero/about.
- [ ] Ask about **accreditations and insurance** (e.g. scheme membership, public liability) — none are mentioned on Facebook, so none are claimed. Add them as hero trust points if they have them.
- [ ] Hours: Facebook says "Always open". Not used — check whether they offer emergency call-outs before saying so.
- [ ] Left out on purpose: the only post is a "We're hiring qualified electricians" advert, so it's not on the site.

## Source

Built from the Facebook pack in `_fb-pack/` (BRIEF.md, data.json, images). It isn't published on the live site.
