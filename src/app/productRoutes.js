const express = require('express');
const router = express.Router();
const controller = require('./productController');

router.post('/products', controller.create);
router.get('/products', controller.getAll);

module.exports = router;