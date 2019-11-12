/**
 *
 * @param {*} Questoes
 * @param {*} questao__Id
 */
function component(Questoes, questao__Id) {
  let {
    alterA,
    alterB,
    alterC,
    alterD,
    id,
    enuciado,
    alternativaCorreta,
  } = Questoes[questao__Id];

  var arrCores = [
    "#2f6dae",
    "#2c9ca6",
    "#004d40",
    "#eca82c",
    "#d4546a",
    "black",
    "#1976d2",
    "#26a69a",
    '#9e9d24',
    '#e65100',
    '#795548',
    '#607d8b'
  ];

  const QUANT_ELEMENTOS = 4;

  var arrC = arrCores
  .sort(function() { return .5 - Math.random() }) // Shuffle array
  .slice(0, QUANT_ELEMENTOS); // Get first 2 items


  var arr = [
    {
      texto: `<div title="Clique para marcar essa resposta como certa." 
  class="col s3 m4 l3 alternativa" data-value="a"><p style="background-color: ${
    arrC[0]
  };">${alterA.toUpperCase()}</p></div>`,
    },
    {
      texto: `<div title="Clique para marcar essa resposta como certa." 
  class="col s3 m4 l3 alternativa" data-value="b"><p style="background-color: ${
    arrC[1]
  };">${alterB.toUpperCase()}</p></div>`,
    },
    {
      texto: ` 
  <div title="Clique para marcar essa resposta como certa." 
  class="col s3 m4 l3 alternativa" data-value="c"><p style="background-color: ${
    arrC[2]
  };">${alterC.toUpperCase()}</p></div>`,
    },
    {
      texto: `<div title="Clique para marcar essa resposta como certa." 
  class="col s3 m4 l3 alternativa" data-value="d"><p style="background-color:${
    arrC[3]
  };">${alterD.toUpperCase()}</p></div>`,
    },
  ];

  arr.sort(function() {
    return 0.5 - Math.random();
  });

  let template = `<div class="main" hidden>
    <div class="titulo">
    <h1>${enuciado}</h1>
    </div>
    <div class="row">
    <div class="col s12 m12 l12">`;
  for (let d of arr) {
    template += d.texto;
  }
  template += `<input type="hidden" value="${alternativaCorreta}" id="resposta-correta" />
    <input type="hidden" value="${id}" id="questao-id" />
    </div>
    </div>
    </div>`;
  return template;
}
