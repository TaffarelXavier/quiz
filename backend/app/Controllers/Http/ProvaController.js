"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Prova = use("App/Models/Prova");

/**
 * Resourceful controller for interacting with quizzes
 */
class ProvaController {
  /**
   * Show a list of all quizzes.
   * GET quizzes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { quiz_id } = request.get();

    if (quiz_id !== null && quiz_id !== undefined) {

      const quiz = await Prova.find(quiz_id);

      if (quiz !== null) {

        const questao = await Prova.query()
          .with("questoes.alternativas")
          .where("prova_id", quiz_id)
          .fetch();

        return response.send(questao);
      }
      return response.send({});
    } else {
      const provas = await Prova.all();
      response.send(provas);
    }
  }

  /**
   * Create/save a new quiz.
   * POST quizzes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { titulo, sub_categoria_id } = request.all();

    const { id } = JSON.parse(sub_categoria_id);

    const quiz = new Prova();

    quiz.titulo = titulo;

    //quiz.descricao = descricao;
    quiz.sub_categoria_id = id;

    await quiz.save();

    response.send(quiz);
  }
}

module.exports = ProvaController;
