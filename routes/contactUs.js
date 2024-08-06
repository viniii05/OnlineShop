const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/contactUsController');

router.get('/contactUs', contactUsController.getContactUsPage);
router.post('/contactUs', contactUsController.postContactUs);

module.exports = router;
