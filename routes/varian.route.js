const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const varian_controller = require('../controllers/varian.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/', varian_controller.findAll);
router.get('/:varianId', varian_controller.findOne);
router.post('/create', varian_controller.create);
module.exports = router;

