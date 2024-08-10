const express = require('express');

const path = require('path');

const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);

router.get('/admin-product', adminController.getProducts); 

router.post('/add-product', adminController.postAddProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
