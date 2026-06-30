# Modelo de Dados

Modelagem atualizada e consistente com o MVP acadêmico do UnBlaBlaCar. O objetivo é descrever as entidades e regras de negócio essenciais para o funcionamento básico do sistema, focando na interação entre a comunidade universitária, o cadastro de veículos e a gestão de corridas.

## Escopo do modelo no MVP

Este modelo cobre exclusivamente o núcleo operacional:
* Autenticação e perfil baseado no registro acadêmico;
* Cadastro de carros pelos proprietários;
* Oferta de corridas (caronas);
* Vínculo de passageiros às corridas ofertadas.

---

## Entidades

### USUARIOS

**Finalidade:** Representar o estudante cadastrado no sistema, que pode atuar como motorista proprietário de um veículo ou como passageiro em uma corrida. O vínculo principal é feito pelo registro institucional.

**Campos principais:**
* `matricula` (PK - NUMBER)
* `nome_completo` (VARCHAR)
* `curso` (VARCHAR)
* `numero_celular` (VARCHAR)

**Relacionamentos:**
* USUARIOS 1:N CARROS (como proprietário)
* USUARIOS 1:N CORRIDAS (como motorista)
* USUARIOS 1:N passageiros_corrida (como passageiro)

**Cardinalidade importante:**
* Um usuário pode registrar zero ou vários carros.
* Um usuário pode participar de zero ou várias corridas, seja ofertando ou como passageiro.

---

### CARROS

**Finalidade:** Armazenar os dados dos veículos cadastrados pelos usuários para uso nas corridas.

**Campos principais:**
* `placa` (PK - VARCHAR)
* `modelo` (VARCHAR)
* `marca` (VARCHAR)
* `matricula_proprietario` (FK - NUMBER)

**Relacionamentos:**
* CARROS N:1 USUARIOS (obrigatório, todo carro tem um proprietário)
* CARROS 1:N CORRIDAS

---

### CORRIDAS

**Finalidade:** Representar o trajeto ofertado por um motorista, utilizando um carro específico.

**Campos principais:**
* `id_corrida` (PK - NUMBER)
* `partida` (VARCHAR)
* `destino` (VARCHAR)
* `preco` (NUMBER)
* `tam_trajeto_km` (NUMBER)
* `matricula_motorista` (FK - NUMBER)
* `placa_carro` (FK - VARCHAR)

**Relacionamentos:**
* CORRIDAS N:1 USUARIOS (motorista responsável)
* CORRIDAS N:1 CARROS (veículo utilizado)
* CORRIDAS 1:N passageiros_corrida

---

### passageiros_corrida

**Finalidade:** Entidade associativa que resolve a relação de muitos-para-muitos entre usuários e corridas, registrando quais estudantes estão ocupando as vagas de uma determinada viagem como passageiros.

**Campos principais:**
* `id_corrida` (PK, FK - NUMBER)
* `matricula_passageiro` (PK, FK - NUMBER)

**Relacionamentos:**
* passageiros_corrida N:1 CORRIDAS
* passageiros_corrida N:1 USUARIOS

---

## Regras de Relacionamento e Integridade

1. **Dependência de Propriedade:** Um carro não existe no sistema sem estar vinculado à matrícula de um usuário proprietário (`matricula_proprietario` é FK obrigatória).
2. **Consistência da Corrida:** Toda corrida precisa obrigatoriamente de um motorista responsável (`matricula_motorista`) e de um veículo cadastrado (`placa_carro`).
3. **Associação de Passageiros:** A tabela `passageiros_corrida` utiliza uma chave primária composta (`id_corrida`, `matricula_passageiro`). Isso garante a unicidade, impedindo que o mesmo usuário ocupe mais de um assento ou faça solicitações duplicadas para a mesma viagem.

---

## Modelo Lógico / Físico

Abaixo está o descritivo relacional das tabelas, seguido pelo diagrama correspondente.

* **USUARIOS** (`matricula` PK)
* **CARROS** (`placa` PK, `matricula_proprietario` FK -> USUARIOS.matricula)
* **CORRIDAS** (`id_corrida` PK, `matricula_motorista` FK -> USUARIOS.matricula, `placa_carro` FK -> CARROS.placa)
* **passageiros_corrida** (`id_corrida` PK/FK -> CORRIDAS.id_corrida, `matricula_passageiro` PK/FK -> USUARIOS.matricula)

![Modelo Físico](https://github.com/si-2026-1/blablaCar-UnB/blob/main/assets/modelo-fisico.png)

---

## Modelo Conceitual

O diagrama de entidade-relacionamento (visão de alto nível) ilustra a semântica da regra de negócio de forma simplificada, abstraindo as tabelas associativas e focando nas relações diretas de posse e ação.

![Modelo Conceitual](https://github.com/si-2026-1/blablaCar-UnB/blob/main/assets/modelo-conceitual.png)
