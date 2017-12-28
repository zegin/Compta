// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User   = require('./user');
var Resource   = require('./resource');
var Expense   = require('./expense');
var Saving   = require('./saving');
var Budget   = require('./budget');
// set up a mongoose model and pass it using module.exports

module.exports = mongoose.model('Hearth', new Schema({
    name: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
    expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
    savings: [{ type: Schema.Types.ObjectId, ref: 'Saving' }],
    budgets: [{ type: Schema.Types.ObjectId, ref: 'Budget' }]
}));
