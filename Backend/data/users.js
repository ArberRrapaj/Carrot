'use strict'
var User = require('../utilities/Classes/User')
/**
 * Operations on /users
 */
module.exports = {
  /**
     * summary: Add a new user to DB
     * @param {User} body - The User's information
     * produces: application/json
     * responses: 200, 400, 500
     * operationId: saveUser
     */
  post: function (req, res, callback) {
    console.log('POST-Users')

    var body = req.body
    var username = body.Username
    var password = body.Password
    var firstName = body.FirstName
    var countryID = body.CountryID
    var image = body.Image
    var start = body.Start
    var favouriteGameID = body.FavouriteGameID
    var about = body.About

    const user = new User(username, password, firstName, countryID, image, start, favouriteGameID, about)

    User.validatePush(user, function (err, result) {
      if (err) callback(err, result)
      else {
        User.saveUser(user, function (err, results) {
          if (err) callback(err, { 'status': 500, 'data': err.message })
          else {
            User.loginUser(username, password, function (err, results, internalError) {
              if (err) {
                if (internalError) callback(err, { 'status': 500, 'data': results })
                else callback(err, { 'status': 400, 'data': results })
              } else callback(err, { 'status': 200, 'data': { 'currentUser': username, 'token': results } })
            })
          }
        })
      }
    })
  },
  /**
     * summary: Get a list of all users
     * produces: application/json
     * responses: 200, 500
     * operationId: getAllUser
     */
  get: function (req, res, callback) {
    User.getUsers(function (err, results) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else callback(err, { 'status': 200, 'data': results })
    })
  }
}
