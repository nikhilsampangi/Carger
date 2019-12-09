var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bharathjohn57@gmail.com',
      pass: ''
    }
  });

function send_mail(body, to_email){
    
    mailOptions={
        from: '',
        to : to_email,
        subject : "Please confirm your Email account",
        html : body 
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        } 
    });

}

function send_verification_token(token, to_email){

    link="http://localhost:8008"+`/user/verify/${token}`;
    const body= "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    send_mail(body, to_email)

}

module.exports= {send_mail, send_verification_token}
