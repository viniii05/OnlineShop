const path = require('path');
const rootDir = require('../util/path');
const Product = require('../models/productModel');

exports.getAddProductPage = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res) => {
    const newItem = req.body.title;
    const product = new Product(newItem);
    product.save(); 
    res.redirect('/'); 
};
