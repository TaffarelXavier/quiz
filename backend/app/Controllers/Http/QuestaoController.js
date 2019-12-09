"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Questao = use("App/Models/Questao");
const Alternativa = use("App/Models/Alternativa");
const Database = use("Database");
/**
 * Resourceful controller for interacting with questaos
 */
class QuestaoController {
  /**
   * Show a list of all questaos.
   * GET questaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Create/save a new questao.
   * POST questaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { enunciado, prova_id, alternativas, modalidade } = request.all();

    const questoes = new Questao();
    questoes.questao_enunciado = enunciado;
    questoes.questao_modalidade = modalidade;
    questoes.provum_id = prova_id;

    await questoes.save();

    var result = JSON.parse(alternativas).map(alternativa => {
      alternativa.questao_id = questoes.questao_id;
      return alternativa;
    });

    const alternativa = await Alternativa.createMany(result);

    response.send(questoes);
  }

  async destroy({ request, response }) {
    try {
      const { id } = request.params;

      if (id) {
        const questao = await Questao.find(id);

        var rowAffect = await questao.delete();

        if (rowAffect > 0) {
          const affectedRows = await Alternativa.query()
            .where("questao_id", id)
            .delete();
          if (affectedRows > 0) {
            return response.send({ message: [1] });
          }
        } else {
          return response.send({ message: [0] });
        }
      }
      return response.send({ message: [-2, "ID_INCORRETO"] });
    } catch (error) {
      return response.send({ message: [-1, error] });
    }
  }
}

module.exports = QuestaoController;
