'use strict'
/**
 * Authorize function for securityDefinitions: api_key
 * type : apiKey
 * description: Bearer key with JWT
 */
module.exports = function authorize (req, res, next) {
  // The context('this') for authorize will be bound to the 'securityDefinition'
  // this.name - The name of the header or query parameter to be used for securityDefinitions:api_key apiKey security scheme.
  // this.in - The location of the API key ("query" or "header") for securityDefinitions:api_key apiKey security scheme.

  // Perform auth here
  /*

  401:
  description: Not authenticated
  */
  console.log('in authentication')
  console.log(req.headers)
  next()
}
