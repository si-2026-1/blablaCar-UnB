# Rastreabilidade

Matriz de rastreabilidade do MVP conectando requisito, descrição curta, épico,
histórias, entidades do modelo de dados e status.

| Requisito | Descrição curta                                         | Épico      | Histórias      | Entidades do modelo de dados                             | Status                |
| --------- | ------------------------------------------------------- | ---------- | -------------- | -------------------------------------------------------- | --------------------- |
| RF01      | Login institucional com e-mail válido.                  | E1         | H1             | Usuario                                                  | Planejado             |
| RF02      | Criação e edição de perfil de estudante.                | E1         | H2             | Usuario                                                  | Planejado             |
| RF03      | Cadastro básico de veículo para motorista.              | E1         | H2             | Veiculo, Usuario                                         | Planejado             |
| RF04      | Publicação de carona com rota, horário e vagas.         | E2         | H3             | Carona, Veiculo, Usuario                                 | Planejado             |
| RF05      | Busca de caronas por trajeto e horário.                 | E2         | H4             | Carona, Usuario                                          | Planejado             |
| RF06      | Registro de solicitação de vaga.                        | E3         | H5             | SolicitacaoCarona, Carona, Usuario                       | Planejado             |
| RF07      | Aceite ou recusa de solicitação.                        | E3         | H5             | SolicitacaoCarona, Carona, Usuario                       | Planejado             |
| RF08      | Chat temporário para participantes aceitos.             | E3         | H6             | Mensagem, SolicitacaoCarona, Carona, Usuario             | Planejado             |
| RF09      | Exibição de custo_sugerido ou rateio_sugerido.          | E2         | H4             | Carona                                                   | Planejado             |
| RF10      | Cancelamento e conclusão da carona.                     | E3         | H7             | Carona, SolicitacaoCarona                                | Planejado             |
| RF11      | Avaliação após carona concluída.                        | E4         | H8             | Avaliacao, Carona, Usuario                               | Planejado             |
| RF12      | Denúncia e bloqueio com interação prévia.               | E4         | H9             | Denuncia, Bloqueio, Usuario, Carona                      | Planejado             |
| RNF01     | Privacidade de localização e contato pessoal.           | E1, E3, E4 | H2, H6, H9     | Usuario, Mensagem, Denuncia, Bloqueio                    | Requisito transversal |
| RNF02     | Experiência mobile-first.                               | E2         | H3, H4         | Carona                                                   | Requisito transversal |
| RNF03     | Segurança de acesso institucional.                      | E1, E4     | H1, H9         | Usuario, Denuncia, Bloqueio                              | Requisito transversal |
| RNF04     | Integridade de vínculos e estados.                      | E3, E4     | H5, H7, H8, H9 | SolicitacaoCarona, Carona, Avaliacao, Denuncia, Bloqueio | Requisito transversal |
| RNF05     | Desempenho básico em fluxos principais.                 | E2, E3     | H3, H4, H5     | Carona, SolicitacaoCarona                                | Requisito transversal |
| RNF06     | Disponibilidade em horários relevantes para estudantes. | E2, E3     | H3, H5, H6     | Carona, SolicitacaoCarona, Mensagem                      | Requisito transversal |
| RNF07     | Clareza e simplicidade da interface.                    | E1, E2, E3 | H2, H4, H6     | Usuario, Carona, Mensagem                                | Requisito transversal |
