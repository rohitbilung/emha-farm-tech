const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/jwt.auth')
const { upload } = require('../config/cloudinary');
const {
    traceProduct,
    registerBatch,
    getBatchs,
    addTimeline
} = require('../controllers/trace.controller')

router.get('/:getBatchParam', traceProduct)

router.post('/register-batch',registerBatch)

router.get('/get-batches',getBatchs)

router.put('/add-timeline/:id', upload.single('image'), addTimeline)

module.exports = router