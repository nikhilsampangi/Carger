const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type:String, required:true, unique=true},
    hashedPassword: {type:String, required:true},
    phone: {
        type:Number,
        required: true,
        validate: {
            validator: function(v) {
                return /d{10}/.test(v)
            }
        }
    },
    email: {type:String, required: true},
    gender: {type:String, enum: ['Male', 'Female', 'Prefer not to say'], default:'Prefer not to say'},
    worksAt: {
        pId: {type:String, required:true},
        pName: {type:String, required:true},
        pAddress: {type:String, required:true}
    },
    token: {type:String, default: null},
    isVerified: {type:Boolean, default:false}
});

schema.set('toJSON', {virtuals:true});

module.exports = mongoose.model('Manager', schema);