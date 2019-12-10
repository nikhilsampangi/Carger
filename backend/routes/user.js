const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const auth = require('./middleware_jwt');
const randomToken = require('random-token');

const User = require('../models/user.model');

const email = require('./send_email');

const transaction = require('./transaction')

const Pump = require('../models/petrolStation.model');

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
          if(!user){
              bcrypt.hash(req.body.hashedPassword, 10, (err, hash) => {
                  userData.hashedPassword = hash
                  User.create(userData)
                  .then(user => {
      
                    const gen_token= randomToken(55);

                    email.send_verification_token(gen_token, user.email);

                    var newValues = { $set: {token: gen_token } };
              
                      User.updateOne({
                        _id: user._id
                      }, newValues)
                        .then(user => {
                          if(user){
                            console.log("updated token")
                          }
                          else{
                            console.log({error:"token not updated"})
                          }
                        })
                        .catch(err => {
                          console.log('error:' + err.message)
                        });

                    res.json({status: "registered and a link is sent to your email to get your email verified"});
                  })

                  .catch(err => {
                    var arr= Object.keys(err['errors'])
                    var errors= []
                    for(i in arr){
                      errors.push(err['errors'][arr[i]].message);
                    }
                    console.log(errors)
                    res.json({error: errors});
                  })
              })
          }
          else{
              res.json({error: 'user already exist'});
          }
      })
      .catch(err =>{
        var arr= Object.keys(err['errors'])
        var errors= []
        for(i in arr){
          errors.push(err['errors'][arr[i]].message);
        }
        console.log(errors)
        res.json({error: errors});
      })


}


router.post('/login', login)

function login(req, res){
    
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
        res.send("verified")
      }
      else {
        res.json({ error: "not verified" })
      }
    })
    .catch(err => {
      res.json('error:' + err)
    });

}

router.post('/add_money_to_wallet', auth , add_money)

function add_money(req, res){
  transaction.pay(req.body, function(err, payment) {
    if(err){
      console.log(err)
    }
    else{

        for(let i = 0; i < payment.links.length; i++){
          if(payment.links[i].rel === 'approval_url'){   
            res.json({link: payment.links[i].href})
          }
        }
    
        const newValues= {
          $push:{
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
        .then( add => {
          if(add){
            console.log("transaction added!!!")
          }
          else{
            console.log("transaction not added")
          }
        })
        .catch(err=>{
          console.log({error: err})
        })

    }

  });
}

router.get('/success', success)

function success(req, res) {
  const data= {  
      payerId : req.query.PayerID,
      paymentId : req.query.paymentId,
  }

  transaction.success(data, function(err, response){
    console.log(response)
      if(err){
        console.log(err)
        res.send(err)
      }
      else{
        const newValues={
          $set:{
            "eWalletTransactions.$.status" : "completed",
            "eWalletTransactions.$.updatedAt" : response.update_time
          }
        }
        User.updateOne({
          "eWalletTransactions.transactionId" : response.id
        }, newValues)
        .then(user=>{
          console.log(user)
          const data={
            _id: response.id,
            type: 'credit',
            amount: response.transactions[0].amount.total
          }

          transaction.update_balance(data)
          
          res.redirect('http://localhost:3000') 
        })
        .catch(err=>{
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
                if(user.balance > req.body.total){
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
                    const newValues= {
                      $push:{
                        eWalletTransactions: {
                          transactionId: tid,
                          status: 'completed',
                          type: 'debit',
                          createdAt: Date.now,
                          amount: total_cost
                        }
                      }
                    }
                    User.updateOne({
                      _id: req.user._id
                    }, newValues)
                    var gid = Math.random().toString(36).substr(2, 9);
                    const n= {
                      $push:{
                        gasTransactions: {
                          transactionId: gid,
                          fuelType: req.body.type,
                          fuelPrice: cost_pl,
                          quantity: req.body.quantity,
                          cost: total_cost,
                          status: 'initiated',
                          pId: req.body.pid,
                          createdAt: Date.now,
                          eWalletTransactionId: tid
                        }
                      }
                    }
                    User.updateOne({
                      _id: req.user._id
                    }, n)
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

module.exports = router;