const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const app= express();
const port= 8008;
const paypal= require('paypal-rest-sdk');

app.use(cors());

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AeU-lXzg0B7ASsgFsCKmeu0QLqRzKMKoXlBxyEi-wAOMrbrhF0m0SrCRS2vl0SeM9NvsvyG1_D6ESuCi',
    'client_secret': 'EAb0LTOVjQhv-bf9EoP5XOqZ0c5Ba97J3Pgmbs5d-Gz8nE0IY74WVsgmlzo7wACD66pxitfOAJ9m11tf'
  });

mongoose.connect('mongodb://localhost:27017/cargerdb', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const connection = mongoose.connection;

connection.once('open', function(){
    console.log("connected");
});

const route = require('./routes/user');
const route1 = require('./routes/transaction');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/user', route);
app.use('/transaction', route1);


app.listen(port, () => console.info('REST API running on port '+ port));
