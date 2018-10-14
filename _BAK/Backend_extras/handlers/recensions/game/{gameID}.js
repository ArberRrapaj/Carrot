'use strict';
var dataProvider = require('../../../data/recensions/game/{gameID}.js');
/**
 * Operations on /recensions/game/{gameId}
 */
module.exports = {
    /**
     * summary: Find recension of a game by the game&#39;s ID
     * description: Returns every recension matching the gameId
     * parameters: gameID
     * produces: application/json
     * responses: 200, 400, 404
     */
    get: function getRecensionByGameId(req, res, next) {
        var provider = dataProvider['get'];
        provider(req, res, function (err, data) {
            res.status(data.status).json(data.data);
        });
    }
};
