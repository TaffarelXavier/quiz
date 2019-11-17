$(document).ready(function() {
  var eventSelect = $(".js-example-basic-single");

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  const ALFABETO = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u"
  ];

  /**
   *
   */
  const MuitasQuestoes = {
    addQuestoes: function() {
      const texto = document.getElementById("textarea-muitas-questoes");
      const btnMuitQuest = document.getElementById(
        "btn-salvar-muitas-questoes"
      );
      btnMuitQuest.onclick = function() {
        try {
          var str = texto.value; //É o texto de qualquer lugar
          if (str.length > 0) {
            var spr = "item";

            const reg = new RegExp(spr + ".+\\d+", "gi");

            if (str.match(reg) !== null) {
              let m = str.split(reg);

              m = m.filter(el => {
                return el;
              });

              var json = [];

              m = m.filter(el => {
                const regex = /^\(?[a-zA-Z0-9]+\)/gim;

                //console.log();
                var questao = el.split("ff");
                //Pega o enunciando:
                let enuciado = questao[0].replace(regex, "").trim();

                let alternativas = questao[1];

                var questao = alternativas.split("\n");

                questao = questao.map((el, index) => {
                  var repl = el.match(regex);

                  var correta = el.match(/correta\:\w+/im);

                  if (repl !== null) {
                    /*return {
                      repl: el.replace(repl, "").trim(),
                      correta: 'a',
                    };*/
                    return el.replace(repl, "").trim();
                  }
                  return false;
                });

                questao = questao.filter(el => {
                  return el != false ? el : false;
                });

                questao.map(el => {
                  questao.enuciado = enuciado;
                });

                var content = "";

                console.log(questao);
                // questao.map(el=>{
                //   console.log(el);
                // })

                questao.map(el => {
                  console.log(el);
                  //content+=`<textarea style="width:100%;">${el.enuciado}</textarea>`;
                });

                $("#muita-questao").append(content);
              });
            }
          }
        } catch (error) {
          alert(error);
        }
      };
    }
  };

  MuitasQuestoes.addQuestoes();

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

  //Adicionar nova questão:
  const novaQuestao = () => {
    //
    let alternativas = Object.values($(".alternativa")).filter(el => {
      return el.name;
    });

    let letra = ALFABETO[alternativas.length];

    var conteudo = `<label><input type="radio" name="alter-correta" required/>Alternativa ${letra.toUpperCase()}:</label>
    <textarea class="form-control alternativa" rows="3" placeholder="Digite o texto da alternativa ${letra}" name="${letra}" required=""></textarea>`;

    $("#obter-mais-questoes").append(conteudo);
  };

  /***
   * Formulário do questões:
   */
  const formCriarQuestao = ({ quiz_id }) => {
    return `<form method="POST" id="form-criar-questao">
        <label>Enuciado:</label>
        <textarea class="form-control" placeholder="Adicione o enunciado da questão"
        required name="enunciado" rows="6"></textarea>
        <input id="separador" placeholder="Separador" value="separator"/>
        <button type="button" id="add-from-external-text">Adicionar questão de texto</button><br>
        <label><input type="radio" name="alter-correta" required/>Alternativa A:</label>
        <input type="hidden" name="quiz_id" value="${quiz_id}"/>
        <textarea class="form-control alternativa" rows="3" placeholder="Digite o texto da alternativa a" name="a" required=""></textarea>
        <div id="obter-mais-questoes"></div>
        <button id="btn-add-questao" class="btn btn-raised btn-primary" type="button">Adicionar outro campo de alternativa</button><br/>
        <label>Modalidade:</label><br/>
        <select name="modalidade" id="modalidade_id" class="form-control" required>
          <option value="">Selecione...</option> 
          <option value="1" selected="selected">Múltipa-escolha</option> 
          <option value="0">Verdadeiro-Falso</option> 
        </select><br/>
        <label>Correção da questão:</label>
        <textarea class="form-control explicacao" rows="3" placeholder="Explicação da questão"></textarea>
        <br>
        <button type="submit" class="btn btn-raised btn-primary btn-lg ">Salvar Questão</button></form>`;
  };

  //INÍCIO
  const questaoDetalhe = (
    {
      questao_id,
      questao_enunciado,
      questao_modalidade,
      alternativas,
      questao_correcao,
      incremento
    },
    titulo
  ) => {
    let enunciado =
      questao_enunciado === undefined
        ? "Nome do Quiz"
        : "<pre class='questao-enunciado'>" + questao_enunciado + "</pre>";

    let conteudo = `<details open id="questao_${questao_id}">
  <summary style='padding:10px !important;margin:0px;background:rgba(241,243,245,0.94)'>
      <strong>${incremento} > ${titulo} </strong>
  </summary>
  <summary style='padding:0px !important;margin:0px;'>
  <strong>${enunciado}</strong></summary><hr/>`;

    alternativas = alternativas.sort(function(a, b) {
      return 0.5 - Math.random();
    });

    let alt = alternativas.map(
      ({ alternativa_resposta, alternativa_correta }, index) => {
        if (questao_modalidade === "1") {
          //Multipla-escolha
          var letra = ALFABETO[index];

          var _data = "";
          var red = getRandomIntInclusive(0, 255);
          var green = getRandomIntInclusive(0, 255);
          var blue = getRandomIntInclusive(0, 255);

          var bgColor = `rgba(${red},${green},${blue},0.1)`;

          if (alternativa_correta === 1) {
            _data += `<div class="col-md-12"><p class="multipla-escolha certa" style="background:${bgColor}" data-questao-id="${questao_id}"
            data-questao-correta="${alternativa_correta}">
           <span class="letra-enuc">${letra.toUpperCase()}</span> ${alternativa_resposta}</p></div>`;
          } else {
            _data += `<div class="col-md-12"><p class="multipla-escolha errada" style="background:${bgColor}"  data-questao-id="${questao_id}"
            data-questao-correta="${alternativa_correta}">
            <span class="letra-enuc">${letra.toUpperCase()}</span> ${alternativa_resposta}</p></div>`;
          }

          return _data;
        }

        //Verdade-Falso
        let data = `<div class="col-md-6">`;

        if (alternativa_resposta == "1") {
          data += `<button class="verdadeiro-falso certo col-md-12" data-questao-id="${questao_id}"
          data-questao-correta="${alternativa_correta}">Certo</button>`;
        } else {
          data += `<button class="verdadeiro-falso errado col-md-12" data-questao-id="${questao_id}"
          data-questao-correta="${alternativa_correta}">Errado</button>`;
        }

        data += `</div>`;

        return data;
      }
    );

    conteudo += `<div class="row">${alt.join("")}</div></div>`;

    if (questao_correcao != null) {
      conteudo += `<p id="correcao_${questao_id}" class="correcao-class" hidden><br/><strong>Correção:</strong>
        <i>${questao_correcao}</i></p>`;
    }

    //if (questao_modalidade == "1") {
    conteudo += `<p id="explicacao_${questao_id}" class="explicacao" hidden></p>`;
    //}

    conteudo += `</details><hr style='margin-bottom:30px;margin-top:30px;'/>`;

    return conteudo;
  }; //FIM

  const carregarSomenteQuestoes = (questoes, titulo) => {
    var conteudoQuestoes = ``;

    questoes = questoes.sort((a, b) => {
      return 0.5 - Math.random();
    });

    var incremento = 0;

    for (let data of questoes) {
      incremento++;
      data.incremento = incremento;
      conteudoQuestoes += questaoDetalhe(data, titulo);
    }

    conteudoQuestoes += "";

    $("#get-questoes").html(conteudoQuestoes);
  };

  const carregarDados = () => {
    let params = new URL(window.location).searchParams;

    let quiz_id = params.get("quiz_id");

    let _flashCard = params.get("flashcard");

    if (quiz_id !== null) {
      //Busca um quiz por id
      Quiz.getByQuizId(quiz_id, result => {
        //Destruturing
        let { quiz_id, titulo, questoes } = result[0];
        //
        if (questoes.length > 0) {
          $("#quantidade-questoes-encontradas")
            .html(questoes.length + " questões encontradas.")
            .css({ background: "#f8f8f8" });
        }

        $("#titulo-do-quiz").html(`Questões sobre: ${titulo}`);

        if (Boolean(_flashCard) && _flashCard == "true") {
          flashCard(result[0]);
          if (_flashCard) {
            $("#get-inserir-quiz").hide();
          }
        } else {
          var isSomenteFlashCard = true;

          $("#links-flashcards")
            .css({backgroundColor :'red !important'})
            .removeClass("bg-esqueleto")
            .click((ev) => {
              if (isSomenteFlashCard) {
                flashCard(result[0]);
                isSomenteFlashCard = false;
                $(ev.target).html("Somente Questões");
              } else {
                carregarSomenteQuestoes(questoes, titulo);
                isSomenteFlashCard = true;
                $(ev.target).html("Flashcards");
              }
              /*if (_flashCard) {
                $("#get-inserir-quiz").hide();
              }*/
            });

          carregarSomenteQuestoes(questoes, titulo);

          //Responder quando for verdadeiro ou falso:
          $(".verdadeiro-falso").click(function() {
            var _this = $(this);

            var resposta = _this.attr("data-questao-correta");

            var questaoId = _this.attr("data-questao-id");

            var questao = $(`#questao_${questaoId}`);

            let red = "rgba(229,58,5,0.8)",
              green = "#2e7d32";

            if (resposta == "1") {
              $("#explicacao_" + questaoId)
                .html("Parabéns! Você acertou!")
                .removeAttr("hidden")
                .css({
                  color: "#23be87"
                });
            } else {
              $("#explicacao_" + questaoId)
                .html("Você errou!!!")
                .removeAttr("hidden")
                .css({
                  color: "red"
                });
            }

            if (resposta == "1" && _this.attr("class").includes("certo")) {
              questao.find(".errado").css({ background: red, color: "white" });
              questao.find(".certo").css({ background: green, color: "white" });
            } else if (
              resposta == "0" &&
              _this.attr("class").includes("certo")
            ) {
              questao
                .find(".errado")
                .css({ background: green, color: "white" });
              questao.find(".certo").css({ background: red, color: "white" });
            } else if (
              resposta == "1" &&
              _this.attr("class").includes("errado")
            ) {
              questao
                .find(".errado")
                .css({ background: green, color: "white" });
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

            let red = "rgba(208,29,29,0.94)",
              green = "#2e7d32";
            if (questaoCorreta === "1") {
              $("#explicacao_" + questaoId)
                .html("Parabéns! Você acertou!")
                .removeAttr("hidden")
                .css({
                  color: "#23be87",
                  display: "block"
                });
              questao.find(".errada").css({ background: red, color: "white" });
              _this.css({ background: green, color: "white" });
            } else {
              questao.find(".errada").css({ background: red, color: "white" });
              questao.find(".certa").css({ background: green, color: "white" });
              _this.css({ background: red, border: "2px dashed black" });
              $("#explicacao_" + questaoId)
                .html("Você errou!!!")
                .removeAttr("hidden")
                .css({
                  color: "red",
                  display: "block"
                });
            }
            $(`#correcao_${questaoId}`)
              .html("Voce errou!!!")
              .removeAttr("hidden");
          });

          var conteudo = `<!--<label>Nome do Quiz:</label>
          <h3>${titulo}</h3><hr/>-->${formCriarQuestao({ quiz_id })}`;

          //Adiciona o conteúdo de inserção de questões
          $("#get-inserir-quiz").html(conteudo); //Add conteúdo

          function insertAtCursor(myField, myValue) {
            //IE support
            if (document.selection) {
              myField.focus();
              sel = document.selection.createRange();
              sel.text = myValue;
            }
            //MOZILLA and others
            else if (myField.selectionStart || myField.selectionStart == "0") {
              var startPos = myField.selectionStart;
              var endPos = myField.selectionEnd;
              myField.value =
                myField.value.substring(0, startPos) +
                myValue +
                myField.value.substring(endPos, myField.value.length);
            } else {
              myField.value += myValue;
            }
          }

          const enunciadoEl = document.getElementsByName("enunciado");
          var separador = document.getElementById("separador");

          function copiarQuestaoExterna(texto) {
            try {
              var str = texto; //É o texto de qualquer lugar

              setTimeout(function() {
                if (str.length > 0) {
                  var spr = separador.value;

                  if (str.includes(spr)) {
                    let m = str.split(spr);

                    m = m.filter(el => {
                      return el;
                    });

                    const regex = /^\(?[a-zA-Z0-9]+\)/gim;

                    let enuciado = m[0].trim();

                    if (regex.test(m[0])) {
                      enuciado = m[0].replace(regex, "").trim();
                    }

                    let alternativas = m[1];

                    document.getElementsByName("enunciado")[0].value = enuciado;

                    var questao = alternativas.split("\n");

                    questao = questao.filter(el => {
                      return el.match(regex) ? el : el.trim();
                    });

                    var quantLinhas = questao.length;

                    for (var i = 0; i < quantLinhas - 1; i++) {
                      novaQuestao();
                    }

                    var alternativaEl = document.getElementsByClassName(
                      "alternativa"
                    );

                    for (var i = 0; i < quantLinhas; i++) {
                      alternativaEl[i].value = questao[i]
                        .replace(regex, "")
                        .trim();
                    }
                  }
                }
              }, 100);
            } catch (error) {
              alert(error);
            }
          }

          $("#add-from-external-text").click(function() {
            insertAtCursor(enunciadoEl[0], separador.value);
            copiarQuestaoExterna(enunciadoEl[0].value);
          });

          $("#modalidade_id").change(function() {
            var index = this.selectedIndex;
            if (index == 2) {
              novaQuestao();
            }
          });

          //Botão > Evento: add nova alternativa
          $("#btn-add-questao").click(() => {
            novaQuestao();
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
              if (res["questao_enunciado"] !== undefined) {
                alert("Questão adicionada com sucesso!");
                window.location.reload();
              }
            });

            return false;
          });
        }
      });
    } else {
      //Carregar os cartões
      Quiz.all(function(result) {
        result = result.map(el => {
          return `<a href="?quiz_id=${el.quiz_id}">${el.titulo}</a> | 
          <a href="?quiz_id=${el.quiz_id}&flashcard=true">FlashCards</a><br/>`;
        });
        $("#get-questoes").html(result.join(""));
        $("#get-inserir-quiz").html("");
      });
    }
  };

  carregarDados();
});
