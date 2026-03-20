const mongoose = require('mongoose');
const Product = require('./product.model')

const TraceSchema = new mongoose.Schema({
  batchId: {
    type: String,
    unique: true,
    // e.g., BN-4921
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName:{
    type: String,
  },
  mainImg:{
    type: String,
  },
  harvestDate: {
    type: Date
  },
  expiryDate: {
    type: Date
  },
  farmName: {
    type: String,
    required: true // e.g., "North Valley Farm, Sector 4"
  },

  // This array builds the vertical timeline we created in the UI
  timeline: [{
    stage: {
      type: String // e.g., "Harvested", "Quality Check", "Packaged", "Shipped"
    },
    location: {
      type: String
    },
    desc: {
      type: String
    },
    barcode: {
      type: String
    },
    date: {
      type: String,
      default: Date.now
    },
    media: {
      type: String // URL for the specific photo of this stage
    }
  }],

  isAvailable: {
    type: Boolean,
    default: true
  },

  isCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

TraceSchema.pre("save", async function (next) {
  try {
    if (this.batchId) return;

    const companyPrefix = "EF";
    const product = await Product.findById(this.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // product prefix (first 2 letters)
    const productCode = product.productName.slice(0, 2).toUpperCase();
    // category prefix (first letter)
    const categoryCode = product.category.charAt(0).toUpperCase();
    // category prefix (first letter)
    const uniqueCode = product.uniqueCode.toString();
    const prefix = `${companyPrefix}-${productCode}${uniqueCode}-${categoryCode}`;
    // find last batch with same prefix
    const lastProduct = await this.constructor
      .findOne({ batchId: { $regex: `^${prefix}` } })
      .sort({ batchId:-1 });

    let nextNumber = 1;
    if (lastProduct) {
      const lastPart = lastProduct.batchId.split("-").pop()
      const lastNumber = parseInt(lastPart.replace(/\D/g, "")) + 1
      nextNumber = lastNumber
    }
    const paddedNumber = String(nextNumber).padStart(3, "0");
    this.batchId = `${prefix}${paddedNumber}`;
    this.productName = product.productName;
    this.mainImg = product.avatar;

  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model('Trace', TraceSchema);