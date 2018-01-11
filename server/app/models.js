// get an instance of mongoose and mongoose.Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports

var hearthSchema = new Schema({
    name: { type : String , unique : true},
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    resources: [{ type: Schema.Types.ObjectId, ref: 'Resource', unique : true }],
    expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
    savings: [{ type: Schema.Types.ObjectId, ref: 'Saving' }],
    budgets: [{ type: Schema.Types.ObjectId, ref: 'Budget' }]
});

hearthSchema.methods.addUser = function(user, callback){
    this.users.push(user)
    this.save(e => {
      if(e){throw(e)}
      user.set({hearth: this.id})
      user.save(e => {
        if(e){throw(e)}
        if(callback){
            callback()
        }
      })
    })
    return this;
}

hearthSchema.methods.addResource = function(resource, callback, errorHandler){

    resource.set({hearth: this.id})
    resource.save(e => {
        if(e){
            errorHandler(e)
            return this
        }
        this.resources.push(resource)
        this.save(e => {
            if(e){
                errorHandler(e)
                return this
            }
            if(callback){
                callback()
            }
        })
    })
    return this;

    // this.resources.push(resource)
    // this.save(e => {
    //     if(e){
    //         console.log('save hearth');
    //         throw(e)
    //     }
    //     resource.set({hearth: this.id})
    //     resource.save(e => {
    //         if(e){
    //             errorHandler(e)
    //         }
    //         if(callback){
    //             callback()
    //         }
    //     })
    // })
    // return this;
}

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    name: { type : String , unique : true},
    password: String,
    hearth: { type: Schema.Types.ObjectId, ref: 'Hearth' }
});

var standardSchema = new Schema({
    name: { type : String , unique : true},
    value: Number,
    date: Date,
    repetition: String,
    hearth: { type: Schema.Types.ObjectId, ref: 'Hearth' }
});

Hearth = mongoose.model('Hearth', hearthSchema)
User = mongoose.model('User', userSchema)
Resource = mongoose.model('Resource', standardSchema)
Expense = mongoose.model('Expense', standardSchema)
Saving = mongoose.model('Saving', standardSchema)
Budget = mongoose.model('Budget', standardSchema)

module.exports = {
    hearth: Hearth,
    user: User,
    resource: Resource,
    expense: Expense,
    saving: Saving,
    budget: Budget
}
