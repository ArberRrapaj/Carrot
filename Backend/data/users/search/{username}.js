'use strict'
var User = require('../../../utilities/Classes/User')
/**
 * Operations on /users/search/{username}
 */
module.exports = {
  /**
     * summary: Get a list of all users containing a given part of the username
     * @param {string} username - The User's username
     * produces: application/json
     * responses: 200, 500
     * operationId: getUsersByUsername
     */
  get: function (req, res, callback) {
    User.getUsersByUsername(req.params.username, function (err, results) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else callback(err, { 'status': 200, 'data': results })
    })
  }
}
