const Request = require('../models/request');
const nodemailer = require("nodemailer");

exports.getLogin = (req, res, next) => {
  res.render('admin/adminLogin');
}

exports.getUser = async(req, res, next) => {
  const userName = req.body.email;
  const password = req.body.password;

  console.log('user name'+ userName);
  console.log(password);

  if(userName==='root@gmail.com' && password==='root'){
    const request =await Request.fetchAll();
    console.log(request[0]);
    res.render('admin/request', {req: request[0]});
  }else{
    res.redirect('/login')
  }
}

exports.getProduct = (req, res, next) => {
  const reqId = req.params.requestId;

  Request.findById(reqId)
  .then(([row, fieldData]) => {
    res.render('admin/request-detail', {
      request: row[0]
    });
  })
  .catch(err => console.log(err));
}

exports.getEmail = async (req, res, next) => {
  let email = req.body.email_adress;
  console.log(email);
  email = 'hundaolnk@gmail.com'

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'agnes.lockman80@ethereal.email', // generated ethereal user
      pass: 'XRz9BuZ9eXTW4FMDCR', // generated ethereal password
    },
  });

  const msg = {
    from: '"The express app" <foo@example.com>', //  sender address
    to: email, // list of receivers
    subject: "sup", // Subject line
    text: req.body.response, // plain text body
  }

  // send mail with defined transport object
  let info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  res.redirect('/request/1');
}
