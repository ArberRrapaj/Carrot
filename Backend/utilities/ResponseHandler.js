class ResponseHandler {
  /**
     * Sends response for Frontend with appropriated status.
     * The returnType is used, so that the frontend nows, which format the send data has.
     * @param {*} statusCode Status Code (HTTP)
     * @param {*} returnType Return Type of Data
     * @param {*} data Data to be send back to Frontend
     * @param {*} res Response Object
     */
  static sendResponse (statusCode, returnType, data, res) {
    res.status(statusCode).json(
      {
        status: statusCode,
        returnType: returnType,
        data: data
      }
    )
  }

  /**
     *
     * @param {*} returnType Return Type of Data.
     * @param {*} data Data to be send back to Frontend.
     * @param {*} res Response Object.
     */
  static success (returnType, data, res) {
    this.sendResponse(200, returnType, data, res)
  }

  /**
     *
     * @param {*} data Data to be send the frontend.
     * @param {*} res Response Object.
     */
  static badRequestError (returnType, data, res) {
    this.sendResponse(400, returnType, data, res)
  }

  /**
     *
     * @param {*} date Data to be send the frontend.
     * @param {*} res Response Object.
     */
  static unauthorizedError (returnType, data, res) {
    this.sendResponse(401, returnType, data, res)
  }

  /**
     *
     * @param {*} returnType Return Type of Data.
     * @param {*} data Data to be send the frontend.
     * @param {*} res Response Object.
     */
  static forbiddenError (returnType, data, res) {
    this.sendResponse(403, returnType, data, res)
  }

  /**
     *
     * @param {*} returnType Return Type of Data.
     * @param {*} data Data to be send the frontend.
     * @param {*} res Response Object.
     */
  static serverError (returnType, data, res) {
    this.sendResponse(500, returnType, data, res)
  }

  /**
     *
     * @param {*} message Message to be send.
     * @param {*} res Response Object.
     */
  static database401Error (message, res) {
    this.badRequestError('String', message, res)
  }

  /**
     *
     * @param {*} message
     * @param {*} res
     */
  static database500Error (message, res) {
    this.serverError('String', message, res)
  }

  /**
     *
     * @param {*} res Response Object.
     */
  static notEnoughRightsError (res) {
    this.forbiddenError('String', 'Not enough rights to perform this action.', res)
  }

  /**
     *
     * @param {*} res Response Object.
     */
  static badDataError (res) {
    this.badRequestError('String', 'Supplied data is bad.', res)
  }
}

module.exports = ResponseHandler
