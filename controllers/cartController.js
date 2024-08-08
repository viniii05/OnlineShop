// controllers/cartController.js
const Cart = require('../models/cart');
const Product = require('../models/product');

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        if (product) {
            Cart.addProduct(prodId, product.price);
            res.redirect('/cart');
        } else {
            res.status(404).send('Product not found');
        }
    });
};
