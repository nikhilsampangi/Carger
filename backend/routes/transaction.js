const express = require('express');
const router = express.Router();
const cors = require('cors');
const paypal = require('paypal-rest-sdk');

router.use(cors());

router.post('/pay', pay)

function pay(req, res) {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:8008/transaction/success",
            "cancel_url": "http://localhost:8008/transaction/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Hat for the best team ever"
        }]
    };


    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0; i < payment.links.length; i++){
              if(payment.links[i].rel === 'approval_url'){
                  console.log(payment)
                res.redirect(payment.links[i].href);
              }
            }
        }
      });
}


router.get('/success', success)

function success(req, res) {
    const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "25.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});
}


router.get('/cancel', cancel)

function cancel(req, res) {
    res.send('Cancelled');
}

module.exports= router;