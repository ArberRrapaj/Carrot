'use strict'
var Genre = require('../../utilities/Classes/Genre')
/**
 * Operations on /genres/{genreID}
 */
module.exports = {
  /**
     * summary: Get genre by genreID
     * @param {number} genreID - The Genre's ID
     * produces: application/json
     * responses: 200, 500
     * operationId: getGenreByGenreID
     */
  get: function (req, res, callback) {
    Genre.getGenreByGenreID(req.params.genreID, function (err, results) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else callback(err, { 'status': 200, 'data': results })
    })
  },
  /**
     * summary: Update genre with provided body
     * @param {number} genreID - The Genre's ID
     * @param {object} body - The Genre's new data
     * produces: application/json
     * responses: 200, 404, 500
     * operationId: updateGenre
     */
  put: function (req, res, callback) {
    console.log('Put-Genres-GenreID')

    var body = req.body
    var genreID = req.params.genreID
    var genreName = body.GenreName

    const genre = new Genre(genreID, genreName).getMappedObject()

    Genre.validate(genre, function (err, result) {
      if (err) callback(err, result)
      else {
        Genre.getGenreByGenreID(genreID, function (err, results) {
          if (err) callback(err, { 'status': 500, 'data': err.message })
          else if (results.length !== 0) {
            Genre.updateGenre(genre, function (err, results) {
              if (err) callback(err, { 'status': 500, 'data': err.message })
              else callback(err, { 'status': 200, 'data': 'Successfully updated genre: ' + genreName })
            })
          } else callback(true, { 'status': 404, 'data': 'There is no genre with that genreID' })
        })
      }
    })
  },
  /**
     * summary: Delete a genre
     * @param {number} genreID - The Genre's ID
     * produces: application/json
     * responses: 200, 404, 500
     * operationId: deleteGenre
     */
  delete: function (req, res, callback) {
    console.log('Delete-Genres-GenreID')

    var genreID = req.params.genreID

    Genre.getGenreByGenreID(genreID, function (err, results) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else if (results.length !== 0) {
        Genre.deleteGenre(genreID, function (err, result) {
          if (err) callback(err, { 'status': 500, 'data': err.message })
          else callback(err, { 'status': 200, 'data': 'Successfully deleted genre with genreID: ' + genreID })
        })
      } else callback(true, { 'status': 404, 'data': 'There is no genre with that genreID' })
    })
  }
}
