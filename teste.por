algoritmo "Maior_Valor" //Início do algoritmo
var //Aqui, é a criação das variáveis:
   vetor_numeros: vetor [1..274] de inteiro //Criação do vetor contendo, inicialmente, 274 valores vazios
   maior, menor, cont: inteiro //cria-se três variáveis do tipo inteiro
   //a variável cont é para o contador, que será incrementada de 1 e 1.
inicio
   escreva("Digite o 1 valor: ") //Aqui uma mensagem para o usuário:

   leia(vetor_numeros[1]) //
   menor<-vetor_numeros[1]  //Atribui à variável 'menor' o primeiro valor do vetor 

//Para esse exemplo, será usado o laço de repetição 'for'
   para cont de 1 ate 274 faca
      escreva("Digite o ",vetor_numeros[cont]," valor: ") //Aqui ler os vetor_numeros
      leia(vetor_numeros[cont]) //Atribui o valor ao vetor
     //Aqui, é a lógica para fazer a troca
      se (vetor_numeros[cont] > maior) então 
         maior<-vetor_numeros[cont]
      fimse
      se (vetor_numeros[cont]<menor) então
         menor<-vetor_numeros[cont]
      fimse

   fimpara
   escreval("Maior valor: ", maior) //Aqui mostra o maior valor
   escreval("Menor valor: ", menor) //Aqui mostra o menor valor
   
fimalgoritmo