'use strict'
var dataProvider = require('../data/games.js')
/**
 * Operations on /games/
 */
module.exports = {
  /**
     * summary: Create game
     * description: This can only be done by the logged in user.
     * parameters: body
     * produces: application/json
     * responses: default
     */
  post: function createGame (req, res) {
    let provider = dataProvider['post']
    provider(req, res, function (err, data) {
      res.status(data.status).json(data.data)
    })
  },
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
