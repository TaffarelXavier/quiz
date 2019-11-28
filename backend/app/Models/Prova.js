"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Prova extends Model {
  
  static get table() {
    return "provas";
  }

  static get primaryKey() {
    return "prova_id";
  }

  questoes() {
    return this.hasMany("App/Models/Questao");
  }
}

module.exports = Prova;