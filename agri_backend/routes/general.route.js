const express = require('express');
const router = express.Router()
const { getProducts, getTestimonials } = require('../controllers/general.controller')

router.get('/getProducts', getProducts);

router.get('/testimonials', getTestimonials)

module.exports = router;