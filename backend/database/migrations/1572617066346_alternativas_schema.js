'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlternativasSchema extends Schema {
  up () {
    this.create('alternativas', (table) => {
      table.increments('alternativa_id')
      table.string('alternativa_letra', 2).notNullable()
      table.string('alternativa_descricao', 254);
      table.boolean('alternat_correta').notNullable()
      table.integer('questao_id').unsigned().notNullable();
      table.foreign('questao_id').references('questao_id').inTable('questoes');
      table.timestamps()
    })
  }

  down () {
    this.drop('alternativas')
  }
}

module.exports = AlternativasSchema
