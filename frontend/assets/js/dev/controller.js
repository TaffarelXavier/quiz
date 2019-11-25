const IP = [
  {
    protocol: "http",
    address: "lccomputacaoturma2018-com-br.umbler.net",
    port: ""
  },
  {
    protocol: "http",
    address: "127.0.0.1",
    port: "3333"
  }
];

const INDEX = 1;
const URL_API = `${IP[INDEX].protocol}://${IP[INDEX].address}:${IP[INDEX].port}`;

// $("body").bootstrapMaterialDesign();

/**
 * CATEGORIAS
 */
var Categoria = {
  /*Cria uma categoria*/
  store: function({ categoria }) {
    var form = new FormData();

    form.append("categoria", categoria.value);

    fetch(URL_API + "/categoria", {
      method: "POST",
      body: form
    })
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            console.log(result);
          });
        } else {
          console.log("Network response was not ok.");
        }
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  },
  /*Busca todas as categorias*/
  all: function(callback) {
    fetch(URL_API + "/categoria", {
      method: "GET"
    })
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            callback(result);
          });
        } else {
          console.log("Network response was not ok.");
        }
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
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

    form.append("sub_titulo", sub_titulo.value);
    form.append("categoria_id", categoria_id.value);

    fetch(URL_API + "/sub_categoria", {
      method: "POST",
      body: form
    })
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            console.log(result);
          });
        } else {
          console.log("Network response was not ok.");
        }
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  },
  /*Busca todas as categorias*/
  all: function(callback) {
    fetch(URL_API + "/sub_categoria", {
      method: "GET"
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
          console.log("Network response was not ok.");
        }
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  },
  getByCategoriaId: function(categoria_id, callback) {
    var url = new URL(URL_API + "/sub_categoria");
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

var Quiz = {
  /*Cria uma categoria*/
  store: function({ form, data }, callback) {
    var formDt = new FormData();

    try {
      if (data[0]) {
        delete data[0].element;

        formDt.append("titulo", form.titulo.value);
        //formDt.append("descricao", descricao.value);

        formDt.append("sub_categoria_id", JSON.stringify(data[0]));

        fetch(URL_API + "/quiz", {
          method: "POST",
          body: formDt
        })
          .then(function(response) {
            if (response.ok) {
              response.json().then(function(result) {
                callback(result);
              });
            } else {
              console.error("Houve um erro: ","Network response was not ok.");
            }
          })
          .catch(function(error) {
            console.log(
              "There has been a problem with your fetch operation: " +
                error.message
            );
          });
      }
    } catch (error) {
      console.error("Houve um Erro:", error);
    }
  },
  /*Busca todas as categorias*/
  all: function(callback) {
    fetch(URL_API + "/quiz", {
      method: "GET"
    })
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            callback(result);
          });
        } else {
          console.log("Network response was not ok.");
        }
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  },
  getByCategoriaId: function(categoria_id, callback) {
    var url = new URL(URL_API + "/sub_categoria");
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
  getByQuizId: function(quizId, callback) {
    var url = new URL(URL_API + "/quiz");
    var params = { quiz_id: quizId };
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

var Questao = {
  /*Cria uma categoria*/
  store: function({ quiz_id, enunciado, modalidade }, alternativas, callback) {
    var formDt = new FormData();

    formDt.append("enunciado", enunciado.value);
    formDt.append("quiz_id", quiz_id.value);
    formDt.append("modalidade", $(modalidade).val());
    formDt.append("alternativas", JSON.stringify(alternativas));

    fetch(URL_API + "/questao", {
      method: "POST",
      body: formDt
    })
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            callback(result);
          });
        } else {
          console.log(response);
          console.log("Network response was not ok.");
        }
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
    return false;
  },
  /*Busca todas as categorias*/
  all: function() {
    fetch(URL_API + "/sub_categoria", {
      method: "GET"
    })
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(result) {
            let inputs = result.map(({ categoria_id, titulo }) => {
              return `<label><input type="radio" name="categoria" />${titulo}</label>`;
            });
            $("#get-categorias").html(inputs.join("<br/>"));
          });
        } else {
          console.log("Network response was not ok.");
        }
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  },
  getByCategoriaId: function(categoria_id, callback) {
    var url = new URL(URL_API + "/sub_categoria");
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
  getByQuizId: function(quizId, callback) {
    var url = new URL(URL_API + "/quiz");
    var params = { quiz_id: quizId };
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
