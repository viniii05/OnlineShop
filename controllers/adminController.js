const Product = require('../models/product');

const path = require('path');

const rootDir = require('../util/path');

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(rootDir,'views' , 'add-product.html'))
  };

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);
    product.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
  };


exports.getEditProduct = (req, res, next) => {

}  

exports.postEditProduct = (req, res, next) => {

}  

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      res.redirect('/admin-product');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Admin Products</title>
            <link rel="stylesheet" href="/css/main.css">
        </head>
        <body>
            <header class="main-header">
                <div class="img-div">
                    <!-- <img src="../NSkEnhance.png" alt="logo" class="img"> -->
                </div>
                <nav class="main-header__nav">
                    <ul class="main-header__item_list">
                        <li class="main-header__items"><a href="/">Shop</a></li>
                        <li class="main-header__items"><a href="/add-product">Add Product</a></li>
                        <li class="main-header__items"><a href="/contactUs">Contact us</a></li>
                        <li class="main-header__items"><a href="/cart">Cart</a></li>
                        <li class="main-header__items"><a href="/admin-product">Admin Product</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1>Admin Products</h1>
                <ul id="product-list"></ul>
                <script>
                    document.addEventListener('DOMContentLoaded', () => {
                        const products = ${JSON.stringify(rows)};
                        
                        const productList = document.getElementById('product-list');
                        products.forEach(product => {
                            const li = document.createElement('li');
                            li.innerHTML = \`
                                <h2>\${product.title}</h2>
                                <img src="\${product.imageUrl}" alt="\${product.title}" style="width: 150px;">
                                <p>Price: \$\${product.price.toFixed(2)}</p>
                                <form action="/delete-product" method="POST" style="display: inline;">
                                    <input type="hidden" name="productId" value="\${product.id}">
                                    <button type="submit">Delete</button>
                                </form>
                                <form action="/edit-product" method="GET" style="display: inline;">
                                    <input type="hidden" name="productId" value="\${product.id}">
                                    <button type="submit">Edit</button>
                                </form>
                            \`;
                            productList.appendChild(li);
                        });
                    });
                </script>
            </main>
        </body>
        </html>
      `);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
};