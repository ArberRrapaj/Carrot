'use strict'
var dataProvider = require('../../data/countries/{countryID}.js')
/**
 * Operations on /countries/{countryID}
 */
module.exports = {
  /**
     * summary: Get country by countryID
     * description:
     * parameters: countryID
     * produces: application/json
     * responses: 200, 400, 404
     */
  get: function getCountryByCountryID (req, res) {
    let provider = dataProvider['get']
    provider(req, res, function (err, data) {
      console.log('Countries-CountryID-Get: ', data)

      res.status(data.status).json(data.data)
    })
  }
}
