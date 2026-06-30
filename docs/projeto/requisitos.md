# Requisitos

Esta página apresenta os requisitos principais do MVP do BlablaCar UnB.

## Requisitos funcionais

| ID | Requisito | Prioridade | Critério de validação |
|---|---|---|---|
| RF01 | Permitir login com e-mail institucional da UnB. | MVP | Fluxo de login institucional executável no protótipo. |
| RF02 | Permitir criação de perfil básico do estudante. | MVP | Tela de perfil com dados básicos visível no protótipo. |
| RF03 | Permitir cadastro de veículo para estudantes motoristas. | MVP | Perfil permite visualizar ou informar dados do veículo. |
| RF04 | Permitir que o motorista publique uma carona com origem, destino, horário e vagas. | MVP | Fluxo de oferecer carona conclui com carona publicada. |
| RF05 | Permitir que o passageiro visualize caronas disponíveis. | MVP | Home lista caronas disponíveis para navegação. |
| RF06 | Exibir detalhes da carona, incluindo rota, motorista, veículo, vagas e rateio sugerido. | MVP | Tela de detalhes apresenta rota e dados da carona. |
| RF07 | Permitir que o passageiro solicite uma vaga. | MVP | Ação de solicitar vaga altera estado para solicitação enviada. |
| RF08 | Permitir que o motorista aceite ou recuse solicitações. | MVP | Tela de pedidos permite aceitar ou recusar solicitação. |
| RF09 | Permitir acompanhamento das caronas solicitadas ou publicadas. | MVP | Telas de minhas viagens e minhas caronas exibem status. |
| RF10 | Permitir comunicação entre participantes aceitos na carona. | MVP | Chat interno simulado disponível após aceite da solicitação. |
| RF11 | Exibir informações de reputação do usuário. | MVP | Perfil mostra informações de reputação e avaliações. |
| RF12 | Planejar denúncia e bloqueio para situações de risco ou desconforto. | Futuro próximo | Requisito documentado como evolução para versão futura. |

## Requisitos não funcionais

| ID | Requisito | Categoria |
|---|---|---|
| RNF01 | A interface deve priorizar uso em dispositivos móveis. | Usabilidade |
| RNF02 | O sistema não deve expor telefone pessoal como requisito para combinar caronas. | Privacidade |
| RNF03 | O sistema não deve exibir endereço residencial completo publicamente. | Privacidade |
| RNF04 | O rateio deve ser apresentado como sugestão de custo, não como pagamento comercial. | Regra de negócio |
| RNF05 | A busca e a publicação de caronas devem ser simples e rápidas. | Desempenho |
| RNF06 | O sistema deve manter linguagem clara para estudantes. | Usabilidade |
| RNF07 | Dados sensíveis devem ser protegidos e exibidos apenas quando necessários. | Segurança |

## Regras de negócio

- O MVP é voltado para estudantes da UnB.
- O acesso deve ocorrer por e-mail institucional.
- O motorista compartilha uma viagem que já realizaria.
- O sistema não é Uber, 99 ou serviço comercial de transporte.
- O motorista não deve usar a plataforma com finalidade lucrativa.
- O valor exibido é apenas um rateio sugerido de custos.
- O telefone pessoal não deve ser obrigatório para combinar uma carona.
- O endereço residencial completo não deve ser exposto.
- A comunicação ideal do MVP é um chat interno temporário.
- Avaliações devem ocorrer apenas após uma interação válida.
- Denúncia e bloqueio são mecanismos planejados para segurança da comunidade.

## Restrições do MVP

O MVP não inclui:

- pagamento dentro da plataforma;
- aplicativo nativo para Android ou iOS;
- uso aberto ao público geral;
- sistema avançado de moderação;
- gamificação completa;
- cálculo oficial de impacto ambiental.

Esses pontos podem ser considerados em versões futuras.