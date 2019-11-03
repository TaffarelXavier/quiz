"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Quiz extends Model {

  static get primaryKey() {
    return "quiz_id";
  }
  
  questoes() {
    return this.hasMany("App/Models/Questao");
  }
 
}

module.exports = Quiz;
