const Product = require("../models/product.schema");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const { productName, price, expiry } = req.body;
    const image = req.file.path; // multer stores image path
    const {distributorId} = req.params;
    // console.log(distributorId)

    // Check if product with the same name and expiry already exists
    const existingProduct = await Product.findOne({ productName, expiry });

    if (existingProduct) {
      return res
      .status(400).json({
        message: "Product with the same name and expiry already exists",
      });
    }

    const newProduct = new Product({
      productName,
      price,
      expiry,
      image,
      id:  distributorId,
      
    });
    
    
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getProduct by id on filter
exports.getProductsByDistributorId = async (req, res) => {
  try {
    const {distributorId} = req.params; // Retrieve distributorId from the URL
    const id = distributorId
     // Convert distributorId to ObjectId
    // const distributorObjectId = mongoose.Types.ObjectId(distributorId);

    // Find products where distributorId matches
    const products = await Product.find({ id });
    // console.log(typeof id)
    // console.log(products)

    if (products.length === 0) {
      return res.status(404).json({ error: "No products found for this distributor." });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getExpiryProducts = async (req, res) => {
  try {
    const today = new Date();
    const expiryThreshold = new Date();
    expiryThreshold.setDate(today.getDate() + 10); // Add 10 days

    // Find products where expiration date is between today and 10 days from now
    const expiringProducts = await Product.find({
      expiry: { $gte: today, $lte: expiryThreshold }
    });

    if (expiringProducts.length === 0) {
      return res.status(404).json({ message: "No products expiring within 10 days." });
    }

    res.json(expiringProducts);
    // console.log(expiringProducts)
  } catch (error) {
    console.error("Error retrieving expiring products:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update product' });
  }
};


// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get by regex
exports.getByregex =  async (req, res) => {
  const query = req.query.q;
  try {
    const products = await Product.find({
      name: { $regex: query, $options: "i" } // Case-insensitive search
    });
    
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};