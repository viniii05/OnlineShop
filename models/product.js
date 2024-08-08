// models/products.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // for generating unique IDs

const filePath = path.join(__dirname, '..', 'data', 'products.json');

module.exports = class Product {
    constructor(title, imageUrl, price) {
        this.id = uuidv4();  // Generate a unique ID
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
    }

    static fetchAll(callback) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading product data:', err);
                callback([]);
                return;
            }
            const products = JSON.parse(data);
            callback(products);
        });
    }

    static findById(id, callback) {
        Product.fetchAll(products => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }

    save() {
        Product.fetchAll(products => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products, null, 2), err => {
                if (err) {
                    console.error('Error saving product data:', err);
                }
            });
        });
    }
};
