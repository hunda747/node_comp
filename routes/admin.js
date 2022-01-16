const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/login', adminController.getLogin);

router.post('/adminLogin', adminController.getUser);

router.get('/request/:requestId', adminController.getProduct);

router.post('/request-detail', adminController.getEmail);

module.exports = router;