const path = require('path');
const rootDir = require('../util/path');

exports.getAddProductPage = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res) => {
    const product = req.body.title;
    console.log(`Product submitted: ${product}`);
    res.redirect('/'); 
};
