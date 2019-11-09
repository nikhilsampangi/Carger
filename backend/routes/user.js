const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const auth= require('./middleware_jwt');

const User= require('../models/user.model');

const send_email= require('./send_email')

router.use(cors());

process.SECRET_KEY = 'secret';

router.post('/register', register)

function register(req, res) {
  if(req.body.hashedPassword === req.body.confirmPassword ){

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
                      res.json({status: user.email + " registered"});
                  })
                  .catch(err => {
                      res.json({error: err});
                  })
              })
          }
          else{
              res.json({error: 'user already exist'});
          }
      })
      .catch(err =>{
          res.json({error: err});
      })
  }
  
  else{
    res.json({error: "Passwords did not match"})
  }  

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
              username: user.username,
              phone: user.phone,
              email: user.email
            }
            let token = jwt.sign(payload, process.SECRET_KEY, {
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
      })
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
    })
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
    })
}

router.post('/get_verified',  auth, send_verification_token)

function send_verification_token(req, res){
    
    bcrypt.hash(req.user._id, 10, (err, hash) => {

      link="http://"+req.get('host')+`/user/confirm/${hash}`;
      const body= "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
      send_email(req.user.email, body)

      
      var newValues = { $set: {token: hash} };

      User.updateOne({
        _id: req.user._id
      }, newValues)
        .then(user => {
          if(user){
            console.log("updated token")
            res.send("email sent please visit your email and get verified!!!")
          }
          else{
            res.json({error:"not verified"})
          }
        })
        .catch(err => {
          res.json('error:' + err)
        })
    })
}


router.get('/confirm/:hash', confirm_email)

function confirm_email(req, res){

  let hashedToken= req.params.hash;

  var newValues = { $set: {isVerified: true } };
  console.log(hashedToken)

  User.updateOne({
    token: hashedToken
  }, newValues)
    .then(user => {
      if(user){
        console.log("verified"+ user)
        res.send("verified")
      }
      else{
        res.json({error:"not verified"})
      }
    })
    .catch(err => {
      res.json('error:' + err)
    })
}


module.exports = router;    