'use strict'
var Genre = require('../utilities/Classes/Genre')

/**
 * Operations on /genres/
 */
module.exports = {
  /**
     * summary: Get a list of all genres
     * produces: application/json
     * responses: 200, 500
     * operationId: getGenres
     */
  get: function (req, res, callback) {
    Genre.getGenres(function (err, results) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else callback(err, { 'status': 200, 'data': results })
    })
  }
}
