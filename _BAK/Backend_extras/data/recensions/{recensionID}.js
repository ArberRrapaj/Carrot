'use strict';
var Recension = require('../../utilities/Classes/Recension.js');
/**
 * Operations on /recensions/{recensionId}
 */
module.exports = {
    /**
     * summary: Find recension by ID
     * description: Returns a single recension
     * parameters: recensionID
     * produces: application/json
     * responses: 200, 400, 404
     * operationId: getRecensionByID
     */
    get: function (req, res, callback) {
        Recension.getRecensionByRecensionID(req.params.recensionID, function(err, results) {
            if(err) callback(err, {'status': 500, 'data': err.message});
            else callback(false, {'status': 200, 'data': results});
        });
    },
    /**
     * summary: Updates a Recension in the Recensions-DB with form data
     * description: 
     * parameters: recensionID, body
     * produces: application/json
     * responses: 405
     * operationId: updateRecension
     */
    put: function (req, res, callback) {  
        console.log('Put-Recensions-recensionID');

        var body = req.body;

        var recensionID = req.params.recensionID;
        var userID  = body.UserID;
        var gameID  = body.GameID;
        var text    = body.Text;
        var rating  = body.Rating;

        const recension = new Recension(recensionID, userID, gameID, text, rating).getMappedObject();

        Recension.validate(recension, function (err, result) {
            if (err) callback(err, result);
            else {
                Recension.getRecensionByRecensionID(recensionID, function (err, results) {
                    if (err) callback(true, {'status': 500, 'data': err.message});
                    else if (results.length != 0) {
                        Recension.updateRecension(recension, function(err, results) {
                            if(err) callback(true, {'status': 500, 'data': err.message});
                            else callback(false, {'status': 200, 'data': 'Successfully updated Recension with rating: ' + rating });
                        });
                    } else callback(true, {'status': 400, 'data': 'There is no recension with that ID: ' + recensionID});
                });
            }
        });
    },
    /**
     * summary: Deletes a recension
     * description: 
     * parameters: api_key, recensionID
     * produces: application/json
     * responses: 400, 404
     * operationId: deleteRecension
     */
    delete: function (req, res, callback) {
        console.log('Delete-Recension-RecensionID');

        var recensionID = req.params.recensionID;

        Recension.getRecensionByRecensionID(recensionID, function (err, results) {
            if (err) callback(true, {'status': 500, 'data': err.message});
            else if (results.length != 0) {
                Recension.deleteRecension(recensionID, function (err, result) {
                    if (err) callback(true, {'status': 500, 'data': err.message});
                    else callback(false, {'status': 200, 'data': 'Successfully deleted recension with recensionID: ' + recensionID });
                });
            } else callback(true, {'status': 400, 'data': 'There is no recension with that recensionID'});
        });
    }
};
