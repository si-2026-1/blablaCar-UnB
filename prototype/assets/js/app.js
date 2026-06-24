/* ==========================================================================
   UnBlaBlaCar — app (router + telas + interações)
   Vanilla JS, sem build. Cada tela é uma função que devolve { html, mount }.
   ========================================================================== */

/* ---------- Ícones (SVG inline, estilo Lucide — sem dependência) --------- */
const ICONS = {
  back: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  nav: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
  star: '<polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.1a4 4 0 0 1 0 7.75"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  car: '<path d="M19 17h2l-1.5-5.4A2 2 0 0 0 17.6 10H6.4a2 2 0 0 0-1.9 1.6L3 17h2"/><path d="M5 17h14"/><circle cx="7.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>',
  shieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>',
  money: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  whatsapp: '<path d="M17.5 14.4c-.3-.15-1.74-.86-2-.96-.27-.1-.47-.15-.66.15-.2.3-.76.95-.93 1.14-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.18-.24-.58-.48-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.98-1.4.25-.68.25-1.27.18-1.39-.07-.12-.27-.2-.57-.34Z"/><path d="M12 2a10 10 0 0 0-8.52 15.27L2 22l4.86-1.45A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-2.85.84.85-2.78-.2-.31A8.2 8.2 0 1 1 12 20.2Z"/>',
  spark: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
};

function icon(name, opts = {}) {
  const sw = opts.fill ? "0" : opts.sw || 2;
  return `<svg viewBox="0 0 24 24" fill="${opts.fill ? "currentColor" : "none"}" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

/* ---------- Componentes utilitários ------------------------------------- */
function initials(nome) {
  const p = nome.trim().split(/\s+/);
  return ((p[0]?.[0] || "") + (p[1]?.[0] || "")).toUpperCase();
}
function avatar(person, size = "md") {
  return `<span class="avatar avatar--${size}" style="background:${person.cor}">${initials(person.nome)}</span>`;
}
function ratingInline(r, count) {
  return `<span class="rating">${icon("star", { fill: true })}<span class="n">${r.toFixed(1)}</span>${
    count != null ? `<span class="c">(${count})</span>` : ""
  }</span>`;
}
function starsRow(n) {
  let s = "";
  for (let i = 1; i <= 5; i++) s += `<svg class="${i <= n ? "on" : ""}" viewBox="0 0 24 24">${ICONS.star}</svg>`;
  return `<span class="stars" aria-label="${n} de 5">${s}</span>`;
}
function seats(free, total) {
  let s = "";
  for (let i = 0; i < total; i++) s += `<i class="${i < free ? "" : "off"}"></i>`;
  return `<span class="seats" title="${free} de ${total} vagas">${s}</span>`;
}
function money(v) {
  return "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function whatsLink(num, msg) {
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

/* Card de carona (usado na home) */
function rideCard(c) {
  const m = motoristaDe(c);
  return `
  <article class="card card--tap ride" data-go="carona" data-id="${c.id}">
    <div class="ride__head">
      ${avatar(m, "sm")}
      <div class="ride__driver">
        <div class="ride__driver-name">${m.nome.split(" ")[0]} ${ratingInline(m.rating)}</div>
        <div class="ride__driver-sub">${m.veiculo.modelo} · ${m.veiculo.cor}</div>
      </div>
      <div class="ride__price"><b class="tnum">${money(fareOf(c).total)}</b><span>rateio sugerido</span></div>
    </div>
    <div class="route">
      <div class="route__rail">
        <span class="route__node route__node--from"></span>
        <span class="route__line"></span>
        <span class="route__node route__node--to"></span>
      </div>
      <div class="route__stops">
        <div class="route__stop"><span class="p">${c.de.nome}</span><span class="h tnum">${c.saida}</span></div>
        <div class="route__stop"><span class="p">${c.para.nome}</span><span class="h tnum">${c.chegada}</span></div>
      </div>
    </div>
    <div class="ride__meta">
      <span class="chip">${icon("calendar")}${c.data.replace(", ", " · ")}</span>
      <span class="chip chip--green">${icon("users")}${c.vagas} ${c.vagas === 1 ? "vaga" : "vagas"}</span>
      ${c.bagagem ? `<span class="chip">${icon("bag")}Bagageiro</span>` : ""}
    </div>
  </article>`;
}

/* ---------- Telas -------------------------------------------------------- */
const Screens = {};

/* Login ------------------------------------------------------------------- */
Screens.login = () => ({
  tone: "dark",
  html: `
  <div class="login">
    <div class="login__top">
      <div class="login__logo">
        <span class="login__mark">${icon("route")}</span>
        UnBlaBlaCar
      </div>
      <div class="login__headline">
        <h1>Caronas entre quem já faz o seu caminho.</h1>
        <p>A rede de caronas solidárias da comunidade UnB.</p>
      </div>
    </div>
    <form class="login__card" id="loginForm">
      <span class="login__badge">${icon("shieldCheck")} Acesso restrito à comunidade UnB</span>
      <div class="field">
        <label for="email">E-mail institucional</label>
        <div class="field__ctrl">
          ${icon("mail")}
          <input id="email" type="email" inputmode="email" value="lucas.andrade@aluno.unb.br" autocomplete="email" />
        </div>
      </div>
      <button class="btn btn--primary" type="submit">${icon("nav", { fill: true })} Entrar</button>
      <p class="login__legal">Validamos seu vínculo pelo e-mail <b>@aluno.unb.br</b>.<br/>Nada de senha exposta nem dados pessoais públicos.</p>
    </form>
  </div>`,
  mount(view) {
    view.querySelector("#loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      Router.go("home", {}, { reset: true });
    });
  },
});

/* Home -------------------------------------------------------------------- */
Screens.home = () => ({
  tab: "home",
  tone: "dark",
  html: `
  <div class="screen">
    <div class="hero">
      <div id="homeMap" class="map map--hero"></div>
      <div class="hero__overlay">
        <div class="hero__top">
          <span class="hero__brand">UnBla<small>BlaCar</small></span>
          <span class="hero__loc">${icon("pin")} Brasília · DF</span>
        </div>
      </div>
    </div>
    <div class="sheet">
      <div class="sheet__grip"></div>
      <div class="greet">
        <div>
          <div class="eyebrow">Bom dia, ${EU.primeiro} 👋</div>
          <h2 class="h2" style="margin-top:4px">Para onde você vai?</h2>
        </div>
        <button class="avatar avatar--md" data-go="perfil" style="background:${EU.cor};border:0;cursor:pointer">${initials(EU.nome)}</button>
      </div>

      <div class="segmented" role="tablist" style="margin:14px 0 4px" id="dayseg">
        <button class="on">Hoje</button>
        <button>Amanhã</button>
        <button>Esta semana</button>
      </div>

      <div class="section-title">
        <h3 class="h3">Caronas disponíveis</h3>
        <span class="count">${CARONAS.length} no seu trajeto</span>
      </div>

      <div class="stagger">
        ${CARONAS.map(rideCard).join("")}
      </div>

      <div class="note note--info" style="margin-top:16px">
        ${icon("shield")}
        <span>Só estudantes com e-mail <b>@aluno.unb.br</b> aparecem aqui. O contato é combinado pelo WhatsApp após o aceite.</span>
      </div>
    </div>
  </div>`,
  mount(view) {
    Router.mountMap(() => MapKit.home(view.querySelector("#homeMap"), CARONAS, (id) => Router.go("carona", { id })));
    const seg = view.querySelector("#dayseg");
    seg.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      seg.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
    });
  },
});

/* Detalhe da carona ------------------------------------------------------- */
Screens.carona = ({ id }) => {
  const c = caronaPorId(id);
  const m = motoristaDe(c);
  const f = fareOf(c);
  const pedido = MEUS_PEDIDOS[id];
  return {
    appbar: "Detalhes da carona",
    html: `
    <div class="screen__body screen__body--flush">
      <div style="padding:16px 16px 0">
        <div id="detMap" class="map map--detail"></div>
      </div>
      <div class="screen__body">
        <div class="route" style="margin-bottom:18px">
          <div class="route__rail">
            <span class="route__node route__node--from"></span>
            <span class="route__line"></span>
            <span class="route__node route__node--to"></span>
          </div>
          <div class="route__stops">
            <div class="route__stop"><span class="t">Saída · ${c.saida}</span><span class="p">${c.de.nome}</span></div>
            <div class="route__stop"><span class="t">Chegada · ${c.chegada}</span><span class="p">${c.para.nome}</span></div>
          </div>
        </div>

        <div class="ride__meta" style="border:0;padding:0;margin-bottom:18px">
          <span class="chip">${icon("calendar")}${c.data}</span>
          <span class="chip">${icon("clock")}${c.saida}–${c.chegada}</span>
          <span class="chip chip--green">${icon("users")}${c.vagas}/${c.vagasTotal} vagas</span>
          ${c.bagagem ? `<span class="chip">${icon("bag")}Bagageiro</span>` : ""}
        </div>

        <button class="card card--tap" data-go="motorista" data-id="${m.id}" style="padding:14px;display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:1px solid var(--line)">
          ${avatar(m, "md")}
          <div style="flex:1;min-width:0">
            <div style="font-weight:700">${m.nome}</div>
            <div class="muted" style="font-size:13px">${m.curso}</div>
            <div style="margin-top:4px">${ratingInline(m.rating, m.viagens + " viagens")}</div>
          </div>
          <span style="color:var(--ink-4)">${icon("chevron")}</span>
        </button>

        <div class="card fare" style="margin-top:14px">
          <div class="fare__top">
            <span class="list-row__ic">${icon("money")}</span>
            <div style="flex:1">
              <div style="font-weight:700">Rateio sugerido</div>
              <div class="muted" style="font-size:13px">Combustível dividido — sem pagamento no app</div>
            </div>
            <b class="tnum" style="font-family:var(--font-display);font-size:20px">${money(f.total)}</b>
          </div>
          <div class="fare__rows">
            <div class="fare__row">
              <span>Trecho em comum <span class="muted tnum">${Math.round(f.kmComum)} km ÷ ${f.pessoas} pessoas</span></span>
              <span class="tnum">${money(f.comumPorPessoa)}</span>
            </div>
            <div class="fare__row">
              <span>Seu desvio <span class="muted tnum">${c.de.nome} · +${f.desvioKm.toLocaleString("pt-BR")} km</span></span>
              <span class="tnum">${money(f.desvio)}</span>
            </div>
          </div>
          <div class="fare__foot muted">Consumo do ${m.veiculo.modelo} (${consumoDe(c).toLocaleString("pt-BR")} km/L) × ${money(PRECO_COMBUSTIVEL)}/L · estimado com o carro cheio</div>
        </div>

        <div class="card" style="padding:16px;margin-top:14px;display:flex;align-items:center;gap:14px">
          <span class="list-row__ic">${icon("car")}</span>
          <div style="flex:1">
            <div style="font-weight:700">${m.veiculo.modelo}</div>
            <div class="muted" style="font-size:13px">${m.veiculo.cor} · placa ${m.veiculo.placa}</div>
          </div>
        </div>

        <div id="action" style="margin-top:22px"></div>
      </div>
    </div>`,
    mount(view) {
      Router.mountMap(() => MapKit.route(view.querySelector("#detMap"), c.de, c.para));
      const action = view.querySelector("#action");
      const render = () => {
        const st = MEUS_PEDIDOS[id];
        if (!st) {
          action.innerHTML = `<button class="btn btn--primary" id="ask">${icon("check")} Pedir vaga</button>`;
          action.querySelector("#ask").addEventListener("click", () => {
            MEUS_PEDIDOS[id] = "pendente";
            render();
          });
        } else if (st === "pendente") {
          action.innerHTML = `
            <div class="note pop"><span>${icon("clock")}</span><span><b>Solicitação enviada!</b> ${m.nome.split(" ")[0]} vai avaliar seu pedido. Combine o ponto de encontro pelo WhatsApp assim que for aceito.</span></div>
            <a class="btn btn--whats" style="margin-top:12px" href="${whatsLink(m.whatsapp, "Oi! Pedi vaga na sua carona " + c.de.nome + " → " + c.para.nome + " (" + c.saida + ") no UnBlaBlaCar.")}" target="_blank" rel="noopener">${icon("whatsapp", { fill: true })} Falar no WhatsApp</a>
            <button class="btn btn--danger" style="margin-top:10px" id="cancel">Cancelar solicitação</button>`;
          action.querySelector("#cancel").addEventListener("click", () => { delete MEUS_PEDIDOS[id]; render(); });
        }
      };
      render();
    },
  };
};

/* Perfil do motorista ----------------------------------------------------- */
Screens.motorista = ({ id }) => {
  const m = MOTORISTAS[id];
  const caronas = CARONAS.filter((c) => c.motoristaId === id);
  return {
    appbar: "Perfil",
    html: `
    <div class="screen">
      <div class="profile-head">
        ${avatar(m, "lg")}
        <h2>${m.nome}</h2>
        <div class="course">${m.curso}</div>
        <div class="stat-row">
          <div class="stat"><b class="tnum">${m.rating.toFixed(1)}</b><span>avaliação</span></div>
          <div class="stat"><b class="tnum">${m.viagens}</b><span>viagens</span></div>
          <div class="stat"><b>${m.desde}</b><span>desde</span></div>
        </div>
      </div>
      <div class="screen__body">
        <a class="btn btn--whats" href="${whatsLink(m.whatsapp, "Oi " + m.nome.split(" ")[0] + "! Te achei no UnBlaBlaCar.")}" target="_blank" rel="noopener">${icon("whatsapp", { fill: true })} Conversar no WhatsApp</a>

        <div class="card" style="padding:16px;margin-top:16px;display:flex;align-items:center;gap:14px">
          <span class="list-row__ic">${icon("car")}</span>
          <div style="flex:1">
            <div style="font-weight:700">${m.veiculo.modelo}</div>
            <div class="muted" style="font-size:13px">${m.veiculo.cor} · placa ${m.veiculo.placa}</div>
          </div>
        </div>

        ${caronas.length ? `
        <div class="section-title"><h3 class="h3">Próximas caronas</h3></div>
        ${caronas.map(rideCard).join("")}` : ""}

        <div class="section-title">
          <h3 class="h3">Avaliações</h3>
          <span class="count">${ratingInline(m.rating, m.avaliacoes.length)}</span>
        </div>
        ${m.avaliacoes.map((a) => `
          <div class="card review">
            <div class="review__head">
              <span class="avatar avatar--sm" style="background:var(--ink-3)">${initials(a.autor)}</span>
              <div><div style="font-weight:700;font-size:14px">${a.autor}</div>${starsRow(a.nota)}</div>
              <span class="when">${a.quando}</span>
            </div>
            <p class="review__text">${a.texto}</p>
          </div>`).join("")}
      </div>
    </div>`,
  };
};

/* Publicar carona --------------------------------------------------------- */
Screens.publicar = () => {
  const sugestao = fareOf({ de: LUGARES.asaNorte, para: UNB, vagasTotal: 3, desvioKm: 1.2 }).total;
  const sugestaoStr = sugestao.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return {
  tab: "publicar",
  appbar: "Oferecer carona",
  html: `
  <div class="screen__body screen__pad-bottom stagger">
    <div class="note note--info" style="margin-bottom:18px">${icon("spark")}<span>Compartilhe um trajeto que você <b>já faria</b>. Você escolhe quem embarca.</span></div>

    <div class="field">
      <label>Saindo de</label>
      <div class="field__ctrl">${icon("pin")}<input value="Asa Norte" placeholder="Bairro / ponto de partida"/></div>
    </div>
    <div class="field">
      <label>Indo para</label>
      <div class="field__ctrl">${icon("nav")}<input value="UnB — Campus Darcy Ribeiro" placeholder="Destino"/></div>
    </div>

    <div class="field-row">
      <div class="field"><label>Data</label><div class="field__ctrl">${icon("calendar")}<input value="26/06" placeholder="dd/mm"/></div></div>
      <div class="field"><label>Horário</label><div class="field__ctrl">${icon("clock")}<input value="07:10" placeholder="hh:mm"/></div></div>
    </div>

    <div class="field-row">
      <div class="field">
        <label>Vagas</label>
        <div class="stepper" id="seatStep">
          <button type="button" data-d="-1">–</button>
          <span class="v tnum" id="seatVal">3</span>
          <button type="button" data-d="1">+</button>
        </div>
      </div>
      <div class="field">
        <label>Rateio sugerido</label>
        <div class="field__ctrl">${icon("money")}<input value="${sugestaoStr}" inputmode="decimal"/><span class="field__suffix">por pessoa</span></div>
      </div>
    </div>
    <p class="muted" style="font-size:12px;margin-top:-8px">Calculado automaticamente a partir do trajeto e do consumo do seu carro. Você pode ajustar.</p>

    <div class="field">
      <label>Observações <span class="muted">(opcional)</span></label>
      <div class="field__ctrl field__ctrl--area">${icon("edit")}<textarea placeholder="Ex.: passo pela L2 Norte, levo até a rodoviária do Plano...">Saio pontualmente, encontro na entrada do bloco.</textarea></div>
    </div>

    <button class="btn btn--primary" id="publish" style="margin-top:8px">${icon("route")} Publicar carona</button>
  </div>`,
  mount(view) {
    const val = view.querySelector("#seatVal");
    view.querySelector("#seatStep").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      let n = +val.textContent + (+b.dataset.d);
      n = Math.max(1, Math.min(4, n));
      val.textContent = n;
    });
    view.querySelector("#publish").addEventListener("click", () =>
      Router.go("sucesso", {
        titulo: "Carona publicada!",
        msg: "Sua carona já aparece para a comunidade. Avisamos quando alguém pedir uma vaga.",
        cta: "Ver minhas caronas", to: "minhas",
      })
    );
  },
  };
};

/* Minhas caronas (lado motorista) ---------------------------------------- */
Screens.minhas = () => ({
  tab: "minhas",
  appbar: "Minhas caronas",
  html: `
  <div class="screen__body screen__pad-bottom">
    ${MINHAS_CARONAS.map((c) => {
      const pend = c.solicitantes.filter((s) => s.status === "pendente").length;
      return `
      <div class="card" style="padding:16px;margin-bottom:16px">
        <div class="route" style="margin-bottom:14px">
          <div class="route__rail"><span class="route__node route__node--from"></span><span class="route__line"></span><span class="route__node route__node--to"></span></div>
          <div class="route__stops">
            <div class="route__stop"><span class="t">${c.saida}</span><span class="p">${c.de.nome}</span></div>
            <div class="route__stop"><span class="t">${c.chegada}</span><span class="p">${c.para.nome}</span></div>
          </div>
        </div>
        <div class="ride__meta" style="border-top:1px dashed var(--line);padding-top:12px;margin-bottom:4px">
          <span class="chip">${icon("calendar")}${c.data}</span>
          <span class="chip chip--green">${icon("users")}${c.vagas} ${c.vagas === 1 ? "vaga" : "vagas"}</span>
          ${pend ? `<span class="chip" style="background:#fff4e0;border-color:#ffe2b3;color:#9a6500">${icon("bell")}${pend} ${pend === 1 ? "pedido" : "pedidos"}</span>` : ""}
        </div>

        <div class="section-title" style="margin:14px 0 10px"><h3 class="h3" style="font-size:15px">Quem pediu vaga</h3></div>
        <div data-reqlist="${c.id}">
          ${c.solicitantes.map((s) => requestRow(c.id, s)).join("")}
        </div>
      </div>`;
    }).join("")}
  </div>`,
  mount(view) {
    view.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-act]");
      if (!btn) return;
      const { act, cid, sid } = btn.dataset;
      const carona = minhaCaronaPorId(cid);
      const s = carona.solicitantes.find((x) => x.id === sid);
      if (act === "aceito") { s.status = "aceito"; if (carona.vagas > 0) carona.vagas--; }
      if (act === "recusado") s.status = "recusado";
      const wrap = view.querySelector(`[data-reqlist="${cid}"]`);
      const node = wrap.querySelector(`[data-req="${sid}"]`);
      node.outerHTML = requestRow(cid, s);
    });
  },
});

function requestRow(cid, s) {
  const tag = { pendente: "tag--pending", aceito: "tag--accepted", recusado: "tag--declined" }[s.status];
  const label = { pendente: "Pendente", aceito: "Aceito", recusado: "Recusado" }[s.status];
  let foot = "";
  if (s.status === "pendente") {
    foot = `<div class="btn-row">
      <button class="btn btn--ghost btn--sm" style="width:100%" data-act="recusado" data-cid="${cid}" data-sid="${s.id}">${icon("x")} Recusar</button>
      <button class="btn btn--primary btn--sm" style="width:100%" data-act="aceito" data-cid="${cid}" data-sid="${s.id}">${icon("check")} Aceitar</button>
    </div>`;
  } else if (s.status === "aceito") {
    foot = `<a class="btn btn--whats btn--sm" style="width:100%" href="${whatsLink(s.whatsapp, "Oi " + s.nome.split(" ")[0] + "! Confirmando sua vaga na carona pelo UnBlaBlaCar.")}" target="_blank" rel="noopener">${icon("whatsapp", { fill: true })} Combinar pelo WhatsApp</a>`;
  } else {
    foot = `<div class="muted" style="font-size:13px;text-align:center">Solicitação recusada</div>`;
  }
  return `
  <div class="card request" data-req="${s.id}" style="margin-bottom:10px;box-shadow:none;background:var(--surface-2)">
    <div class="request__head">
      ${avatar(s, "sm")}
      <div style="min-width:0">
        <div style="font-weight:700">${s.nome}</div>
        <div class="muted" style="font-size:12px">${s.curso}</div>
      </div>
      <span class="request__tag ${tag}">${label}</span>
    </div>
    <div style="margin-top:-4px">${ratingInline(s.rating)}</div>
    ${foot}
  </div>`;
}

/* Viagens (lado passageiro — pedidos que EU fiz) -------------------------- */
Screens.viagens = () => {
  const ids = Object.keys(MEUS_PEDIDOS);
  return {
    tab: "viagens",
    appbar: "Minhas viagens",
    html: `
    <div class="screen__body screen__pad-bottom">
      ${ids.length ? `
        <div class="note" style="margin-bottom:16px">${icon("clock")}<span>Pedidos enviados. Combine o ponto de encontro pelo <b>WhatsApp</b> assim que o motorista aceitar.</span></div>
        <div class="stagger">
        ${ids.map((id) => {
          const c = caronaPorId(id);
          const m = motoristaDe(c);
          return `
          <div class="card" style="padding:16px;margin-bottom:14px">
            <div class="request__head" style="margin-bottom:12px">
              ${avatar(m, "sm")}
              <div style="min-width:0">
                <div style="font-weight:700">${m.nome}</div>
                <div class="muted" style="font-size:12px">${m.veiculo.modelo} · ${m.veiculo.cor}</div>
              </div>
              <span class="request__tag tag--pending">Pendente</span>
            </div>
            <div class="route">
              <div class="route__rail"><span class="route__node route__node--from"></span><span class="route__line"></span><span class="route__node route__node--to"></span></div>
              <div class="route__stops">
                <div class="route__stop"><span class="t">${c.saida}</span><span class="p">${c.de.nome}</span></div>
                <div class="route__stop"><span class="t">${c.chegada}</span><span class="p">${c.para.nome}</span></div>
              </div>
            </div>
            <div class="ride__meta" style="margin-top:12px"><span class="chip">${icon("calendar")}${c.data}</span><span class="chip chip--green">${icon("money")}${money(fareOf(c).total)}</span></div>
            <a class="btn btn--whats btn--sm" style="width:100%;margin-top:14px" href="${whatsLink(m.whatsapp, "Oi! Pedi vaga na sua carona " + c.de.nome + " → " + c.para.nome + " (" + c.saida + ") no UnBlaBlaCar.")}" target="_blank" rel="noopener">${icon("whatsapp", { fill: true })} Falar com ${m.nome.split(" ")[0]}</a>
          </div>`;
        }).join("")}
        </div>
      ` : `
        <div class="empty">
          <span class="empty__ic">${icon("route")}</span>
          <h3 class="h3">Nenhuma viagem ainda</h3>
          <p class="muted" style="max-width:26ch;line-height:1.5">Quando você pedir uma vaga em uma carona, ela aparece aqui com o status.</p>
          <button class="btn btn--primary" data-go="home" style="margin-top:16px;width:auto">${icon("search")} Buscar caronas</button>
        </div>
      `}
    </div>`,
  };
};

/* Perfil (próprio) -------------------------------------------------------- */
Screens.perfil = () => ({
  tab: "perfil",
  tone: "dark",
  html: `
  <div class="screen">
    <div class="profile-head">
      ${avatar(EU, "lg")}
      <h2>${EU.nome}</h2>
      <div class="course">${EU.curso}</div>
      <div class="stat-row">
        <div class="stat"><b class="tnum">${EU.rating.toFixed(1)}</b><span>avaliação</span></div>
        <div class="stat"><b class="tnum">${EU.viagens}</b><span>viagens</span></div>
        <div class="stat"><b>${icon("leaf")}</b><span>−38 kg CO₂</span></div>
      </div>
    </div>
    <div class="screen__body screen__pad-bottom">
      <div class="section-title" style="margin-top:8px"><h3 class="h3" style="font-size:15px">Seu veículo</h3></div>
      <div class="card" style="padding:16px;display:flex;align-items:center;gap:14px">
        <span class="list-row__ic">${icon("car")}</span>
        <div style="flex:1"><div style="font-weight:700">${EU.veiculo.modelo}</div><div class="muted" style="font-size:13px">${EU.veiculo.cor} · placa ${EU.veiculo.placa}</div></div>
        <span style="color:var(--ink-4)">${icon("edit")}</span>
      </div>

      <div class="section-title"><h3 class="h3" style="font-size:15px">Conta</h3></div>
      <button class="list-row"><span class="list-row__ic">${icon("user")}</span><span class="list-row__tx"><b>Editar perfil</b><span>Nome, curso, foto e contato</span></span><span class="list-row__chev">${icon("chevron")}</span></button>
      <button class="list-row"><span class="list-row__ic">${icon("shield")}</span><span class="list-row__tx"><b>Privacidade e segurança</b><span>Quem vê seus dados</span></span><span class="list-row__chev">${icon("chevron")}</span></button>
      <button class="list-row"><span class="list-row__ic">${icon("star")}</span><span class="list-row__tx"><b>Minhas avaliações</b><span>O que dizem sobre você</span></span><span class="list-row__chev">${icon("chevron")}</span></button>

      <button class="list-row" id="logout" style="margin-top:18px;color:var(--red-500)"><span class="list-row__ic" style="background:#fdeceb;color:var(--red-500)">${icon("logout")}</span><span class="list-row__tx"><b>Sair</b></span></button>
    </div>
  </div>`,
  mount(view) {
    view.querySelector("#logout").addEventListener("click", () => Router.go("login", {}, { reset: true }));
  },
});

/* Sucesso genérico -------------------------------------------------------- */
Screens.sucesso = ({ titulo, msg, cta, to }) => ({
  appbar: " ",
  html: `
  <div class="success pop">
    <div class="success__check">${icon("check")}</div>
    <h2 class="h2">${titulo}</h2>
    <p class="muted" style="max-width:26ch;line-height:1.5">${msg}</p>
    <div style="width:100%;margin-top:18px">
      <button class="btn btn--primary" data-go="${to}">${cta}</button>
    </div>
  </div>`,
});

/* ---------- Router ------------------------------------------------------- */
const TABS = [
  { id: "home", label: "Início", icon: "home" },
  { id: "viagens", label: "Viagens", icon: "bag" },
  { id: "publicar", label: "Oferecer", icon: "plus", accent: true },
  { id: "minhas", label: "Caronas", icon: "route" },
  { id: "perfil", label: "Perfil", icon: "user" },
];

const Router = (() => {
  const view = document.getElementById("view");
  const tabbar = document.getElementById("tabbar");
  const device = document.querySelector(".device__screen");
  let stack = [];
  let currentMap = null;

  function mountMap(factory) {
    // adia até o layout estar pronto (Leaflet precisa do container visível)
    requestAnimationFrame(() => {
      currentMap = factory();
      setTimeout(() => currentMap && currentMap.invalidateSize(), 60);
    });
  }

  function clearMap() {
    if (currentMap) { try { currentMap.remove(); } catch (e) {} currentMap = null; }
  }

  function renderTabs(active) {
    const cells = TABS.map((t) => {
      if (t.accent) {
        return `<button class="tab tab--center" data-tab="${t.id}" aria-label="${t.label}"></button>`;
      }
      return `<button class="tab ${t.id === active ? "tab--active" : ""}" data-tab="${t.id}">
        ${icon(t.icon)}<span>${t.label}</span><span class="tab__dot"></span></button>`;
    }).join("");
    // FAB fica FORA dos <button> (filho direto da .tabbar) p/ não recortar
    tabbar.innerHTML =
      cells +
      `<button class="fab" data-tab="publicar" aria-label="Oferecer carona">${icon("plus")}</button>`;
  }

  function render() {
    const top = stack[stack.length - 1];
    const screen = Screens[top.name](top.params || {});
    clearMap();

    const isTab = !!screen.tab;
    document.body.dataset.chrome = isTab ? "tabs" : "stack";
    document.body.dataset.chromeTone = screen.tone || "light";

    let html = "";
    if (screen.appbar !== undefined) {
      html += `<div class="appbar">
        ${stack.length > 1 ? `<button class="iconbtn" id="back" aria-label="Voltar">${icon("back")}</button>` : ""}
        <span class="appbar__title">${screen.appbar}</span>
      </div>`;
    }
    html += screen.html;
    view.innerHTML = html;
    view.scrollTop = 0;

    if (isTab) renderTabs(screen.tab);

    const back = view.querySelector("#back");
    if (back) back.addEventListener("click", () => Router.back());

    if (screen.mount) screen.mount(view);
  }

  function go(name, params = {}, opts = {}) {
    if (opts.reset) stack = [{ name, params }];
    else stack.push({ name, params });
    render();
  }
  function back() { if (stack.length > 1) { stack.pop(); render(); } }

  // Delegação global: qualquer elemento com data-go navega
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-go]");
    if (!el || !view.contains(el)) return;
    const name = el.dataset.go;
    const id = el.dataset.id;
    if (TABS.some((t) => t.id === name)) go(name, {}, { reset: true });
    else go(name, id ? { id } : {});
  });

  // Tabs
  tabbar.addEventListener("click", (e) => {
    const b = e.target.closest("[data-tab]");
    if (b) go(b.dataset.tab, {}, { reset: true });
  });

  return { go, back, mountMap };
})();

/* ---------- Boot --------------------------------------------------------- */
Router.go("login", {}, { reset: true });
