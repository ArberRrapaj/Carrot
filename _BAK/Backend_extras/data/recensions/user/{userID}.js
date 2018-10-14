'use strict';
var Recension = require('../../../utilities/Classes/Recension');
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
     * operationId: getRecensionByUserID
     */
    get: function (req, res, callback) {
        Recension.getRecensionsByUser(req.params.userID, function(err, results) {
            if(err) callback(err, {'status': 500, 'data': err.message});
            else callback(false, {'status': 200, 'data': results});
        });
    }
};
