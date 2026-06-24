const Product = require('../model/product.model'); // Path to your Mongoose model
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary')

module.exports = {
    addProducts: async (req, res) => {
        try {
            // Check if image exists
            if (!req.file) {
                return res.status(400).json({ message: "Product image is required" });
            }
            const result = await uploadToCloudinary(req.file.buffer);

            const newProduct = new Product({
                productName: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                category: req.body.category,
                avatar: result.secure_url,
                avatarPublicId: result.public_id,
            });
            
            const savedProduct = await newProduct.save();
            res.status(201).json({
                success: true,
                savedProduct
            });

        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    deleteProducts: async (req, res) => {
        try {
            console.log(req.params,"reqqq")
            const { id } = req.params;
            const product = await Product.findById(id);
            if (!product) {
                return res.status(400).json({ message: "Product not available" });
            }

            let deletedProduct = await deleteFromCloudinary(product.avatarPublicId);
            const prod = await Product.findByIdAndDelete(id);
            console.log(deletedProduct, "deletedProduct",prod)

            res.status(200).send({
                status: true,
                message: "item deleted successful"
            })

        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            let { page = 1, limit } = req.query;
            page = parseInt(page);
            limit = parseInt(limit);
            const skip = (page - 1) * limit;
            const products = await Product.find({}).sort({_id:-1})
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            const total = await Product.countDocuments();
            res.status(200).json({
                success: true,
                page,
                totalPages: Math.ceil(total / limit),
                totalProducts: total,
                data: products,
            });
        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    getSingleProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(400).json({ message: "Product not available" });
            }
            
            res.status(200).send({
                status: true,
                product,
                message: "item fetched successful"
            })

        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    getFewProducts: async (req, res) => {
        try {
            const product = await Product.find({}).sort({_id:-1}).limit(6);
            // if (product.length==0) {
            //     return res.status(400).json({ message: "Product not available" });
            // }
            res.status(200).send({
                status: true,
                product,
                message: "item fetched successful"
            })

        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
}