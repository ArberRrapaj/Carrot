'use strict'
var User = require('../../utilities/Classes/User')

/**
 * Operations on /libraries/{username}
 */
module.exports = {
  /**
     * summary: Get Library of a user with all of his games
     * @param {string} username - The User's username
     * produces: application/json
     * responses: 200, 404, 500
     * operationId: getLibraryByUserID
     */
  get: function (req, res, callback) {
    User.getUserByUsername(req.params.username, function (err, user) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else if (user !== null) {
        console.log(user)
        User.getLibraryByUserID(user.UserID, function (err, results) {
          if (err) callback(err, { 'status': 500, 'data': err.message })
          else callback(err, { 'status': 200, 'data': results })
        })
      } else callback(true, { 'status': 404, 'data': 'There is no user with that username' })
    })
  },
  /**
     * summary: Add a game to a users library
     * @param {string} username - The User's username
     * @param {object} body - body containing 'GameID' = The Game's ID
     * parameters: body
     * produces: application/json
     * responses: 200, 404, 500
     * operationId: addGameToLibrary
     */
  post: function (req, res, callback) {
    console.log('POST-Libraries-Username-GameID')

    let username = req.params.username
    let gameID = req.body.GameID

    User.getUserByUsername(username, function (err, user) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else if (user !== null) {
        User.validateLibraryPost(user.UserID, gameID, function (err, result) {
          if (err) callback(err, result)
          else {
            User.addGameToLibrary(user.UserID, gameID, function (err) {
              if (err) callback(err, { 'status': 500, 'data': err.message })
              else callback(err, { 'status': 200, 'data': 'Successfully added Game to Library' })
            })
          }
        })
      } else callback(true, { 'status': 404, 'data': 'There is no user with that username' })
    })
  }
}
