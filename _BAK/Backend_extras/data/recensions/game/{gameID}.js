'use strict';
var Recension = require('../../../utilities/Classes/Recension');
/**
 * Operations on /recensions/game/{gameId}
 */
module.exports = {
    /**
     * summary: Find recensions of a game by the game's ID
     * description: Returns every recension matching the gameID
     * parameters: gameID
     * produces: application/json
     * responses: 200, 400, 404
     * operationId: getRecensionByGameId
     */
    get: function (req, res, callback) {
        Recension.getRecensionsByGame(req.params.gameID, function(err, results) {
            if(err) callback(err, {'status': 500, 'data': err.message});
            else callback(false, {'status': 200, 'data': results});
        });
    }
};
