const express = require('express');
const router = express.Router();
const getProd = require('../controllers/addProductController');
const adminController = require('../controllers/adminController');

router.get('/', adminController.getAdminPage);
router.get('/products', getProd.getProducts); 

module.exports = router;
