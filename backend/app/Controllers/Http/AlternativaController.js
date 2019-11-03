"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Alternativa = use("App/Models/Alternativa");

/**
 * Resourceful controller for interacting with alternativas
 */
class AlternativaController {
  /**
   * Show a list of all alternativas.
   * GET alternativas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Create/save a new alternativa.
   * POST alternativas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    var alternativas = [
      {
        alternativa_letra: "a",
        alternativa_resposta: "verdadeiro",
        alternativa_correta: "a",
        questao_id: 1
      },
      {
        alternativa_letra: "a",
        alternativa_resposta: "verdadeiro",
        alternativa_correta: "a",
        questao_id: 1
      }
    ]; //Add dois registros à tabela Questão.

    const alternativa = await Alternativa.createMany(alternativas);
    return alternativa;
  }

  /**
   * Display a single alternativa.
   * GET alternativas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing alternativa.
   * GET alternativas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update alternativa details.
   * PUT or PATCH alternativas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a alternativa with id.
   * DELETE alternativas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = AlternativaController;
