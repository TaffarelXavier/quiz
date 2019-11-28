"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Disciplina = use("App/Models/Disciplina");

/**
 * Resourceful controller for interacting with Disciplinas
 */
class DisciplinaController {
  /**
   * Show a list of all Disciplinas.
   * GET Disciplinas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const Disciplinas = await Disciplina.all();
    response.send(Disciplinas);
  }

  /**
   * Render a form to be used for creating a new Disciplina.
   * GET Disciplinas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new Disciplina.
   * POST Disciplinas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { Disciplina } = request.only(["Disciplina"]);

    console.log(Disciplina);

    const cat = new Disciplina();

    cat.titulo = Disciplina;

    await cat.save();

    response.send(cat);
  }

  /**
   * Display a single Disciplina.
   * GET Disciplinas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing Disciplina.
   * GET Disciplinas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update Disciplina details.
   * PUT or PATCH Disciplinas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a Disciplina with id.
   * DELETE Disciplinas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = DisciplinaController;
