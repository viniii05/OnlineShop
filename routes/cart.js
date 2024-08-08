const express = require('express');
const path = require('path');
const router = express.Router();

const cartController = require('../controllers/cartController');
// Serve cart page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'cart.html'));
});

router.post('/cart',cartController.postCart);
module.exports = router;
