'use strict'
var User = require('../../../utilities/Classes/User')
/**
 * Operations on /users/{username}/password
 */
module.exports = {
  /**
     * summary: Update user's password
     * description: This can only be done by the logged in user.
     * @param {string} username - The User's username
     * @param {object} body - body containing 'OldPassword' and 'NewPassword'
     * produces: application/json
     * responses: 200, 404, 500
     * operationId: updatePassword
     */
  put: function (req, res, callback) {
    console.log('Put-Users-Username-Password')

    let body = req.body
    let username = req.params.username
    let oldPassword = body.OldPassword
    let newPassword = body.NewPassword

    User.getUserByUsername(username, function (err, results) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else if (results.length !== 0) {
        User.updatePassword(username, oldPassword, newPassword, function (err, data) {
          if (err) callback(err, { 'status': 500, 'data': data.data })
          else callback(err, { 'status': 200, 'data': 'Successfully updated users password: ' + username })
        })
      } else callback(true, { 'status': 404, 'data': 'There is no user with that username' })
    })
  }
}
