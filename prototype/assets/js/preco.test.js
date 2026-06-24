const { test } = require("node:test");
const assert = require("node:assert");

global.MOTORISTAS = { m1: { veiculo: { consumo: 13 } } };
global.EU = { veiculo: { consumo: 11.5 } };

const { haversineKm, fareBreakdown, fareOf } = require("./preco.js");

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
