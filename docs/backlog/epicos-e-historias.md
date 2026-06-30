# Épicos e histórias do MVP

Os épicos representam grandes momentos da experiência do estudante na
plataforma. As histórias representam necessidades reais de quem usa o sistema no
dia a dia.

Este documento reúne tudo em uma única página, simples de manter.

## E1 — Entrar e participar com segurança

Objetivo: permitir que estudantes utilizem a plataforma com confiança.

### H1 — Login institucional

- Ator principal: Estudante.
- Épico relacionado: E1.
- Requisitos relacionados: RF01, RNF03.
- Prioridade: MVP.
- Pré-condições: estudante com e-mail institucional ativo.
- Descrição narrativa: Como estudante, quero entrar usando meu e-mail
  institucional, para participar de uma comunidade universitária mais segura.
- Entidades de dados afetadas: Usuario.

Critérios de aceitação (Dado / Quando / Então):

- Dado que o estudante informa um e-mail institucional válido, quando concluir a
  autenticação, então o acesso é permitido.
- Dado que o e-mail não é institucional ou não é válido, quando tentar se
  autenticar, então o acesso é negado.
- Dado que o estudante já possui conta validada, quando entrar novamente, então
  o sistema reaproveita o cadastro existente.

### H2 — Perfil e cadastro de veículo

- Ator principal: Estudante (motorista ou passageiro).
- Épico relacionado: E1.
- Requisitos relacionados: RF02, RF03, RNF01, RNF07.
- Prioridade: MVP.
- Pré-condições: usuário autenticado.
- Descrição narrativa: Como estudante, quero montar meu perfil e, se eu dirigir,
  cadastrar meu carro, para que outras pessoas saibam com quem vão viajar.
- Entidades de dados afetadas: Usuario, Veiculo.

Critérios de aceitação (Dado / Quando / Então):

- Dado que o usuário está autenticado, quando preencher os dados de perfil,
  então o perfil é salvo.
- Dado que o usuário atua como motorista, quando cadastrar um veículo, então o
  veículo fica vinculado ao próprio usuário.
- Dado que outro estudante visualiza o perfil em contexto de carona, quando
  abrir os detalhes, então vê informações básicas e não sensíveis.

## E2 — Oferecer ou encontrar uma carona

Objetivo: conectar estudantes que já fazem trajetos parecidos.

### H3 — Publicação de carona

- Ator principal: Motorista.
- Épico relacionado: E2.
- Requisitos relacionados: RF04, RNF02, RNF05.
- Prioridade: MVP.
- Pré-condições: usuário autenticado com perfil e veículo cadastrado.
- Descrição narrativa: Como motorista, quero oferecer uma carona informando
  caminho, horário e vagas, para compartilhar uma viagem que eu já faria.
- Entidades de dados afetadas: Carona, Veiculo, Usuario.

Critérios de aceitação (Dado / Quando / Então):

- Dado que o motorista possui veículo válido, quando publicar uma carona com
  origem, destino, horário e vagas, então a carona é criada com status aberta.
- Dado que a carona está aberta, quando outro usuário realizar uma busca
  compatível, então a carona aparece nos resultados.
- Dado que a carona ainda não iniciou, quando o motorista editar ou cancelar a
  oferta, então o status é atualizado.

### H4 — Busca de caronas e custo sugerido

- Ator principal: Passageiro.
- Épico relacionado: E2.
- Requisitos relacionados: RF05, RF09, RNF02, RNF07.
- Prioridade: MVP.
- Pré-condições: usuário autenticado.
- Descrição narrativa: Como passageiro, quero procurar caronas compatíveis e
  visualizar um custo_sugerido, para escolher uma opção conveniente sem
  transformar a plataforma em serviço comercial.
- Entidades de dados afetadas: Carona, Usuario.

Critérios de aceitação (Dado / Quando / Então):

- Dado que o passageiro informa trajeto e horário, quando executar a busca,
  então o sistema retorna caronas compatíveis.
- Dado que há caronas compatíveis, quando o passageiro visualizar a lista, então
  vê informações principais da carona e do motorista.
- Dado que uma carona possui valor de referência, quando abrir os detalhes,
  então o sistema exibe custo_sugerido/rateio_sugerido sem fluxo de pagamento.

## E3 — Combinar e realizar a viagem

Objetivo: tornar a organização da carona simples e respeitosa.

### H5 — Solicitação de carona

- Ator principal: Passageiro (solicita) e motorista (responde).
- Épico relacionado: E3.
- Requisitos relacionados: RF07, RF08, RNF04.
- Prioridade: MVP.
- Pré-condições: carona com status aberta e vagas disponíveis.
- Descrição narrativa: Como passageiro, quero pedir uma vaga e receber uma
  resposta do motorista, para saber se posso contar com aquela carona.
- Entidades de dados afetadas: SolicitacaoCarona, Carona, Usuario.

Critérios de aceitação (Dado / Quando / Então):

- Dado que a carona está aberta, quando o passageiro solicitar vaga, então uma
  SolicitacaoCarona é criada com status pendente.
- Dado que existe uma solicitação pendente, quando o motorista aceita ou recusa,
  então o status da solicitação é atualizado.
- Dado que o passageiro já solicitou a mesma carona, quando tentar solicitar
  novamente, então o sistema impede a duplicidade.

### H6 — Comunicação entre passageiro e motorista

- Ator principal: Participante aceito da carona.
- Épico relacionado: E3.
- Requisitos relacionados: RF10, RNF01, RNF07.
- Prioridade: MVP.
- Pré-condições: solicitação aceita ou usuário motorista da carona.
- Descrição narrativa: Como participante de uma carona aceita, quero conversar
  em um chat temporário, para combinar o embarque sem compartilhar meu telefone.
- Entidades de dados afetadas: Mensagem, Carona, SolicitacaoCarona, Usuario.

Critérios de aceitação (Dado / Quando / Então):

- Dado que o usuário é participante aceito, quando abrir a carona, então o chat
  temporário fica disponível.
- Dado que o usuário não foi aceito, quando tentar enviar mensagem, então o
  sistema bloqueia o envio.
- Dado que a carona foi concluída ou cancelada, quando acessar o chat, então
  novas mensagens não são permitidas.

### H7 — Cancelamento e conclusão da carona

- Ator principal: Motorista e passageiro participante.
- Épico relacionado: E3.
- Requisitos relacionados: RF13, RNF04.
- Prioridade: MVP.
- Pré-condições: carona existente com participantes.
- Descrição narrativa: Como participante, quero cancelar ou concluir uma carona,
  para manter as informações da viagem atualizadas.
- Entidades de dados afetadas: Carona, SolicitacaoCarona.

Critérios de aceitação (Dado / Quando / Então):

- Dado que a carona ainda não iniciou, quando houver cancelamento autorizado,
  então o status da carona passa para cancelada.
- Dado que o trajeto terminou, quando o motorista concluir a carona, então o
  status passa para concluída.
- Dado que o status mudou, quando os participantes consultarem a carona, então
  visualizam o novo estado.

## E4 — Construir confiança na comunidade

Objetivo: ajudar estudantes a escolher companhias de viagem com mais segurança.

### H8 — Avaliação pós-viagem

- Ator principal: Participante da carona concluída.
- Épico relacionado: E4.
- Requisitos relacionados: RF11, RNF04.
- Prioridade: MVP.
- Pré-condições: carona com status concluída e participação confirmada.
- Descrição narrativa: Como participante, quero avaliar a experiência depois da
  viagem, para ajudar a comunidade a tomar decisões melhores.
- Entidades de dados afetadas: Avaliacao, Carona, Usuario.

Critérios de aceitação (Dado / Quando / Então):

- Dado que a carona foi concluída, quando o participante registrar nota e
  comentário opcional, então a Avaliacao é salva.
- Dado que a carona não foi concluída, quando o usuário tentar avaliar, então o
  sistema bloqueia a ação.
- Dado que a Avaliacao foi salva, quando o perfil do avaliado for consultado,
  então a avaliação aparece no histórico.

### H9 — Denúncia e bloqueio

- Ator principal: Estudante participante de interação prévia.
- Épico relacionado: E4.
- Requisitos relacionados: RF12, RNF01, RNF03, RNF04.
- Prioridade: Futuro próximo.
- Pré-condições: usuários com interação prévia em carona.
- Descrição narrativa: Como estudante, quero denunciar ou bloquear alguém em
  caso de problema, para me sentir protegido ao utilizar a plataforma.
- Entidades de dados afetadas: Denuncia, Bloqueio, Usuario, Carona.

Critérios de aceitação (Dado / Quando / Então):

- Dado que houve interação prévia, quando o estudante registrar uma denúncia com
  motivo, então o caso fica aberto para análise.
- Dado que o estudante bloquear outro usuário, quando houver tentativa de nova
  interação direta, então o sistema impede o contato.
- Dado que não houve interação prévia, quando houver tentativa de denúncia ou
  bloqueio, então o sistema exige um contexto válido de carona.

## Ideias para depois do MVP

- Gamificação para incentivar boas práticas na comunidade.
- Indicadores de sustentabilidade, como estimativa de CO2 evitado.
