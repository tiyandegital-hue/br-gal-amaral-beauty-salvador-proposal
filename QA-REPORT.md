# QA Report — Gal Amaral Beauty demo site

**Build dir:** `~/workspace/lead-builds/br-gal-amaral-beauty-salvador/`
**Date:** 2026-11-09
**Source of truth:** NICHE.md (verified facts) + PAGES.md (7-page list) + STITCH-EXPORT.md (Stitch project 16600898356370247621, 7 pages + design system + 2 mobile screens)
**Method:** Playwright (Chromium) against a local static server — every page at 1440×900 and 390×844, plus screenshot review (desktop + mobile home, desktop + mobile bot page, header close-up). Script: `/tmp/gal-qa.py` (raw JSON in `/tmp/gal-qa.json`).

## Verdict: ✅ PASS

All 7 pages: **0px horizontal overflow** at both viewports, **0 console errors**, **0 failed requests**, all internal links return **200**, business name renders on every page (filled from the single `SITE.businessName` constant in `assets/js/site.js`).

## Per-page results

| Page | 1440px overflow | 390px overflow | Console errors | Failed requests | Internal links | Interactions verified |
|---|---|---|---|---|---|---|
| index.html | 0px | 0px | 0 | 0 | all 200 | CTA → agendamento; burger nav opens |
| servicos.html | 0px | 0px | 0 | 0 | all 200 | burger nav opens |
| galeria.html | 0px | 0px | 0 | 0 | all 200 | filter "Formandas" shows 1 tile; lightbox opens + closes; burger nav opens |
| agendamento.html | 0px | 0px | 0 | 0 | all 200 | full bot flow: Noiva → date 15/12/2026 → Maquiagem + Penteado → estúdio → summary bubble → "Confirmar no WhatsApp" (wa.me/5571999091519, message pre-filled with Noiva); step indicator "Etapa 4 de 4"; restart resets to 5 chips; burger nav opens |
| sobre.html | 0px | 0px | 0 | 0 | all 200 | burger nav opens |
| precos-faq.html | 0px | 0px | 0 | 0 | all 200 | FAQ accordion opens; burger nav opens |
| contato.html | 0px | 0px | 0 | 0 | all 200 | contact form fields fill; burger nav opens |

Screenshot review: deep-vinho hero with gold italic "Realçar, não esconder.", gold marquee strip, blush occasion cards, oversized 01/02/03 numerals, labelled style-panel gallery tiles, phone-frame bot mock with greeting + 5 occasion chips — matches the Stitch "Vinho Editorial" language. No layout defects after fixes below.

## Defects found and fixed during QA

1. **Mobile overflow (agendamento 390px, 31px)** — cause: `.bot-grid` single-column track was sized by the phone mock's min-content width, pushing `.bot-item` cards to 403px. Fix: `minmax(0,1fr)` tracks + `min-width:0` on grid/flex children + `max-width:400px` on `.phone`. Re-tested: 0px everywhere.
2. **Bot summary bubble had no `.summary` class** — `botSay()` dropped the `isSummary` flag, so the summary message rendered as a plain bot bubble. Fix: `botSay(html, delay, isSummary)` passes it through; `showSummary()` passes `true`. Re-tested: `.msg.summary` present.
3. **Google Maps iframe failed in sandbox** (`ERR_TUNNEL_CONNECTION_FAILED` — no external route from headless Chromium here). Fix: replaced the live embed with a static vinho address panel + "Abrir Salvador no Google Maps" outbound link. No external request on the page now.
4. **Desktop header nav wrapped to two lines** (7 nav items + brand + CTA at 1200px wrap). Fix: wrap widened to 1240px, nav gap 26→18px, nav font 14.5→13.5px, `white-space:nowrap` on links, brand 21→19px. Re-shot header: single line, 72px height.

## Strip list — Stitch inventions removed (per export's Honest Audit + NICHE.md)

- **Invented stats:** "+500 PRODUÇÕES EXCLUSIVAS", "08+ ANOS DE OFÍCIO", "12h+ RESISTÊNCIA TÉRMICA", "mais de 16 horas de evento", "36°C", "100% À PROVA DE EMOÇÃO", "100% RESISTENTE À MARESIA", "100% PELE & CACHOS REAIS" — all removed; nothing replaced them (no stat strip on the home hero).
- **Invented hours:** "Segunda a Sábado — Horário sob reserva" / "SEGUNDA A SÁBADO — HORÁRIO SOB RESERVA PRÉVIA" → visible `[a confirmar no WhatsApp]` everywhere (footer, FAQ, contato).
- **Invented booking rules:** "Datas de Noivas com reservas de 3 a 12 meses" and "Recomendamos o contato com o máximo de antecedência…" → honest line "datas de formatura e casamento esgotam — garanta a sua com antecedência" (her own post language, no numbers).
- **Invented contract/payment mechanics:** "Contrato digital transparente com cronograma minuto a minuto", "contrato com sinal de reserva", "DATA TRAVADA EM CARTÓRIO VIRTUAL", "emissão de contrato ou PIX", "O ticket médio já chega calculado" — all removed.
- **Invented technical claims:** "Produtos importados à prova d'água", "Produtos de alta performance", "CURVATURAS 2A A 4C", "Colorimetria Inclusiva — subtons quentes, neutros e oliva identificados com exatidão científica", "Acabamento acetinado calibrated para flash profissional" (incl. stray English "calibrated") — removed or softened to verified wording ("maquiagem de longa duração", "pele bem construída").
- **Invented quotes:** "Não criamos máscaras. Revelamos a sua mais imponente verdade." (Serviços manifesto) removed — only her verified lines remain ("Uma maquiagem para realçar, não para esconder." / "Você se olha no espelho e pensa: eu estou ainda mais linda!"). Agendamento quote "A noiva decide contratar a maquiadora na hora da emoção…" attributed to Gal removed entirely.
- **Unverified home/on-location service:** "Destination Wedding / Litoral Norte da Bahia", "Atendimento Externo (Hotel, Pousada, Domicílio)" presented as offered → bot + forms + FAQ now offer "A domicílio [a confirmar]" / "Atendimento externo [a confirmar]" as clearly-labelled options; summary notes "a confirmar disponibilidade".
- **Unverified address extras:** "CEP 41280-126 • Estacionamento & Acessibilidade" → parking/accessibility words removed (CEP kept — verified).
- **"depoimentos"** (Contato Instagram card) removed — no testimonials verified.
- **Commercial claims not in the brief:** "Sem Mensalidades" / "Sem taxas ocultas" removed.
- **Bot details fixed:** default date 12/15/2025 (past) → date picker starts empty with `min` = tomorrow; "Etapa 1 de 3" (mobile) vs "Agende em 4 toques" reconciled to 4 steps throughout; emoji removed from bot UI (skill: no emoji as UI icons).
- **Fonts:** Stitch's design-system frame named Fraunces as an alternate; site uses the prompt fonts **Playfair Display + Inter**, self-hosted as woff2 in `assets/fonts/` (latin subsets, cover pt-BR diacritics) — zero CDN requests.
- **Long paragraphs:** Stitch's export truncates several long paragraphs ("…"); the coder did NOT reconstruct the missing words — copy was written from the verified facts in NICHE.md/PAGES.md instead.

## Remaining [Placeholder]s (visible on-site, awaiting Gal — nothing invented)

- Horários de funcionamento — "[a confirmar no WhatsApp]" (footer, FAQ, contato)
- Preços de todos os pacotes — "Valores sob consulta" (no price table anywhere)
- Prova antes do dia / retoque no dia — "[a confirmar com a Gal]"
- Atendimento a domicílio / no local do evento — "[a confirmar]"
- Anos de experiência, formação, prêmios — "[a confirmar com a Gal]" (sobre)
- Prazos de antecedência ideal, detalhes de produtos/técnicas — "[a confirmar com a Gal]" (FAQ)
- Nome completo da fundadora além da marca "Gal Amaral" — not shown anywhere

## Notes

- **Images:** 3 AI-generated still-life shots in `assets/img/` (hero-flatlay.webp 1280×1920, brushes-closeup.webp, palette-gold.webp — all 1920×1280). No people, no faces — nothing can be mistaken for Gal or her clients. Every on-site use carries a visible "Amostra gerada por IA — estilo do ateliê" label. Gallery tiles are labelled style panels ("Painel de estilo — foto real no Instagram") linking to @realcebygal — no fake client photos anywhere.
- **Bot is a real interactive mock:** occasion → date (native picker, min = tomorrow) → service → place → summary → wa.me/5571999091519 with pre-filled message. Home occasion cards deep-link into the bot via `?occasion=noiva|madrinha|formanda|debutante`.
- **Forms are demo-only:** contato + simulator compose a WhatsApp message and open wa.me; nothing is submitted or stored. No public business email was found, so none is shown.
- **Business name:** one swappable constant — `SITE.businessName` in `assets/js/site.js` fills every `[data-site]` slot.
- **vercel.json** present with `cleanUrls: true`. JSON-LD: HairSalon (verified facts only) on index + contato; FAQPage schema with only the 3 answered questions.
- **Design:** "Vinho Editorial" per Stitch — vinho #4A1026/#5C1A30, gold #C9A227, blush #F6E3E0, near-black plum #230711; Playfair Display + Inter; marquee, oversized numerals, editorial panels, slow hero zoom, staggered headline rise.
- Not done here (parent handles): GitHub repo, Vercel deploy, outreach, seen_leads.json.
