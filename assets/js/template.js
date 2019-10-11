/**
 *
 * @param {*} Questoes
 * @param {*} questao__Id
 */
function component(Questoes, questao__Id) {
  let questaoSelecionada = Questoes[questao__Id];

  var arr = [
    {
      texto: `<div title="Clique para marcar essa resposta como certa." 
  class="col s3 m4 l3 alternativa" data-value="a"><p style="background-color: #2f6dae;">${questaoSelecionada.alterA.toUpperCase()}</p></div>`
    },
    {
      texto: `<div title="Clique para marcar essa resposta como certa." 
  class="col s3 m4 l3 alternativa" data-value="b"><p style="background-color: #2c9ca6;">${questaoSelecionada.alterB.toUpperCase()}</p></div>`
    },
    {
      texto: ` 
  <div title="Clique para marcar essa resposta como certa." 
  class="col s3 m4 l3 alternativa" data-value="c"><p style="background-color: #eca82c;">${questaoSelecionada.alterC.toUpperCase()}</p></div>`
    },
    {
      texto: `<div title="Clique para marcar essa resposta como certa." 
  class="col s3 m4 l3 alternativa" data-value="d"><p style="background-color: #d4546a;">${questaoSelecionada.alterD.toUpperCase()}</p></div>`
    }
  ];


  arr.sort(function() {
    return .5 - Math.random();
  });

console.log(arr);


  let template = `<div class="main" hidden>
    <div class="titulo">
    <h1>${questaoSelecionada.enuciado}</h1>
    </div>
    <div class="row">
    <div class="col s12 m12 l12">`;
for(let d of arr){
  template += d.texto;
}
  template += `<input type="hidden" value="${questaoSelecionada.alternativaCorreta}" id="resposta-correta" />
    <input type="hidden" value="${questaoSelecionada.id}" id="questao-id" />
    </div>
    </div>
    </div>`;
  return template;
}
