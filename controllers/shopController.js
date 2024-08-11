const path = require('path');

const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../','views', 'shop.html'));
  
};

exports.getProductData = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.json(products); 
    })
    .catch(err => {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
    });
  
};

exports.getProducts = (req, res, next) => {
  exports.getProducts = (req, res, next) => {
    Product.fetchAll()
      .then(([rows, fieldData]) => {
        res.render('shop', { 
          prods: rows,
          pageTitle: 'All Products',
          path: '/products'
        });
      })
      .catch(err => console.log(err));
  };
};

;exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (product) {
        res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${product.title}</title>
              <link rel="stylesheet" href="/css/main.css">
              <link rel="stylesheet" href="/css/product-styles.css">
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
                          <li class="main-header__items"><a href="/adminOnly">Admin Product</a></li>
                      </ul>
                  </nav>
              </header>
              <main>
                  <h1>${product.title}</h1>
                  <img src="${product.imageUrl}" alt="${product.title}" style="width: 300px;">
                  <p>${product.description}</p>
                  <p>Price: $${product.price.toFixed(2)}</p>
                  <button onclick="addToCart('${product.id}')">Add to Cart</button>
                  <script>
                      function addToCart(productId) {
                          fetch('/cart', {
                              method: 'POST',
                              headers: {
                                  'Content-Type': 'application/x-www-form-urlencoded'
                              },
                              body: 'productId=' + productId
                          })
                          .then(response => {
                              if (response.ok) {
                                  alert('Product added to cart');
                              } else {
                                  alert('Failed to add product to cart');
                              }
                          })
                          .catch(error => console.error('Error adding product to cart:', error));
                      }
                  </script>
              </main>
          </body>
          </html>
        `);
      } else {
        res.status(404).send('Product not found');
      }
    })
    .catch(err => {
      console.error('Error fetching product:', err);
      res.status(500).send('Server Error');
    });
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll()
      .then(([products]) => {
        const cartProducts = [];
        for (const product of products) {
          const cartProductData = cart.products.find(p => p.id === product.id);
          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }
        }
        res.sendFile(path.join(__dirname, '../views/cart.html'));
      })
      .catch(err => console.log(err));
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(([product]) => {
      if (product.length > 0) {
        // Add product to cart logic here
        res.status(200).send('Product added to cart');
      } else {
        res.status(404).send('Product not found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(([product]) => {
      Cart.deleteProduct(prodId, product.price);
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/orders.html'));
};

exports.getCheckout = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/checkout.html'));
};

