# Memória Real

- Responsável por gerenciar a memória RAM no SO.
- Gerencia a fila de processo.

Hierarquia:
**Referente se a uma classificação de tipos de memórias.**

Os tipos de memórias:

1. Registradores
2. rom eprom
3. cache
4. meproa principal
5. Secundária

Memória Virtual é um espaço reservado no disco pela memoria secundária.

Estratégia são gerencia de mem´roia são projetadas para conseguir melhor uso possível da CPU.

**Best-fit:** escolhe-se a melhor particição, ou seja,aquela que deixa o menor espaço.

Wordt-fit: aloca o programa na pior particição, ou seja, aquela que deixa o mairo espaço livre.


Acaba deixando espalos livres grande o suficiente para que outros pgroamas utilizem esse espaços, que permite que um número maior de processo se utilizem a memória.

1. Sistema operacional
2. Usuário
3. Não locado

Sobrepoções:

Todos os programas eras limitados ao tamanho.

> A definição de overlgy é função do pgroamador da aplicação.
> Vantagens: permite que o programador corrija a memória principal do sistema.

# Proteção em um sistema Monousuário:


O registrador contém o endereço da memória física.


# Processamento em lote de fluxo
 refere-se à produção de vários intem de uma só vez,fazendo uma produção em massa onde todos as etapas são feitas de uma só vez. Isso vem desse o século XIX, no processamento de dados armazenadaos pelos  cartões perfurados por equipadomento de registro de unidades.


No início,  o mnousuário exeutava uma terfa de cada vez.


## Vantages:
1. Busca evitar a ociosidade do computador, não necessitando de supervisão ou intersção do usuário.
2. Permite o usuário de diferente prioridades para trabalhos interativos e não interativos;
3. Executa  apenas uma vez o programa para processar grandes quantias de dados, reduzndo a sobrecarga do sistema.


 
# Multipogramção por Partição Fixas;
O sistema divide a memória em várias partições de tamanho fixo.

Processaodr akltena rapidament entre processos para criar a ilusão de simultaneidade.

**Desperdício de meória**, pois os procesos tinha que esperar mesmo que tivessem meória livre para executa os processos.

Para superar o desperdico de memória, os projetias criaram compiladores, montadores e carregadores de realocação.


> Melhor que couber, escolçher a melhor aprticção.
> Pior que couber:escolher a pior partição,ou seja, aquela que o pgroama escolhe o espaço onde há maior espaço.


### Shapping:é uma tencica criada na tentativa de melhorar o oprblema da insuficiência de memória durante a excuação de alguns processo ambientes multiprogramados.


# Memória Virtual

Memória Virtual é uma tecnica que usa a memória secundária como uma cache para armazenamento secundário.

> Realocação: para asegurar que cada processo tenha o seu proprio espaço de enderaçamento.

> Proteção: para impedir que um processo utilze um endereço de memória.

> Paginação ou troca: que possibilta a uma aplicação utiliza mais memórria do que a fisicamente.

## Segmentação

1. É divisão do programa em segmentos (rotinas);
2. Objetiva-se dividir programas em seções para que o S.O possa realocá-los mais facilemente na memória.

Os processos são armazenados em espços livres na memória.


## Paginação por demanda.
Garante qu o sistema traga para a meória principal somente as páginas que o processo relamnente necessita.

Substituição de páginas.

### Estrtégias:
 FIFO: Primeiro a Entrar, Primeiro a sair

