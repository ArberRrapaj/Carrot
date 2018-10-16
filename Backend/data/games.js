'use strict'
var Game = require('../utilities/Classes/Game')

/**
 * Operations on /games/
 */
module.exports = {
  /**
     * summary: Add a new game to the Database
     * @param {Game} body - The Game's information
     * produces: application/json
     * responses: 200, 500
     * operationId: saveGame
     */
  post: function (req, res, callback) {
    console.log('POST-Games')

    var body = req.body
    var genreID = body.GenreID
    var title = body.Title
    var publisher = body.Publisher
    var released = body.Released
    var image = body.Image

    const game = new Game(null, genreID, title, publisher, released, image).getMappedObject()

    Game.validatePush(game, function (err, result) {
      if (err) callback(err, result)
      else {
        Game.saveGame(game, function (err, results) {
          if (err) callback(err, { 'status': 500, 'data': err.message })
          else callback(err, { 'status': 200, 'data': 'Successfully inserted Game with title: ' + title })
        })
      }
    })
  },

  /**
     * summary: Get a list of all games
     * produces: application/json
     * responses: 200
     * operationId: getGames
     */
  get: function (req, res, callback) {
    Game.getGames('', function (err, results) {
      console.log('Error: ', err)
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else callback(err, { 'status': 200, 'data': results })
    })
  }
}
