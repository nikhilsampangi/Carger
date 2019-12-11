const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const auth = require('./middleware_jwt');
const randomToken = require('random-token');

const User = require('../models/user.model');
const Pump = require('../models/petrolStation.model')

const email = require('./send_email');

const transaction = require('./transaction')

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyA7nx22ZmINYk9TGiXDEXGVxghC43Ox6qA',
  Promise: Promise
});

router.use(cors());

process.SECRET_KEY = 'secret';

router.post('/register', register)

function register(req, res) {

  const userData = {
    username: req.body.username,
    hashedPassword: req.body.hashedPassword,
    phone: req.body.phone,
    email: req.body.email,
    gender: req.body.gender
  }
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.hashedPassword, 10, (err, hash) => {
          userData.hashedPassword = hash
          User.create(userData)
            .then(user => {

              const gen_token = randomToken(55);

              email.send_verification_token(gen_token, user.email);

              var newValues = { $set: { token: gen_token } };

              User.updateOne({
                _id: user._id
              }, newValues)
                .then(user => {
                  if (user) {
                    console.log("updated token")
                  }
                  else {
                    console.log({ error: "token not updated" })
                  }
                })
                .catch(err => {
                  console.log('error:' + err.message)
                });

              res.json({ status: "registered and a link is sent to your email to get your email verified" });
            })

            .catch(err => {
              var arr = Object.keys(err['errors'])
              var errors = []
              for (i in arr) {
                errors.push(err['errors'][arr[i]].message);
              }
              console.log(errors)
              res.json({ error: errors });
            })
        })
      }
      else {
        res.json({ error: 'user already exist' });
      }
    })
    .catch(err => {
      var arr = Object.keys(err['errors'])
      var errors = []
      for (i in arr) {
        errors.push(err['errors'][arr[i]].message);
      }
      console.log(errors)
      res.json({ error: errors });
    })


}


router.post('/login', login)

function login(req, res) {

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.hashedPassword, user.hashedPassword)) {
          // Passwords match
          const payload = {
            _id: user._id,
            email: user.email
          }
          let token = jwt.sign(payload, process.SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: 86400
          })
          res.send(token)
        } else {
          // Passwords don't match
          res.json({ error: 'Incorrect Password' })
        }
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    });

}


router.get('/profile', auth, profile)

function profile(req, res) {

  User.findOne({
    _id: req.user._id
  })
    .then(user => {
      if (user) {
        res.send(user)
      }
      else {
        res.json({ error: "user does not exist" })
      }
    })
    .catch(err => {
      res.json('error:' + err)
    });

}


router.delete('/delete', delete_user)

function delete_user(req, res) {

  User.findOneAndDelete({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        console.log("user deleted")
        res.send("user deleted")
      }
      else {
        res.json({ error: "not deleted" })
      }
    })
    .catch(err => {
      res.json('error:' + err)
    });

}

router.post('/get_verified', auth, resend_token)

function resend_token(req, res) {

  User.findOne({
    _id: req.user._id
  })
    .then(user => {
      if (user) {
        email.send_verification_token(user.token, user.email)
        res.json({ status: "resent verification token" })
      }
      else {
        res.json({ error: "Not a valid user" })
      }
    })
    .catch(err => {
      res.json({ error: err })
    });

}


router.get('/verify/:token', confirm_email)

function confirm_email(req, res) {

  let randToken = req.params.token;
  var newValues = { $set: { isVerified: true } };

  User.findOneAndUpdate({
    token: randToken
  }, newValues)
    .then(user => {
      if (user) {
        res.redirect('http://localhost:3000/#/Email_Verification/1')
      }
      else {
        res.json({ error: "not verified" })
        res.redirect('http://localhost:3000/#/Email_Verification/0')
      }
    })
    .catch(err => {
      res.json('error:' + err)
      res.redirect('http://localhost:3000/#/Email_Verification/0')
    });

}

router.post('/add_money_to_wallet', auth, add_money)

function add_money(req, res) {
  transaction.pay(req.body, function (err, payment) {
    if (err) {
      res.send('problem with bank!!!')
    }
    else {
      
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.json({ link: payment.links[i].href })
        }
      }

      const newValues = {
        $push: {
          eWalletTransactions: {
            transactionId: payment.id,
            status: 'initiated',
            type: 'credit',
            createdAt: payment.create_time,
            amount: req.body.amount
          }
        }
      }

      User.updateOne({
        _id: req.user._id
      }, newValues)
        .then(add => {
          if (add) {
            console.log("transaction added!!!")
          }
          else {
            console.log("transaction not added")
          }
        })
        .catch(err => {
          console.log({ error: err })
        })

    }

  });
}

router.get('/success', success)

function success(req, res) {
  const data = {
    payerId: req.query.PayerID,
    paymentId: req.query.paymentId,
  }

  transaction.success(data, function (err, response) {
    console.log(response)
    if (err) {
      console.log(err)
      res.send(err)
    }
    else {
      const newValues = {
        $set: {
          "eWalletTransactions.$.status": "completed",
          "eWalletTransactions.$.updatedAt": response.update_time
        }
      }
      User.updateOne({
        "eWalletTransactions.transactionId": response.id
      }, newValues)
        .then(user => {
          console.log(user)
          const data = {
            _id: response.id,
            type: 'credit',
            amount: response.transactions[0].amount.total
          }

          transaction.update_balance(data)

          res.redirect('http://localhost:3000/#/User_Wallet_Success')
        })
        .catch(err => {
          console.log(err)
        })
    }
  })

}


router.get('/cancel', cancel)

function cancel(req, res) {
  console.log(req.query);
  res.send('Cancelled');
}

router.get('/fuelQuantity', GetQuantity)

function GetQuantity(req, res) {
  Outlet.find({
    name: req.body.name,
  }).then(outlet => {
    res.send(Outlet.address)
  }
  )
}

module.exports = router;


router.post('/buy_fuel', auth, buy_fuel)

function buy_fuel(req, res){
      
      User.findOne({
        email:req.user.email
      })
      .then(user=>{
        if(user){
          
        }
      })
}

router.post('/gas_trans', auth, gas_trans)

function gas_trans(req, res) {
  Pump.findOne({
    name: req.body.name
  })
    .then(pump =>{
      console.log(pump)
      if(pump){
        var cost_pl = 0
        var pump_quan = 0
        for(let i = 0; i < pump.fuelDetails.length; i++){
          if(pump.fuelDetails[i].fuel === req.body.type){   
            cost_pl = pump.fuelDetails[i].price
            pump_quan = pump.fuelDetails[i].quantity
          }
        }
        if(req.body.quantity < pump_quan){
          User.findOne({
            _id: req.user._id
          })
            .then(user =>{
              if(user){
                if(parseFloat(user.balance) >= parseFloat(req.body.total)){
                  total_cost = cost_pl * req.body.quantity
                  if(total_cost == req.body.total){
                    var x = parseFloat(user.balance) - total_cost
                    const newVal={
                      $set:{
                          balance: x
                      }
                    }
                    User.updateOne({
                      _id: user._id
                    }, newVal)
                      .then(y =>{
                        if(y.ok == 1){
                          var tid = Math.random().toString(36).substr(2, 9);
                          var f = new Date();
                          var z = f.toISOString();
                          const newValues= {
                            $push:{
                              eWalletTransactions: {
                                transactionId: tid,
                                status: 'completed',
                                type: 'debit',
                                createdAt: z,
                                amount: total_cost
                              }
                            }
                          }
                          User.updateOne({
                            _id: req.user._id
                          }, newValues)
                          .then(m =>{
                            console.log(m)
                          })
                          .catch(err => {
                            console.log(err)
                          })

                          var gid = Math.random().toString(36).substr(2, 9);
                          var j = new Date();
                          var k = j.toISOString();
                          var ot  = Math.floor(100000 + Math.random() * 900000)
                          const n= {
                            $push:{
                              gasTransactions: {
                                transactionId: gid,
                                fuelType: req.body.type,
                                fuelPrice: cost_pl,
                                quantity: req.body.quantity,
                                cost: total_cost,
                                status: 'initiated',
                                pId: req.body.name,
                                createdAt: k,
                                eWalletTransactionId: tid,
                                otp: ot
                              }
                            }
                          }
                          User.updateOne({
                            _id: req.user._id
                          }, n)
                          .then(w =>{
                            res.send('Updated')
                          })
                          .catch(err => {
                            console.log(err)
                          })
                              }
                            })
                        }
                  else{
                    res.send('Access Denied')
                  }
                }
                else{
                  res.send('Not enough wallet balance.Please add money to wallet')
                }
              }
              else{
                res.send('no user found!!!')
              }
            })
            .catch(err=>{
              res.json({error:err})
            })
          } 
        else{
          res.send('Not enough fuel in this outlet')
        }
      }
    })
    .catch(err=>{
      res.json({error:err})
    })
}

router.post('/gmap', gmap)

function gmap(req, res) {
    
  const lat = req.body.lat
  const lng = req.body.lng

  lis = []
  User.find({})
    .then(u => {
      for(let i = 0; i < u.length; i++){
            // d = u[i].latitude + ',' + u[i].longitude
        googleMapsClient.directions({
            origin: lat + ',' + lng,
            destination: '33.8068768,-118.3527671',
            units: 'metric'
        })
        .asPromise()
        .then(response => {
          d = response.json.routes[0].legs[0].distance.text
          x = d.split(" ")
          if(parseFloat(x[0]) < 100){
            lis.push(i)
          }
          console.log(d)
          console.log(lis)
          console.log(response.json);
        })
        .catch((err) => {
          console.log(err);
        });



    //   googleMapsClient.directions({
    //     origin: lat + ',' + lng,
    //     destination: '33.8068768,-118.3527671',
    //     units: 'metric'
    //   }, function(err, response) {
    //     if (!err) {
    //       d = response.json.routes[0].legs[0].distance.text
    //       x = d.split(" ")
    //       if(parseFloat(x[0]) > 50){
    //         console.log(parseFloat(x[0]))
    //         list.push(i)
    //       }
    //       console.log(list)
    //     }
    //   });
    //   if(i == u.length-1){
    //     console.log(list)
    //   }
    // }
    }
    res.send(lis)
  })
}


router.post('/pending_trans', auth, pending_trans)

function pending_trans(req, res) {
  list = []
  User.findOne({
    _id: req.user._id
  })
    .then(user =>{
      for(let i=0; i < user.gasTransactions.length; i++){
        if(gasTransactions[i].status == 'initiated'){
          list.push(gasTransactions[i])
        }
      }
      res.send(list)
    })
}

router.post('/str_dis', auth, str_dis)

function str_dis(req, res) {
  l = []
  lat = parseFloat(req.body.latitude)
  lng = parseFloat(req.body.longitude)

  Pump.find()
    .then(p =>{
      for(let i=0; i < p.length; i++){
        var lat2 = parseFloat(p[i].latitude)
        var lng2 = parseFloat(p[i].longitude)
        var R = 6371e3; // metres
        var ph1 = lat.toRadians();
        var ph2 = lat2.toRadians();  
        var dph = (lat2-lat).toRadians();
        var dl = (lng2-lng).toRadians();

        var a = Math.sin(dph/2) * Math.sin(dph/2) + Math.cos(ph1) * Math.cos(ph2) * Math.sin(dl/2) * Math.sin(dl/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        if(d < 100){
          l.push(p[i])
        }
      }
      res.send(l)
    })


  
}


module.exports = router;
