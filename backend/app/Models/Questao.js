"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Questao extends Model {
  static get table() {
    return "questoes";
  }
}

module.exports = Questao;
