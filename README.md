# UnBlaBlaCar

Projeto acadêmico de Sistemas de Informação para planejar e prototipar uma
plataforma de caronas solidárias entre estudantes da UnB.

O produto é apresentado visualmente como UnBlaBlaCar; o repositório mantém o
nome blablaCar-UnB.

## Problema

Há muitos assentos vazios em trajetos recorrentes para a universidade enquanto
alunos enfrentam deslocamentos longos e caros.

## Escopo do MVP

Aplicação web mobile-first com:

- login institucional;
- busca/publicação de caronas;
- solicitação de vaga e resposta;
- rateio sugerido de custos;
- comunicação entre participantes;
- reputação básica.

Importante: não é Uber/99 nem transporte comercial. Não há pagamento dentro do
app e o objetivo é compartilhar custos, sem lucro.

## Protótipo

Protótipo em HTML/CSS/JS na pasta `prototype/`.

### Como executar o protótipo

```bash
cd prototype
python -m http.server 5500
```

Abra em `http://localhost:5500`.

## Documentação MkDocs

### Como executar localmente

```bash
pip install mkdocs mkdocs-material
mkdocs serve
```

Abra em `http://127.0.0.1:8000`.

### Documentação publicada

https://si-2026-1.github.io/blablaCar-UnB/

## Status atual

Fase de finalização da documentação e protótipo funcional de fluxos principais
do MVP.