const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'addProduct.html'));
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll();
    // Send data to the admin page for rendering
    res.sendFile(path.join(__dirname, '..', 'views', 'admin.html'));
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    const product = Product.findById(productId);
    Product.deleteById(productId);
    // Assuming price is stored in the product
    res.redirect('/admin/products');
};
