const JOI = require('joi')
var DB = require('../../db/DBConnector')
var Validator = require('../../utilities/ValidationHandler')
var IDChecker = require('../../utilities/IDChecker')

var Crypto = require('crypto')

var iterations = 2500
var keylength = 128
var digest = 'sha512'

class User {
  constructor (username, password, firstName, countryID, image, start, favouriteGameID, about) {
    this._userID = null
    this._username = username
    this._password = password
    this._salt = null
    this._firstName = firstName
    this._countryID = countryID
    this._image = image
    this._start = start
    this._favouriteGameID = favouriteGameID
    this._about = about
  }

  _freeze () {
    Object.freeze(this)
  }

  createPassword (callback) {
    console.log('createPassword')

    var that = this

    Crypto.randomBytes(64, function (err, buf) { // creating a unique salt for a particular user
      if (err) callback(err, err.message)
      else {
        console.log('random shit generated')

        that._salt = buf.toString('base64') // console.log(that._salt);

        // hashing user's salt and password with 2500 iterations, a length of 128 (172 characters) and sha512 digest
        Crypto.pbkdf2(that._password, that._salt, iterations, keylength, digest, function (err, encodedPassword) {
          if (err) callback(err, err.message)
          else {
            console.log('password generated')

            that._password = Buffer.from(encodedPassword, 'binary').toString('base64') // console.log(that._password);

            callback(false, 'successfully encoded user password')
          }
        })
      }
    })
  }

  getMappedObject () {
    return Object.freeze({
      Username: this._username,
      FirstName: this._firstName,
      CountryID: this._countryID,
      Image: this._image,
      Start: this._start,
      FavouriteGameID: this._favouriteGameID,
      About: this._about
    })
  }

  getPasswordObject (callback) {
    this.createPassword(function (err, message) {
      if (err) callback(err, message)
      else {
        var object = Object.freeze({
          Username: this._username,
          Password: this._password,
          Salt: this._salt
        })
        callback(false, object)
      }
    }.bind(this))
  }

  getFinalObject (callback) {
    this.createPassword(function (err, message) {
      if (err) callback(err, message)
      else {
        var object = Object.freeze({
          Username: this._username,
          Password: this._password,
          Salt: this._salt,
          FirstName: this._firstName,
          CountryID: this._countryID,
          Image: this._image,
          Start: this._start,
          FavouriteGameID: this._favouriteGameID,
          About: this._about
        })
        callback(false, object)
      }
    }.bind(this))
  }
}

/**
 * Validation Helper Methods and Schemas
 */

User.schema = JOI.object().keys({
  Username: JOI.string().regex(/^\w+$/).min(1).max(30).required(),
  FirstName: JOI.string().regex(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u).min(1).max(30).optional().allow(null),
  CountryID: JOI.number().integer().optional().allow(null, '').min(1),
  Image: JOI.string().optional().allow(null, ''),
  Start: JOI.number().integer().min(1900).max(2018).optional().allow(null, ''),
  FavouriteGameID: JOI.number().integer().optional().allow(null, '').min(1),
  About: JOI.string().regex(/[\w,:$;.\-&%()!?#+*|\\]/).min(0).max(200).optional().allow(null, '')
})
User.schemaPassword = JOI.object().keys({
  Password: JOI.string().min(6).required()
})

User.validate = function (user, callback) {
  const validation = Validator.validateSchema(user, this.schema)
  console.log(user)

  if (validation.result) {
    console.log('User is valid af')

    IDChecker.checkID('CountryID', true, user.CountryID, function (err, valid, message) {
      if (err) callback(err, { 'status': 500, 'data': err.message })
      else if (valid) {
        IDChecker.checkID('GameID', true, user.FavouriteGameID, function (err, valid, message) {
          if (err) callback(err, { 'status': 500, 'data': err.message })
          else if (valid) {
            callback(false)
          } else callback(true, { 'status': 400, 'data': message })
        })
      } else callback(true, { 'status': 400, 'data': message })
    })
  } else callback(true, { 'status': 400, 'data': validation.message })
}

User.validatePush = function (user, callback) {
  this.validate(user.getMappedObject(), function (err, result) {
    if (err) callback(err, result)
    else {
      const passwordValidation = Validator.validateSchema({ Password: user._password }, this.schemaPassword)
      if (passwordValidation.result) {
        this.checkDuplicateUser(user._username, function (err, valid, results) {
          if (err) callback(err, { 'status': 500, 'data': err.message })
          else if (valid) callback(false) // valid
          else callback(true, results)
        })
      } else callback(true, { 'status': 400, 'data': passwordValidation.message })
    }
  }.bind(this))
}

/**
 * Database-Functions
 */

// For /Users/
User.getUsers = function (callback) {
  console.log('getUsers')

  DB.query('SELECT Username, FirstName, CountryID, Image, `Start`, FavouriteGameID, About FROM Users', function (err, results) {
    if (err) callback(err, results)
    else callback(err, results)
  })
}

User.checkDuplicateUser = function (username, callback) {
  console.log('Is you there plox not -User: ', username)

  DB.query('SELECT UserID FROM Users WHERE Username = ?', [username], function (err, results) {
    if (err) callback(err, false, results)
    else if (results.length === 0) callback(err, true)
    else callback(err, false, { 'status': 400, 'data': 'There is already a user with that username.' })
  })
}

User.saveUser = function (user, callback) {
  console.log('In we go-User: ', user)

  user.getFinalObject(function (err, result) {
    if (err) callback(err, 'Internal Error, please try again')
    else {
      DB.query('INSERT INTO Users SET ?', [result], function (err, results) {
        console.log('SaveUser: ', results)
        callback(err, results)
      })
    }
  })
}

// For /Users/Login
User.loginUser = function (username, password, callback) {
  console.log('loginUser')

  User.checkPassword(function (err, result, internalError) {
    callback(err, result, internalError)
  })
}

User.checkPassword = function (username, password, callback) {
  console.log('checkPassword')

  DB.query('SELECT Password, Salt FROM Users WHERE Username = ?', [username], function (err, results) {
    if (err) callback(err, 'Internal Error, please try again later', true)
    else if (results.length === 0) callback(true, 'There is no user with that username', false)
    else {
      var user = results[0]
      console.log('User fetched')

      // hashing user's salt and password with the same amount of iterations, key length and digest
      Crypto.pbkdf2(password, user.Salt, iterations, keylength, digest, function (err, encodedPassword) {
        if (err) callback(err, 'Internal Error, try again later please', true)
        else {
          console.log('pbkdf hashed')

          var inputPassword = Buffer.from(encodedPassword, 'binary').toString('base64')
          if (inputPassword === user.Password) callback(false, 'Successfully logged in')
          else callback(true, 'The Username-Password-Combination doesn\'t match', false)
        }
      })
    }
  })
}

// For /Users/{Username}
User.getUserByUsername = function (username, callback) {
  console.log('getUserByUsername')

  DB.query('SELECT UserID, Username, FirstName, CountryID, Image, `Start`, FavouriteGameID, About FROM Users WHERE Username = ?', [username], function (err, results) {
    if (err) callback(err, results)
    else {
      if (results.length > 0 && results[0].Image != null && results[0].Image !== undefined && results[0].Image !== '') results[0].Image = results[0].Image.toString('utf-8')
      callback(err, results[0])
    }
  })
}

User.updateUser = function (user, callback) {
  console.log('Update-User-Username: ', user.Username)

  DB.query('UPDATE Users SET ? WHERE Username = ?', [user, user.Username], function (err, results) {
    console.log('UpdateUser: ', results)
    callback(err, results)
  })
}

User.deleteUser = function (username, callback) {
  console.log('Delete-User-Username: ', username)

  DB.query('DELETE FROM Users WHERE Username = ?', [username], function (err, results, fields) {
    callback(err, results, fields)
  })
}

// For /Users/search/{Username}
User.getUsersByUsername = function (username, callback) {
  console.log('getUsersByUsername')
  username = '%' + username + '%'

  DB.query('SELECT Username, FirstName FROM Users WHERE Username LIKE ?', [username], function (err, results) {
    if (err) callback(err, results)
    else callback(err, results)
  })
}

// For /Users/{username}/password
User.updatePassword = function (username, oldPassword, newPassword, callback) {
  console.log('updatePassword')

  User.checkPassword(username, oldPassword, function (err, result, internalError) {
    if (err) {
      if (internalError) callback(true, { 'status': 500, 'data': result })
      else callback(true, { 'status': 400, 'data': result })
    } else {
      let user = new User(username, newPassword)

      user.getPasswordObject(function (err, result) {
        if (err) callback(err, { 'status': 500, 'data': 'Internal Error, please try again later' })
        else {
          console.log('getPasswordObject')

          DB.query('UPDATE Users SET ? WHERE Username = ?', [result, result.Username], function (err, results) {
            console.log('UpdatePassword: ', results)
            if (err) callback(err, { 'status': 500, 'data': results })
            else callback(err, { 'status': 201, 'data': results })
          })
        }
      })
    }
  })
}

// For /Libraries/{Username}
User.getLibraryByUserID = function (userID, callback) {
  console.log('getLibraryByUserID', userID)

  let query = 'SELECT Games.GameID, Games.Title,  Games.GenreID, Games.Publisher, Games.Released, Games.Image '
  query += 'FROM Games INNER JOIN `Libraries` ON `Games`.`GameID` = `Libraries`.`GameID` WHERE UserID = ?'

  DB.query(query, [userID], function (err, results) {
    if (err) callback(err, results)
    else {
      results.forEach((game, index) => {
        if (game.Image != null && game.Image !== undefined && game.Image !== '') results[index].Image = game.Image.toString('utf-8')
      })
      callback(err, results)
    }
  })
}

User.deleteGameOffLibrary = function (userID, gameID, callback) {
  console.log('deleteGameOffLibrary', userID, gameID)
  const query = 'DELETE FROM Libraries WHERE UserID = ? AND GameID = ?'

  DB.query(query, [userID, gameID], function (err, results) {
    if (err) callback(err, results)
    else callback(err, results)
  })
}

User.addGameToLibrary = function (userID, gameID, callback) {
  console.log('addGameToLibrary', userID, gameID)
  const library = {
    UserID: userID,
    GameID: gameID
  }

  DB.query('INSERT INTO Libraries SET ?', [library], function (err, results) {
    callback(err, results)
  })
}

User.validateLibraryPost = function (userID, gameID, callback) {
  IDChecker.checkID('UserID', false, userID, function (err, valid, message) {
    if (err) callback(err, { 'status': 500, 'data': err.message })
    else if (valid) {
      IDChecker.checkID('GameID', false, gameID, function (err, valid, message) {
        if (err) {
          callback(err, { 'status': 500, 'data': err.message })
        } else if (valid) {
          User.checkDuplicateLibraryEntry(userID, gameID, function (err, valid, results) {
            if (err) callback(err, { 'status': 500, 'data': err.message })
            else if (valid) callback(false) // valid
            else callback(true, results)
          })
        } else callback(true, { 'status': 400, 'data': message })
      })
    } else callback(true, { 'status': 400, 'data': message })
  })
}

User.checkDuplicateLibraryEntry = function (userID, gameID, callback) {
  DB.query('SELECT LibraryID FROM Libraries WHERE UserID = ? AND GameID = ?', [userID, gameID], function (err, results) {
    if (err) callback(err, false, results)
    else if (results.length === 0) callback(err, true)
    else callback(err, false, { 'status': 400, 'data': 'That game is already in your Library' })
  })
}

module.exports = User
