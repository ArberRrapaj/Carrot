const JOI = require('joi')

class ValidateHandler {
  static validateSchema (object, schema) {
    // const schema = this.getCorrospondingSchema(object);
    var result = JOI.validate(object, schema)
    if (result.error === null) {
      return { result: true, message: result.error }
    } else {
      return { result: false, message: result.error.name + ': ' + result.error.details[0].message }
    }
  }
}

module.exports = ValidateHandler
