const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const auth= require('./middleware_jwt');
const randomToken = require('random-token');

const Manager = require('../models/manager.model')
const Admin = require("../models/owner.model")

const email = require('./send_email')

router.use(cors());

process.SECRET_KEY = 'secret';

router.post('/register', register)

function register(req, res) {
    const managerData = {
        name: req.body.username,
        hashedPassword: req.body.hashedPassword,
        phone: req.body.phone,
        email: req.body.email,
        gender: req.body.gender,
        worksAt: {
            pId: req.body.pId,
            pName: req.body.pName,
            pAddress: req.body.pAddress
        }
    }

    Admin.findOne({
        email: req.body.adminEmail
    })
    .then(admin => {
        if(admin) {
            Manager.findOne({
                email: req.body.email
            })
            .then(manager => {
                if(!manager) {
                    bcrypt.hash(req.body.hashedPassword, 10, (err, hash) => {
                        managerData.hashedPassword = hash;
                        Manager.create(managerData)
                        .then(manager => {
                            const gen_token = randomToken(55);
                            // email.send_verification_token(gen_token, manager.email);
                            var newValues = { $set: {token: gen_token} };
                            Manager.updateOne({
                                _id: manager._id
                            }, newValues)
                            .then(manager => {
                                if(manager) {
                                    console.log("updated token")
                                }
                                else {
                                    console.log({error: "token not updated"})
                                }
                            })
                            .catch(err => {
                                console.log('error:' + err.message)
                            });

                        res.json({status: "registed"});
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
                    console.log(manager)
                    })
                }
                else {
                    console.log('manager exist')
                }
            })
            .catch(err => {
                console.log({error: err})
            })
        }
    })
}

router.post('/login', login)

function login(req, res) {
    Manager.findOne({
        email: req.body.email
    })
    .then(manager => {
        if(manager) {
            if (bcrypt.compareSync(req.body.hashedPassword, manager.hashedPassword)) {
                // Passwords match
                const payload = {
                  _id: manager._id,
                  email: manager.email
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
              res.json({ error: 'manager does not exist' })
            }
          })
          .catch(err => {
            res.send('error: ' + err)
    });
    
}
    
// router.post('/addpumps/')
module.exports = router;
