(function() {
  var ProcessarDados = {
    texto: document.getElementById("textarea-muitas-questoes"),
    run: function() {
      var elTexto = this.texto;
      elTexto.oninput = function() {
        var _this = this;
        var regex = /^\d+/gims;
        var result = _this.value.split(regex).filter(el => {
          return el !== "" ? el : false;
        });
      
        var enuciado = result[0];
        console.log(enuciado.split("\n"))

        console.log(result);
      };
      $("#btn-processar-dados").click(function() {
        var regex = /^\d+/gims;
        console.log(texto.value.split(regex));
      });
    }
  };
  ProcessarDados.run();
})();
