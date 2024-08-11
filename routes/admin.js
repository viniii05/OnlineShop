const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.get('/admin-product', adminController.getProducts);
router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/add-product', adminController.postAddProduct);
router.post('/delete-product', adminController.postDeleteProduct);
router.post('/edit-product', adminController.postEditProduct);

module.exports = router;
