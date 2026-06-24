# Rateio por desvio — protótipo UnBlaBlaCar

**Data:** 2026-06-24
**Escopo:** protótipo em `prototype/` (HTML/CSS/JS puro, sem build)
**Status:** design aprovado para implementação

## Objetivo

Trocar o `rateio` fixo de cada carona por um **valor calculado automaticamente**,
seguindo a ideia do time: o passageiro paga (a) sua fatia do trecho que todo mundo
faz junto + (b) o custo do desvio que o motorista faz para buscá-lo fora da rota
padrão. O cálculo deve ser **real em todas as caronas** (não só mockado) e a tela de
detalhe deve **explicar** a conta com uma decomposição clara.

Não há pagamento no app — é só rateio de combustível sugerido (projeto acadêmico).

## Modelo de cálculo

```
rateio_sugerido = (custo do trecho comum ÷ pessoas no carro) + custo do desvio
```

Componentes:

| Termo            | De onde vem                                                                 |
|------------------|----------------------------------------------------------------------------|
| `kmComum`        | distância `de → para` por Haversine (coordenadas reais) × `FATOR_ROTA`      |
| `custoPorKm`     | `PRECO_COMBUSTIVEL (R$/L) ÷ consumo do carro (km/L)`                        |
| `custoComum`     | `kmComum × custoPorKm`                                                      |
| `pessoas`        | `vagasTotal + 1` (motorista + todas as vagas → "carro cheio")              |
| `comumPorPessoa` | `custoComum ÷ pessoas`                                                      |
| `custoDesvio`    | `desvioKm × custoPorKm` (pago por quem é buscado, não dividido)            |
| `rateio`         | `comumPorPessoa + custoDesvio`                                             |

Decisões assumidas (alinhadas com o pedido):
- Trecho comum dividido entre **todos do carro** (motorista + passageiros).
- Desvio é **um valor por carona** (`desvioKm`) — o detour para aquele ponto —
  e é cobrado de quem embarca ali, não rateado.
- Rateio sugerido assume o **carro cheio** (divide por `vagasTotal + 1`). A tela
  deixa isso explícito ("estimado com o carro cheio").
- Trip de **ida só** (o passageiro anda uma perna; combustível dessa perna é o
  que entra no rateio).

### Constantes (ajustáveis num único lugar)

Em `preco.js`, no topo:

```js
const PRECO_COMBUSTIVEL = 6.09;  // R$/L (gasolina, DF ~2026)
const FATOR_ROTA = 1.35;         // linha reta → distância de rua (correção)
```

Esses dois números controlam a "cara" de todos os rateios — se ficarem
baixos/altos demais, é só mexer aqui.

### Consumo por veículo (km/L) — dado novo, realista

| Motorista | Veículo            | consumo |
|-----------|--------------------|---------|
| EU (Lucas)| VW Gol             | 11.5    |
| m1 Mariana| Chevrolet Onix     | 13.5    |
| m2 Rafael | Hyundai HB20       | 13.0    |
| m3 Letícia| Honda Civic        | 11.0    |
| m4 Pedro  | Jeep Renegade      | 9.0     |
| m5 Camila | Renault Kwid       | 15.0    |

### Desvio por carona (km) — dado fictício novo

`c1` 1.2 · `c2` 2.5 · `c3` 0.8 · `c4` 3.0 · `c5` 1.5 · `c6` 1.2 ·
`p1` (minhas) 2.0 · `p2` (minhas) 1.0

> Valores ilustrativos: pequenos, para o desvio ser uma parcela menor que o
> trecho comum na maioria dos casos.

## Mudanças por arquivo

### `prototype/assets/js/preco.js` (novo)

Módulo único de cálculo, carregado **antes** de `map.js` e `app.js`.

- `PRECO_COMBUSTIVEL`, `FATOR_ROTA` (constantes).
- `haversineKm(a, b)` — distância entre dois `{lat,lng}` em km.
- `consumoDe(carona)` — lê o consumo do veículo do motorista da carona; para as
  `MINHAS_CARONAS` (sou eu o motorista), usa `EU.veiculo.consumo`.
- `fareOf(carona)` — devolve o objeto da decomposição:
  ```js
  { total, comum, comumPorPessoa, desvio, desvioKm, kmComum, pessoas, custoPorKm }
  ```
  Funciona tanto para `CARONAS` quanto para `MINHAS_CARONAS` (ambas têm
  `de`, `para`, `vagasTotal`, `desvioKm`).

`fareOf` é a única fonte do número — ninguém mais lê `c.rateio` cru.

### `prototype/assets/js/data.js`

- Adicionar `consumo` a `EU.veiculo` e a cada `MOTORISTAS[*].veiculo`.
- Adicionar `desvioKm` a cada item de `CARONAS` e de `MINHAS_CARONAS`.
- **Remover** o campo `rateio` literal (passa a ser derivado por `fareOf`).
  - `p2` em `MINHAS_CARONAS` não tem `vagasTotal` hoje → adicionar (`vagasTotal: 2`).

### `prototype/assets/js/map.js`

- `home()`: o pin usa `fareOf(c).total` arredondado → `pin("R$" + Math.round(fareOf(c).total))`.

### `prototype/assets/js/app.js`

- `rideCard()`: `money(c.rateio)` → `money(fareOf(c).total)` (card da home/perfil; só o total, sem decomposição — espaço curto).
- Tela **`carona` (detalhe)**: o card "Rateio sugerido" ganha a **decomposição**:
  ```
  Rateio sugerido                                    R$ 4,06
  Combustível dividido — sem pagamento no app
  ─────────────────────────────────────────────────────────
  Trecho em comum     25 km ÷ 4 pessoas              R$ 2,89
  Seu desvio          Águas Claras · +2,5 km         R$ 1,17
  ─────────────────────────────────────────────────────────
  Consumo do HB20 (13 km/L) × R$ 6,09/L · carro cheio
  ```
  Distâncias e pessoas vêm de `fareOf(c)`; usa `money()` e `.tnum`.
- Tela **`viagens`**: o chip de valor usa `fareOf(c).total`.
- Tela **`publicar`**: o campo "Rateio sugerido" mostra o valor calculado para a
  origem padrão (Asa Norte) com nota "calculado automaticamente a partir do
  trajeto e do consumo do carro". Continua editável (motorista pode sobrescrever),
  mas pré-preenchido com a sugestão. Cálculo **estático** (não recalcula ao vivo —
  isso seria a evolução "formulário vivo", fora deste escopo).

### `prototype/assets/css/app.css`

- Pequeno bloco `.fare` para as linhas da decomposição (label à esquerda, valor
  `.tnum` à direita, divisória `1px dashed var(--line)`, rodapé `.muted`).
  Reaproveita tokens existentes (`--line`, `--surface-2`, `--s-*`).

### `prototype/index.html`

- Adicionar `<script src="assets/js/preco.js"></script>` entre `data.js` e `map.js`.

## Componentes e fronteiras

- **`preco.js`** é isolado: entra carona, sai a decomposição. Não conhece DOM nem
  telas. Testável de cabeça (chamar `fareOf(CARONAS[0])` no console).
- **`app.js`/`map.js`** só consomem `fareOf().total` (ou o objeto completo, na tela
  de detalhe). Trocar a fórmula não quebra as telas.
- **`data.js`** só ganha campos de entrada (`consumo`, `desvioKm`); nenhuma lógica.

## Fora de escopo (YAGNI)

- Recalcular o rateio ao vivo no formulário de publicar.
- Desvio por passageiro individual / múltiplos pontos de embarque por carona.
- Ida e volta, pedágio, estacionamento, depreciação.
- Persistência ou edição real dos parâmetros pelo usuário.

## Como validar

`python3 -m http.server 5173 --directory <repo>/prototype` e:
1. Home: cada card mostra um R$ calculado (varia com a distância — Gama > Asa Norte).
2. Pins do mapa mostram o mesmo valor arredondado.
3. Detalhe de uma carona: a decomposição soma corretamente (comum ÷ pessoas + desvio = total).
4. Publicar: campo de rateio vem pré-preenchido com a sugestão calculada.
