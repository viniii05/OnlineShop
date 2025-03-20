const Product = require('../models/product');
const Cart = require('../models/cart');
const path = require('path')

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll();
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
};

exports.getCart = (req, res, next) => {
    const cart = Cart.getCart();
    res.sendFile(path.join(__dirname, '..', 'views', 'cart.html'));
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    const product = Product.findById(productId);
    Cart.addProduct(productId, product.price);
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    const product = Product.findById(productId);
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
};

exports.getCheckoutSuccess = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'success.html'));
};
