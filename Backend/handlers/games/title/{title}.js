'use strict'
var dataProvider = require('../../../data/games/title/{title}.js')
/**
 * Operations on /games/{title}
 */
module.exports = {
  /**
     * summary: Get a list of all games
     * description:
     * parameters:
     * produces: application/json
     * responses: 200
     */
  get: function getAllGames (req, res, next) {
    let provider = dataProvider['get']
    provider(req, res, function (err, data) {
      res.status(data.status).json(data.data)
    })
  }
}
