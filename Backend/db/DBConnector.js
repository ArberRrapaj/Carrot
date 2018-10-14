const mysql = require('mysql')

class DBConnector {
  constructor (conLimit, dbhost, dbuser, dbpassword, dbname) {
    this._connectionPool = mysql.createPool({
      connectionLimit: conLimit,
      host: dbhost,
      user: dbuser,
      password: dbpassword,
      database: dbname,
      debug: false
    })
  }

  getConnectionPool () {
    return this._connectionPool
  }
}

const instance = (function () {
  var dbConnector = new DBConnector(
    1,
    'localhost',
    'root',
    'rootroot',
    'Carrot'
  )
  console.log('DB izzda')
  return dbConnector
})()
Object.freeze(instance)

module.exports = instance.getConnectionPool()
