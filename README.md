# Balanço não tão simplificado.

Um dos materiais de estudos mais comuns na contabilidade é o balanço patrimonial. O Balanço Patrimonial é uma das demonstrações contábeis utilizada para checar a situação patrimonial (um tipo de situação financeira) de uma entidade. É composto por três setores: os **Ativos**, **Passivos** e **Patrimônio Líquido**. Os **Ativos** são todos os bens e direitos de uma entidade. O **Passivo** é composto por todas as obrigações da entidade, isto é, suas dívidas e pagamentos a outrem que devem ser feitos em momento futuro. O **Patrimônio Líquido** é composto pelo Capital que os sócios investiram na entidade e o resultado de seus exercícios (lucro ou prejuízo). 

Assim, decorre a seguinte relação entre as partes, uma vez que os bens da organização devem ser originados ou de lucros passados, de capital social ou de dívidas assumidas:

$Ativo = Passivo + Patrimônio Líquido$

Para fins de análise, o Balanço Patrimonial é, também, subdividido, de maneira a enxergarmos com certo grau de detalhamento as contas da entidade. A título de exemplo, teríamos uma relação parecida com esta:

1. Ativo
    
    1.1 Ativo Circulante
    
    1.1.1 Disponível
    
    1.1.1.1 Caixa
    
    1.1.1.2 Banco
    
    1.1.1.2.1 Conta Corrente Nubank
    

Nota-se que as operações são feitas em relação a **menor conta**, que é, no caso, a "Conta Corrente Nubank", que irá alterar a situação de todas as contas "pai" que a ela dão origem, logo, "Banco", que é filho de "Disponível", que é filho de "Ativo Circulante" que é filho de "Ativo". Tomando a conta "Mercadoria para Revenda X", poderíamos encontrá-la seguinte o caminho `Ativos > Ativo Circulante > Estoques > Mercadoria para Revenda > Mercadoria para Revenda X`.

Nesta etapa do processo seletivo, vocês deverão implementar um balanço patrimonial com níveis e subníveis, ou seja, as contas "pai" e contas "filho". Nesta versão, o usuário terá que informar gastos e entradas de dinheiro💰.