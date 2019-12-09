const IP = [
  {
    protocol: 'http',
    address: 'lccomputacaoturma2018-com-br.umbler.net',
    port: ''
  },
  {
    protocol: 'http',
    address: '127.0.0.1',
    port: '3333'
  }
];

const INDEX = 1;

const URL_API = `${IP[INDEX].protocol}://${IP[INDEX].address}:${IP[INDEX].port}`;

var carregarCasoFalha = error => {
  if (error.message === 'Failed to fetch') {
    setInterval(function() {
      window.location.reload();
    }, 5000);
  }
};

/**
 * CATEGORIAS
 */
var Disciplina = {
  /*Cria uma categoria*/
  store: function({ categoria }) {
    var form = new FormData();

    form.append('categoria', categoria.value);

    fetch(URL_API + '/disciplina', {
      method: 'POST',
      body: form
    })
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            console.log(result);
          });
        } else {
          console.log('Network response was not ok.');
        }
      })
      .catch(function(error) {
        console.warn(
          'There has been a problem with your fetch operation: ' + error.message
        );
      });
  },
  /*Busca todas as categorias*/
  all: function(callback) {
    fetch(URL_API + '/disciplina', {
      method: 'GET'
    })
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            callback(result);
          });
        } else {
          console.log('Network response was not ok.');
        }
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ' + error.message
        );
      });
  }
};
/**
 * SUB-CATEGORIAS
 */
var SubCategoria = {
  /*Cria uma categoria*/
  store: function({ sub_titulo, categoria_id }) {
    var form = new FormData();

    form.append('sub_titulo', sub_titulo.value);
    form.append('categoria_id', categoria_id.value);

    fetch(URL_API + '/sub_categoria', {
      method: 'POST',
      body: form
    })
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            console.log(result);
          });
        } else {
          console.log('Network response was not ok.');
        }
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ' + error.message
        );
      });
  },
  /*Busca todas as categorias*/
  all: function(callback) {
    fetch(URL_API + '/sub_categoria', {
      method: 'GET'
    })
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            callback(result);
            /*  let inputs = result.map(({ categoria_id, titulo }) => {
              return `<label><input type="radio" name="categoria" />${titulo}</label>`;
            });
            $("#get-categorias").html(inputs.join("<br/>"));*/
          });
        } else {
          console.log('Network response was not ok.');
        }
      })
      .catch(function(error) {
        carregarCasoFalha(error);
      });
  },
  getByCategoriaId: function(categoria_id, callback) {
    var url = new URL(URL_API + '/sub_categoria');
    var params = { categoria_id: categoria_id };
    url.search = new URLSearchParams(params).toString();
    fetch(url).then(function(response) {
      if (response.ok) {
        response.json().then(result => {
          return callback(result);
        });
      }
    });
  }
};

var Prova = {
  /*Cria uma categoria*/
  store: function({ form, data }, callback) {
    var formDt = new FormData();

    try {
      if (data[0]) {
        delete data[0].element;

        formDt.append('titulo', form.titulo.value);
        //formDt.append("descricao", descricao.value);

        formDt.append('sub_categoria_id', JSON.stringify(data[0]));

        fetch(URL_API + '/prova', {
          method: 'POST',
          body: formDt
        })
          .then(function(response) {
            if (response.ok) {
              response.json().then(function(result) {
                callback(result);
              });
            } else {
              carregarCasoFalha(error);
            }
          })
          .catch(function(error) {
            carregarCasoFalha(error);
          });
      }
    } catch (error) {
      console.error('Houve um Erro:', error);
    }
  },
  /*Busca todas as categorias*/
  all: function(callback) {
    fetch(URL_API + '/prova', {
      method: 'GET'
    })
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            callback(result);
          });
        } else {
          console.log('Network response was not ok.');
        }
      })
      .catch(function(error) {
        carregarCasoFalha(error);
      });
  },
  getByCategoriaId: function(categoria_id, callback) {
    var url = new URL(URL_API + '/sub_categoria');
    var params = { categoria_id: categoria_id };
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then(function(response) {
        if (response.ok) {
          response.json().then(result => {
            return callback(result);
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  getByProvaId: function(quizId, callback) {
    var url = new URL(URL_API + '/prova');

    var params = { quiz_id: quizId };

    url.search = new URLSearchParams(params).toString();

    fetch(url)
      .then(function(response) {
        if (response.ok) {
          response.json().then(result => {
            return callback(result);
          });
        }
      })
      .catch(function(error) {
        console.warn(error);
      });
  }
};

var Questao = {
  /*Cria uma categoria*/
  store: function({ prova_id, enunciado, modalidade }, alternativas, callback) {
    var formDt = new FormData();

    formDt.append('enunciado', enunciado.value);
    formDt.append('prova_id', prova_id.value);
    formDt.append('modalidade', $(modalidade).val());
    formDt.append('alternativas', JSON.stringify(alternativas));

    fetch(URL_API + '/questao', {
      method: 'POST',
      body: formDt
    })
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            callback(result);
          });
        } else {
          console.log(response);
          console.log('Network response was not ok.');
        }
      })
      .catch(function(error) {
        carregarCasoFalha(error);
      });
    return false;
  },
  /*Busca todas as categorias*/
  all: function() {
    fetch(URL_API + '/sub_categoria', {
      method: 'GET'
    })
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            let inputs = result.map(({ categoria_id, titulo }) => {
              return `<label><input type="radio" name="categoria" />${titulo}</label>`;
            });
            $('#get-categorias').html(inputs.join('<br/>'));
          });
        } else {
          console.log('Network response was not ok.');
        }
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ' + error.message
        );
      });
  },
  getByCategoriaId: function(categoria_id, callback) {
    var url = new URL(URL_API + '/sub_categoria');
    var params = { categoria_id: categoria_id };
    url.search = new URLSearchParams(params).toString();
    fetch(url).then(function(response) {
      if (response.ok) {
        response.json().then(result => {
          return callback(result);
        });
      }
    });
  },
  getBy_QuizId: function(quizId, callback) {
    var url = new URL(URL_API + '/quiz');
    var params = { quiz_id: quizId };
    url.search = new URLSearchParams(params).toString();
    fetch(url).then(function(response) {
      if (response.ok) {
        response.json().then(result => {
          return callback(result);
        });
      }
    });
  },
  delete: function(questao_id, callback) {
    alert(questao_id);
    var url = new URL(URL_API + '/questao/' + questao_id);
    fetch(url, {
      method: 'DELETE'
    }).then(function(response) {
      if (response.ok) {
        response.json().then(result => {
          return callback(result);
        });
      }
    });
  }
};
