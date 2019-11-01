'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestaoSchema extends Schema {
  up () {
    this.create('questoes', (table) => {
      table.increments('questao_id')
      table.string('questao_enunciado', 254).notNullable()
      table.integer('quiz_id').unsigned().notNullable();
      table.foreign('quiz_id').references('quiz_id').inTable('quizzes');
      table.timestamps()
    })
  }

  down () {
    this.drop('questoes')
  }
}

module.exports = QuestaoSchema
