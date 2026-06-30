# Requisitos

Este documento define os requisitos do MVP do UnBlaBlaCar de forma objetiva,
rastreável e coerente com o escopo acadêmico do projeto.

## Requisitos funcionais

| ID   | Nome                            | Descrição                                                                   | Prioridade | Observação ou critério de validação                                                            |
| ---- | ------------------------------- | --------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| RF01 | Autenticação institucional      | Permitir cadastro e login com e-mail institucional válido.                  | MVP        | Validado quando apenas estudantes com e-mail institucional conseguem acessar a plataforma.     |
| RF02 | Perfil de usuário               | Permitir criação e edição de perfil básico de estudante.                    | MVP        | Validado quando o usuário consegue salvar e atualizar seus dados básicos.                      |
| RF03 | Cadastro de veículo             | Permitir cadastro básico de veículo para usuário que atua como motorista.   | MVP        | Validado quando o veículo fica vinculado ao usuário que o cadastrou.                           |
| RF04 | Publicação de carona            | Permitir publicação de carona com origem, destino, horário e vagas.         | MVP        | Validado quando a carona publicada aparece disponível para busca.                              |
| RF05 | Busca de caronas                | Permitir busca de caronas por trajeto e horário.                            | MVP        | Validado quando o sistema retorna caronas compatíveis com os filtros informados.               |
| RF06 | Solicitação de vaga             | Permitir que o passageiro solicite vaga em uma carona aberta.               | MVP        | Validado quando a solicitação é registrada com status inicial pendente.                        |
| RF07 | Aceite ou recusa de solicitação | Permitir que o motorista aceite ou recuse solicitações recebidas.           | MVP        | Validado quando o status da solicitação é atualizado e visível ao passageiro.                  |
| RF08 | Chat temporário                 | Disponibilizar chat temporário apenas para participantes aceitos na carona. | MVP        | Validado quando apenas motorista e participantes aceitos conseguem trocar mensagens.           |
| RF09 | Custo ou rateio sugerido        | Exibir custo_sugerido ou rateio_sugerido sem processar pagamento.           | MVP        | Validado quando a carona mostra valor de referência sem fluxo financeiro na plataforma.        |
| RF10 | Encerramento da carona          | Permitir cancelamento antes da partida e conclusão ao final da viagem.      | MVP        | Validado quando o status da carona pode mudar para cancelada ou concluída conforme o contexto. |
| RF11 | Avaliação pós-viagem            | Permitir avaliação após carona concluída.                                   | MVP        | Validado quando só participantes de carona concluída conseguem registrar avaliação.            |
| RF12 | Denúncia e bloqueio             | Permitir denúncia e bloqueio básico entre usuários que já interagiram.      | MVP        | Validado quando denúncia e bloqueio só podem ser feitos com contexto de interação prévia.      |

## Requisitos não funcionais

| ID    | Nome                                   | Descrição                                                                                | Prioridade | Observação ou critério de validação                                                      |
| ----- | -------------------------------------- | ---------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------- |
| RNF01 | Privacidade de dados                   | Garantir privacidade de localização e contato pessoal, evitando exposição desnecessária. | MVP        | Validado quando dados sensíveis não são exibidos além do necessário.                     |
| RNF02 | Usabilidade em dispositivos móveis     | Garantir experiência mobile-first e uso confortável em celular.                          | MVP        | Validado quando os fluxos principais funcionam com boa legibilidade em telas pequenas.   |
| RNF03 | Segurança de acesso                    | Garantir que o acesso ocorra apenas com autenticação institucional válida.               | MVP        | Validado quando acessos sem credencial institucional são bloqueados.                     |
| RNF04 | Integridade dos dados                  | Garantir consistência dos dados de carona, solicitações e vínculos entre entidades.      | MVP        | Validado quando não há duplicidade de solicitação nem uso de veículo de outro motorista. |
| RNF05 | Desempenho básico                      | Garantir desempenho adequado em publicação e busca de caronas.                           | MVP        | Validado quando as ações centrais respondem sem lentidão perceptível.                    |
| RNF06 | Disponibilidade em horários relevantes | Garantir disponibilidade em horários de maior uso por estudantes.                        | MVP        | Validado quando o sistema permanece acessível nos períodos típicos de deslocamento.      |
| RNF07 | Clareza e simplicidade da interface    | Garantir interface compreensível, objetiva e adequada ao contexto acadêmico.             | MVP        | Validado quando os fluxos principais podem ser entendidos sem instruções complexas.      |

## Observações de escopo do MVP

- O projeto é acadêmico e simula o planejamento de desenvolvimento do MVP.
- A plataforma é de caronas solidárias e não tem finalidade lucrativa.
- O sistema sugere custo/rateio, mas não processa pagamentos.
- O produto não é Uber, 99 nem serviço comercial de transporte.
