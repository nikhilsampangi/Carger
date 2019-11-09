var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    }
  });

function send_mail(to_email, body){
    
    mailOptions={
        from: 'bharathjohn57@gmail.com',
        to : to_email,
        subject : "Please confirm your Email account",
        html : body 
    }
    console.log(mailOptions);

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        } 
    });
} 

module.exports= send_mail
