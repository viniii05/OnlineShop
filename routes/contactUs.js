const express = require('express');

const path = require('path');
const router = express.Router();
const contactUSController = require('../controllers/contactUsController');

router.get('/contactUs',contactUSController.getContactPage) ;
router.post('/contactUs', contactUSController.postContactUs);

module.exports = router;

