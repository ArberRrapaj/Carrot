'use strict'
var User = require('../../../utilities/Classes/User')

/**
 * Operations on /libraries/{username}/{gameID}
 */
module.exports = {
  /**
     * summary: Remove a game out of a user's library
     * @param {string} username - The User's username
     * @param {number} gameID - The Game's ID
     * produces: application/json
     * responses: 200, 400, 404, 500
     * operationId: deleteGameOffLibrary
     */
  delete: function (req, res, callback) {
    let username = req.params.username
    var gameID = parseInt(req.params.gameID)

    if (isNaN(gameID)) {
      callback(true, { 'status': 400, 'data': 'Invalid GameID' })
      return
    }

    User.getUserByUsername(username, function (err, user) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else if (user !== null && user !== undefined) {
        User.deleteGameOffLibrary(user.UserID, gameID, function (err) {
          if (err) callback(err, { 'status': 500, 'data': err.message })
          else callback(err, { 'status': 200, 'data': 'Removed game from Library' })
        })
      } else callback(true, { 'status': 404, 'data': 'There is no user with that username' })
    })
  }
}
