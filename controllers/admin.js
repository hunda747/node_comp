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
    const request =await Request.fetchNew();
    console.log(request[0]);
    res.render('admin/request', {req: request[0]});
  }else{
    res.redirect('/login')
  }
}

exports.getRequest = async(req, res, next) => {
  const request =await Request.fetchNew();
  const sta = (request[0].status === 'import')? 'false' : 'true';
  console.log('status' + sta);
  res.render('admin/request', 
            {req: request[0],
             status: request[0].status});
}

exports.getReport = async(req, res, next) => {
  const [request, metaData] =await Request.fetchType();
  let values=[];
  for (let req of request){
    values.push(req.val); 
  }
  //  console.log(request);
  //  console.log(values);
  res.render('admin/report', {req: request, type: values});
}

// history
exports.getHistory = async(req, res, next) => {
  const request =await Request.fetchAll();
  res.render('admin/history', {req: request[0]});
}

exports.getSearchResult = async(req, res, next) => {
  const name = req.body.search;
  if(name === ''){
    const request =await Request.fetchAll();
    res.render('admin/history', {req: request[0]});
  }
  const request =await Request.fetchSearchLicense(name);
  res.render('admin/history', {req: request[0]});
}

exports.getProduct = (req, res, next) => {
  const reqId = req.params.requestId;

  Request.findById(reqId)
  .then(([row, fieldData]) => {
    res.render('admin/request_detail', {
      request: row[0]
    });
  })
  .catch(err => console.log(err));
}

exports.getHistoryDetail = (req, res, next) => {
  const reqId = req.params.requestId;

  Request.findById(reqId)
  .then(([row, fieldData]) => {
    res.render('admin/history-detail', {
      request: row[0]
    });
  })
  .catch(err => console.log(err));
}

exports.getEmail = async (req, res, next) => {
  let email = req.body.email_adress;
  const id = req.body.id;
  const message = req.body.response;
  console.log(email);
  email = 'hundaolnk@gmail.com';
  Request.changeStatus(message, id);
  
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
  const request =await Request.fetchNew();
  res.render('admin/request', {req: request[0]});
}
