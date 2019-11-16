const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const app= express();
const port= 8008;

app.use(cors());

// uri = 'mongodb+srv://someuser:mdimy7UckXKlOZZi@carger-5v3o8.mongodb.net/test?retryWrites=true&w=majority'
// mongoose.connect(uri, {useNewUrlParser: true});
mongoose.connect('mongodb://localhost:27017/cargerdb', {useNewUrlParser: true});

mongoose.set('useFindAndModify', false);

const connection = mongoose.connection;

connection.once('open', function(){
    console.log("connected");
});

const route = require('./routes/user');
const adminroutes = require('./routes/owner');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/user', route);
app.use('/admin', adminroutes);
app.listen(port, () => console.info('REST API running on port '+ port));
