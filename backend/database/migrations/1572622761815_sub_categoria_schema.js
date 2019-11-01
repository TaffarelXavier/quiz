'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubCategoriaSchema extends Schema {
  up () {
    this.create('sub_categorias', (table) => {
      table.increments('sub_categoria_id')
      table.string('sub_titulo', 254).notNullable()
      table.integer('categoria_id').unsigned().notNullable();
      table.foreign('categoria_id').references('categoria_id').inTable('categorias');
      table.timestamps()
    })
  }

  down () {
    this.drop('sub_categorias')
  }
}

module.exports = SubCategoriaSchema