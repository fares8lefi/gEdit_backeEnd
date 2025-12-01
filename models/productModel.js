const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  code: {
    type: Number,
    unique: true,
    required: true,
  },
  barcode: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  purchase_price: {
    type: Number,

    required: true,
  },
  selling_price: {
    type: Number,

    required: true,
  },
  unit: {
    type: Number,

    required: true,
  },
  stock_min: {
    type: Number,

    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
