const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// home page
router.get('/', userController.getIndex);

// register form
router.get('/export_page', userController.getExportPage);

// register form
router.get('/import_page', userController.getImportPage);

router.get('/overview', userController.getOverview);

router.get('/register', userController.getRegister);

router.get('/contact_us', userController.getContact);

router.get('/regulation', userController.getRegulation);

router.get('/mining_licensing', userController.getMining_licensing);

router.get('/gemstones', userController.getGemstones);

// register form
router.get('/login', userController.getLogin);


// form register
router.post('/register', userController.addRequest);

module.exports = router;
