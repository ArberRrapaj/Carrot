'use strict'
var Game = require('../../../utilities/Classes/Game')

/**
 * Operations on /games/{title}
 */
module.exports = {
  /**
     * summary: Get a list of all games in the DB containing the given title
     * @param {string} title - The title-part
     * produces: application/json
     * responses: 200, 500
     * operationId: getGames
     */
  get: function (req, res, callback) {
    let title = req.params.title
    if (title === undefined || title === null) title = ''

    Game.getGames(title, function (err, results) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else callback(err, { 'status': 200, 'data': results })
    })
  }
}
