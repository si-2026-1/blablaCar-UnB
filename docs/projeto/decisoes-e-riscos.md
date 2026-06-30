# Decisões e Riscos

## Decisões do projeto

| Tema             | Decisão                                 |
| ---------------- | --------------------------------------- |
| Contato pessoal  | Não revelar telefone pessoal.           |
| Endereço         | Não mostrar endereço residencial exato. |
| Modelo de carona | Não permitir lucro com caronas.         |

## Riscos principais

| Risco | Probabilidade | Impacto | Impacto esperado | Mitigação inicial | Relação com requisitos ou histórias |
| --- | --- | --- | --- | --- | --- |
| Cancelamentos de última hora | Média | Alto | Frustração, perda de tempo e queda de confiança na carona combinada | Aplicar regras de cancelamento e atualização clara de status da carona/solicitação | RF09, RF13, RNF04, H7 |
| Comportamento inadequado | Média | Alto | Redução da sensação de segurança e da confiança entre estudantes | Disponibilizar denúncia e bloqueio básico com contexto de interação prévia | RF12, RNF03, RNF04, H9 |
| Avaliações injustas | Média | Médio | Reputação distorcida de usuários e decisões ruins em viagens futuras | Permitir avaliação apenas pós-conclusão e apoiar contestação via denúncia | RF11, RF12, RNF04, H8, H9 |
| Exposição de localização | Baixa | Alto | Risco de privacidade e segurança pessoal | Mostrar apenas informações necessárias para combinação da carona e evitar dados sensíveis | RNF01, RNF03, H6 |
| Baixa adesão inicial | Média | Médio | Poucas caronas disponíveis e menor utilidade percebida do sistema | Priorizar clareza dos fluxos centrais do MVP e comunicação de uso acadêmico entre estudantes | RF05, RF06, RNF07, H4, H5 |
| Uso indevido da plataforma | Baixa | Alto | Tentativas de uso fora da proposta acadêmica de caronas solidárias | Reforçar autenticação institucional e regras de comunidade sem finalidade comercial | RF01, RF09, RNF03, H1, H4 |
| Inconsistência entre motorista e veículo cadastrado | Baixa | Alto | Quebra de integridade de dados e perda de confiança na viagem | Validar vínculo entre motorista e veículo no momento da publicação da carona | RF03, RF04, RNF04, H2, H3 |

## Ponto de atenção futuro

À medida que a base de usuários crescer, será necessária uma moderação mais
estruturada, com processos e responsabilidades bem definidos.
