const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route for getting the cart
router.get('/cart', cartController.getCart);

// Route for adding a product to the cart
router.post('/add-to-cart', cartController.postCart);

module.exports = router;
