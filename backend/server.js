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
    'client_id': 'AfiQt3Lo69K_jTV_YZ-XhfK0jjMFkz9xJ49kpUijjBTP8TGMLPbya1VKlGeeULe94wy7tDECEiPCNEGT',
    'client_secret': 'EPgwL7eU8hEnRVqhoRuXNA9iFnkHSzviaOfJQZ9fU18mLaYkNDLjRpKJGRsS5Z4UGtYA8rY9VGJr83MK'
  });

mongoose.connect('mongodb://localhost:27017/cargerdb', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const connection = mongoose.connection;

connection.once('open', function(){
    console.log("connected");
});

const route = require('./routes/user');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/user', route);


app.listen(port, () => console.info('REST API running on port '+ port));
