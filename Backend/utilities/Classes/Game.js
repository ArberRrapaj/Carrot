const JOI = require('joi')
var DB = require('../../db/DBConnector')

var Validator = require('../../utilities/ValidationHandler')
var IDChecker = require('../../utilities/IDChecker')

class Game {
  constructor (gameID, genreID, title, publisher, released, image) {
    if (gameID === undefined || gameID === '') this._gameID = null
    else this._gameID = gameID
    this._genreID = genreID
    this._title = title
    this._publisher = publisher
    this._released = released
    this._image = image
  }

  _freeze () {
    Object.freeze(this)
  }

  getMappedObject () {
    return Object.freeze({
      'GameID': this._gameID,
      'GenreID': this._genreID,
      'Title': this._title,
      'Publisher': this._publisher,
      'Released': this._released,
      'Image': this._image
    })
  }
}

/**
 * Validation Helper Methods and Schemas
 */

Game.schema = JOI.object().keys({
  GameID: JOI.number().integer().min(1).optional().allow(null),
  GenreID: JOI.number().integer().min(1).required(),
  Title: JOI.string().regex(/[\w,:$;.\-&%()!?#+*|]/).min(1).max(100).required(),
  Publisher: JOI.string().regex(/[\w,:$;.\-&%()!?#+*|]/).min(1).max(100).optional().allow(null, ''),
  Released: JOI.number().integer().min(1900).optional().allow(null),
  Image: JOI.string().optional().allow(null, '')
})

Game.validate = function (game, callback) {
  const validation = Validator.validateSchema(game, this.schema)

  if (validation.result) {
    console.log('Game is valid af')

    IDChecker.checkID('GenreID', false, game.GenreID, function (err, valid, message) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else if (valid) callback(false) // Valid
      else callback(true, { 'status': 400, 'data': message })
    })
  } else callback(true, { 'status': 400, 'data': validation.message })
}

Game.validatePush = function (game, callback) {
  this.validate(game, function (err, result) {
    if (err) callback(err, result)
    else {
      this.checkDuplicateGame(game.Title, function (err, valid, results) {
        if (err) callback(err, { 'status': 500, 'data': err.message })
        else if (valid) callback(false) // valid
        else callback(true, results)
      })
    }
  }.bind(this))
}

/**
 * Database-Functions
 */

// For /Games/
Game.getGames = function (title, callback) {
  console.log('getGames: ' + title)

  const queryWithTitle = 'SELECT GameID, Title FROM Games WHERE Title LIKE ?'
  const queryNoTitle = 'SELECT GameID, Title, GenreID, Publisher, Released, Image FROM Games WHERE Title LIKE ?'
  let query
  if (title === '') query = queryNoTitle
  else query = queryWithTitle

  title = '%' + title + '%'

  DB.query(query, [title], function (err, results) {
    if (err) callback(err, results)
    else {
      results.forEach((game, index) => {
        if (game.Image != null && game.Image !== undefined && game.Image !== '') results[index].Image = game.Image.toString('utf-8')
      })
      callback(err, results)
    }
  })
}

Game.checkDuplicateGame = function (title, callback) {
  DB.query('SELECT * FROM Games WHERE Title = ?', [title], function (err, results, fields) {
    if (err) callback(err, false, results)
    else if (results.length === 0) callback(err, true)
    else callback(err, false, { 'status': 400, 'data': 'There is already a game with the title: ' + title })
  })
}

Game.saveGame = function (game, callback) {
  DB.query('INSERT INTO Games SET ?', [game], function (err, results) {
    callback(err, results)
  })
}

// For /Games/{GameID}
Game.getGameByGameID = function (gameID, callback) {
  console.log('getGameByGameID: ' + gameID)

  DB.query('SELECT GameID, Title, GenreID, Publisher, Released, Image FROM Games WHERE GameID = ?', [gameID], function (err, results) {
    if (err) callback(err, results)
    else {
      if (results.length > 0 && results[0].Image != null && results[0].Image !== undefined && results[0].Image !== '') results[0].Image = results[0].Image.toString('utf-8')
      callback(err, results[0])
    }
  })
}

Game.updateGame = function (game, callback) {
  console.log('Update-Game-GameID: ', game.GameID)

  DB.query('UPDATE Games SET ? WHERE GameID = ?', [game, game.GameID], function (err, results) {
    console.log('UpdateGame: ', results)
    callback(err, results)
  })
}

Game.deleteGame = function (gameID, callback) {
  console.log('Delete-Game-GameID: ', gameID)

  DB.query('DELETE FROM Games WHERE GameID = ?', [gameID], function (err, results, fields) {
    callback(err, results, fields)
  })
}

module.exports = Game
