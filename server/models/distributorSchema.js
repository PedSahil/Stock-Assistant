const mongoose = require("mongoose");

const distributorSchema = new mongoose.Schema({
  distributorId: {
    type: String,
    required: true,
    unique: true,
    // default: () => Math.floor(1000 + Math.random() * 9000).toString(), // Random 4-digit ID
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Distributor", distributorSchema);
