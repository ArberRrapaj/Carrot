const JOI = require('joi');
var DB = require('../../db/DBConnector');
var Validator = require('../../utilities/ValidationHandler');
var IDChecker = require('../../utilities/IDChecker');

class Recension {
    constructor(recensionID, userID, gameID, text, rating){
        if (recensionID == undefined || recensionID == '') this._recensionID = null;
        else this._recensionID  = recensionID;
        this._userID            = userID;
        this._gameID            = gameID;
        this._text              = text;
        this._rating            = rating;
    }

    _freeze() {
        Object.freeze(this);
    }
    
    getMappedObject() {
        return Object.freeze({
            'RecensionID': this._recensionID,
            'UserID': this._userID,
            'GameID': this._gameID,
            'Text': this._text,
            'Rating': this._rating
        });
    }
}

/**
 * Validation Helper Methods and Schemas
 */

Recension.schema = JOI.object().keys({
    RecensionID: JOI.number().integer().min(1).optional().allow(null),
    UserID: JOI.number().integer().min(1).required(),
    GameID: JOI.number().integer().min(1).required(),
    Text: JOI.string().regex(/^[\x00-\xFF]*$/).min(1).max(100).optional().allow(null),
    Rating: JOI.number().integer().min(1).max(10).required()
});

Recension.validate = function (recension, callback) {
    const validation = Validator.validateSchema(recension, this.schema);

    if(validation.result) {
        console.log('Recension is valid af');
        
        IDChecker.checkID('UserID', false, recension.UserID, function (err, valid, message) {
            if (err) callback(err, {'status': 500, 'data': err.message});
            else if (valid) {
                IDChecker.checkID('GameID', false, recension.GameID,  function (err, valid, message) {
                    if (err) callback(err, {'status': 500, 'data': err.message});
                    else if (valid) callback(false); // Valid
                    else callback(true, {'status': 400, 'data': message});
                });
            } else callback(true, {'status': 400, 'data': message});
        });

    } else callback(true, {'status': 400, 'data': validation.message});

};

Recension.validatePush = function (recension, callback) {

    this.validate(recension, function (err, result) {
        if (err) callback(err, result);
        else {
            this.checkDuplicateRecension (recension.UserID, recension.GameID, function (err, valid, results) {
                if (err) callback(err, {'status': 500, 'data': err.message});
                else if (valid) callback(false); // valid
                else callback(true, results);
            });
        }
    }.bind(this));

};




/**
 * Database-Functions
 */

// For /Recensions/
Recension.checkDuplicateRecension = function (userID, gameID, callback) {
    DB.query('SELECT * FROM Recensions WHERE UserID = ? AND GameID = ?', [userID, gameID], function(err, results, fields) {
        if (err) callback(err, false, results);
        else if (results.length == 0) callback(err, true);
        else callback(err, false, {'status': 400, 'data': 'There is already a recension for that game by the given user'});
    });
};

Recension.saveRecension = function (recension, callback) {
    DB.query('INSERT INTO Recensions SET ?', [recension], function(err, results) {
        callback(err, results);
    });
};


// For /Recensions/Game/{GameID}
Recension.getRecensionsByGame = function (gameID, callback) {
    console.log('getRecensionsByGame: ' + gameID);

    DB.query('SELECT RecensionID, UserID, GameID, Text, Rating FROM Recensions WHERE GameID = ?' , [gameID], function(err, results) {
        if (err) callback(err, results);
        else callback(err, results);
    });
};


// For /Recensions/User/{UserID}
Recension.getRecensionsByUser = function (userID, callback) {
    console.log('getRecensionsByUser: ' + userID);

    DB.query('SELECT RecensionID, UserID, GameID, Text, Rating FROM Recensions WHERE UserID = ?', [userID], function(err, results) {
        if (err) callback(err, results);
        else callback(err, results);
    });
};


// For /Recensions/{RecensionID}
Recension.getRecensionByRecensionID = function (recensionID, callback) {
    console.log('getRecensionByRecensionID: ' + recensionID);

    DB.query('SELECT RecensionID, UserID, GameID, Text, Rating FROM Recensions WHERE RecensionID = ?' , [recensionID], function(err, results) {
        if (err) callback(err, results);
        else callback(err, results);
    });
};

Recension.updateRecension = function (recension, callback) {
    console.log('Update-Recension-RecensionID: ', recension.RecensionID);

    DB.query('UPDATE Recensions SET ? WHERE RecensionID = ?' , [recension, recension.RecensionID], function(err, results) {
        console.log('UpdateRecension: ', results);
        callback(err, results);
    });
};

Recension.deleteRecension = function (recensionID, callback) {
    console.log('Delete-Recension-RecensionID: ', recensionID);

    DB.query('DELETE FROM Recensions WHERE RecensionID = ?' , [recensionID], function(err, results, fields) {
        callback(err, results, fields);
    });
};





module.exports = Recension;