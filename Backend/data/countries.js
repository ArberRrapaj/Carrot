'use strict'
var Country = require('../utilities/Classes/Country')

/**
 * Operations on /countries/
 */
module.exports = {
  /**
     * summary: Get a list of all countries
     * produces: application/json
     * responses: 200, 500
     * operationId: getCountries
     */
  get: function (req, res, callback) {
    Country.getCountries(function (err, results) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else callback(err, { 'status': 200, 'data': results })
    })
  }
}
