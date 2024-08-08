const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true })); // to handle form data

const productsFilePath = path.join(__dirname, 'data', 'product.json');

// Import routes
const adminRoutes = require('./routes/admin');
const addProductRoutes = require('./routes/add-product');
const contactUsRoutes = require('./routes/contactUs');
const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');

// Use routes
app.use( adminRoutes);
app.use( addProductRoutes);
app.use(contactUsRoutes);
app.use(shopRoutes);
app.use(cartRoutes);

// PUT route to edit a product by id
app.put('/api/editProduct/:id', (req, res) => {
    const productId = req.params.id;
    const { title, price } = req.body;

    // Read the product data from the JSON file
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading product data.' });
        }

        let products = JSON.parse(data);

        // Find the product with the matching id
        const productIndex = products.findIndex(product => product.id === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Update the product's title and price
        products[productIndex].title = title;
        products[productIndex].price = price;

        // Write the updated products array back to the JSON file
        fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), err => {
            if (err) {
                return res.status(500).json({ message: 'Error updating product.' });
            }
            res.status(200).json({ message: 'Product updated successfully.' });
        });
    });
});


// DELETE route to remove a product by id
app.delete('/api/deleteProduct/:id', (req, res) => {
    const productId = req.params.id;

    // Read the product data from the JSON file
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading product data.' });
        }

        let products = JSON.parse(data);
        const initialLength = products.length;

        // Filter out the product with the matching id
        products = products.filter(product => product.id !== productId);

        if (products.length === initialLength) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Write the updated products array back to the JSON file
        fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), err => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting product.' });
            }
            res.status(200).json({ message: 'Product deleted successfully.' });
        });
    });
});


// Serve success page
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'success.html'));
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
