/* Gal Amaral Beauty — shared JS.
   Business name is ONE swappable constant. All copy pt-BR.
   No invented facts: every unconfirmed item is rendered as a visible [placeholder]. */
const SITE = {
  businessName: "Gal Amaral Beauty",
  shortName: "Gal Amaral",
  tagline: "Realçar, não esconder.",
  whatsappDisplay: "(71) 99909-1519",
  whatsappNumber: "5571999091519",
  instagramHandle: "@realcebygal",
  instagramUrl: "https://instagram.com/realcebygal",
  address: "Edifício Central 214, Salvador/BA — CEP 41280-126"
};
const WA_BASE = "https://wa.me/" + SITE.whatsappNumber + "?text=";
function waLink(text){ return WA_BASE + encodeURIComponent(text); }

/* fill [data-site] slots from the single constant */
document.querySelectorAll("[data-site]").forEach(el => { el.textContent = SITE.businessName; });
document.querySelectorAll("[data-site-short]").forEach(el => { el.textContent = SITE.shortName; });
document.querySelectorAll("[data-wa]").forEach(el => { el.href = "https://wa.me/" + SITE.whatsappNumber; });
document.querySelectorAll("[data-ig]").forEach(el => { el.href = SITE.instagramUrl; });

/* mobile nav */
const burger = document.querySelector(".burger");
const nav = document.querySelector("nav.main");
if (burger && nav){
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}

/* duplicate marquee track for a seamless loop */
document.querySelectorAll(".marquee-track").forEach(t => { t.innerHTML += t.innerHTML; });

/* ---------- gallery filters ---------- */
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".gtile").forEach(tile => {
      tile.classList.toggle("hide", f !== "todas" && tile.dataset.cat !== f);
    });
  });
});

/* ---------- lightbox (galeria) ---------- */
const lb = document.getElementById("lightbox");
if (lb){
  const lbOcc = document.getElementById("lb-occ"),
        lbTitle = document.getElementById("lb-title"),
        lbText = document.getElementById("lb-text"),
        lbWa = document.getElementById("lb-wa");
  document.querySelectorAll(".gtile").forEach(tile => {
    tile.addEventListener("click", e => {
      e.preventDefault();
      lbOcc.textContent = tile.dataset.occ || "";
      lbTitle.textContent = tile.dataset.title || "";
      lbText.textContent = tile.dataset.text || "";
      lbWa.href = waLink("Olá, Gal! Vi a produção \"" + (tile.dataset.title || "") + "\" no site e quero uma igual. Pode me passar mais informações?");
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
  const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
  lb.querySelector(".close").addEventListener("click", close);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

/* ---------- FAQ accordion ---------- */
document.querySelectorAll(".faq-q").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const ans = item.querySelector(".faq-a");
    const open = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    ans.style.maxHeight = open ? ans.scrollHeight + "px" : "0px";
  });
});

/* ---------- WhatsApp booking-bot mock (agendamento.html) ---------- */
(function(){
  const chat = document.getElementById("bot-chat");
  if (!chat) return;
  const chipsBox = document.getElementById("bot-chips");
  const stepInd = document.getElementById("bot-step");
  const restartBtn = document.getElementById("bot-restart");
  const state = { occasion:null, date:null, service:null, place:null };
  const OCCASIONS = { noiva:"Noiva", madrinha:"Madrinha / Mãe", formanda:"Formanda", debutante:"Debutante", social:"Evento social" };
  const SERVICES = { completo:"Maquiagem + Penteado", maquiagem:"Só maquiagem", penteado:"Só penteado" };
  const PLACES = { estudio:"No estúdio (Central 214, Salvador)", domicilio:"A domicílio [a confirmar]" };
  let step = 0, busy = false;

  function now(){ const d = new Date(); return String(d.getHours()).padStart(2,"0") + ":" + String(d.getMinutes()).padStart(2,"0"); }
  function scrollChat(){ chat.scrollTop = chat.scrollHeight; }
  function addMsg(text, who, isSummary){
    const div = document.createElement("div");
    div.className = "msg " + who + (isSummary ? " summary" : "");
    div.innerHTML = text + '<span class="time">' + now() + (who === "user" ? " ✓✓" : "") + "</span>";
    chat.appendChild(div); scrollChat();
  }
  function typing(){
    const t = document.createElement("div");
    t.className = "typing"; t.innerHTML = "<i></i><i></i><i></i>";
    chat.appendChild(t); scrollChat(); return t;
  }
  function botSay(html, delay, isSummary){
    return new Promise(res => {
      const t = typing();
      setTimeout(() => { t.remove(); addMsg(html, "bot", isSummary); res(); }, delay || 900);
    });
  }
  function setChips(list, onPick){
    chipsBox.innerHTML = "";
    list.forEach(item => {
      const b = document.createElement("button");
      b.className = "chip"; b.type = "button"; b.textContent = item.label;
      b.addEventListener("click", () => {
        if (busy) return;
        chipsBox.querySelectorAll(".chip").forEach(c => c.disabled = true);
        addMsg(item.userText || item.label, "user");
        onPick(item.value);
      });
      chipsBox.appendChild(b);
    });
  }
  function setStep(n){
    step = n;
    if (stepInd) stepInd.textContent = "Etapa " + n + " de 4";
  }
  function fmtDate(iso){
    if (!iso) return "";
    const [y,m,d] = iso.split("-");
    return d + "/" + m + "/" + y;
  }
  async function askOccasion(){
    setStep(1);
    await botSay("Olá! Sou a assistente da " + SITE.businessName + " em Salvador. Que momento inesquecível você vai celebrar?");
    setChips(
      Object.entries(OCCASIONS).map(([v,l]) => ({label:l, value:v})),
      v => { state.occasion = v; askDate(); }
    );
  }
  async function askDate(){
    setStep(2);
    await botSay("Que alegria! Cada detalhe para " + OCCASIONS[state.occasion] + " é planejado com carinho. Qual é a data prevista para a sua celebração?");
    chipsBox.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;gap:8px;width:100%";
    const input = document.createElement("input");
    input.type = "date"; input.id = "bot-date"; input.required = true;
    input.style.cssText = "flex:1;border:1.5px solid var(--vinho);border-radius:999px;padding:11px 16px;font-size:15px;font-family:var(--sans);min-width:0";
    const today = new Date(); today.setDate(today.getDate() + 1);
    input.min = today.toISOString().split("T")[0];
    const go = document.createElement("button");
    go.className = "chip"; go.type = "button"; go.textContent = "Continuar";
    go.addEventListener("click", () => {
      if (!input.value){ input.focus(); return; }
      state.date = input.value;
      addMsg("Data prevista: " + fmtDate(input.value), "user");
      chipsBox.innerHTML = "";
      askService();
    });
    wrap.appendChild(input); wrap.appendChild(go);
    chipsBox.appendChild(wrap);
    input.focus();
  }
  async function askService(){
    setStep(3);
    await botSay("Data anotada: " + fmtDate(state.date) + ". Qual tipo de produção você deseja?");
    setChips(
      Object.entries(SERVICES).map(([v,l]) => ({label:l, value:v})),
      v => { state.service = v; askPlace(); }
    );
  }
  async function askPlace(){
    setStep(4);
    await botSay("Excelente escolha! Onde você prefere ser atendida?");
    setChips([
      {label:"No estúdio (Central 214)", value:"estudio"},
      {label:"A domicílio [a confirmar]", value:"domicilio"}
    ], v => { state.place = v; showSummary(); });
  }
  async function showSummary(){
    const placeText = state.place === "domicilio"
      ? "A domicílio (a confirmar disponibilidade)"
      : PLACES[state.place];
    await botSay(
      "Perfeito! Montei o seu pré-agendamento:<br><br>" +
      "<b>Ocasião:</b> " + OCCASIONS[state.occasion] + "<br>" +
      "<b>Data:</b> " + fmtDate(state.date) + "<br>" +
      "<b>Serviço:</b> " + SERVICES[state.service] + "<br>" +
      "<b>Local:</b> " + placeText + "<br><br>" +
      "Toque no botão abaixo para enviar todos os dados ao WhatsApp oficial da Gal!",
      1100, true
    );
    chipsBox.innerHTML = "";
    const a = document.createElement("a");
    a.className = "btn btn-gold"; a.style.width = "100%";
    const msg = "Olá, Gal! Quero agendar:\n• Ocasião: " + OCCASIONS[state.occasion] +
      "\n• Data: " + fmtDate(state.date) +
      "\n• Serviço: " + SERVICES[state.service] +
      "\n• Local: " + placeText +
      "\n\nPode confirmar minha data?";
    a.href = waLink(msg); a.target = "_blank"; a.rel = "noopener";
    a.textContent = "Confirmar no WhatsApp";
    chipsBox.appendChild(a);
    const note = document.createElement("p");
    note.style.cssText = "width:100%;text-align:center;font-size:12.5px;color:var(--muted);margin-top:4px";
    note.textContent = "Demonstração — a confirmação final é feita pela Gal no WhatsApp.";
    chipsBox.appendChild(note);
  }
  function reset(){
    chat.innerHTML = '<div class="day">Hoje · Concierge Digital</div>';
    chipsBox.innerHTML = "";
    Object.keys(state).forEach(k => state[k] = null);
    askOccasion();
  }
  if (restartBtn) restartBtn.addEventListener("click", reset);
  const urlOcc = new URLSearchParams(location.search).get("occasion");
  reset();
  if (urlOcc && OCCASIONS[urlOcc]){
    /* pre-select occasion from a card link on the home page */
    setTimeout(() => {
      const chip = [...chipsBox.querySelectorAll(".chip")].find(c => c.textContent === OCCASIONS[urlOcc]);
      if (chip) chip.click();
    }, 1400);
  }
})();

/* ---------- contact form → WhatsApp (contato.html) ---------- */
(function(){
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const ocasiao = form.ocasiao.value;
    const data = form.data.value;
    const local = form.local.value;
    const msgExtra = form.mensagem.value.trim();
    let d = "";
    if (data){ const [y,m,dd] = data.split("-"); d = dd + "/" + m + "/" + y; }
    const text = "Olá, Gal! Meu nome é " + nome + ".\n• Ocasião: " + ocasiao +
      (d ? "\n• Data desejada: " + d : "") +
      (local ? "\n• Local: " + local : "") +
      (msgExtra ? "\n• Mensagem: " + msgExtra : "");
    window.open(waLink(text), "_blank", "noopener");
  });
})();

/* ---------- quote simulator → WhatsApp (precos-faq.html) ---------- */
(function(){
  const form = document.getElementById("sim-form");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const ocasiao = form.ocasiao.value;
    const local = form.local.value;
    const pessoas = form.pessoas.value;
    const data = form.data.value;
    const obs = form.obs.value.trim();
    let d = "";
    if (data){ const [y,m,dd] = data.split("-"); d = dd + "/" + m + "/" + y; }
    const text = "Olá, Gal! Quero pedir um orçamento:\n• Ocasião: " + ocasiao +
      "\n• Local: " + local +
      (pessoas ? "\n• Pessoas adicionais: " + pessoas : "") +
      (d ? "\n• Data prevista: " + d : "") +
      (obs ? "\n• Observações: " + obs : "");
    window.open(waLink(text), "_blank", "noopener");
  });
})();
