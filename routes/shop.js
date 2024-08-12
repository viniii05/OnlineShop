const express = require('express');
const path = require('path');

const shopController = require('../controllers/shopController')

const router = express.Router();

// router.get('/',shopController.getProducts);

// router.post('/', adminController.postProducts);

router.get('/', shopController.getIndex);

router.get('/api/products', shopController.getProductData);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

 // Serves the cart.html file
 router.get('/api/cart-data', shopController.getCartData);
router.get('/cart', shopController.getCartPage);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;