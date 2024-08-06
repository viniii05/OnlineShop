const path = require('path');
const rootDir = require('../util/path');
const Product = require('../models/productModel');

// Ensure Product is imported correctly
console.log(Product);

exports.getAddProductPage = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res) => {
    const newItem = req.body.title;
    const product = new Product(newItem);
    product.save(); 
    res.redirect('/'); 
};

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.send(`
            <html>
            <body>
                <ul>
                    ${products.map(prod => `<li>${prod.title}</li>`).join('')}
                </ul>
            </body>
            </html>`);
    });
};
