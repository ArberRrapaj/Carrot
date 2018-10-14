'use strict'
var dataProvider = require('../../data/libraries/{username}.js')
/**
 * Operations on /libraries/{userID}
 */
module.exports = {
  /**
     * summary: Get Library by userID
     * description:
     * parameters: userID
     * produces: application/json
     * responses: 200, 400, 404
     */
  get: function getLibraryByUserID (req, res) {
    let provider = dataProvider['get']
    provider(req, res, function (err, data) {
      // console.log('Libraries-UserID-Get: ', data);

      res.status(data.status).json(data.data)
    })
  },
  /**
     * summary: Add a game to a user's library
     * description: This can only be done by the logged in user.
     * parameters: username, gameID
     * produces: application/xml, application/json
     * responses: 400, 404
     */
  post: function addGameToLibrary (req, res) {
    let provider = dataProvider['post']
    provider(req, res, function (err, data) {
      console.log('Libraries-Username-GameID-post: ', data)

      res.status(data.status).json(data.data)
    })
  }
}
