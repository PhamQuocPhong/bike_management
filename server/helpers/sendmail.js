// config mail server
const formatEmail = require("./format_email")
const nodeMailer =  require('nodemailer');
var transporter =  nodeMailer.createTransport({ 
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

let sendMailRegister = (from, mailTo, subject, verifyCode) => {

	   // thiết lập đối tượng, nội dung gửi mail
    var mainOptions = { 
            from: from,
            to: mailTo,
            subject: subject,
            html: formatEmail.formatRegister(verifyCode)
    }

    transporter.sendMail(mainOptions, function(err, info){
          if (err) {
              console.log(err);
          } else {
              console.log('Email sent success')
          }
      });
}

let sendMailContactCustomer = (from, mailTo, subject) => {
   var mainOptions = { 
            from: from,
            to: mailTo,
            subject: subject,
            html: formatEmail.formatContactCustomer()
    }



    transporter.sendMail(mainOptions, function(err, info){
          if (err) {
              console.log(err);
          } else {
              console.log('Email sent success')
          }
      });
}


module.exports = {
	sendMailRegister: sendMailRegister,
  sendMailContactCustomer: sendMailContactCustomer
}