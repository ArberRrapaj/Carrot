'use strict'
var dataProvider = require('../../../data/libraries/{username}/{gameID}.js')
/**
 * Operations on /libraries/{username}/{gameID}
 */
module.exports = {
  /**
     * summary: Remove a game from a user's library
     * description: This can only be done by the logged in user.
     * parameters: username, gameID
     * produces: application/xml, application/json
     * responses: 400, 404
     */
  delete: function removeGameOffLibrary (req, res) {
    let provider = dataProvider['delete']
    provider(req, res, function (err, data) {
      console.log('Libraries-Username-GameID-Delete: ', data)

      res.status(data.status).json(data.data)
    })
  }
}
