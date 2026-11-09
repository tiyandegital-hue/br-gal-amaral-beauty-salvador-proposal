# DESIGN.md — Gal Amaral Beauty (Salvador/BA)

**Lead:** br-gal-amaral-beauty-salvador | **Pillar:** AI Automation (WhatsApp booking-bot mock + site)
**Source:** STITCH-EXPORT.md (Stitch project 16600898356370247621) + NICHE.md + PAGES.md
**Language:** pt-BR throughout. **Business name:** one constant — `SITE.businessName` in `assets/js/site.js`.

## Overview
7-page multipage demo site for a bridal makeup artist / hairstylist in Salvador/BA. Psychology: desire ("você no espelho, ainda mais linda") → trust (real work, real address, real WhatsApp) → ease (booking in 4 taps in the bot mock) → honest urgency ("datas de formatura e casamento esgotam"). The bot mock IS the automation pitch.

## Colors (tokens in assets/css/style.css)
- `--vinho:#4A1026` (dominant field), `--vinho-2:#5C1A30`, `--vinho-deep:#2E0718`
- `--gold:#C9A227` (single accent — all CTA work), `--gold-2:#ECC246`
- `--blush:#F6E3E0` (light counterpoint), `--blush-2:#FFEDEF`, `--cream:#FFF9F5`
- `--ink:#230711` (near-black plum text), `--muted:#6E5560`
- 60-30-10: vinho field / blush light sections / gold accent (<5% of any screen).

## Typography
- Display: **Playfair Display** 500/700/900 + italic 500/700 — oversized editorial serif, tight leading (0.98–1.05), H1 clamp(52px,7.2vw,104px). Italic reserved for "Realçar, não esconder."
- Body/UI: **Inter** 400/500/600/700. Kicker: 12px, +0.28em tracking, uppercase, gold.
- Both self-hosted as woff2 in `assets/fonts/` (latin subsets) — no CDN.

## Layout
- Editorial magazine: full-bleed hero with slow-zoom image, gold marquee strip, 4 occasion cards, oversized 01/02/03 numerals, asymmetric gallery grid, split philosophy section, phone-frame bot mock (sticky on desktop).
- Header: fixed, dark vinho, 72px; 7 nav items + gold WhatsApp CTA; burger ≤1020px.
- Sticky green WhatsApp float on every page (wa.me/5571999091519).
- Footer: 3 columns (brand + philosophy / studio + hours-placeholder / Instagram) + demo note (Tiyan Digital R$810/72h).

## Components
- `.ocard` occasion cards · `.step` numbered steps · `.gtile` gallery style-panels (labelled, no fake photos) + lightbox · `.phone` bot mock (chat bubbles, typing indicator, chips, date picker) · `.faq` accordion · `.form-card` WhatsApp-composing forms · `.offer` demo strip.

## Motion
- Hero: slow zoom (18s alternate) + staggered headline rise (0.9s, expo-out). Marquee: 28s linear loop. Bot: typing dots + soft reply bounce. One hero move per moment; `prefers-reduced-motion` branch included.

## Do's and Don'ts
- DO: values "sob consulta" everywhere; visible `[a confirmar]` placeholders for hours/prices/home service/founder details; label every AI image and every style panel; link real photos to @realcebygal.
- DON'T: invented stats, testimonials, prices, hours, years, contract/PIX mechanics, technical claims, fake client photos, generated faces as Gal.

## Known Gaps
- No real photos of Gal's work on-site (only her Instagram) — gallery uses labelled style panels until she supplies photos.
- No portrait of Gal — sobre page uses a still-life; her photo must come from her.
- Google Maps embed removed (sandbox had no external route; also avoids a third-party tracker) — static address panel + outbound Maps link instead.
- Hours, prices, home service, prova/retoque, founder full name all unconfirmed — visible placeholders await her.
- Bot mock is client-side only; the real bot lives on her WhatsApp (handoff via wa.me link).
