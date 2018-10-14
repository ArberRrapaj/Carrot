'use strict'
var dataProvider = require('../data/countries.js')
/**
 * Operations on /countries/
 */
module.exports = {
  /**
     * summary: Get a list of all countries
     * description:
     * parameters:
     * produces: application/json
     * responses: 200
     */
  get: function getAllCountries (req, res) {
    let provider = dataProvider['get']
    provider(req, res, function (err, data) {
      res.status(data.status).json(data.data)
    })
  }
}
