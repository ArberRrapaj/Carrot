'use strict'
var dataProvider = require('../../data/genres/{genreID}.js')
/**
 * Operations on /genres/{genreID}
 */
module.exports = {
  /**
     * summary: Get genre by genre name
     * description:
     * parameters: genreID
     * produces: application/xml, application/json
     * responses: 200, 400, 404
     */
  get: function getGenreByName (req, res) {
    var provider = dataProvider['get']
    provider(req, res, function (err, data) {
      console.log('Genres-GenreID-Get: ', data)

      res.status(data.status).json(data.data)
    })
  },
  /**
     * summary: Updated genre
     * description: This can only be done by the logged in genre.
     * parameters: genreID, body
     * produces: application/xml, application/json
     * responses: 400, 404
     */
  put: function updateGenre (req, res) {
    var provider = dataProvider['put']
    provider(req, res, function (err, data) {
      console.log('Genres-GenreID-Put: ', data)

      res.status(data.status).json(data.data)
    })
  },
  /**
     * summary: Delete genre
     * description: This can only be done by the logged in genre.
     * parameters: genrename
     * produces: application/xml, application/json
     * responses: 400, 404
     */
  delete: function deleteGenre (req, res, next) {
    let provider = dataProvider['delete']
    provider(req, res, function (err, data) {
      console.log('Genres-GenreID-Delete: ', data)

      res.status(data.status).json(data.data)
    })
  }
}
