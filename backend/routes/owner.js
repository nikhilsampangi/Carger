const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('./middleware_jwt');
const randomToken = require('random-token');

const Admin = require('../models/owner.model');
const email = require('./send_email')

router.use(cors());

process.SECRET_KEY = 'secret';

router.post('/register', register_admin)

// function createSuperUser() {
//     Admin.findOne({
//         email: "pras@gmail.com"
//     })
//     .then(admin => {
//         if(!admin) {

//         }
//     })
// }


// function register(req, res) {
//     const adminData = {
//         name:req.body.username,
//         hashedPassword: req.body.hashedPassword,
//         email: req.body.email,
//     }

//     Admin.findOne({
//         name: req.body.superAdmin,
//         isAdmin: true
//     })
//     .then(admin => {
//         if(admin) {
//             Admin.findOne({
//                 email: req.body.email
//             }).then(user=>{
//                 if(!user){
//                     bcrypt.hash(req.body.hashedPassword, 10, (err, hash) => {
//                         adminData.hashedPassword = hash
//                         Admin.create(adminData)
//                         .then((admin) => {
//                             const gen_token = randomToken(55);
//                             email.send_verification_token(gen_token, admin.email);
//                             var newValues = { $set: {token: gen_token}};
        
//                             Admin.updateOne({
//                                 _id: admin._id
//                             }, newValues)
//                             .then(admin => {
//                                 if(admin) {
//                                     console.log("Updated token")
//                                 }
//                                 else {
//                                     console.log({error:"Token not updated"})
//                                 }
//                             })
//                             .catch(err => {
//                                 console.log('error:' + err.message)
//                             });
                        
//                             res.json({status: "Registered and a link is sent to your to get email verified"});
//                         })
//                         .catch(err => {
//                             var arr= Object.keys(err['errors'])
//                             var errors= []
//                             for(i in arr){
//                             errors.push(err['errors'][arr[i]].message);
//                             }
//                             console.log(errors)
//                             res.json({error: errors})
//                         })
//                     })

//                 }
//                 else{
//                     res.json({error: "admin already exist"})
//                 }
//             }).catch(err => {
//                 var arr= Object.keys(err['errors'])
//                 var errors= []
//                 for(i in arr){
//                 errors.push(err['errors'][arr[i]].message);
//                 }
//                 console.log(errors)
//                 res.json({error: errors})
//             })   
//         }
//         else {
//             res.json({error: 'Admin not a super user'})
//         }
//     })
// }

function register_admin(req, res){
    const admin_data={
        name:req.body.username,
        hashedPassword: req.body.hashedPassword,
        email: req.body.email,
    }

    Admin.findOne({
        name: req.body.superAdmin,
        isAdmin: true
    })
    .then(super_admin => {
        if(super_admin){
            Admin.findOne({
                email: req.body.email
            })
            .then(admin => {
                if(!admin){
                    bcrypt.hash(req.body.hashedPassword, 10, (err, hash) => {
                    admin_data.hashedPassword = hash;
                    Admin.create(admin_data)
                    .then(user => {

                        const gen_token= randomToken(55);
    
                        email.send_verification_token(gen_token, user.email);
    
                        var newValues = { $set: {token: gen_token } };
                  
                          Admin.updateOne({
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
    
                        res.json({status: "registered and a link is sent to your to get your email verified"});
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

                    console.log(admin_data)
                    })    
                }
                else{
                    console.log('admin exist')
                }    
            })
            .catch(err => {
                console.log({error: err })
            })
        }
        else{
            console.log({error: "super admin not found"})
        }
    })
    .catch(err=>{
        console.log({error: err})
    })
}

router.post('/login', login)

function login(req, res) {
    Admin.findOne({
        email: req.body.email
    })
    .then(admin => {
        if (admin) {
          if (bcrypt.compareSync(req.body.hashedPassword, admin.hashedPassword)) {
            // Passwords match
            const payload = {
              _id: admin._id,
              email: admin.email
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
          res.json({ error: 'Admin does not exist' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      });

}

module.exports = router;