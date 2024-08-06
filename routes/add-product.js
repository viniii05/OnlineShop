const express = require('express');
const router = express.Router();
const addProductController = require('../controllers/addProductController');

router.get('/add-product', addProductController.getAddProductPage);
router.post('/add-product', addProductController.postAddProduct);

module.exports = router;
