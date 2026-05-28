# BlablaCar UnB

Plataforma de caronas solidarias entre estudantes da Universidade de Brasilia (UnB), com foco em organizacao, seguranca basica e uso simples no dia a dia.

## Problema

Muitos estudantes enfrentam transporte publico cansativo, enquanto varios carros circulam com assentos vazios. Ao mesmo tempo, ha pouca interacao social no deslocamento universitario.

## Escopo do MVP

O MVP e uma aplicacao web responsiva, com prioridade para uso no celular, voltada apenas para estudantes autenticados por e-mail institucional.

Funcionalidades centrais:

- Oferecer carona.
- Buscar carona.
- Pedir vaga.
- Conversar em chat temporario.
- Visualizar rateio sugerido.
- Avaliar apos a viagem.

Importante: o BlablaCar UnB nao e Uber, 99 ou servico comercial. O objetivo e compartilhamento de custos, sem lucro para motoristas ou para a plataforma.

## Tecnologias e documentacao

- Documentacao em Markdown.
- [MkDocs](https://www.mkdocs.org/) com tema Material.
- Publicacao automatica no GitHub Pages.

## Documentacao publicada

- https://si-2026-1.github.io/blablaCar-UnB/

## Estrutura resumida da documentacao

```text
docs/
  index.md
mkdocs.yml
.github/workflows/deploy.yml
```

## Como executar a documentacao localmente

1. Instale as dependencias:

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

Projeto em fase de documentacao e planejamento inicial do MVP.
