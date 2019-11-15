const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const auth= require('./middleware_jwt');
const randomToken = require('random-token');

const User= require('../models/user.model');

const email = require('./send_email')

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
              expiresIn: 1440
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


router.get('/profile', auth , profile)

function profile(req, res){

  User.findOne({
    _id: req.user._id
  })
    .then(user => {
      if(user){
        res.send(user)
      }
      else{
        res.json({error:"user does not exist"})
      }
    })
    .catch(err => {
      res.json('error:' + err)
    });

}

router.delete('/delete', delete_user)

function delete_user(req, res){

  User.findOneAndDelete({
    email: req.body.email
  })
    .then(user => {
      if(user){
        console.log("user deleted")
        res.send("user deleted")
      }
      else{
        res.json({error:"not deleted"})
      }
    })
    .catch(err => {
      res.json('error:' + err)
    });

}

router.post('/get_verified', auth, resend_token)

function resend_token(req, res){

  User.findOne({
    _id: req.user._id
  })
  .then(user=>{
    if(user){
      email.send_verification_token(user.token, user.email)
      res.json({status: "resent verification token"})
    }
    else{
      res.json({error: "Not a valid user"})
    }
  })
  .catch(err=>{
    res.json({error: err})
  });

}


router.get('/verify/:token', confirm_email)

function confirm_email(req, res){

  let randToken= req.params.token;
  var newValues = { $set: {isVerified: true } };

  User.findOneAndUpdate({
    token: randToken
  }, newValues)  
    .then(user => {
      if(user){
        res.send("verified")
      }
      else{ 
        res.json({error:"not verified"})
      }
    })
    .catch(err => {
      res.json('error:' + err)
    });

}

// router.get('/add_money_to_wallet', auth, add_money)

// function add_money(req, res){
  
// }

module.exports = router;    