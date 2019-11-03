"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class SubCategoria extends Model {
  //
  static get table() {
    return "sub_categorias";
  }
  static get primaryKey() {
    return "sub_categoria_id";
  }
}

module.exports = SubCategoria;
