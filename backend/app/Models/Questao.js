"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Questao extends Model {
  //
  static get primaryKey() {
    return "questao_id";
  }
  //
  static get table() {
    return "questoes";
  }
  //
  alternativas() {
    return this.hasMany("App/Models/Alternativa");
  }
}

module.exports = Questao;
