const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type:String, required:true},
    hashedPassword: {type:String, required:true},
    isAdmin: {type:Boolean, default:false},
    email:{type:String, required:true}
});

schema.set('toJSON', {virtuals:true});

module.exports = mongoose.model('Owner', schema);