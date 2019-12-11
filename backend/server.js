const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const app= express();
const port= 8008;
const paypal= require('paypal-rest-sdk');

const cronJob= require('./time_schedule/cancel_order');


app.use(cors());

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AfiQt3Lo69K_jTV_YZ-XhfK0jjMFkz9xJ49kpUijjBTP8TGMLPbya1VKlGeeULe94wy7tDECEiPCNEGT',
    'client_secret': 'EPgwL7eU8hEnRVqhoRuXNA9iFnkHSzviaOfJQZ9fU18mLaYkNDLjRpKJGRsS5Z4UGtYA8rY9VGJr83MK'
  });


// uri = 'mongodb+srv://someuser:mdimy7UckXKlOZZi@carger-5v3o8.mongodb.net/test?retryWrites=true&w=majority'
// mongoose.connect(uri, {useNewUrlParser: true});

mongoose.connect('mongodb://localhost:27017/cargerdb', {useNewUrlParser: true});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const connection = mongoose.connection;

connection.once('open', function(){
    console.log("connected");
});

// cronJob();


const route = require('./routes/user');
const adminroutes = require('./routes/owner');
const managerroutes = require('./routes/manager');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/user', route);
app.use('/admin', adminroutes);
app.use('/manager', managerroutes);
app.listen(port, () => console.info('REST API running on port '+ port));
