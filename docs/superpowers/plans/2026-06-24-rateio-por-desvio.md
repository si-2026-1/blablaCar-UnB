# Rateio por desvio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trocar o `rateio` fixo de cada carona por um valor calculado automaticamente (fatia do trecho comum + custo do desvio), com decomposição explicada na tela de detalhe.

**Architecture:** Um módulo puro `preco.js` (Haversine + fórmula) isolado do DOM, consumido por `map.js` e `app.js` através de uma única função `fareOf(carona)`. Os dados (`data.js`) só ganham campos de entrada (`consumo`, `desvioKm`). O núcleo de cálculo é testado com `node --test`; a integração com as telas é verificada no navegador.

**Tech Stack:** HTML/CSS/JS puro (sem build), Leaflet (mapa), `node:test` (testes do núcleo puro, zero dependências).

---

## Pré-requisitos de Git

Estamos na branch `main` e `prototype/` ainda está **untracked**. Antes de começar:

```bash
git checkout -b feat/rateio-desvio
```

Todos os `git commit` abaixo assumem essa branch. **Todas as mensagens de commit terminam com o trailer:**

```
Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```

## Estrutura de arquivos

| Arquivo | Papel | Ação |
|---------|-------|------|
| `prototype/assets/js/preco.js` | núcleo de cálculo + adaptador `fareOf` | criar |
| `prototype/assets/js/preco.test.js` | testes do núcleo puro (`node --test`) | criar |
| `prototype/assets/js/data.js` | campos de entrada (`consumo`, `desvioKm`) | modificar |
| `prototype/assets/js/map.js` | pin usa `fareOf().total` | modificar |
| `prototype/assets/js/app.js` | cards, decomposição no detalhe, publicar | modificar |
| `prototype/assets/css/app.css` | bloco `.fare` da decomposição | modificar |
| `prototype/index.html` | incluir `preco.js` | modificar |

---

## Task 1: Núcleo de cálculo puro + testes

**Files:**
- Create: `prototype/assets/js/preco.js`
- Test: `prototype/assets/js/preco.test.js`

- [ ] **Step 1: Escrever os testes que falham**

Create `prototype/assets/js/preco.test.js`:

```js
const { test } = require("node:test");
const assert = require("node:assert");

const { haversineKm, fareBreakdown } = require("./preco.js");

test("haversineKm: 1 grau de latitude ≈ 111 km", () => {
  const d = haversineKm({ lat: 0, lng: 0 }, { lat: 1, lng: 0 });
  assert.ok(Math.abs(d - 111.19) < 0.5, `esperado ~111.19, veio ${d}`);
});

test("haversineKm: mesmo ponto = 0", () => {
  const p = { lat: -15.7634, lng: -47.8722 };
  const d = haversineKm(p, p);
  assert.ok(d < 1e-9, `esperado 0, veio ${d}`);
});

test("fareBreakdown: comum ÷ pessoas + desvio", () => {
  const f = fareBreakdown({ kmComum: 24.7, consumo: 13, pessoas: 4, desvioKm: 2.5, preco: 6.09 });
  assert.ok(Math.abs(f.comumPorPessoa - 2.89) < 0.01, `comumPorPessoa ${f.comumPorPessoa}`);
  assert.ok(Math.abs(f.desvio - 1.17) < 0.01, `desvio ${f.desvio}`);
  assert.ok(Math.abs(f.total - 4.06) < 0.01, `total ${f.total}`);
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `node --test prototype/assets/js/preco.test.js`
Expected: FAIL — `Cannot find module './preco.js'` (o arquivo ainda não existe).

- [ ] **Step 3: Criar `preco.js` com o núcleo puro**

Create `prototype/assets/js/preco.js`:

```js
/* ==========================================================================
   Preço — rateio sugerido por desvio
   rateio = (trecho comum ÷ pessoas do carro) + custo do desvio
   Núcleo puro (sem DOM). Constantes ajustáveis no topo.
   ========================================================================== */

const PRECO_COMBUSTIVEL = 6.09; // R$/L (gasolina, DF ~2026)
const FATOR_ROTA = 1.35;        // linha reta → distância de rua (correção)

// Distância em km entre dois pontos {lat,lng} (Haversine)
function haversineKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Núcleo puro: dados os números crus, devolve a decomposição do rateio
function fareBreakdown({ kmComum, consumo, pessoas, desvioKm, preco = PRECO_COMBUSTIVEL }) {
  const custoPorKm = preco / consumo;
  const comum = kmComum * custoPorKm;
  const comumPorPessoa = comum / pessoas;
  const desvio = desvioKm * custoPorKm;
  const total = comumPorPessoa + desvio;
  return { total, comum, comumPorPessoa, desvio, desvioKm, kmComum, pessoas, custoPorKm };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { haversineKm, fareBreakdown, PRECO_COMBUSTIVEL, FATOR_ROTA };
}
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `node --test prototype/assets/js/preco.test.js`
Expected: PASS — 3 testes (`# pass 3`).

- [ ] **Step 5: Commit**

```bash
git add prototype/assets/js/preco.js prototype/assets/js/preco.test.js
git commit -m "feat(preco): nucleo puro de calculo de rateio (haversine + fareBreakdown)"
```

---

## Task 2: Adaptador `fareOf` + dados de entrada

**Files:**
- Modify: `prototype/assets/js/preco.js`
- Modify: `prototype/assets/js/data.js`
- Test: `prototype/assets/js/preco.test.js`

- [ ] **Step 1: Escrever o teste de `fareOf` que falha**

Em `prototype/assets/js/preco.test.js`, **adicione no topo** (logo após os `require` de `node:test`/`assert`, antes do `require("./preco.js")`) os stubs globais que `fareOf` espera (no navegador vêm de `data.js`):

```js
global.MOTORISTAS = { m1: { veiculo: { consumo: 13 } } };
global.EU = { veiculo: { consumo: 11.5 } };
```

Troque a linha de import para incluir `fareOf`:

```js
const { haversineKm, fareBreakdown, fareOf } = require("./preco.js");
```

E **adicione ao final** do arquivo:

```js
test("fareOf: usa coordenadas, consumo do motorista e vagas", () => {
  const carona = {
    motoristaId: "m1",
    de: { lat: -15.8345, lng: -48.0270 }, // Águas Claras
    para: { lat: -15.7634, lng: -47.8722 }, // UnB
    vagasTotal: 3,
    desvioKm: 2.5,
  };
  const f = fareOf(carona);
  assert.strictEqual(f.pessoas, 4, `pessoas ${f.pessoas}`);
  assert.ok(f.kmComum > 0, `kmComum ${f.kmComum}`);
  assert.ok(f.total > 0, `total ${f.total}`);
});

test("fareOf: sem motoristaId usa o veiculo do EU", () => {
  const carona = {
    de: { lat: -15.8200, lng: -47.9760 }, // Guará
    para: { lat: -15.7634, lng: -47.8722 },
    vagasTotal: 2,
    desvioKm: 1.0,
  };
  const f = fareOf(carona);
  assert.strictEqual(f.pessoas, 3, `pessoas ${f.pessoas}`);
  assert.ok(f.custoPorKm > 0, `custoPorKm ${f.custoPorKm}`);
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `node --test prototype/assets/js/preco.test.js`
Expected: FAIL — `fareOf is not a function` nos dois testes novos (os 3 antigos continuam passando).

- [ ] **Step 3: Adicionar `consumoDe` e `fareOf` ao `preco.js`**

Em `prototype/assets/js/preco.js`, **antes** do bloco `if (typeof module ...)`, adicione:

```js
// Consumo (km/L) do carro do motorista da carona.
// MINHAS_CARONAS são minhas (sou o motorista) e não têm motoristaId → uso EU.
function consumoDe(carona) {
  const m = carona.motoristaId ? MOTORISTAS[carona.motoristaId] : EU;
  return m.veiculo.consumo;
}

// Adaptador: resolve os números da carona e chama fareBreakdown
function fareOf(carona) {
  const kmComum = haversineKm(carona.de, carona.para) * FATOR_ROTA;
  return fareBreakdown({
    kmComum,
    consumo: consumoDe(carona),
    pessoas: carona.vagasTotal + 1,
    desvioKm: carona.desvioKm,
  });
}
```

E **troque** a linha de export para:

```js
if (typeof module !== "undefined" && module.exports) {
  module.exports = { haversineKm, fareBreakdown, fareOf, consumoDe, PRECO_COMBUSTIVEL, FATOR_ROTA };
}
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `node --test prototype/assets/js/preco.test.js`
Expected: PASS — 5 testes (`# pass 5`).

- [ ] **Step 5: Adicionar `consumo` aos veículos em `data.js`**

Em `prototype/assets/js/data.js`, adicione `consumo` (km/L) a cada veículo:

- `EU.veiculo`: `{ modelo: "VW Gol", cor: "Branco", placa: "JKP1D45", consumo: 11.5 }`
- `m1` Onix: adicionar `consumo: 13.5`
- `m2` HB20: adicionar `consumo: 13.0`
- `m3` Civic: adicionar `consumo: 11.0`
- `m4` Renegade: adicionar `consumo: 9.0`
- `m5` Kwid: adicionar `consumo: 15.0`

Exemplo (m1):

```js
veiculo: { modelo: "Chevrolet Onix", cor: "Prata", placa: "JKL2A•4", consumo: 13.5 },
```

- [ ] **Step 6: Adicionar `desvioKm` às caronas em `data.js`**

Em cada item de `CARONAS`, adicione `desvioKm` (mantenha `rateio` por enquanto):

- `c1` → `desvioKm: 1.2`
- `c2` → `desvioKm: 2.5`
- `c3` → `desvioKm: 0.8`
- `c4` → `desvioKm: 3.0`
- `c5` → `desvioKm: 1.5`
- `c6` → `desvioKm: 1.2`

Em `MINHAS_CARONAS`:

- `p1` → `desvioKm: 2.0`
- `p2` → `desvioKm: 1.0` **e** adicionar `vagasTotal: 2` (hoje p2 não tem `vagasTotal`).

Exemplo (c1):

```js
{
  id: "c1", motoristaId: "m1", de: LUGARES.asaNorte, para: UNB,
  data: "Hoje, qui 26/06", saida: "07:10", chegada: "07:30",
  vagas: 3, vagasTotal: 4, rateio: 6, bagagem: true, desvioKm: 1.2,
},
```

Exemplo (p2):

```js
{
  id: "p2", de: LUGARES.guara, para: UNB,
  data: "Amanhã, sex 27/06", saida: "07:00", chegada: "07:20",
  vagas: 2, vagasTotal: 2, rateio: 7, desvioKm: 1.0,
  solicitantes: [ /* ...inalterado... */ ],
},
```

- [ ] **Step 7: Commit**

```bash
git add prototype/assets/js/preco.js prototype/assets/js/preco.test.js prototype/assets/js/data.js
git commit -m "feat(preco): adaptador fareOf + campos consumo/desvioKm nos dados"
```

---

## Task 3: Incluir `preco.js` no `index.html`

**Files:**
- Modify: `prototype/index.html`

- [ ] **Step 1: Adicionar a tag `<script>` antes de `map.js`**

Em `prototype/index.html`, troque:

```html
  <script src="assets/js/data.js"></script>
  <script src="assets/js/map.js"></script>
```

por:

```html
  <script src="assets/js/data.js"></script>
  <script src="assets/js/preco.js"></script>
  <script src="assets/js/map.js"></script>
```

- [ ] **Step 2: Verificar no navegador (console)**

Rodar: `python3 -m http.server 5173 --directory prototype` e abrir http://localhost:5173.
No console do navegador, executar: `fareOf(CARONAS[0])`
Expected: um objeto com `total`, `comum`, `comumPorPessoa`, `desvio`, `kmComum`, `pessoas`, `custoPorKm` — todos números > 0, `pessoas === 5` (c1 tem `vagasTotal: 4`).

- [ ] **Step 3: Commit**

```bash
git add prototype/index.html
git commit -m "feat(preco): carregar preco.js antes de map.js/app.js"
```

---

## Task 4: Usar `fareOf().total` no mapa e nos cards simples

**Files:**
- Modify: `prototype/assets/js/app.js`
- Modify: `prototype/assets/js/map.js`

- [ ] **Step 1: Travar `money()` em 2 casas decimais**

Os totais calculados são decimais arbitrários; `money()` hoje só define `minimumFractionDigits`, o que deixaria `toLocaleString` exibir até 3 casas (ex.: `R$ 4,064`). Em `prototype/assets/js/app.js`, troque:

```js
function money(v) {
  return "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}
```

por:

```js
function money(v) {
  return "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
```

- [ ] **Step 2: Pin do mapa usa o total arredondado**

Em `prototype/assets/js/map.js`, dentro de `home()`, troque:

```js
const m = L.marker([c.de.lat, c.de.lng], { icon: pin("R$" + c.rateio) }).addTo(map);
```

por:

```js
const m = L.marker([c.de.lat, c.de.lng], { icon: pin("R$" + Math.round(fareOf(c).total)) }).addTo(map);
```

- [ ] **Step 3: `rideCard` usa o total calculado**

Em `prototype/assets/js/app.js`, na função `rideCard(c)`, troque:

```js
<div class="ride__price"><b class="tnum">${money(c.rateio)}</b><span>rateio sugerido</span></div>
```

por:

```js
<div class="ride__price"><b class="tnum">${money(fareOf(c).total)}</b><span>rateio sugerido</span></div>
```

- [ ] **Step 4: Chip de valor em "viagens" usa o total calculado**

Em `prototype/assets/js/app.js`, na tela `Screens.viagens`, troque:

```js
<div class="ride__meta" style="margin-top:12px"><span class="chip">${icon("calendar")}${c.data}</span><span class="chip chip--green">${icon("money")}${money(c.rateio)}</span></div>
```

por:

```js
<div class="ride__meta" style="margin-top:12px"><span class="chip">${icon("calendar")}${c.data}</span><span class="chip chip--green">${icon("money")}${money(fareOf(c).total)}</span></div>
```

- [ ] **Step 5: Verificar no navegador**

Recarregar http://localhost:5173 e conferir:
1. Home: cada card mostra um R$ calculado com **2 casas**, **variando com a distância** (Gama/Ceilândia > Asa Norte).
2. Pins do mapa mostram o mesmo valor arredondado (R$ inteiro).
3. Sem `R$ NaN` / `R$ undefined` / valores com 3 casas em nenhum card.

- [ ] **Step 6: Commit**

```bash
git add prototype/assets/js/map.js prototype/assets/js/app.js
git commit -m "feat(rateio): mapa e cards usam o total calculado por fareOf"
```

---

## Task 5: Decomposição na tela de detalhe + CSS

**Files:**
- Modify: `prototype/assets/js/app.js`
- Modify: `prototype/assets/css/app.css`

- [ ] **Step 1: Calcular o fare no início da tela de detalhe**

Em `prototype/assets/js/app.js`, em `Screens.carona = ({ id }) => {`, logo após `const m = motoristaDe(c);` adicione:

```js
  const f = fareOf(c);
```

- [ ] **Step 2: Trocar o card "Rateio sugerido" pela versão com decomposição**

Ainda em `Screens.carona`, troque o bloco atual:

```js
        <div class="card" style="padding:16px;margin-top:14px;display:flex;align-items:center;gap:14px">
          <span class="list-row__ic">${icon("money")}</span>
          <div style="flex:1">
            <div style="font-weight:700">Rateio sugerido</div>
            <div class="muted" style="font-size:13px">Combustível dividido — sem pagamento no app</div>
          </div>
          <b class="tnum" style="font-family:var(--font-display);font-size:20px">${money(c.rateio)}</b>
        </div>
```

por:

```js
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
```

- [ ] **Step 3: Adicionar o CSS `.fare`**

Em `prototype/assets/css/app.css`, ao final do bloco de cartões (após a linha `.card--tap:active { ... }`), adicione:

```css

/* --- Rateio (decomposição) ---------------------------------------------- */
.fare { padding: var(--s-4); }
.fare__top { display: flex; align-items: center; gap: 14px; }
.fare__rows {
  margin-top: var(--s-3); padding-top: var(--s-3);
  border-top: 1px dashed var(--line);
  display: grid; gap: 8px;
}
.fare__row {
  display: flex; align-items: baseline; justify-content: space-between; gap: 12px;
  font-size: 14px;
}
.fare__row .muted { font-size: 12px; }
.fare__foot { margin-top: var(--s-3); font-size: 12px; line-height: 1.4; }
```

- [ ] **Step 4: Verificar no navegador**

Recarregar, abrir uma carona (ex.: Águas Claras / Rafael):
1. O card mostra **Trecho em comum** (`N km ÷ M pessoas`) e **Seu desvio** (`Bairro · +X km`).
2. `comumPorPessoa + desvio` confere com o **total** em destaque.
3. Rodapé mostra o consumo do carro e o preço do combustível.
4. Layout alinhado (valores à direita, divisória tracejada).

- [ ] **Step 5: Commit**

```bash
git add prototype/assets/js/app.js prototype/assets/css/app.css
git commit -m "feat(rateio): decomposicao do rateio na tela de detalhe"
```

---

## Task 6: Sugestão automática no "Publicar carona"

**Files:**
- Modify: `prototype/assets/js/app.js`

- [ ] **Step 1: Calcular a sugestão para a origem padrão**

Em `prototype/assets/js/app.js`, troque a assinatura de `Screens.publicar` para calcular a sugestão antes do `return`:

De:

```js
Screens.publicar = () => ({
  tab: "publicar",
  appbar: "Oferecer carona",
  html: `
```

Para:

```js
Screens.publicar = () => {
  const sugestao = fareOf({ de: LUGARES.asaNorte, para: UNB, vagasTotal: 3, desvioKm: 1.2 }).total;
  const sugestaoStr = sugestao.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return {
  tab: "publicar",
  appbar: "Oferecer carona",
  html: `
```

- [ ] **Step 2: Fechar a função com chave**

No final de `Screens.publicar` (após o objeto retornado, que hoje termina em `});`), troque o fechamento `});` por `};\n};` — ou seja, feche o objeto com `}` e a função-seta com `};`.

O bloco final fica assim:

```js
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
```

- [ ] **Step 3: Pré-preencher o campo de rateio com a sugestão**

Ainda em `Screens.publicar`, troque o campo de rateio:

```js
      <div class="field">
        <label>Rateio sugerido</label>
        <div class="field__ctrl">${icon("money")}<input value="6,00" inputmode="decimal"/><span class="field__suffix">por pessoa</span></div>
      </div>
```

por:

```js
      <div class="field">
        <label>Rateio sugerido</label>
        <div class="field__ctrl">${icon("money")}<input value="${sugestaoStr}" inputmode="decimal"/><span class="field__suffix">por pessoa</span></div>
      </div>
```

- [ ] **Step 4: Adicionar a nota "calculado automaticamente"**

Logo após o `</div>` que fecha o `field-row` de Vagas + Rateio (antes do campo de "Observações"), adicione:

```js
    <p class="muted" style="font-size:12px;margin-top:-8px">Calculado automaticamente a partir do trajeto e do consumo do seu carro. Você pode ajustar.</p>
```

- [ ] **Step 5: Verificar no navegador**

Recarregar, abrir "Oferecer carona" (FAB central):
1. O campo "Rateio sugerido" vem **pré-preenchido** com o valor calculado (não mais `6,00`).
2. A nota explicativa aparece abaixo, com o ícone.
3. Publicar ainda funciona (vai para a tela de sucesso).

- [ ] **Step 6: Commit**

```bash
git add prototype/assets/js/app.js
git commit -m "feat(rateio): sugestao automatica no formulario de publicar"
```

---

## Task 7: Limpeza — remover `rateio` literal + verificação final

**Files:**
- Modify: `prototype/assets/js/data.js`

- [ ] **Step 1: Remover o campo `rateio` de todas as caronas**

Em `prototype/assets/js/data.js`, remova `rateio: N,` de cada item de `CARONAS` (`c1`–`c6`) e de `MINHAS_CARONAS` (`p1`, `p2`). Os campos `consumo`/`desvioKm` permanecem.

Exemplo (c1 depois):

```js
{
  id: "c1", motoristaId: "m1", de: LUGARES.asaNorte, para: UNB,
  data: "Hoje, qui 26/06", saida: "07:10", chegada: "07:30",
  vagas: 3, vagasTotal: 4, bagagem: true, desvioKm: 1.2,
},
```

- [ ] **Step 2: Confirmar que `rateio` não é mais referenciado**

Run: `grep -rn "rateio" prototype/assets/js/`
Expected: nenhuma ocorrência de `c.rateio` / `.rateio` (apenas, no máximo, textos de UI como "Rateio sugerido" e o label em `preco.js`/comentários — nada lendo `carona.rateio`).

- [ ] **Step 3: Rodar a suíte de testes do núcleo**

Run: `node --test prototype/assets/js/preco.test.js`
Expected: PASS — `# pass 5`.

- [ ] **Step 4: Verificação final no navegador**

Recarregar http://localhost:5173 e percorrer:
1. Home — cards e pins com R$ calculado, sem `NaN`/`undefined`.
2. Detalhe — decomposição soma certo.
3. Viagens (pedir vaga em uma carona primeiro) — chip de valor calculado.
4. Publicar — campo pré-preenchido.

- [ ] **Step 5: Commit**

```bash
git add prototype/assets/js/data.js
git commit -m "refactor(dados): remover rateio fixo (agora derivado por fareOf)"
```

---

## Notas de implementação

- **Magnitude dos números:** os rateios novos tendem a ficar menores que os antigos (6–12), pois o trecho comum é dividido por todos do carro e conta só a ida. Para "engrossar", ajuste `PRECO_COMBUSTIVEL`/`FATOR_ROTA` no topo de `preco.js` (um lugar só).
- **`fareOf` é a única fonte do número.** Nenhuma tela lê `carona.rateio`. Trocar a fórmula não quebra as telas.
- **Fora de escopo (YAGNI):** recálculo ao vivo no formulário, desvio por passageiro, ida e volta, pedágio/estacionamento, persistência.
