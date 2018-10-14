'use strict'
var Game = require('../../utilities/Classes/Game.js')
/**
 * Operations on /games/title/{gameId}
 */
module.exports = {
  /**
     * summary: Find a game by its ID
     * description: Returns a single game
     * @param {number} gameID - The Game's ID
     * produces: application/json
     * responses: 200, 500
     * operationId: getGameByGameID
     */
  get: function (req, res, callback) {
    Game.getGameByGameID(req.params.gameID, function (err, results) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else callback(err, { 'status': 200, 'data': results })
    })
  },
  /**
     * summary: Updates a game in the Games-DB with form data
     * @param {number} gameID - The Game's ID
     * @param {object} body - The Game's new data
     * produces: application/json
     * responses: 200, 404, 500
     * operationId: updateGame
     */
  put: function (req, res, callback) {
    console.log('Put-Games-gameID')

    var body = req.body
    var gameID = req.params.gameID
    var genreID = body.GenreID
    var title = body.Title
    var publisher = body.Publisher
    var released = body.Released
    var image = body.Image

    const game = new Game(gameID, genreID, title, publisher, released, image).getMappedObject()

    Game.validate(game, function (err, result) {
      if (err) callback(err, result)
      else {
        Game.getGameByGameID(gameID, function (err, results) {
          if (err) callback(err, { 'status': 500, 'data': err.message })
          else if (results.length !== 0) {
            Game.updateGame(game, function (err, results) {
              if (err) callback(err, { 'status': 500, 'data': err.message })
              else callback(err, { 'status': 200, 'data': 'Successfully updated game: ' + title })
            })
          } else callback(true, { 'status': 404, 'data': 'There is no game with the title: ' + title })
        })
      }
    })
  },
  /**
     * summary: Deletes a game
     * @param {number} gameID - The Game's ID
     * produces: application/json
     * responses: 200, 404, 500
     * operationId: deleteGame
     */
  delete: function (req, res, callback) {
    console.log('Delete-Games-GameID')

    var gameID = req.params.gameID

    Game.getGameByGameID(gameID, function (err, results) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else if (results.length !== 0) {
        Game.deleteGame(gameID, function (err, result) {
          if (err) callback(err, { 'status': 500, 'data': err.message })
          else callback(err, { 'status': 200, 'data': 'Successfully deleted game with gameID: ' + gameID })
        })
      } else callback(true, { 'status': 404, 'data': 'There is no game with that gameID' })
    })
  }
}
