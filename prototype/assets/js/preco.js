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

if (typeof module !== "undefined" && module.exports) {
  module.exports = { haversineKm, fareBreakdown, fareOf, consumoDe, PRECO_COMBUSTIVEL, FATOR_ROTA };
}
