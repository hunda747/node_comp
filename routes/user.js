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

// register form
router.get('/login', userController.getLogin);


// form register
router.post('/register', userController.addRequest);

module.exports = router;
