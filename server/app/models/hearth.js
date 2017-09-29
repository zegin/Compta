// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User   = require('./user');
// set up a mongoose model and pass it using module.exports

module.exports = mongoose.model('Hearth', new Schema({
    name: String,
    childs: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}));
