'use strict'
var User = require('../../utilities/Classes/User')
/**
 * Operations on /users/{username}
 */
module.exports = {
  /**
     * summary: Get user by user name
     * @param {string} username - The User's username
     * produces: application/json
     * responses: 200, 500
     * operationId: getUserByUsername
     */
  get: function (req, res, callback) {
    User.getUserByUsername(req.params.username, function (err, results) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else callback(err, { 'status': 200, 'data': results })
    })
  },
  /**
     * summary: Update user
     * @param {string} username - The User's username
     * @param {object} body - The User's updated information
     * produces: application/json
     * responses: 200, 404, 500
     * operationId: updateUser
     */
  put: function (req, res, callback) {
    console.log('Put-Users-Username')

    var body = req.body
    var username = req.params.username
    var firstName = body.FirstName
    var countryID = body.CountryID
    var image = body.Image
    var start = body.Start
    var favouriteGameID = body.FavouriteGameID
    var about = body.About

    const user = new User(username, null, firstName, countryID, image, start, favouriteGameID, about).getMappedObject()

    User.validate(user, function (err, result) {
      if (err) callback(err, result)
      else {
        User.getUserByUsername(username, function (err, results) {
          if (err) callback(err, { 'status': 500, 'data': err.message })
          else if (results.length !== 0) {
            User.updateUser(user, function (err, results) {
              if (err) callback(err, { 'status': 500, 'data': err.message })
              else callback(err, { 'status': 200, 'data': 'Successfully updated user: ' + username })
            })
          } else callback(true, { 'status': 404, 'data': 'There is no user with that username' })
        })
      }
    })
  },
  /**
     * summary: Delete a user
     * @param {string} username - The User's username
     * produces: application/json
     * responses: 200, 404, 500
     * operationId: deleteUser
     */
  delete: function (req, res, callback) {
    console.log('Delete-Users-Username')

    var username = req.params.username

    User.getUserByUsername(username, function (err, results) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else if (results.length !== 0) {
        User.deleteUser(username, function (err, result) {
          if (err) callback(err, { 'status': 500, 'data': err.message })
          else callback(err, { 'status': 200, 'data': 'Successfully deleted user with username: ' + username })
        })
      } else callback(true, { 'status': 404, 'data': 'There is no user with that username' })
    })
  }
}
