const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {type:String, required:true},
    hashedPassword: {type:String, required:true},
    phone: {
        type:Number,
        require: true,
        // validate: {
        //     validator: function(v) {
        //         return /d{10}/.test(v)
        //     }
        // }
    },
    email: {type:String, required: true},
    gender: {type:String, enum: ['Male', 'Female', 'Prefer not to say'], default:'Prefer not to say'},
    eId: {type:String},
    balance: {type:String},
    eWalletPin: {type:String},
    gasTransactions: [{
        transactionId: {type:String, required:true},
        fuelType: {type:String, required:true},
        fuelPrice: {type:Number, required:true},
        quantity: {type:Number, required:true}, 
        cost: {type:Number, required:true},
        status: {type:String, enum:['initiated', 'processing', 'completed', 'failed'], required:true},
        pId: {type:String, required:true}, //Petrol station ID
        pumpId: {type:String, required:true},
        createdAt: {type:Date, default: Date.now, required:true},
        updatedAt: {type:Date, default: Date.now, required:true},
        eWalletTransactionId: {type:String, required : true}
    }],
    eWalletTransactions: [{
        transactionId: {type:String, required:true},
        status: {type:String, enum:['initiated', 'processing', 'completed', 'failed'], required:true},
        type: {type:String, enum:['credit', 'debit']},
        createdAt: {type:Date, default: Date.now, required:true},
        updatedAt: {type:Date, default: Date.now, required:true}, 
        amount: {type:Number, required:true}
    }]
});

schema.set('toJSON', {virtuals:true});

module.exports = mongoose.model('User', schema);