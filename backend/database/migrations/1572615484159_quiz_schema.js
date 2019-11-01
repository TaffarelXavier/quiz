'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuizSchema extends Schema {
  up () {
    this.create('quizzes', (table) => {
      table.increments('quiz_id')
      table.string('title', 254).notNullable()
      table.string('description', 254)
      table.integer('categoria_fk_id').unsigned().notNullable();
      table.foreign('categoria_fk_id').references('categoria_id').inTable('categorias');
      table.timestamps()
    })
  }

  down () {
    this.drop('quizzes')
  }
}

module.exports = QuizSchema
