'use strict';
var dataProvider = require('../../data/recensions/{recensionID}.js');
/**
 * Operations on /recensions/{recensionId}
 */
module.exports = {
    /**
     * summary: Find recension by ID
     * description: Returns a single recension
     * parameters: recensionId
     * produces: application/json
     * responses: 200, 400, 404
     */
    get: function getRecensionByID(req, res, next) {
        var provider = dataProvider['get'];
        provider(req, res, function (err, data) {
            res.status(data.status).json(data.data);
        });
    },
    /**
     * summary: Updates a Recension in the Recensions-DB with form data
     * description: 
     * parameters: recensionId, body
     * produces: application/json
     * responses: 405
     */
    put: function updateRecension(req, res, next) {
        var provider = dataProvider['put'];
        provider(req, res, function (err, data) {
            res.status(data.status).json(data.data);
        });
    },
    /**
     * summary: Deletes a recension
     * description: 
     * parameters: api_key, recensionId
     * produces: application/json
     * responses: 400, 404
     */
    delete: function deleteRecension(req, res, next) {
        var provider = dataProvider['delete'];
        provider(req, res, function (err, data) {
            res.status(data.status).json(data.data);
        });
    }
};
