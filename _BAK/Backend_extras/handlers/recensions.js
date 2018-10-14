'use strict';
var dataProvider = require('../data/recensions.js');
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
     */
    post: function createRecension(req, res, next) {
        var provider = dataProvider['post'];
        provider(req, res, function (err, data) {
            res.status(data.status).json(data.data);
        });
    }
};
