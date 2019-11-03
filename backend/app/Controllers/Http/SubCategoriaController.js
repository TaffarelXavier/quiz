"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const SubCategoria = use("App/Models/SubCategoria");

/**
 * Resourceful controller for interacting with subcategorias
 */
class SubCategoriaController {
  /**
   * Show a list of all subcategorias.
   * GET subcategorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const { categoria_id } = request.get(["categoria_id"]);

      let subcategorias = await SubCategoria.query()
        .where("categoria_id", "=", parseInt(categoria_id))
        .fetch();

      if (isNaN(parseInt(categoria_id))) {
        subcategorias = await SubCategoria.all();
      }

      response.send(subcategorias);
    } catch (error) {
      return response.send(error);
    }
  }

  /**
   * Render a form to be used for creating a new subcategoria.
   * GET subcategorias/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new subcategoria.
   * POST subcategorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { sub_titulo, categoria_id } = request.all();

    console.log(sub_titulo, categoria_id);

    const subCateg = new SubCategoria();

    subCateg.sub_titulo = sub_titulo;

    subCateg.categoria_id = categoria_id;

    await subCateg.save();

    response.send(subCateg);
  }

  /**
   * Display a single subcategoria.
   * GET subcategorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing subcategoria.
   * GET subcategorias/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update subcategoria details.
   * PUT or PATCH subcategorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a subcategoria with id.
   * DELETE subcategorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = SubCategoriaController;
