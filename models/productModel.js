const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

class Product {
    constructor(title, imageUrl, price, id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.id = id;
    }

    save() {
        const p = path.join(rootDir, 'Data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        const p = path.join(rootDir, 'Data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            } else {
                cb(JSON.parse(fileContent));
            }
        });
    }

    static findById(id, cb) {
        const p = path.join(rootDir, 'Data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb(null);
            } else {
                const products = JSON.parse(fileContent);
                const product = products.find(prod => prod.id === id);
                cb(product);
            }
        });
    }
}

module.exports = Product;
