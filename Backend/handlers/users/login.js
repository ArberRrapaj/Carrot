'use strict'
var dataProvider = require('../../data/users/login.js')
/**
 * Operations on /users/login
 */
module.exports = {
  /**
     * summary: Logs user into the system
     * description:
     * parameters: username, password
     * produces: application/xml, application/json
     * responses: 200, 400
     */

  post: function loginUser (req, res, next) {
    let provider = dataProvider['post']
    provider(req, res, function (err, data) {
      console.log('Users-Login: ', data)
      res.status(data.status).json(data.data)
    })
  }
}
