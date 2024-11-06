const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true, // we'll store the image path
  },
 id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
