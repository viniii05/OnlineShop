const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.get('/api/products', apiController.getProducts);
router.get('/api/products/:id', apiController.getProductById);

module.exports = router;
