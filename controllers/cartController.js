const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.postCart = (req, res) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        if (product) {
            Cart.addProduct(productId, product.price, () => {
                res.redirect('/');  // Redirect or send response as needed
            });
        } else {
            res.redirect('/'); // Handle product not found scenario
        }
    });
};
