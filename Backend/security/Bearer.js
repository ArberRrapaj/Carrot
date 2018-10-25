'use strict'
const jwt = require('jsonwebtoken')
/**
 * Authorize function for securityDefinitions: api_key
 * type : apiKey
 * description: Bearer key with JWT
 */
module.exports = function authorize (req, res, next) {
  // The context('this') for authorize will be bound to the 'securityDefinition'
  // this.name - The name of the header or query parameter to be used for securityDefinitions:api_key apiKey security scheme.
  // this.in - The location of the API key ("query" or "header") for securityDefinitions:api_key apiKey security scheme.

  var token = req.headers['authorization']
  console.log('In Authentication: ', token)
  if (!token) return res.status(401).json('No authentication-token provided, please login first.')
  token = req.headers.authorization.replace('Bearer ', '')

  jwt.verify(token, process.env.AUTH_SECRET, function (err, decoded) {
    if (err) return res.status(500).send('Failed to authenticate token.')
    else {
      // req.locals.user = user; // erlaubt dir auf user-informationen (id) in späteren routen zuzugreifen
      console.log('req.params: ', req.params)
      console.log('decoded.username: ', decoded.username)
      if (req.params['username'].localeCompare(decoded.username) === 0) {
        req.username = decoded.username
        next()
      } else return res.status(401).json('Not authorized for that action.')
    }
  })
}
