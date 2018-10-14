const JOI = require('joi')
var DB = require('../../db/DBConnector')

var Validator = require('../ValidationHandler')

class Country {
  constructor (countryID, countryCode, countryName) {
    if (countryID === undefined || countryID === '') this._countryID = null
    else this._countryID = countryID
    this._countryCode = countryCode
    this._countryName = countryName
  }

  _freeze () {
    Object.freeze(this)
  }

  getMappedObject () {
    return Object.freeze({
      'CountryID': this._gameID,
      'CountryCode': this._genreID,
      'CountryName': this._title
    })
  }
}

/**
 * Validation Helper Methods and Schemas
 */

Country.schema = JOI.object().keys({
  CountryID: JOI.number().integer().min(1).optional().allow(null),
  CountryCode: JOI.string().regex(/^\w+$/).min(1).max(3).required(),
  CountryName: JOI.string().regex(/^\w+$/).min(1).max(50).required()
})

Country.validate = function (country, callback) {
  const validation = Validator.validateSchema(country, this.schema)

  if (validation.result) {
    console.log('Country is valid af')

    callback(false) // Valid
  } else callback(true, { 'status': 400, 'data': validation.message })
}

Country.validatePush = function (country, callback) {
  this.validate(country, function (err, result) {
    if (err) callback(err, result)
    else {
      this.checkDuplicateCountry(country.CountryCode, function (err, valid, results) {
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

// For /Countries/
Country.getCountries = function (callback) {
  console.log('getCountries')

  DB.query('SELECT CountryID, CountryCode, CountryName FROM Countries', function (err, results) {
    if (err) callback(err, results)
    else {
      callback(err, results)
    }
  })
}

Country.checkDuplicateCountry = function (countryCode, callback) {
  DB.query('SELECT * FROM Countries WHERE CountryCode = ?', [countryCode], function (err, results) {
    if (err) callback(err, false, results)
    else if (results.length === 0) callback(err, true)
    else callback(err, false, { 'status': 400, 'data': 'There is already a game with countryCode: ' + countryCode })
  })
}

Country.saveCountry = function (country, callback) {
  DB.query('INSERT INTO Countries SET ?', [country], function (err, results) {
    callback(err, results)
  })
}

// For /Countries/{CountryID}
Country.getCountryByCountryID = function (countryID, callback) {
  console.log('getCountryByCountryID: ' + countryID)

  DB.query('SELECT CountryID, CountryCode, CountryName FROM Countries WHERE CountryID = ?', [countryID], function (err, results) {
    if (err) callback(err, results)
    else callback(err, results[0])
  })
}
module.exports = Country
