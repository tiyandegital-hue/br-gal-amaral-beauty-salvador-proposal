# PAGES.md — Gal Amaral Beauty (Salvador/BA)

Lead: br-gal-amaral-beauty-salvador | Pillar: AI Automation (WhatsApp booking-bot mock + site)
Language: **Portuguese (pt-BR) throughout** — all copy, nav, buttons, bot mock.
Price anchor on site: the Tiyan Digital offer — **site + bot de agendamento por
R$810 (US$150), pronto em 72 horas** — appears ONLY as the clearly-labelled
demo/offer context, never as her service price.
Business name is ONE swappable constant: `GAL AMARAL BEAUTY`.

Design language: "Vinho Editorial" — deep vinho/burgundy field, gold accent,
blush counterpoint, oversized editorial serif + grotesque sans (see NICHE.md).
Sticky "Agendar no WhatsApp" button on every page (wa.me/5571999091519).
Multipage only — 7 pages, no one-pager.

## 1. index.html — Home
- **Hero:** full-bleed image panel (her real work photo), oversized serif
  headline "Realçar, não esconder." + subline "Maquiagem e penteado para
  noivas, madrinhas, debutantes e formandas em Salvador." CTAs: "Agendar no
  WhatsApp" + "Ver o bot de agendamento".
- Marquee strip: NOIVAS • MADRINHAS • FORMANDAS • DEBUTANTES • PELE MADURA.
- "O seu momento" — 4 occasion cards (Noiva / Madrinha / Formanda / Debutante),
  each linking to Serviços.
- "Como funciona" — 3 oversized numerals: 1 Escolha o momento → 2 Confirme
  no WhatsApp → 3 Chegue linda no grande dia. (Bot mock preview inline.)
- Real-work gallery strip (her photos, captioned with the real occasion:
  e.g. "Formanda em Medicina", "Mãe de formanda", "Noiva — cachos naturais").
- "Por que a Gal" — her philosophy in her words (paraphrase of verified
  posts): pele bem construída, acabamento sofisticado, você se reconhecendo
  no espelho. NO invented credentials/years/reviews.
- Footer: address Central 214, Salvador/BA 41280-126 · WhatsApp
  (71) 99909-1519 · Instagram @realcebygal · hours [TO CONFIRM].

## 2. servicos.html — Serviços & Pacotes
- Service menu by occasion, not by product: Noivas / Madrinhas / Formandas /
  Debutantes / Produção social (aniversário, eventos).
- Each card: what is included (maquiagem + penteado, prova, retoque — ONLY
  items her posts confirm: maquiagem de longa duração, penteado estruturado,
  cachos; anything else marked [TO CONFIRM]).
- **Prices: NO invented prices.** Show "Valores sob consulta — chame no
  WhatsApp" with per-occasion "Pedir orçamento" buttons. (Her directory
  listing shows only price range "$"; no published prices exist.)
- Process section: prova → dia do evento → retoque (as described in her
  posts where verified; otherwise [TO CONFIRM]).
- CTA: "Montar minha produção no WhatsApp" → booking-bot page.

## 3. galeria.html — Galeria
- Filterable grid by occasion: Noivas / Formandas / Madrinhas / Debutantes /
  Pele madura / Social.
- Each photo captioned with the REAL occasion from her posts (formanda em
  Medicina; mãe de formanda; noiva; aniversário). Photos: her real IG/listing
  images. Where a slot has no real photo, use a labelled style panel
  ("Foto de demonstração — estilo da Gal") — never a fake client photo.
- Lightbox on click; sticky booking button throughout.

## 4. agendamento.html — Bot de Agendamento (WhatsApp) — CORE INTERACTIVE PAGE
- **The automation demo (pillar deliverable).** A phone-frame WhatsApp-style
  chat mock, fully interactive (client-side JS):
  1. Bot greets: "Olá! Eu sou a assistente da Gal Amaral Beauty 💄 Qual é o
     seu momento?" → quick-reply chips: Noiva / Madrinha / Formanda /
     Debutante / Outro evento.
  2. Bot asks date ("Qual a data do evento?") — date picker / chips.
  3. Bot asks service: "Maquiagem + Penteado" / "Só maquiagem" / "Só penteado".
  4. Bot asks local: "No estúdio (Central 214, Salvador)" / "A domicílio"
     [TO CONFIRM — domicílio not verified].
  5. Bot summarises the booking and shows "Confirmar no WhatsApp" → opens
     wa.me/5571999091519 with the pre-filled message.
  6. Bot confirms: "Pronto! A Gal confirma sua data em instantes."
- Labelled clearly on the page: "Demonstração interativa — o bot real atende
  no WhatsApp da Gal." Typing indicator, timestamps, read ticks.
- Beside the phone: "O que o bot faz por você" — answers instantly, never
  loses a DM, confirms dates, reminds the client before the event. (Automation
  pitch, no invented stats.)
- Fallback: direct "Falar com a Gal no WhatsApp" + "Chamar no Instagram DM".

## 5. sobre.html — Sobre a Gal
- Her story in her own words (from verified posts): maquiadora e penteadista
  em Salvador; "maquiagem para realçar, não para esconder"; pele bem
  construída, acabamento sofisticado; every skin, every age, every curl —
  "beleza não tem idade" (her post on mature skin); "cachas também têm todo
  o protagonismo no altar" (her bridal post).
- Portrait/photo panel (her real photo only).
- "O que você pode esperar" — 4 promises, all grounded in her posts.
- NO invented biography: no years of experience, no client counts, no awards,
  no training claims — all [TO CONFIRM] if the founder wants them added.
- CTA: "Conhecer a Gal no Instagram" (@realcebygal).

## 6. precos-faq.html — Valores & Perguntas Frequentes
- **Valores:** honest statement — "Os valores variam por ocasião, produção
  e deslocamento. Peça seu orçamento no WhatsApp em 1 minuto." NO price
  table with invented numbers. (Only the Tiyan offer R$810/72h for the site
  + bot is a real number — and it belongs to the outreach, not her price list.)
- **FAQ (only questions her listing/posts answer, or clearly-marked):**
  - Como agendo? → Direct no Instagram ou WhatsApp (71) 99909-1519.
  - Onde é o atendimento? → Central 214, Salvador/BA. [TO CONFIRM: domicílio]
  - Preciso de prova antes? → [TO CONFIRM — não publicado]
  - Quanto tempo dura a produção? → [TO CONFIRM — não publicado]
  - Quais são os horários? → [TO CONFIRM — não publicado]
  - Atende pele madura / pele negra / cabelos cacheados? → Sim — verificado
    nas produções publicadas (posts 15/07, 18/06, 23/06/2026).
- FAQ schema (JSON-LD) with only the answered questions.

## 7. contato.html — Contato
- Big contact cards: WhatsApp (71) 99909-1519 (button → wa.me), Instagram
  @realcebygal (button → instagram.com/realcebygal), address Central 214,
  Salvador/BA 41280-126 with map embed (Google Maps, Salvador).
- Hours: [TO CONFIRM] — display "Horários sob consulta no WhatsApp" until
  verified; do NOT invent hours.
- Simple contact form (nome, ocasião, data, mensagem) that composes a
  WhatsApp message — no fake backend, no invented email (no public business
  email was found).
- Footer note: "Site demonstração criado pela Tiyan Digital — R$810, pronto
  em 72 horas." (Demo/offer context only; outreach carries only this demo link.)

## Global
- Nav: Início · Serviços · Galeria · Agendamento · Sobre · Valores & FAQ ·
  Contato. Sticky header + sticky WhatsApp button (mobile).
- SEO/GEO: title/meta in pt-BR with "maquiagem noiva Salvador", "penteado
  formanda Salvador"; LocalBusiness/HairSalon JSON-LD with VERIFIED facts
  only (name, address, phone, IG URL); no invented geo/rating fields.
- QA: desktop + phone, no overflow, no console errors, all links work,
  all copy pt-BR, no invented prices/testimonials/stats.
