'use strict'
var dataProvider = require('../data/users.js')
/**
 * Operations on /users
 */
module.exports = {
  /**
     * summary: Create user
     * description: This can only be done by the logged in user.
     * parameters: body
     * produces: application/json
     * responses: default
     */
  post: function createUser (req, res, next) {
    /**
         * Get the data for response default
         * For response `default` status 200 is used.
         */
    let provider = dataProvider['post']
    provider(req, res, function (err, data) {
      // console.log('Users-Post: ', data)
      res.status(data.status).json(data.data)
    })
  },
  /**
     * summary: Get a list of all users
     * description:
     * parameters:
     * produces: application/json
     * responses: 200
     */
  get: function getAllUser (req, res, next) {
    /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
    let provider = dataProvider['get']
    provider(req, res, function (err, data) {
      // console.log('Users-Get: ', data)

      res.status(data.status).json(data.data)
    })
  }
}
