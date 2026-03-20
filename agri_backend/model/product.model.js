const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        require: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Honey', 'Mushrooms'],
        require: true
    },
    uniqueCode: {
        type: Number,
        require: false
    },
    price: {
        type: Number,
        require: true
    },
    unit: {
        type: String,
        default: 'Kg'
    },
    stock: {
        type: Number,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    avatarPublicId: {
        type: String,
        require: true
    },
},
    { timestamps: true });

productSchema.pre("save", async function () {
  if (this.uniqueCode) return;

  const lastProduct = await this.constructor
    .findOne({})
    .sort({ uniqueCode: -1 });

  const lastCode = lastProduct?.uniqueCode || 8;

  this.uniqueCode = lastCode + 2;
});

module.exports = mongoose.model('Product', productSchema);
