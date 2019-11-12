/**
 *
 */
var PesquisarPorPalavraChave = {
  palavra: document.getElementById("input-palavra-chave"),
  pesquisar: function(callback) {
    this.palavra.oninput = function() {
      var _this = this.value;
      //removeSinaisDiacriticos está na pasta funções > funcoes.js
      callback(removeSinaisDiacriticos(_this))
    };
  }
};
/**
 * 
 * Usar desta forma:
 * PesquisarPorPalavraChave.pesquisar(function(text){
    console.log(text);
});

 */
