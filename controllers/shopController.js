const path = require('path');
const rootDir = require('../util/path');
const Product = require('../models/product');

exports.getProductDetail = (req, res) => {
    const prodId = req.params.id;
    Product.findById(prodId, product => {
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    });
};



