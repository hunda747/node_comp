const { type } = require('express/lib/response');
const Request = require('../models/request');

exports.getIndex = (req, res, next) => {
  res.render('shop/index', {
    path: '/'
  });
};

exports.getGemstones = (req, res, next) => {
  res.render('shop/gemstones', {
    path: '/gemstones'
  });
}

exports.getContact = (req, res, next) => {
  res.render('shop/contact_us', {
    path: '/contact_us'
  });
}

exports.getMining_licensing = (req, res, next) => {
  res.render('shop/mining_licensing', {
    path: '/mining_licensing'
  });
}

exports.getOverview = (req, res, next) => {
  res.render('shop/overview', {
    path: '/overview'
  });
}
exports.getRegulation = (req, res, next) => {
  res.render('shop/regulation', {
    path: '/regulation'
  });
}
exports.getRegister = (req, res, next) => {
  res.render('shop/register', {
    path: '/register'
  });
}

exports.getImportPage = (req, res, next) => {
  res.render('shop/import', {
    path: '/import'
  });
}
exports.getExportPage = (req, res, next) => {
  res.render('shop/export', {
    path: '/export'
  });
}
exports.getLogin = (req, res, next) => {
  res.render('admin/adminLogin', {
    path: '/adminLogin'
  });
}

exports.addRequest = (req, res, next) => {
  const formatYmd = date => date.toISOString().slice(0, 10);
  const current_day = formatYmd(new Date()); 
  console.log(current_day);

  const sir_name = req.body.sirName;
  const first_name = req.body.name;
  const email = req.body.email;
  const phone_number = req.body.phoneNumber;
  const mineralName = req.body.mineralName;
  const amount = req.body.amount;
  const price = req.body.price;
  const country = req.body.country;
  const date = current_day;
  const status = 'pending';
  const description = req.body.description;
  const req_type = req.body.type;
  const license_number = req.body.license_number;
  const mineral_type = req.body.mineralType;

  const request = new Request(sir_name, first_name, email,phone_number, mineralName, amount, price, country,date,status, description, req_type, license_number, mineral_type);

  console.log(request);
  request.save();
  // .then(() => {
  //   res.redirect('/')
  // })
  // .catch(err => console.log('error database' + err));
  res.redirect('/');
 
}

