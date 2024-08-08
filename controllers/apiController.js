const Product = require('../models/product');

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.json(products);
    });
};

exports.getProductById = (req, res) => {
    const prodId = req.params.id;
    Product.findById(prodId, product => {
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    });
};
