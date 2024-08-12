const Product = require('../models/product');
const path = require('path');
const rootDir = require('../util/path');

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }).then(result => {
        console.log(result);
        res.redirect('/admin-product');
    }).catch(err => console.log(err));
};

exports.getProductData = (req, res, next) => {
  Product.findAll()
      .then(([rows]) => {
          res.json(rows); // Ensure rows is an array of products
      })
      .catch(err => {
          console.error('Error fetching products:', err);
          res.status(500).json({ error: 'Failed to fetch products' });
      });
};

exports.getProducts = (req, res, next) => {
    Product.findAll()
      .then(products => {
        res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Admin Products</title>
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
                          <li class="main-header__items"><a href="/admin-product">Admin Product</a></li>
                      </ul>
                  </nav>
              </header>
              <main>
                  <h1>Admin Products</h1>
                  <ul id="product-list"></ul>
                  <script>
                      document.addEventListener('DOMContentLoaded', () => {
                          const products = ${JSON.stringify(products)};
  
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
                                  <form action="/edit-product/\${product.id}" method="GET" style="display: inline;">
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
        console.error('Error fetching products:', err);
        res.status(500).send('Server Error');
      });
  };

  exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
      .then(product => {
        if (!product) {
          return res.status(404).send('Product not found');
        }
        res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Edit Product</title>
              <link rel="stylesheet" href="/css/main.css">
              
              <link rel="stylesheet" href="/css/product.css">
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
              <h1>Edit Product</h1>
              <form action="/edit-product" method="POST">
                  <input type="hidden" name="productId" value="${product.id}">
                  <label for="title">Title</label>
                  <input type="text" id="title" name="title" value="${product.title}" required>
                  <label for="imageUrl">Image URL</label>
                  <input type="text" id="imageUrl" name="imageUrl" value="${product.imageUrl}" required>
                  <label for="price">Price</label>
                  <input type="number" id="price" name="price" value="${product.price}" required>
                  <label for="description">Description</label>
                  <textarea id="description" name="description" required>${product.description}</textarea>
                  <button type="submit">Update Product</button>
              </form>
          </body>
          </html>
        `);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        res.status(500).send('Server Error');
      });
  };

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.status(404).send('Product not found');
            }
            product.title = updatedTitle;
            product.imageUrl = updatedImageUrl;
            product.price = updatedPrice;
            product.description = updatedDescription;
            return product.save();
        })
        .then(() => {
            res.redirect('/admin-product');
        })
        .catch(err => {
            console.error('Error updating product:', err);
            res.status(500).send('Server Error');
        });
};


exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId; // Corrected typo here
    Product.deleteById(prodId)
        .then(() => {
            res.redirect('/admin-product');
        })
        .catch(err => console.error('Error deleting product:', err));
};



// exports.getProducts = (req, res, next) => {
//     res.send(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Admin Products</title>
//             <link rel="stylesheet" href="/css/main.css">
            
//         </head>
//         <body>
//             <header class="main-header">
//                 <div class="img-div">
//                     <!-- <img src="../NSkEnhance.png" alt="logo" class="img"> -->
//                 </div>
//                 <nav class="main-header__nav">
//                     <ul class="main-header__item_list">
//                         <li class="main-header__items"><a href="/">Shop</a></li>
//                         <li class="main-header__items"><a href="/add-product">Add Product</a></li>
//                         <li class="main-header__items"><a href="/contactUs">Contact us</a></li>
//                         <li class="main-header__items"><a href="/cart">Cart</a></li>
//                         <li class="main-header__items"><a href="/admin-product">Admin Product</a></li>
//                     </ul>
//                 </nav>
//             </header>
//             <main>
//                 <h1>Admin Products</h1>
//                 <ul id="product-list">
//                     <li>
//                         <h2>Sample Product</h2>
//                         <img src="https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5920.jpg?size=626&ext=jpg" alt="Sample Product" style="width: 150px;">
//                         <p>Price: $20.00</p>
//                         <form action="/delete-product" method="POST" style="display: inline;">
//                             <input type="hidden" name="productId" value="1">
//                             <button type="submit">Delete</button>
//                         </form>
//                         <form action="/edit-product" method="GET" style="display: inline;">
//                             <input type="hidden" name="productId" value="1">
//                             <button type="submit">Edit</button>
//                         </form>
//                     </li>
//                 </ul>
//             </main>
//         </body>
//         </html>
//     `);
// };