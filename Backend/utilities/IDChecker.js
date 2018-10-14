var DB = require('../db/DBConnector')

var IDChecker = {}

IDChecker.checkID = function (type, optional, ID, callback) {
  console.log('Checking: ' + type)
  console.log('optional: ' + optional)

  if (optional) {
    if (ID === undefined || ID == null || ID === '') {
      console.log('A')

      callback(false, true)
      return
    }
  } else {
    if (ID === undefined || ID == null || ID === '') {
      console.log('B')

      callback(true, false)
      return
    }
  }
  console.log('C')

  let table
  switch (type) {
    case 'GenreID':
      table = 'Genres'
      break
    case 'LevelID':
      table = 'Levels'
      break
    case 'LibraryID':
      table = 'Libraries'
      break
    case 'ProgressID':
      table = 'Progress'
      break
    case 'RecensionsID':
      table = 'Recensions'
      break
    case 'UserID':
      table = 'Users'
      break
    case 'GameID':
      table = 'Games'
      break
    case 'CountryID':
      table = 'Countries'
      break
    default:
      callback(false, false, 'ID-Name invalid')
      return
  }
  DB.query('SELECT * FROM ' + table + ' WHERE ' + type + ' = ' + ID, function (err, results) {
    if (err) callback(err, false, results)
    else if (results.length === 0) callback(err, false, type + ' ' + ID + ' doesn\'t exist')
    else callback(err, true)
  })
}

module.exports = IDChecker
