const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    //pid=_id
    name: {type:String, required:true, unique:true},
    fuelDetails: [{
        fuel: {type:String, required:true},
        quantity: {type:String, required:true}, 
        price: {type:Number, required:true}
    }],
    pumps: [{
        id: {type:String, required:true},
        status: {type:Boolean, default:false},
        pumptype: {type:String, required:true}
    }],
    address: {type:String, required:true},
    emergencyShutdown: {type:Boolean, default:false},
});

schema.set('toJSON', {virtuals:true});

module.exports = mongoose.model('PetrolStation', schema);