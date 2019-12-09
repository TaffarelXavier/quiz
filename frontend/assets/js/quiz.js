$(document).ready(function() {
  var eventSelect = $('.js-example-basic-single');

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  const ALFABETO = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'x',
    'y',
    'z'
  ];

  /**
   *Para adicionar muitas questões: modal
   */
  const MuitasQuestoes = {
    addQuestoes: function() {
      const texto = document.getElementById('textarea-muitas-questoes');
      const btnMuitQuest = document.getElementById('btn-salvar-muitas-questoes');
      btnMuitQuest.onclick = function() {
        try {
          var str = texto.value; //É o texto de qualquer lugar
          if (str.length > 0) {
            var spr = 'item';

            const reg = new RegExp(spr + '.+\\d+', 'gi');

            if (str.match(reg) !== null) {
              let m = str.split(reg);

              m = m.filter(el => {
                return el;
              });

              var json = [];

              m = m.filter(el => {
                const regex = /^\(?[a-zA-Z0-9]+\)/gim;

                var questao = el.split('ff');
                //Pega o enunciando:
                let enuciado = questao[0].replace(regex, '').trim();

                let alternativas = questao[1];

                var questao = alternativas.split('\n');

                questao = questao.map((el, index) => {
                  var repl = el.match(regex);

                  var correta = el.match(/correta\:\w+/im);

                  if (repl !== null) {
                    return el.replace(repl, '').trim();
                  }
                  return false;
                });

                questao = questao.filter(el => {
                  return el != false ? el : false;
                });

                questao.map(el => {
                  questao.enuciado = enuciado;
                });

                var content = '';
                questao.map(el => {
                  //content+=`<textarea style="width:100%;">${el.enuciado}</textarea>`;
                });

                $('#muita-questao').append(content);
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

  //Adicionar nova questão:
  const novaQuestao = () => {
    //
    let alternativas = Object.values($('.alternativa')).filter(el => {
      return el.name;
    });

    let letra = ALFABETO[alternativas.length];

    var conteudo = `<label><input type="radio" name="alter-correta" required/>Alternativa ${letra.toUpperCase()}:</label>
    <textarea class="form-control alternativa col-md-12" rows="3" placeholder="Digite o texto da alternativa ${letra}" name="${letra}" required=""></textarea>`;

    $('#obter-mais-questoes').append(conteudo);
  };

  const templateQuandoVerdadeiroOuFalso = ({ quiz_id }) => {
    var conteudo = `<label><input type="radio" name="alter-correta" required/>Opção de resposta 2</label>
    <textarea class="form-control alternativa" rows="3" placeholder="Digite o texto da alternativa b" name="b" required="">0</textarea>`;
    document.getElementsByName('a')[0].value = '1';
    document.getElementsByName('enunciado')[0].focus();
    $('#obter-mais-questoes').html(conteudo);
  };

  /***
   * Formulário do questões:
   */
  const formCriarQuestao = ({ prova_id }) => {
    return `<div class="row">
    <div class="col-md-12">
    <form method="POST" id="form-criar-questao">
        <div class="row">
          <label>Enuciado:</label>
          <textarea class="form-control" placeholder="Adicione o enunciado da questão"
          required name="enunciado" rows="5"></textarea>
        </div>
        <div class="row">
          <input id="separador" placeholder="Separador" value="separator" class="col-md-4"/>
          <button type="button" class="btn btn-raised btn-primary col-md-4" id="add-from-external-text">Adicionar questão de texto</button>
          <select name="modalidade" id="modalidade_id" class="form-control col-md-4"  required>
            <option value="">Selecione...</option> 
            <option value="1" selected="selected">Múltipa-escolha</option> 
            <option value="0">Verdadeiro-Falso</option> 
          </select><br/>
        </div>
        <div class="row">
          <div class="col-md-12">
            <label><input type="radio" name="alter-correta" required/>Alternativa A:</label>
            <input type="hidden" name="prova_id" value="${prova_id}" class="col-md-12"/>
            <textarea class="form-control alternativa col-md-12" rows="3" placeholder="Digite o texto da alternativa a" name="a" required=""></textarea>
          </div>
          <div class="col-md-12">
            <div id="obter-mais-questoes"></div>
            <button id="btn-add-questao" class="btn btn-raised btn-primary" type="button">Adicionar outro campo de alternativa</button><br/>
          </div>
          <div class="col-md-12">
            <label>Correção da questão:</label>
            <textarea class="form-control" rows="3" placeholder="Explicação da questão"></textarea>
            <!--explicacao-->
          </div>
          <div class="col-md-12"><br>
            <button type="submit" class="btn btn-raised btn-primary btn-lg ">Salvar Questão</button>
          </div>
        </div>
        </form></div></div>`;
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
        ? 'Nome do Prova'
        : "<pre class='questao-enunciado'>" + questao_enunciado + '</pre>';

    let mod = questao_modalidade == 1 ? 'multipla' : 'verdadeiro_falso';

    let conteudo = `<div class="painel-questao" style="border:0px solid rgba(55,0,0,0.2);"
    id="questao_card_${incremento}"
    data-questao-id="${questao_id}"
    data-modalidade="${mod}">
    <details open id="questao_${questao_id}">
  <summary style='padding:10px !important;margin:0px;background:rgba(241,243,245,0.94)'>
  <strong>${incremento} > ${titulo} </strong>
  <button class="btn excluir-questao" style="float:right;margin:0;padding:0;" data-id="${questao_id}">
  <i class="material-icons-sharp">restore_from_trash
  </i></button>   
  </summary>
  <h3 class="enuciado-p"><strong>${enunciado}</strong></h3><hr/>`;

    alternativas = alternativas.sort(function(a, b) {
      return 0.5 - Math.random();
    });

    let alt = alternativas.map(
      ({ cor, alternativa_resposta, alternativa_correta }, index) => {
        if (questao_modalidade === '1') {
          //Multipla-escolha
          var letra = ALFABETO[index];

          var _data = '';

          var red = getRandomIntInclusive(0, 255);
          var green = getRandomIntInclusive(0, 255);
          var blue = getRandomIntInclusive(0, 255);

          var bgColor = `rgba(${red},${green},${blue},0.7)`;

          if (cor != null) {
            bgColor = cor;
          }

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

        //Verdadeiro ou Falso
        let data = `<div class="col-md-6">`;

        if (alternativa_resposta == '1') {
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

    conteudo += `<div class="row">${alt.join('')}</div>`;

    if (questao_correcao != null) {
      conteudo += `<p id="correcao_${questao_id}" class="correcao-class" hidden><br/><strong>Correção:</strong>
        <i>${questao_correcao}</i></p>`;
    }

    conteudo += `<!--<br/>--><p id="explicacao_${questao_id}" class="explicacao" hidden></p>`;

    conteudo += `</details><hr style='margin-bottom:30px;margin-top:30px;'/></div>`;

    return conteudo;
  }; //FIM DO TEMPLATE questaoDetalhe--

  const carregarSomenteQuestoes = (questoes, titulo) => {
    var conteudoQuestoes = ``;
    var incremento = 0;

    questoes = questoes.sort((a, b) => {
      return 0.5 - Math.random();
    });

    for (let data of questoes) {
      incremento++;
      data.incremento = incremento;
      conteudoQuestoes += questaoDetalhe(data, titulo);
    }
    if (questoes.length) {
      $('#get-questoes').html(conteudoQuestoes);
    }
  };

  function irParaProximaQuestao(arry, questaoId, topMargin = 55) {
    var cardQuestao = [...document.getElementsByClassName('painel-questao')];

    var elCartQuestao = cardQuestao.filter(el => {
      //Verdadeiro ou falso
      if (el.dataset.modalidade === 'verdadeiro_falso') {
        if (questaoId == el.dataset.questaoId) {
          return el;
        }
      } else {
        //Multipla Escolha
        if (questaoId == el.dataset.questaoId) {
          return el;
        }
      }
    });

    var myId = elCartQuestao[0].id.split('_');

    var nId = parseInt(++myId[2]);

    console.log(nId);

    var obj = $('#questao_card_' + nId).offset();

    if (obj !== undefined) {
      $('html, body')
        .delay(1000)
        .animate({ scrollTop: obj.top - topMargin }, 100);
    } else {
      $('html, body')
        .delay(1000)
        .animate({ scrollTop: 0 }, 100);
    }

    /*var index = arry.findIndex(el => el.id == 'questao_' + questaoId);
    if (index === arry.length - 1) {
      arry = arry[0];
    } else {
      arry = arry[++index];
    }
    $('html, body')
      .delay(1000)
      .animate({ scrollTop: $('#' + arry.id).offset().top - topMargin }, 500);*/
  }

  const carregarDados = () => {
    let params = new URL(window.location).searchParams;

    let quiz_id = params.get('quiz_id');

    let _flashCard = params.get('flashcard');

    if (quiz_id !== null) {
      //Busca um quiz por id
      Prova.getByProvaId(quiz_id, result => {
        //Destruturing
        let { prova_id, titulo, questoes } = result[0];

        //
        if (questoes.length > 0) {
          $('#quantidade-questoes-encontradas')
            .html(questoes.length + ' questões encontradas.')
            .css({ background: '#f8f8f8' });
        }

        $('#titulo-do-quiz').html(`Questões sobre: <strong>${titulo}</strong>`);

        if (Boolean(_flashCard) && _flashCard == 'true') {
          flashCard(result[0]);
          if (_flashCard) {
            $('#get-inserir-quiz').hide();
          }
        } else {
          var isSomenteFlashCard = true;

          $('#links-flashcards')
            .css({ backgroundColor: 'red !important' })
            .removeClass('bg-esqueleto')
            .click(ev => {
              if (isSomenteFlashCard) {
                flashCard(result[0]);
                isSomenteFlashCard = false;
                $(ev.target).html('Somente Questões');
              } else {
                carregarSomenteQuestoes(questoes, titulo);
                isSomenteFlashCard = true;
                $(ev.target).html('Flashcards');
              }
            });

          carregarSomenteQuestoes(questoes, titulo);

          //Percorre todas os details, por exemplo.
          let arry = [...document.getElementsByTagName('details')];
          //ArrayPainel
          let cardQuestao = [...document.getElementsByClassName('painel-questao')];

          //Responder quando for verdadeiro ou falso:
          $('.verdadeiro-falso').click(function() {
            var _this = $(this);

            var resposta = _this.attr('data-questao-correta');

            var questaoId = _this.attr('data-questao-id');

            var questao = $(`#questao_${questaoId}`);

            irParaProximaQuestao(arry, questaoId);

            let red = 'rgba(229,58,5,0.8)',
              green = '#2e7d32';

            if (resposta == '1') {
              $('#explicacao_' + questaoId)
                .html('Parabéns! Você acertou!')
                .removeAttr('hidden')
                .css({
                  color: '#23be87',
                  display: 'block'
                });
            } else {
              $('#explicacao_' + questaoId)
                .html('Você errou!!!')
                .removeAttr('hidden')
                .css({
                  color: 'red',
                  display: 'block'
                });
            }

            if (resposta == '1' && _this.attr('class').includes('certo')) {
              questao.find('.errado').css({ background: red, color: 'white' });
              questao.find('.certo').css({ background: green, color: 'white' });
            } else if (resposta == '0' && _this.attr('class').includes('certo')) {
              questao.find('.errado').css({ background: green, color: 'white' });
              questao.find('.certo').css({ background: red, color: 'white' });
            } else if (resposta == '1' && _this.attr('class').includes('errado')) {
              questao.find('.errado').css({ background: green, color: 'white' });
              questao.find('.certo').css({ background: red, color: 'white' });
            } else if (resposta == '0' && _this.attr('class').includes('errado')) {
              questao.find('.errado').css({ background: red, color: 'white' });
              questao.find('.certo').css({ background: green, color: 'white' });
            }
            $(`#correcao_${questaoId}`).removeAttr('hidden');
          });

          //.multipla-escolha

          $('.multipla-escolha').click(function() {
            var _this = $(this);

            var questaoCorreta = _this.attr('data-questao-correta');

            var questaoId = parseInt(_this.attr('data-questao-id'));

            var questao = $(`#questao_${questaoId}`);

            irParaProximaQuestao(arry, questaoId);

            let red = 'rgba(208,29,29,0.94)',
              green = '#2e7d32';
            if (questaoCorreta === '1') {
              $('#explicacao_' + questaoId)
                .html('Parabéns! Você acertou!')
                .removeAttr('hidden')
                .css({
                  color: '#23be87',
                  display: 'block'
                });
              questao.find('.errada').css({ background: red, color: 'white' });
              _this.css({ background: green, color: 'white' });
            } else {
              questao.find('.errada').css({ background: red, color: 'white' });
              questao.find('.certa').css({ background: green, color: 'white' });
              _this.css({ background: red, border: '2px dashed black' });
              $('#explicacao_' + questaoId)
                .html('Você errou!!!')
                .removeAttr('hidden')
                .css({
                  color: 'red',
                  display: 'block'
                });
            }
            $(`#correcao_${questaoId}`)
              .html('Voce errou!!!')
              .removeAttr('hidden');
          });

          var conteudo = `<!--<label>Nome do Prova:</label>
          <h3>${titulo}</h3><hr/>-->${formCriarQuestao({ prova_id })}`;

          //Adiciona o conteúdo de inserção de questões
          $('#get-inserir-quiz').html(conteudo); //Add conteúdo

          //Ao clicar seleciona somente questões múltiplas escolhas

          var idIncremental = 0;

          $('#btn-verdadeiro-falso').click(() => {
            $('.painel-questao').removeAttr('id');
            cardQuestao.map(el => {
              if (el.dataset.modalidade === 'multipla') {
                $(el).css({ display: 'none' });
              } else {
                ++idIncremental;
                el.id = `questao_card_${idIncremental}`;
                $(el).css({ display: 'block' });
              }
            });
          });

          //Ao clicar seleciona somente questões múltiplas escolhas
          $('#btn-multipla-escolha').click(() => {
            $('.painel-questao').removeAttr('id');
            cardQuestao.map(el => {
              if (el.dataset.modalidade === 'verdadeiro_falso') {
                $(el).css({ display: 'none' });
              } else {
                ++idIncremental;
                el.id = `questao_card_${idIncremental}`;
                $(el).css({ display: 'block' });
              }
            });
          });

          var painelQuestao = [...document.getElementsByClassName('painel-questao')];

          $('.excluir-questao').click(function(ev) {
            var _this = $(this);
            ev.preventDefault();
            if (confirm('Deseja realmente excluir esta nota?')) {
              var questaoId = parseInt(_this.attr('data-id'));
              painelQuestao.filter(el => {
                if (el.dataset.questaoId == questaoId) {
                  Questao.delete(questaoId, function(result){
                   alert(result);
                  })
                  el.remove();
                }
              });
            }
            return false;
          });

          function insertAtCursor(myField, myValue) {
            //IE support
            if (document.selection) {
              myField.focus();
              sel = document.selection.createRange();
              sel.text = myValue;
            }
            //MOZILLA e outros
            else if (myField.selectionStart || myField.selectionStart == '0') {
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

          const enunciadoEl = document.getElementsByName('enunciado');

          var separador = document.getElementById('separador');

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

                    const regex = /^\(?[a-zA-Z0-9]+(\)|\.)/gim;

                    let enuciado = m[0].trim();

                    if (regex.test(m[0])) {
                      enuciado = m[0].replace(regex, '').trim();
                    }

                    let alternativas = m[1];

                    document.getElementsByName('enunciado')[0].value = enuciado;

                    var questao = alternativas.split('\n');

                    questao = questao.filter(el => {
                      return el.match(regex) ? el : el.trim();
                    });

                    var quantLinhas = questao.length;

                    for (var i = 0; i < quantLinhas - 1; i++) {
                      novaQuestao();
                    }

                    var alternativaEl = document.getElementsByClassName('alternativa');

                    for (var i = 0; i < quantLinhas; i++) {
                      alternativaEl[i].value = questao[i].replace(regex, '').trim();
                    }
                  }
                }
              }, 100);
            } catch (error) {
              alert(error);
            }
          }

          $('#add-from-external-text').click(function() {
            insertAtCursor(enunciadoEl[0], separador.value);
            copiarQuestaoExterna(enunciadoEl[0].value);
          });

          $('#modalidade_id').change(function() {
            var index = this.selectedIndex;
            if (index == 2) {
              templateQuandoVerdadeiroOuFalso({ quiz_id });
            }
          });

          //Botão > Evento: add nova alternativa
          $('#btn-add-questao').click(() => {
            novaQuestao();
          });

          $('#form-criar-questao').submit(function() {
            var form = this;

            let alternativas = Object.values($('.alternativa')).filter(el => {
              if (typeof el == 'object') {
                return el.value;
              }
            });

            var cor = gerarCorAleatoria(alternativas.length);

            alternativas = alternativas.map((el, index) => {
              var alterCorreta = document.getElementsByName('alter-correta')[index];
              return {
                alternativa_letra: el.name,
                alternativa_resposta: el.value,
                alternativa_correta: alterCorreta.checked,
                cor: cor[index]
              };
            });

            Questao.store(form.elements, alternativas, res => {
              if (res['questao_enunciado'] !== undefined) {
                alert('Questão adicionada com sucesso!');
                window.location.reload();
              }
            });
            return false;
          });
        }
      });
    } else {
      //Carregar os cartões
      //   Prova.all(function(result) {
      //     result = result.map(el => {
      //       return `<a href="?quiz_id=${el.quiz_id}">${el.titulo}</a> |
      //       <a href="?quiz_id=${el.quiz_id}&flashcard=true">FlashCards</a><br/>`;
      //     });
      //     $('#get-questoes').html(result.join(''));
      //     $('#get-inserir-quiz').html('');
      //   });
    }
  };

  carregarDados();
});
