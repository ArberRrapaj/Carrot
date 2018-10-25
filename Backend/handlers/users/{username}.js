'use strict'
var dataProvider = require('../../data/users/{username}.js')
/**
 * Operations on /users/{username}
 */
module.exports = {
  /**
     * summary: Get user by user name
     * description:
     * parameters: username
     * produces: application/xml, application/json
     * responses: 200, 400, 404
     */
  get: function getUserByName (req, res, next) {
    var provider = dataProvider['get']
    provider(req, res, function (err, data) {
      // console.log('Users-Username-Get: ', data)

      res.status(data.status).json(data.data)
    })
  },
  /**
     * summary: Updated user
     * description: This can only be done by the logged in user.
     * parameters: username, body
     * produces: application/xml, application/json
     * responses: 400, 404
     */
  put: function updateUser (req, res, next) {
    var provider = dataProvider['put']
    provider(req, res, function (err, data) {
      // console.log('Users-Username-Put: ', data)

      res.status(data.status).json(data.data)
    })
  },
  /**
     * summary: Delete user
     * description: This can only be done by the logged in user.
     * parameters: username
     * produces: application/xml, application/json
     * responses: 400, 404
     */
  delete: function deleteUser (req, res, next) {
    let provider = dataProvider['delete']
    provider(req, res, function (err, data) {
      // console.log('Users-Username-Put: ', data)

      res.status(data.status).json(data.data)
    })
  }
}
