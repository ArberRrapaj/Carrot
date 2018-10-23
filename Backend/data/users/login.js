'use strict'
var User = require('../../utilities/Classes/User')
/**
 * Operations on /users/login
 */
module.exports = {
  /**
     * summary: Logs user into the system
     * @param {object} body - contains the 'Username' and 'Password' input
     * produces: application/json
     * responses: 200, 400, 500
     * operationId: loginUser
     */
  post: function (req, res, callback) {
    let body = req.body
    console.log('POST-Login', body)

    let username = body.Username
    let password = body.Password

    User.loginUser(username, password, function (err, results, internalError) {
      if (err) {
        if (internalError) callback(err, { 'status': 500, 'data': results })
        else callback(err, { 'status': 400, 'data': results })
      } else callback(err, { 'status': 200, 'data': { 'currentUser': username, 'token': results } })
    })
  }
}
