// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Hearth   = require('./hearth');

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Expense', new Schema({
    name: String,
    value: Number,
    date: Date,
    repetition: String,
    hearth: [{ type: Number, ref: 'Hearth' }]
}));
