const JOI = require('joi')
var DB = require('../../db/DBConnector')

var Validator = require('../ValidationHandler')

class Genre {
  constructor (genreID, genreName) {
    if (genreID === undefined || genreID === '') this._genreID = null
    else this._genreID = genreID
    this._genreName = genreName
  }

  _freeze () {
    Object.freeze(this)
  }

  getMappedObject () {
    return Object.freeze({
      'GenreID': this._genreID,
      'GenreName': this._genreName
    })
  }
}

/**
 * Validation Helper Methods and Schemas
 */

Genre.schema = JOI.object().keys({
  GenreID: JOI.number().integer().min(1).optional().allow(null),
  GenreName: JOI.string().regex(/[\w:\-&()]/).min(1).max(50).required()
})

Genre.validate = function (genre, callback) {
  const validation = Validator.validateSchema(genre, this.schema)

  if (validation.result) {
    console.log('Genre is valid af')

    callback(false) // Valid
  } else callback(true, { 'status': 400, 'data': validation.message })
}

Genre.validatePush = function (genre, callback) {
  this.validate(genre, function (err, result) {
    if (err) callback(err, result)
    else {
      this.checkDuplicateGenre(genre.GenreName, function (err, valid, results) {
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

// For /Genres/
Genre.getGenres = function (callback) {
  console.log('getGenres: ')

  DB.query('SELECT GenreID, GenreName FROM Genres', function (err, results) {
    if (err) callback(err, results)
    else {
      callback(err, results)
    }
  })
}

Genre.checkDuplicateGenre = function (genreName, callback) {
  DB.query('SELECT * FROM Genres WHERE GenreName = ?', [genreName], function (err, results) {
    if (err) callback(err, false, results)
    else if (results.length === 0) callback(err, true)
    else callback(err, false, { 'status': 400, 'data': 'There is already a genre with the name: ' + genreName })
  })
}

Genre.saveGenre = function (genre, callback) {
  DB.query('INSERT INTO Genres SET ?', [genre], function (err, results) {
    callback(err, results)
  })
}

// For /Genres/{GenreID}
Genre.getGenreByGenreID = function (genreID, callback) {
  console.log('getGenreByGenreID: ' + genreID)

  DB.query('SELECT GenreID, GenreName FROM Genres WHERE GenreID = ?', [genreID], function (err, results) {
    if (err) callback(err, results)
    else callback(err, results[0])
  })
}

Genre.updateGenre = function (genre, callback) {
  console.log('Update-Genre-GenreID: ', genre.GenreID)

  DB.query('UPDATE Genres SET ? WHERE GenreID = ?', [genre, genre.GenreID], function (err, results) {
    console.log('UpdateGenre: ', results)
    callback(err, results)
  })
}

Genre.deleteGenre = function (genreID, callback) {
  console.log('Delete-Genre-GenreID: ', genreID)

  DB.query('DELETE FROM Genres WHERE GenreID = ?', [genreID], function (err, results, fields) {
    callback(err, results, fields)
  })
}

module.exports = Genre
