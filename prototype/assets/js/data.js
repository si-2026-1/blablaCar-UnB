/* ==========================================================================
   Dados de exemplo — protótipo UnBlaBlaCar
   Coordenadas aproximadas reais (Brasília/DF). Conteúdo fictício.
   ========================================================================== */

const UNB = { nome: "UnB — Campus Darcy Ribeiro", lat: -15.7634, lng: -47.8722 };

// Pontos de origem comuns no DF
const LUGARES = {
  asaNorte:    { nome: "Asa Norte",        lat: -15.7595, lng: -47.8800 },
  asaSul:      { nome: "Asa Sul",          lat: -15.8120, lng: -47.9010 },
  aguasClaras: { nome: "Águas Claras",     lat: -15.8345, lng: -48.0270 },
  taguatinga:  { nome: "Taguatinga",       lat: -15.8330, lng: -48.0530 },
  ceilandia:   { nome: "Ceilândia",        lat: -15.8190, lng: -48.1110 },
  gama:        { nome: "Gama",             lat: -16.0190, lng: -48.0640 },
  sobradinho:  { nome: "Sobradinho",       lat: -15.6530, lng: -47.7900 },
  guara:       { nome: "Guará",            lat: -15.8200, lng: -47.9760 },
  planaltina:  { nome: "Planaltina",       lat: -15.6190, lng: -47.6490 },
};

// Usuário logado (é estudante de SI — pode ser passageiro e motorista)
const EU = {
  id: "u0",
  nome: "Lucas Andrade",
  primeiro: "Lucas",
  curso: "Sistemas de Informação · 5º sem",
  cor: "#0e5aa7",
  rating: 4.9,
  viagens: 42,
  whatsapp: "5561999990000",
  veiculo: { modelo: "VW Gol", cor: "Branco", placa: "JKP1D45", consumo: 11.5 },
};

const MOTORISTAS = {
  m1: {
    id: "m1", nome: "Mariana Alves", curso: "Engenharia Florestal", cor: "#178049",
    rating: 4.9, viagens: 87, whatsapp: "5561999990001", desde: "2024",
    veiculo: { modelo: "Chevrolet Onix", cor: "Prata", placa: "JKL2A•4", consumo: 13.5 },
    avaliacoes: [
      { autor: "Beatriz L.", nota: 5, quando: "há 3 dias", texto: "Super pontual e dirige com cuidado. Trajeto tranquilo até o Darcy." },
      { autor: "Gabriel C.", nota: 5, quando: "há 1 sem", texto: "Carro confortável, conversa boa. Recomendo demais!" },
      { autor: "Ana P.", nota: 4, quando: "há 2 sem", texto: "Ótima carona, só atrasou uns minutinhos no ponto." },
    ],
  },
  m2: {
    id: "m2", nome: "Rafael Souza", curso: "Ciência da Computação", cor: "#0e5aa7",
    rating: 4.8, viagens: 53, whatsapp: "5561999990002", desde: "2024",
    veiculo: { modelo: "Hyundai HB20", cor: "Branco", placa: "QRS7H•1", consumo: 13.0 },
    avaliacoes: [
      { autor: "Marcos V.", nota: 5, quando: "há 4 dias", texto: "Saiu no horário combinado e levou todo mundo em segurança." },
      { autor: "Júlia M.", nota: 5, quando: "há 10 dias", texto: "Muito gente boa, playlist ótima 😄" },
    ],
  },
  m3: {
    id: "m3", nome: "Letícia Gomes", curso: "Direito", cor: "#b0337a",
    rating: 5.0, viagens: 124, whatsapp: "5561999990003", desde: "2023",
    veiculo: { modelo: "Honda Civic", cor: "Preto", placa: "BCD4F•9", consumo: 11.0 },
    avaliacoes: [
      { autor: "Pedro H.", nota: 5, quando: "há 2 dias", texto: "Caroneira nota 10, sempre confiável. Já é a 5ª vez." },
      { autor: "Sofia R.", nota: 5, quando: "há 1 sem", texto: "Pontualíssima e muito educada." },
      { autor: "Tiago A.", nota: 5, quando: "há 3 sem", texto: "Melhor carona do Gama pra UnB, com folga." },
    ],
  },
  m4: {
    id: "m4", nome: "Pedro Henrique", curso: "Medicina", cor: "#c2410c",
    rating: 4.7, viagens: 31, whatsapp: "5561999990004", desde: "2025",
    veiculo: { modelo: "Jeep Renegade", cor: "Cinza", placa: "MNO9K•2", consumo: 9.0 },
    avaliacoes: [
      { autor: "Larissa F.", nota: 5, quando: "há 5 dias", texto: "Carona segura e trajeto rápido. Voltarei a pedir." },
    ],
  },
  m5: {
    id: "m5", nome: "Camila Ribeiro", curso: "Arquitetura e Urbanismo", cor: "#7c3aed",
    rating: 4.9, viagens: 66, whatsapp: "5561999990005", desde: "2024",
    veiculo: { modelo: "Renault Kwid", cor: "Vermelho", placa: "DEF3G•7", consumo: 15.0 },
    avaliacoes: [
      { autor: "Rafael S.", nota: 5, quando: "há 6 dias", texto: "Muito organizada, avisa tudo com antecedência no zap." },
      { autor: "Carla M.", nota: 4, quando: "há 2 sem", texto: "Boa carona, carro pequeno mas dá conta numa boa." },
    ],
  },
};

// Caronas disponíveis (origem -> UnB pela manhã; e algumas de volta à tarde)
const CARONAS = [
  {
    id: "c1", motoristaId: "m1", de: LUGARES.asaNorte, para: UNB,
    data: "Hoje, qui 26/06", saida: "07:10", chegada: "07:30",
    vagas: 3, vagasTotal: 4, rateio: 6, desvioKm: 1.2, bagagem: true,
  },
  {
    id: "c2", motoristaId: "m2", de: LUGARES.aguasClaras, para: UNB,
    data: "Hoje, qui 26/06", saida: "06:40", chegada: "07:15",
    vagas: 2, vagasTotal: 3, rateio: 10, desvioKm: 2.5, bagagem: false,
  },
  {
    id: "c3", motoristaId: "m3", de: LUGARES.gama, para: UNB,
    data: "Hoje, qui 26/06", saida: "06:25", chegada: "07:20",
    vagas: 3, vagasTotal: 4, rateio: 12, desvioKm: 0.8, bagagem: true,
  },
  {
    id: "c4", motoristaId: "m4", de: LUGARES.ceilandia, para: UNB,
    data: "Hoje, qui 26/06", saida: "06:30", chegada: "07:25",
    vagas: 1, vagasTotal: 3, rateio: 11, desvioKm: 3.0, bagagem: false,
  },
  {
    id: "c5", motoristaId: "m5", de: LUGARES.sobradinho, para: UNB,
    data: "Hoje, qui 26/06", saida: "07:20", chegada: "07:50",
    vagas: 2, vagasTotal: 3, rateio: 9, desvioKm: 1.5, bagagem: true,
  },
  {
    id: "c6", motoristaId: "m1", de: UNB, para: LUGARES.asaNorte,
    data: "Hoje, qui 26/06", saida: "18:30", chegada: "18:50",
    vagas: 3, vagasTotal: 4, rateio: 6, desvioKm: 1.2, bagagem: true,
  },
];

// Caronas que EU publiquei (lado motorista) + quem pediu vaga
const MINHAS_CARONAS = [
  {
    id: "p1", de: UNB, para: LUGARES.taguatinga,
    data: "Hoje, qui 26/06", saida: "18:40", chegada: "19:10",
    vagas: 3, vagasTotal: 3, rateio: 8, desvioKm: 2.0,
    solicitantes: [
      { id: "s1", nome: "João Vítor", curso: "Engenharia Mecânica", cor: "#0e5aa7", rating: 4.8, whatsapp: "5561988880001", status: "pendente" },
      { id: "s2", nome: "Beatriz Lima", curso: "Psicologia", cor: "#b0337a", rating: 4.9, whatsapp: "5561988880002", status: "pendente" },
      { id: "s3", nome: "Gabriel Costa", curso: "Economia", cor: "#178049", rating: 4.6, whatsapp: "5561988880003", status: "aceito" },
    ],
  },
  {
    id: "p2", de: LUGARES.guara, para: UNB,
    data: "Amanhã, sex 27/06", saida: "07:00", chegada: "07:20",
    vagas: 2, vagasTotal: 2, rateio: 7, desvioKm: 1.0,
    solicitantes: [
      { id: "s4", nome: "Mariana Dias", curso: "Letras", cor: "#c2410c", rating: 5.0, whatsapp: "5561988880004", status: "pendente" },
    ],
  },
];

// Estado leve de solicitações feitas por mim (passageiro): caronaId -> status
const MEUS_PEDIDOS = {}; // ex.: { c1: "pendente" }

function motoristaDe(carona) { return MOTORISTAS[carona.motoristaId]; }
function caronaPorId(id) { return CARONAS.find((c) => c.id === id); }
function minhaCaronaPorId(id) { return MINHAS_CARONAS.find((c) => c.id === id); }
