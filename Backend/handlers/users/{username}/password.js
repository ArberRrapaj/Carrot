'use strict'
var dataProvider = require('../../../data/users/{username}/password.js')
/**
 * Operations on /users/{username}/password
 */
module.exports = {
  /**
     * summary: Update user's password
     * description: This can only be done by the logged in user.
     * parameters: username, body
     * produces: application/xml, application/json
     * responses: 400, 404
     */
  put: function updateUser (req, res) {
    let provider = dataProvider['put']
    provider(req, res, function (err, data) {
      console.log('Users-Username-Password-Put: ', data)

      res.status(data.status).json(data.data)
    })
  }
}
