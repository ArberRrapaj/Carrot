'use strict';
var dataProvider = require('../../../data/recensions/user/{userID}.js');
/**
 * Operations on /recensions/user/{userID}
 */
module.exports = {
    /**
     * summary: Find recension of a game by the user's ID
     * description: Returns every recension matching the userID
     * parameters: userID
     * produces: application/json
     * responses: 200, 400, 404
     */
    get: function getRecensionByUserId(req, res, next) {
        var provider = dataProvider['get'];
        provider(req, res, function (err, data) {
            res.status(data.status).json(data.data);
        });
    }
};
