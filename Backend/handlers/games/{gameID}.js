'use strict'
var dataProvider = require('../../data/games/{gameID}.js')
/**
 * Operations on /games/{gameId}
 */
module.exports = {
  /**
     * summary: Find game by ID
     * description: Returns a single game
     * parameters: gameId
     * produces: application/json
     * responses: 200, 400, 404
     */
  get: function getGameById (req, res, next) {
    let provider = dataProvider['get']
    provider(req, res, function (err, data) {
      // console.log('Games-GameID-Get: ', data);

      res.status(data.status).json(data.data)
    })
  },
  /**
     * summary: Updates a game in the Games-DB with form data
     * description:
     * parameters: gameId, body
     * produces: application/json
     * responses: 405
     */
  put: function updateGame (req, res, next) {
    // console.log('Games-GameID-Put: ', req);

    let provider = dataProvider['put']
    provider(req, res, function (err, data) {
      // console.log('Games-GameID-Put: ', data);

      res.status(data.status).json(data.data)
    })
  },
  /**
     * summary: Deletes a game
     * description:
     * parameters: api_key, gameId
     * produces: application/json
     * responses: 400, 404
     */
  delete: function deleteGame (req, res, next) {
    let provider = dataProvider['delete']
    provider(req, res, function (err, data) {
      // console.log('Games-GameID-Delete: ', data);

      res.status(data.status).json(data.data)
    })
  }
}
