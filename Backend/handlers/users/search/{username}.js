'use strict'
var dataProvider = require('../../../data/users/search/{username}.js')
/**
 * Operations on /users/search/{username}
 */
module.exports = {
  /**
     * summary: Search users by username
     * description:
     * parameters: username
     * produces: application/xml, application/json
     * responses: 200, 400, 404
     */
  get: function getUserByName (req, res) {
    let provider = dataProvider['get']
    provider(req, res, function (err, data) {
      // console.log('Users-Search-Username-Get: ', data)

      res.status(data.status).json(data.data)
    })
  }
}
