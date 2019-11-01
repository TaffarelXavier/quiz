'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuizSchema extends Schema {
  up () {
    this.create('quizzes', (table) => {
      table.increments('quiz_id')
      table.string('titulo', 254).notNullable()
      table.string('descricao', 254)
      table.integer('sub_categoria_id').unsigned().notNullable();
      table.foreign('sub_categoria_id').references('sub_categoria_id').inTable('sub_categorias');
      table.timestamps()
    })
  }

  down () {
    this.drop('quizzes')
  }
}

module.exports = QuizSchema
