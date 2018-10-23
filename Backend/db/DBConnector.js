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
    process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    process.env.DB_DATABASE
  )
  console.log('DB izzda')
  return dbConnector
})()
Object.freeze(instance)

module.exports = instance.getConnectionPool()
