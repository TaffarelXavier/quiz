const cartao = ({
  questao_enunciado,
  questao_modalidade,
  questao_correcao,
  questao_id,
  alternativas,
}) => {
  alternativas = alternativas.filter(el => {
    if (el.alternativa_correta === 1) {
      return el.alternativa_resposta;
    }
  });

  var gabarito = alternativas[0].alternativa_resposta;

  if (questao_modalidade == "0") {//Caso seja verdadeiro-falso
    gabarito = questao_correcao;
  }
  
  return `<div class="row">
  <div class="col-md-12" style='padding:0px;'>
  <div class="cols">
  <div class="coluna">
    <div class="container-flashcard">
      <div class="front" id="card_front_${questao_id}" data-card-id="${questao_id}" style="background: #1e8cc2">
        <div class="inner">
          <p><pre class="flash-enunciado">${questao_enunciado}</pre></p>
          <!-- <span>Lorem ipsum</span> -->
        </div>
      </div>
      <div class="back" id="card_back_${questao_id}" data-card-id="${questao_id}" >
        <div class="inner">
          <p>
            ${gabarito}
          </p>
        </div>
      </div>
    </div>
  </div>
  <img src="assets/images/flashcard_shadow-7d95fac1c27baecdd207703e32d658d5b5fffd90f5f764b6ef44ca8cfcba8b43.png" />
</div>
</div>
</div>`;
};

const flashCard = result => {

  let questoes = result.questoes;

  let quiz_id = result.quiz_id;

  let conteudoQuestoes = ``;

  $('#links-flashcards').html('Somente Questões').css({display:"inline-block"}).attr("href",`?quiz_id=${quiz_id}`)

  questoes = questoes.sort((a, b) => {
    return 0.5 - Math.random();
  });

  for (let {
    questao_enunciado,
    questao_id,
    alternativas,
    questao_correcao,
    questao_modalidade,
  } of questoes) {
    conteudoQuestoes += cartao({
      questao_enunciado,
      questao_modalidade,
      questao_correcao,
      questao_id,
      alternativas,
    });
  }

  $("#get-questoes").html(conteudoQuestoes);

  $(".front").click(function() {
    console.log("A");
    var _this = $(this);
    var id = _this.attr("data-card-id");

    $(this).css({
      webkitTransform: "rotateY(-180deg)",
      transform: "rotateY(-180deg)",
      webkitTransformStyle: "preserve-3d;",
      transformStyle: "preserve-3d;",
    });
    $(`#card_back_${id}`).css({
      webkitTransform: "rotateY(0deg)",
      transform: "rotateY(0deg)",
      webkitTransformStyle: "preserve-3d;",
      transformStyle: "preserve-3d;",
    });
  });

  $(".back").click(function() {
    var _this = $(this);
    var id = _this.attr("data-card-id");
    $(this).css({
      webkitTransform: "rotateY(180deg)",
      transform: "rotateY(180deg)",
      webkitTransformStyle: "preserve-3d;",
      transformStyle: "preserve-3d;",
    });
    $(`#card_front_${id}`).css({
      webkitTransform: "rotateY(0deg)",
      transform: "rotateY(0deg)",
      webkitTransformStyle: "preserve-3d;",
      transformStyle: "preserve-3d;",
    });
  });
};
