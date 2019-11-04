$(document).ready(function() {
  const ls = window.localStorage;

  var eventSelect = $(".js-example-basic-single");

  SubCategoria.all(result => {
    let data = result.map(({ sub_categoria_id, sub_titulo }) => {
      return { id: sub_categoria_id, text: sub_titulo };
    });

    eventSelect.select2({
      data: data
    });
  });

  //Salvar categoria:
  $("#criar-categoria").submit(ev => {
    Categoria.store(this.forms[0].elements1);
    return false;
  });

  $("#criar-sub-categoria").submit(ev => {
    SubCategoria.store(this.forms[1].elements);
    return false;
  });

  $("#form-criar-quiz").submit(ev => {
    var data = eventSelect.select2("data");
    var form = document.querySelector("#form-criar-quiz");
    Quiz.store({ form, data }, result => {
      const { quiz_id } = result;
      window.location.href = "?quiz_id=" + quiz_id;
    });
    return false;
  });

  const novaQuestao = letra => {
    return `<label><input type="radio" name="alter-correta" required/>Alternativa ${letra.toUpperCase()}:</label>
    <textarea class="form-control alternativa" rows="3" placeholder="Digite o texto da alternativa ${letra}" name="${letra}" required=""></textarea>`;
  };

  const formCriarQuestao = ({ quiz_id }) => {
    return `<form method="POST" id="form-criar-questao">
        <h3><strong>Questão</strong></h3>
        <label>Enuciado:</label>
        <textarea class="form-control" placeholder="Adicione o enunciado da questão"
        required name="enunciado" rows="6"></textarea>
        <label><input type="radio" name="alter-correta" required/>Alternativa A:</label>
        <input type="hidden" name="quiz_id" value="${quiz_id}"/>
        <textarea class="form-control alternativa" rows="3" placeholder="Digite o texto da alternativa a" name="a" required=""></textarea>
        <label><input type="radio" name="alter-correta" required/>Alternativa B:</label>
        <textarea class="form-control alternativa" rows="3" placeholder="Digite o texto da alternativa b" name="b" required=""></textarea>
        <div id="obter-mais-questoes"></div><br/>
        <label>Modalidade:</label><br/>
        <select name="modalidade" class="form-control" required>
          <option value="">Selecione...</option> 
          <option value="1">Múltipa-escolha</option> 
          <option value="0">Verdadeiro-Falso</option> 
        </select><br/><br/>
        <button id="btn-add-questao" class="btn btn-raised btn-primary" type="button">Add Alternativa</button>
        <button type="submit" class="btn btn-raised btn-primary">Salvar Questão</button></form>`;
  };

  //INÍCIO
  const questaoDetalhe = ({
    questao_id,
    questao_enunciado,
    questao_modalidade,
    alternativas,
    questao_correcao
  }) => {
    let conteudo = `<details id="questao_${questao_id}">
  <summary><strong>${
    questao_enunciado === undefined ? "Nome do Quiz" : questao_enunciado
  }</strong></summary><hr/>`;

    alternativas = alternativas.sort(function(a, b) {
      return 0.5 - Math.random();
    });

    var letras = ["a", "b", "c", "d", "e"];

    let alt = alternativas.map(
      (
        {
          alternativa_id,
          alternativa_letra,
          alternativa_resposta,
          alternativa_correta
        },
        index
      ) => {
        if (questao_modalidade === "1") {
          //Multipla-escolha
          var letra = letras[index];

          var _data = "";

          if (alternativa_correta === 1) {
            _data += `<div class="col-md-12"><p class="multipla-escolha certa" data-questao-id="${questao_id}"
            data-questao-correta="${alternativa_correta}">
           ${letra.toUpperCase()}) ${alternativa_resposta}</p></div>`;
          } else {
            _data += `<div class="col-md-12"><p class="multipla-escolha errada" data-questao-id="${questao_id}"
            data-questao-correta="${alternativa_correta}">
           ${letra.toUpperCase()}) ${alternativa_resposta}</p></div>`;
          }

          return _data;
        }
        //Verdade-Falso
        let data = `<div class="col-md-6">`;

        if (alternativa_resposta == "1") {
          data += `<button class="verdadeiro-falso certo col-md-12" data-questao-id="${questao_id}"
          data-questao-correta="${alternativa_correta}">Verdade</button>`;
        } else {
          data += `<button class="verdadeiro-falso errado col-md-12" data-questao-id="${questao_id}"
          data-questao-correta="${alternativa_correta}">Falso</button>`;
        }

        data += `</div>`;

        return data;
      }
    );

    conteudo += `<div class="row">${alt.join("")}</div></div>`;

    if (questao_correcao != null) {
      conteudo += `<p id="correcao_${questao_id}" hidden><br/><strong>Correção:</strong>
        <i>${questao_correcao}</i></p>`;
    }

    conteudo += `</details>`;

    return conteudo;
  }; //FIM

  const carregarDados = () => {
    let params = new URL(window.location).searchParams;

    let quiz_id = params.get("quiz_id");

    if (quiz_id !== null) {
      //Busca um quiz por id
      Quiz.getByQuizId(params.get("quiz_id"), result => {
        //console.log(result[0]);
        //Destruturing
        let { quiz_id, titulo, questoes } = result[0];

        let conteudoQuestoes = "<h3><strong>Suas Questões</strong></h3>";

        questoes = questoes.sort((a, b) => {
          return 0.5 - Math.random();
        });

        for (let data of questoes) {
          conteudoQuestoes += questaoDetalhe(data);
        }

        $("#get-questoes").html(conteudoQuestoes);

        //Responder quando for verdadeiro ou falso:
        $(".verdadeiro-falso").click(function() {
          var _this = $(this);

          var resposta = _this.attr("data-questao-correta");

          var questaoId = _this.attr("data-questao-id");

          var questao = $(`#questao_${questaoId}`);

          let red = "#d84315",
            green = "#2e7d32";
          if (resposta == "1") {
            alert("Você acertou!");
          } else {
            alert("Você errou!");
          }

          if (resposta == "1" && _this.attr("class").includes("certo")) {
            questao.find(".errado").css({ background: red, color: "white" });
            questao.find(".certo").css({ background: green, color: "white" });
          } else if (resposta == "0" && _this.attr("class").includes("certo")) {
            questao.find(".errado").css({ background: green, color: "white" });
            questao.find(".certo").css({ background: red, color: "white" });
          } else if (
            resposta == "1" &&
            _this.attr("class").includes("errado")
          ) {
            questao.find(".errado").css({ background: green, color: "white" });
            questao.find(".certo").css({ background: red, color: "white" });
          } else if (
            resposta == "0" &&
            _this.attr("class").includes("errado")
          ) {
            questao.find(".errado").css({ background: red, color: "white" });
            questao.find(".certo").css({ background: green, color: "white" });
          }
          $(`#correcao_${questaoId}`).removeAttr("hidden");
        });

        //.multipla-escolha
        $(".multipla-escolha").click(function() {
          var _this = $(this);

          var questaoCorreta = _this.attr("data-questao-correta");

          var questaoId = _this.attr("data-questao-id");

          var questao = $(`#questao_${questaoId}`);

          let red = "#d84315",
            green = "#2e7d32";
          if (questaoCorreta === "1") {
            alert("Você acertou!");
            questao.find(".errada").css({ background: red, color: "white" });
            _this.css({ background: green, color: "white" });
          } else {
            questao.find(".errada").css({ background: red, color: "white" });
            questao.find(".certa").css({ background: green, color: "white" });
            _this.css({ border: "2px dashed black" });
            alert("Você errou!");
          }
          $(`#correcao_${questaoId}`).removeAttr("hidden");
        });

        var conteudo = `<label>Nome do Quiz:</label>
        <h3>${titulo}</h3><hr/>${formCriarQuestao({ quiz_id })}`;

        $("#get-data-quiz").html(conteudo); //Add conteúdo

        //Evento: add nova alternativa
        $("#btn-add-questao").click(() => {
          let alternativas = Object.values($(".alternativa")).filter(el => {
            return el.name;
          });

          var letras = ["a", "b", "c", "d", "e"];

          let letra = letras[alternativas.length];

          $("#obter-mais-questoes").append(novaQuestao(letra));
        });

        $("#form-criar-questao").submit(function() {
          var form = this;

          let alternativas = Object.values($(".alternativa")).filter(el => {
            if (typeof el == "object") {
              return el.value;
            }
          });

          alternativas = alternativas.map((el, index) => {
            var alterCorreta = document.getElementsByName("alter-correta")[
              index
            ];
            return {
              alternativa_letra: el.name,
              alternativa_resposta: el.value,
              alternativa_correta: alterCorreta.checked,
              questao_id: null
            };
          });

          Questao.store(form.elements, alternativas, res => {
            console.log(res);
          });

          return false;
        });
      });
    } else {
      Quiz.all(function(result) {
        result = result.map(el => {
          return `<a href="?quiz_id=${el.quiz_id}">${el.titulo}</a><br/>`;
        });
        $("#get-quizzes").html(result.join(""));
      });
    }
  };

  carregarDados();
});
