# UnBlaBlaCar

Projeto acadêmico de Sistemas de Informação para planejar e prototipar uma
plataforma web mobile-first de caronas solidárias entre estudantes da UnB.

O produto é apresentado visualmente como UnBlaBlaCar; o repositório mantém o
nome blablaCar-UnB.

## Problema

Há muitos assentos vazios em trajetos recorrentes para a universidade enquanto
alunos enfrentam deslocamentos longos e caros.

## Proposta

Conectar estudantes para compartilhar viagens que já aconteceriam, com foco em
organização, confiança e privacidade.

## Escopo do MVP

Aplicação web mobile-first com:

- login institucional;
- busca/publicação de caronas;
- solicitação de vaga e resposta;
- rateio sugerido de custos;
- comunicação entre participantes;
- reputação básica.

Importante: não é Uber/99 nem transporte comercial. Não há pagamento dentro do
app e o objetivo é compartilhar custos, sem finalidade lucrativa.

## Atores principais

| Ator | Responsabilidades |
|---|---|
| Passageiro | Buscar caronas, solicitar vaga, acompanhar viagens e avaliar. |
| Motorista | Publicar caronas, aceitar ou recusar solicitações e gerenciar viagens. |
| Ambos | Manter perfil, preservar confiança e respeitar privacidade. |

## Principais entregas

- Requisitos funcionais e não funcionais.
- Épicos e histórias de usuário.
- Rastreabilidade entre requisitos, histórias e protótipo.
- Modelo de dados inicial.
- Protótipo funcional em HTML, CSS e JavaScript.
- Apresentação do projeto.

## Protótipo

O projeto possui um protótipo funcional em HTML, CSS e JavaScript localizado na pasta `prototype/`.

Para executar localmente:

```bash
cd prototype
python -m http.server 5500

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