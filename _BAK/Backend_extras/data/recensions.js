'use strict';
var Recension = require('../utilities/Classes/Recension');

/**
 * Operations on /recensions/
 */
module.exports = {
    /**
     * summary: Create a recension
     * description: This can only be done by the logged in user.
     * parameters: body
     * produces: application/json
     * responses: default
     * operationId: createRecension
     */
    post: function (req, res, callback) {
        console.log('POST-Recensions');

        var body = req.body;

        var userID  = body.UserID;
        var gameID  = body.GameID;
        var text    = body.Text;
        var rating  = body.Rating;

        const recension = new Recension(null, userID, gameID, text, rating).getMappedObject();

        Recension.validatePush(recension, function (err, result) {
            if (err) callback(err, result);
            else {
                Recension.saveRecension(recension, function(err, results) {
                    if(err) callback(true, {'status': 500, 'data': err.message});
                    else callback(false, {'status': 200, 'data': 'Successfully inserted Recension with rating: ' + rating });
                });
            }
        });
    }
};
