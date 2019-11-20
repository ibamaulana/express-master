const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const produk_controller = require('../controllers/produk.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/', produk_controller.findAll);
router.get('/:produkId', produk_controller.findOne);
router.post('/create', produk_controller.create);
module.exports = router;

