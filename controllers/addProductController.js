const path = require('path');
const rootDir = require('../util/path');
const Product = require('../models/product');

exports.addNewProduct = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'addProduct.html'));
};

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.file.path; // Make sure this matches the path used in the Product constructor
    const price = req.body.price;
    const productId = req.body.productId;

    const product = new Product(title, imageUrl, price,productId);
    product.save(); // Ensure this method exists in Product class
    res.redirect('/');
};

exports.getEditProduct = (req,res) => {
    res.render('add-product',{
        pageTitle: 'Add Product',
        path: '/add-product'
    })
}