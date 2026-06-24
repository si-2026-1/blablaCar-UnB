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
