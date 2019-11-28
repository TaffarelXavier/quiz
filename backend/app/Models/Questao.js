"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Questao extends Model {

  static get table() {
    return "questoes";
  }
  
  
  static get primaryKey() {
    return "questao_id";
  }

  alternativas() {
    return this.hasMany("App/Models/Alternativa");
  }
}

module.exports = Questao;
