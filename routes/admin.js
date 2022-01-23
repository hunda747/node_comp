const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/login', adminController.getLogin);

router.post('/adminLogin', adminController.getUser);

router.post('/requests', adminController.getRequest)
router.post('/history', adminController.getHistory)
router.get('/report', adminController.getReport)

router.get('/request/:requestId', adminController.getProduct);
router.get('/history/:requestId', adminController.getHistoryDetail);

router.post('/search', adminController.getSearchResult)

router.post('/request-detail', adminController.getEmail);

module.exports = router;