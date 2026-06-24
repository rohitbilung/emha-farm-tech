const Trace = require('../model/trace.model')
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary')

module.exports = {
    traceProduct: async (req, res) => {
        try {
            let batchId = req.params.getBatchParam
            let getbatch = await Trace.findOne({ batchId: batchId })
            if(!getbatch){
                res.status(404).json({
                success: false,
                data: "No Batch Found",
            });
            }
            res.status(200).json({
                success: true,
                data: getbatch,
            });
        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    registerBatch: async (req, res) => {
        try {
            const newBatch = new Trace({
                productId: req.body.productId,
                farmName: req.body.farmName
            });

            const savedBatch = await newBatch.save();
            res.status(201).json({
                success: true,
                savedBatch
            });

        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    getBatchs: async (req, res) => {
        try {
            let { page = 1, limit } = req.query;
            page = parseInt(page);
            limit = parseInt(limit);
            const skip = (page - 1) * limit;

            let getBatchs = await Trace.find({}).sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            const total = await Trace.countDocuments();
            res.status(200).json({
                success: true,
                page,
                totalPages: Math.ceil(total / limit),
                totalProducts: total,
                data: getBatchs,
            });
        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    addTimeline: async (req, res) => {
        try {
            let result = {}
            if (req.file) {
                result = await uploadToCloudinary(req.file.buffer);
            }

            const updateTraceData = {
                stage: req.body.stage ? req.body.stage : "",
                location: req.body.location ? req.body.location : "",
                desc: req.body.desc ? req.body.desc : "",
                barcode: req.body.barcode ? req.body.barcode : "",
                date: req.body.date || '',
                media: result.secure_url ? result.secure_url : "",
            }

            await Trace.updateOne(
                { _id: req.params.id },
                {
                    $push: {
                        timeline: {
                            $each: [updateTraceData],
                            $position: 0
                        }
                    }
                }
            );

            res.status(200).json({ message: "data inserted successful" });

        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },
}