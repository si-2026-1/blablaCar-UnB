# Template de Documentação com MkDocs

Este repositório contém um template simples utilizando MkDocs + GitHub Pages 

---

# O que é necessário

Antes de começar, instale:

- Python3
- pip
- git

Depois instale o MkDocs:

```bash
pip install mkdocs mkdocs-material
```

---

# Estrutura do projeto

```text
docs/
├── index.md
├── doc1.md
├── doc2.md
└── ...

mkdocs.yml
```

- Todos os arquivos `.md` devem ficar dentro da pasta `docs/`
- O arquivo `mkdocs.yml` controla o site

---

# Executando localmente

Para testar localmente:

```bash
mkdocs serve
```

Depois abra:

```text
http://127.0.0.1:8000
```

---

# Opção 1 — Usando este template em um novo repositório

## Crie um novo repositório

No GitHub:

```text
Use this template
```

ou faça uma cópia manual do projeto.

---

## 2. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
cd NOME_DO_REPOSITORIO
```

---

## 3. Edite o nome do site

Abra `mkdocs.yml`:

```yaml
site_name: site_1
```

---

## 4. Faça commit e push

```bash
git add .
git commit -m "init"
git push
```

---

## 5. Ative o GitHub Pages

No GitHub:

```text
Settings -> Pages
```

Em:

```text
Build and deployment
```

Selecione:

```text
Source: GitHub Actions
```

---

## 6. Acesse o site

O GitHub irá gerar um link parecido com:

```text
https://usuario.github.io/repositorio/
```

---

# Opção 2 — Adicionando MkDocs em um repositório já existente

Caso você já tenha um projeto e queira adicionar documentação:

---

## 1. Instale o MkDocs

```bash
pip install mkdocs mkdocs-material
```

---

## 2. Crie a estrutura

Dentro do repositório:

```bash
mkdir docs
touch docs/index.md
touch mkdocs.yml
```

---

## 3. Configure o `mkdocs.yml`

Exemplo:

```yaml
site_name: documentation

theme:
  name: material
```

---

## 4. Adicione um workflow do GitHub Actions

Crie:

```text
.github/workflows/deploy.yml
```

Conteúdo:

```yaml
name: Deploy MkDocs

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: '3.x'

      - run: pip install mkdocs mkdocs-material

      - run: mkdocs gh-deploy --force
```

---

## 5. Faça commit e push

```bash
git add .
git commit -m "add mkdocs"
git push
```

---

## 6. Ative o GitHub Pages

No GitHub:

```text
Settings -> Pages
```

Selecione:

```text
Source: Deploy from branch
Branch: gh-pages
Folder: /root
```

---


# Comandos úteis

Executar localmente:

```bash
mkdocs serve
```

Gerar site estático:

```bash
mkdocs build
```

Publicar manualmente:

```bash
mkdocs gh-deploy
```
