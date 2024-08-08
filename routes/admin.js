const express = require('express');
const path = require('path');
const adminController = require('../controllers/adminControllers');

const router = express.Router();

router.get('/',adminController.getAdminPage)
router.get('/adminOnly',adminController.getAdminEditorDelete)
module.exports = router;