'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlternativasSchema extends Schema {
  up () {
    this.create('alternativas', (table) => {
      table.increments('alternat_id')
      table.string('alternat_letra', 2).notNullable()
      table.string('alternat_descricao', 254);
      table.boolean('alternat_correta').notNullable()
      table.integer('questao_fk_id').unsigned().notNullable();
      table.foreign('questao_fk_id').references('questao_id').inTable('questoes');
      table.timestamps()
    })
  }

  down () {
    this.drop('alternativas')
  }
}

module.exports = AlternativasSchema
