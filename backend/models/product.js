const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    unitPrice: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    cost: {
        type: Number,
        default: 0
    },
    transactionDate: {
        type: Date,
        required: true
      },
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});

exports.Product = mongoose.model('Product', productSchema);