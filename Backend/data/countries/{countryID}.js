'use strict'
var Country = require('../../utilities/Classes/Country')
/**
 * Operations on /countries/{countryID}
 */
module.exports = {
  /**
     * summary: Get a country by its countryID
     * @param {number} countryID - The Country's ID
     * produces: application/json
     * responses: 200, 500
     * operationId: getCountryByCountryID
     */
  get: function (req, res, callback) {
    Country.getCountryByCountryID(req.params.countryID, function (err, results) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else callback(err, { 'status': 200, 'data': results })
    })
  }
}
