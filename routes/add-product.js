const express = require('express');
const path = require('path');
const multer = require('multer');

const addProdController = require('../controllers/addProductController');
const upload = multer({ dest: 'uploads/' }); // Ensure this matches your app.js config

const router = express.Router();

router.get('/add-product', addProdController.addNewProduct);
router.post('/add-product', upload.single('image'), addProdController.postAddProduct);

module.exports = router;
