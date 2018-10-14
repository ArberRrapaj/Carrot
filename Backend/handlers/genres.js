'use strict'
var dataProvider = require('../data/genres.js')
/**
 * Operations on /genres/
 */
module.exports = {
  /**
     * summary: Get a list of all genres
     * description:
     * parameters:
     * produces: application/json
     * responses: 200
     */
  get: function getAllGenres (req, res) {
    let provider = dataProvider['get']
    provider(req, res, function (err, data) {
      res.status(data.status).json(data.data)
    })
  }
}
