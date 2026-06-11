# BlablaCar UnB

Plataforma de caronas solidárias entre estudantes da Universidade de Brasília (UnB), com foco em organização, segurança básica e uso simples no dia a dia.

## Problema

Muitos estudantes enfrentam um transporte público cansativo, enquanto vários carros circulam com assentos vazios. Ao mesmo tempo, há pouca interação social no deslocamento universitário.

## Proposta de solução

O BlablaCar UnB propõe uma plataforma web para organizar caronas solidárias entre estudantes da UnB. A proposta é facilitar a conexão entre quem oferece e quem procura carona, com autenticação institucional, comunicação simples e foco em confiança entre participantes.

## Escopo do MVP

O MVP é uma aplicação web responsiva, com prioridade para uso no celular, voltada apenas para estudantes autenticados por e-mail institucional.

Funcionalidades centrais:

- Oferecer carona.
- Buscar carona.
- Pedir vaga.
- Conversar em chat temporário.
- Visualizar rateio sugerido.
- Avaliar após a viagem.

Importante: o BlablaCar UnB não é Uber, 99 nem serviço comercial de transporte. O objetivo é o compartilhamento de custos, sem lucro para motoristas ou para a plataforma.

## Tecnologias e documentação

- Documentação em Markdown.
- [MkDocs](https://www.mkdocs.org/) com tema Material.
- Publicação automatizada no GitHub Pages.

## Documentação publicada

- https://si-2026-1.github.io/blablaCar-UnB/

## Estrutura resumida do repositório

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docs/
│   ├── index.md
│   ├── projeto/
│   ├── backlog/
│   └── design/
├── site/
│   └── assets/
├── mkdocs.yml
├── README.md
└── CONTRIBUTING.md
```

Observação: a pasta `site/` é gerada localmente pelo `mkdocs build` e contém os arquivos estáticos publicados, incluindo `assets/`.

## Como executar a documentação localmente

1. Instale as dependências:

```bash
pip install mkdocs mkdocs-material
```

2. Rode localmente:

```bash
mkdocs serve
```

3. Acesse no navegador:

```text
http://127.0.0.1:8000
```

## Status atual

Projeto em fase de documentação e planejamento inicial do MVP. O foco é acadêmico e simula o planejamento do desenvolvimento do produto, sem implementar pagamento na plataforma.
