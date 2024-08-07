const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Route to get admin page with product list
router.get('/', (req, res) => {
    Product.fetchAll(products => {
        let productListHtml = '<div class="product-list">';
        products.forEach(product => {
            productListHtml += `
                <div class="product-box">
                    <img src="${product.imageUrl}" alt="${product.title}" class="product-image">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-description">Description of ${product.title}</p>
                    <div class="btn">
                        <a href="/products" class="btn">Details</a>
                    <form action="/add-to-cart" method="POST">
                      <button class="btn">Add to Cart</button>
                    </form>
                    </div>
                </div>`;
        });
        productListHtml += '</div>';

        // Serve dynamic HTML
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My Products</title>
                <link rel="stylesheet" href="/css/main.css">
                <link rel="stylesheet" href="/css/product-styles.css">
            </head>
            <body>
                <header class="main-header">
                    <nav class="main-header__nav">
                        <ul class="main-header__item_list">
                            <li class="main-header__items"><a href="/">Shop</a></li>
                            <li class="main-header__items"><a href="/add-product">Add Product</a></li>
                            <li class="main-header__items"><a href="/contactUs">Contact us</a></li>
                            <li class="main-header__items"><a href="/cart">Cart</a></li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <h1>My Products</h1>
                    ${products.length > 0 ? productListHtml : '<p>No products found.</p>'}
                </main>
            </body>
            </html>
        `);
    });
});

module.exports = router;
