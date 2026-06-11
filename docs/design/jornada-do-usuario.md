# Jornada do Usuário

Este documento apresenta, de forma simples, os fluxos principais do passageiro e
do motorista no BlablaCar UnB.

## Fluxo do passageiro

Entrar -> buscar carona -> visualizar opções -> pedir vaga -> receber aceite ->
conversar -> realizar viagem -> avaliar.

### Resumo

O passageiro entra com conta institucional, encontra opções de carona
compatíveis com seu trajeto, solicita uma vaga e, após o aceite, usa o chat
temporário para alinhar detalhes antes da viagem. Ao final, registra sua
avaliação.

### Tabela da jornada do passageiro

| Etapa | Ação do usuário | Necessidade | Possível dor | Resposta do sistema no MVP |
|---|---|---|---|---|
| Entrar | Autenticar-se com e-mail institucional | Acessar o sistema com segurança básica | Dúvida sobre requisito de acesso | Exigir autenticação institucional para entrar |
| Buscar carona | Informar origem, destino e horário desejado | Encontrar opções compatíveis | Resultado confuso ou pouco relevante | Exibir lista de caronas com dados essenciais da viagem |
| Visualizar opções | Comparar motorista, horário, vagas e custo sugerido | Decidir com confiança | Falta de clareza para comparar alternativas | Apresentar informações da carona de forma objetiva |
| Pedir vaga | Enviar solicitação para a carona escolhida | Registrar interesse na vaga | Incerteza se a solicitação foi enviada | Registrar solicitação com status inicial pendente |
| Receber aceite | Acompanhar resposta do motorista | Saber se pode seguir com a viagem | Espera sem retorno claro | Atualizar status da solicitação para aceita ou recusada |
| Conversar | Usar chat temporário para combinar detalhes | Alinhar ponto de encontro e horário final | Exposição de contato pessoal desnecessária | Disponibilizar chat temporário entre participantes aceitos |
| Realizar viagem | Executar o deslocamento combinado | Completar a carona com previsibilidade | Cancelamento de última hora | Refletir o status da carona e da solicitação no fluxo |
| Avaliar | Registrar avaliação após a viagem | Dar feedback para confiança da comunidade | Não saber quando avaliar | Permitir avaliação após conclusão da carona |

## Fluxo do motorista

Entrar -> cadastrar veículo -> publicar carona -> receber solicitação -> aceitar
passageiro -> conversar -> concluir viagem -> avaliar.

### Resumo

O motorista entra com conta institucional, cadastra os dados básicos do veículo
e publica a carona. Depois, analisa solicitações, aceita passageiros e usa o
chat temporário para combinar a viagem. Ao concluir o trajeto, registra sua
avaliação.

### Tabela da jornada do motorista

| Etapa | Ação do usuário | Necessidade | Possível dor | Resposta do sistema no MVP |
|---|---|---|---|---|
| Entrar | Autenticar-se com e-mail institucional | Garantir acesso restrito à comunidade UnB | Fricção no primeiro acesso | Exigir autenticação institucional para usar a plataforma |
| Cadastrar veículo | Informar dados básicos do veículo | Vincular a oferta de carona a um veículo válido | Dúvida sobre dados obrigatórios | Permitir cadastro de veículo com campos essenciais |
| Publicar carona | Informar trajeto, horário, vagas e custo sugerido | Divulgar oferta de forma clara | Receio de publicar informação incompleta | Criar carona com status e dados principais da viagem |
| Receber solicitação | Verificar pedidos de vaga dos passageiros | Controlar quem entra na carona | Volume de pedidos sem priorização | Listar solicitações vinculadas à carona publicada |
| Aceitar passageiro | Aprovar ou recusar solicitações | Montar grupo da viagem com segurança | Incerteza sobre impacto nas vagas | Atualizar status da solicitação e vagas disponíveis |
| Conversar | Usar chat temporário para alinhar detalhes finais | Ajustar encontro e reduzir desencontros | Necessidade de contato sem expor dados pessoais | Disponibilizar chat temporário para participantes aceitos |
| Concluir viagem | Finalizar carona realizada | Encerrar o ciclo da viagem | Esquecimento de encerrar status | Manter estado da carona até sua conclusão |
| Avaliar | Registrar avaliação dos participantes | Fortalecer confiança entre usuários | Falta de incentivo para avaliar | Permitir avaliação pós-viagem |

## Pontos críticos da experiência

- Autenticação institucional: a entrada com conta institucional deve ser clara e direta, reforçando que o uso é restrito à comunidade acadêmica.
- Clareza na busca de caronas: resultados precisam mostrar informações essenciais para decisão rápida, como horário, origem, destino, vagas e custo sugerido.
- Confiança no motorista/passageiro: as informações da carona e o histórico de avaliações ajudam a reduzir incerteza antes da viagem.
- Privacidade de contato: o chat temporário deve permitir alinhamento da viagem sem exigir exposição desnecessária de dados pessoais.
- Cancelamento: mudanças de plano devem refletir o status da solicitação e da carona de forma compreensível para evitar desencontros.
- Avaliação pós-viagem: o registro de avaliação após a conclusão da carona sustenta aprendizado e confiança contínua entre participantes.
