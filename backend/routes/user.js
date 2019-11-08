const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const auth= require('./middleware_jwt');

const User= require('../models/user.model');

router.use(cors());

process.SECRET_KEY = 'secret';

router.post('/register', register)

function register(req, res) {
    const today = new Date();
    const userData = {
        username: req.body.username,
        hashedPassword: req.body.hashedPassword,
        phone: req.body.phone,
        email: req.body.email,
        // created: today
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

module.exports = router;    