"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Quiz = use("App/Models/Quiz");

/**
 * Resourceful controller for interacting with quizzes
 */
class QuizController {
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
  
      const quiz = await Quiz.find(quiz_id);

      if (quiz !== null) {
        const questao = await Quiz.query()
          .with("questoes.alternativas")
          .where("quiz_id", quiz_id)
          .fetch();

        return response.send(questao);
      }
      return response.send({});
    } else {
      const quizzes = await Quiz.all();
      response.send(quizzes);
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

    console.log(id)

    const quiz = new Quiz();

    quiz.titulo = titulo;

    //quiz.descricao = descricao;
    quiz.sub_categoria_id = id;

    await quiz.save();

    response.send(quiz);
  }

  /**
   * Display a single quiz.
   * GET quizzes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing quiz.
   * GET quizzes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update quiz details.
   * PUT or PATCH quizzes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a quiz with id.
   * DELETE quizzes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = QuizController;
