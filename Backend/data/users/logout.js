'use strict'
var Mockgen = require('../mockgen.js')
/**
 * Operations on /users/logout
 */
module.exports = {
  /**
     * summary: Logs out current logged in user session
     * produces: application/json
     * responses: default
     * operationId: logoutUser
     */
  get: {
    default: function (req, res, callback) {
      /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
      Mockgen().responses({
        path: '/users/logout',
        operation: 'get',
        response: 'default'
      }, callback)
    }
  }
}
