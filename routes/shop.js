const express = require('express');
const path = require('path');
const router = express.Router();
const Product = require('../models/product');
const shopController = require('../controllers/shopController');

router.get('/details/:id', shopController.getProductDetail);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});

router.get('/api/products', (req, res) => {
    Product.fetchAll(products => {
        res.json(products);
    });
});

module.exports = router;
