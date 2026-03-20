const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const {
    addProducts,
    deleteProducts,
    getAllProducts,
    getSingleProduct,
    getFewProducts
} = require('../controllers/product.controller')
const { auth } = require('../middleware/jwt.auth')

router.post('/add-product', upload.single('image'), addProducts);

router.delete('/delete-product/:id',auth, deleteProducts);

router.get('/get-all-products', getAllProducts);

router.get('/get-few-products', getFewProducts);

router.post('/get-single-product',auth, getSingleProduct);

module.exports = router;