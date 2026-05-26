# Modelo de dados

Esta e uma modelagem inicial, simples e suficiente para o MVP academico do BlablaCar UnB.

## Usuario

Finalidade: representar qualquer estudante autenticado na plataforma, podendo atuar como passageiro ou motorista.

Campos principais:
- id
- nome
- email_institucional
- foto_perfil (opcional)
- telefone (opcional)
- curso (opcional)
- reputacao_media (opcional)
- data_criacao

Relacionamentos:
- Um usuario pode ter zero ou mais veiculos.
- Um usuario pode criar zero ou mais caronas (como motorista).
- Um usuario pode fazer zero ou mais solicitacoes (como passageiro).
- Um usuario pode enviar e receber mensagens em caronas aceitas.
- Um usuario pode registrar e receber avaliacoes.
- Um usuario pode registrar denuncias contra outro usuario.

## Veiculo

Finalidade: armazenar os dados basicos do carro usado pelo motorista.

Campos principais:
- id
- usuario_id (dono do veiculo)
- modelo
- cor
- placa
- numero_assentos_disponiveis_padrao (opcional)

Relacionamentos:
- Cada veiculo pertence a um usuario.
- Um veiculo pode ser usado em varias caronas.

## Carona

Finalidade: representar uma viagem oferecida por um motorista com vagas disponiveis.

Campos principais:
- id
- motorista_id (usuario)
- veiculo_id
- origem
- destino
- data_hora_partida
- vagas_totais
- vagas_disponiveis
- custo_sugerido
- status (aberta, em_andamento, concluida, cancelada)
- data_criacao

Relacionamentos:
- Cada carona e criada por um motorista (usuario).
- Cada carona pode ter varias solicitacoes.
- Cada carona pode ter varias mensagens, somente entre participantes aceitos.
- Cada carona pode gerar avaliacoes apos conclusao.

## Solicitacao

Finalidade: representar o pedido de vaga de um passageiro em uma carona.

Campos principais:
- id
- carona_id
- passageiro_id (usuario)
- status (pendente, aceita, recusada, cancelada)
- data_solicitacao
- data_resposta (opcional)

Relacionamentos:
- Cada solicitacao pertence a uma carona.
- Cada solicitacao e feita por um usuario passageiro.
- Solicitacoes aceitas habilitam o acesso ao chat da carona.

## Mensagem

Finalidade: registrar conversas de alinhamento entre participantes aceitos de uma carona.

Campos principais:
- id
- carona_id
- remetente_id (usuario)
- conteudo
- data_envio

Relacionamentos:
- Cada mensagem pertence a uma carona.
- Cada mensagem e enviada por um usuario participante aceito.
- Mensagens so existem para participantes aceitos na carona.

## Avaliacao

Finalidade: permitir feedback apos a viagem para fortalecer confianca na comunidade.

Campos principais:
- id
- carona_id
- avaliador_id (usuario)
- avaliado_id (usuario)
- nota
- comentario (opcional)
- data_avaliacao

Relacionamentos:
- Cada avaliacao pertence a uma carona concluida.
- Cada avaliacao envolve um usuario avaliador e um usuario avaliado.
- Avaliacao so ocorre depois da viagem concluida.

## Denuncia

Finalidade: registrar problemas de conduta ou seguranca entre usuarios apos interacao na plataforma.

Campos principais:
- id
- denunciante_id (usuario)
- denunciado_id (usuario)
- carona_id (opcional, quando houver)
- motivo
- descricao (opcional)
- status_analise (aberta, em_analise, concluida)
- data_registro

Relacionamentos:
- Cada denuncia e registrada por um usuario contra outro usuario.
- A denuncia pode estar vinculada a uma carona/interacao especifica.
- Denuncia pode ser registrada apos uma interacao entre os usuarios.

## Regras de relacionamento do MVP

- Usuario pode atuar como passageiro ou motorista.
- Veiculo pertence a um usuario.
- Carona e criada por um motorista e possui vagas.
- Solicitacao representa o pedido de vaga de um passageiro.
- Mensagem so existe para participantes aceitos na carona.
- Avaliacao so ocorre depois da viagem concluida.
- Denuncia pode ser registrada por um usuario contra outro apos uma interacao.

## Cuidados com dados sensiveis

- Telefone pessoal nao deve ser obrigatorio.
- Endereco residencial completo nao deve ser exposto.
- Historico de viagens deve ser protegido.
- Placa do veiculo pode ser exibida parcialmente quando necessario.

Observacao: este documento descreve somente a modelagem conceitual inicial. Nao ha criacao de banco de dados nem codigo de aplicacao nesta etapa.
