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
    <textarea class="form-control alternativa" rows="4" placeholder="Digite o texto da alternativa ${letra}" name="${letra}" required=""></textarea>`;
  };

  const formCriarQuestao = ({ quiz_id }) => {
    return `<form method="POST" id="form-criar-questao">
        <h3><strong>Questão</strong></h3>
        <label>Enuciado:</label>
        <textarea class="form-control" placeholder="Adicione o enunciado da questão"
        required name="enunciado" rows="6"></textarea>
        <label><input type="radio" name="alter-correta" required/>Alternativa A:</label>
        <input type="hidden" name="quiz_id" value="${quiz_id}"/>
        <textarea class="form-control alternativa" rows="4" placeholder="Digite o texto da alternativa a" name="a" required=""></textarea>
        <label><input type="radio" name="alter-correta" required/>Alternativa B:</label>
        <textarea class="form-control alternativa" rows="4" placeholder="Digite o texto da alternativa b" name="b" required=""></textarea>
        <div id="obter-mais-questoes"></div><br/>
        <button id="btn-add-questao" class="btn btn-raised btn-primary" type="button">Add Alternativa</button>
        <button type="submit" class="btn btn-raised btn-primary">Salvar Questão</button></form>`;
  };

  const carregarDados = () => {
    let params = new URL(window.location).searchParams;

    let quiz_id = params.get("quiz_id");

    if (quiz_id !== null) {
      //Busca um quiz por id
      Quiz.getByQuizId(params.get("quiz_id"), result => {
        //console.log(result[0]);
        //Destruturing
        const { quiz_id, titulo, questoes } = result[0];

        console.log(questoes);

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

        $("#form-criar-questao").submit(function(ev) {
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
    }
  };

  carregarDados();
});
