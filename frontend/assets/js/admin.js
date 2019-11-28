$(document).ready(function() {
  const ls = window.localStorage;

  var eventSelect = $('.js-example-basic-single');

  //Mostra todas as categorias:
  Disciplina.all(result => {

    let data = result.map(({ categoria_id, titulo }) => {
      return { id: categoria_id, text: titulo };
    });

    eventSelect
      .select2({
        data: data,
      })
      .on('change', function(e) {
        var categoria_id = parseInt(e.target.value);
        $('#get-categoria-id').val(categoria_id);

        SubCategoria.getByCategoriaId(categoria_id, function(res) {
          let inputs = res.map(({ sub_categoria_id, sub_titulo }) => {
            return `<div class="custom-control custom-radio"
                         style="border:1px solid #ccc; float:left; 
                         justify-items:center;align-content: center;padding:0px;
                         display:grid;align-items:center;margin:4px;">
              <input type="radio" id="subcategoria_${sub_categoria_id}"
              data-subcategoria-id="${sub_categoria_id}" name="subcategoria" 
              class="sub-categorias custom-control-input" required />
              <label class="custom-control-label" style="width:100%;padding:20px;height: 100%;border:0px solid red;" 
              for="subcategoria_${sub_categoria_id}">${sub_titulo}</label>
              </div>`;
          });
          $('#get-sub-categorias').html(inputs.join('') + '<br/>');
          $('.sub-categorias').change(function() {
            var subCategoriaId = $(this).attr('data-subcategoria-id');
            $('#sub_categoria_id').val(subCategoriaId);
          });
        });
      });

      /*
    let inputs = result.map(({ categoria_id, titulo }) => {
      return `<div class="custom-control">
        <label for="${categoria_id}">${titulo}</label>
    </div>`;
    });

    //Mostra as categorias:
    $('#get-categorias').html(inputs.join('') + '<br/>');
*/
    $('.categorias').change(function() {
      
      var categoria_id = parseInt(this.id);

      $('#get-categoria-id').val(categoria_id);

      SubCategoria.getByCategoriaId(categoria_id, function(res) {
        let inputs = res.map(({ sub_categoria_id, sub_titulo }) => {
          return `<div class="custom-control custom-radio"
                       style="border:1px solid #ccc; float:left; 
                       justify-items:center;align-content: center;padding:20px;
                       display:grid;align-items:center;margin:4px;">
            <input type="radio" id="subcategoria_${sub_categoria_id}"
            data-subcategoria-id="${sub_categoria_id}" name="subcategoria" 
            class="sub-categorias custom-control-input" required />
            <label class="custom-control-label" for="subcategoria_${sub_categoria_id}">${sub_titulo}</label>
            </div>`;
        });
        $('#get-sub-categorias').html(inputs.join('') + '<br/>');
        $('.sub-categorias').change(function() {
          var subCategoriaId = $(this).attr('data-subcategoria-id');
          $('#sub_categoria_id').val(subCategoriaId);
        });
      });
    });
  });

  //Salvar categoria:
  $('#criar-categoria').submit(ev => {
    Disciplina.store(this.forms[0].elements);
    return false;
  });
  //Salvar
  $('#criar-sub-categoria').submit(ev => {
    SubCategoria.store(this.forms[1].elements);
    return false;
  });

  $('#form-criar-quiz').submit(ev => {
    var data = eventSelect.select2('data');
    var form = document.querySelector('#form-criar-quiz');
    Quiz.store({ form, data }, result => {
      alert(JSON.stringify(result));
    });
    return false;
  });

  /*$("#btn-salvar-questao").click(() => {
              var form = document.getElementsByTagName("form")[0];
      
              let { enuciado, alt_a, alt_b, alt_c, alt_d } = form.elements;
      
              let altA = alt_a.value;
              let altB = alt_b.value;
              let altC = alt_c.value;
              let altD = alt_d.value;
      
              let questaoCorreta = "";
      
              var alternaticasCorretas = document.getElementsByName("customRadio");
      
              //Pega a alternativa correta.
      
              Object.values(alternaticasCorretas).map(el => {
                  if (el.checked) {
                      questaoCorreta = el.getAttribute("data-questao");
                  }
              });
      
              if (questaoCorreta === "") {
                  alert("Marque uma questão correta.");
              } else {
                  var questao = {
                      enuciado: enuciado.value,
                      alterA: altA,
                      alterB: altB,
                      alterC: altC,
                      alterD: altD,
                      alternativaCorreta: questaoCorreta,
                  };
      
                  var questoes = [];
      
                  if (!ls.getItem("todas_questoes")) {
                      questoes.push(questao);
                      ls.setItem("todas_questoes", JSON.stringify(questoes));
                  } else {
                      var questoes = JSON.parse(ls.getItem("todas_questoes"));
      
                      var questa1 = JSON.stringify(questoes);
      
                      questoes.push(questao);
      
                      ls.setItem("todas_questoes", JSON.stringify(questoes));
      
                      var questa2 = ls.getItem("todas_questoes");
      
                      if (!(questa1 === questa2)) {
                          alert("Questão adicionada com sucesso!");
                      } else {
                          alert("Houve um erro!");
                      }
                  }
              }
          });
          $("#enuciado_id")
              .select()
              .focus();*/
});
