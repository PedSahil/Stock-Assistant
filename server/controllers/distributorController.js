const Distributor = require("../models/distributorSchema");

// Get all distributor
exports.getAllDistributor = async (req, res) => {
  try {
    const distributor = await Distributor.find();
    res.status(200).json(distributor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDistributor = async (req, res) => {
  try {
    const { name, contact } = req.body; // Extract JSON data from req.body
    const distributor = new Distributor({
      name,
      contact,
      distributorId: Math.floor(1000 + Math.random() * 9000), // Generate 4-digit ID
    });
    await distributor.save();
    res.status(201).json(distributor);
  } catch (error) {
    console.error("Error creating distributor:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update distributor by ID
exports.updateDistributor = async (req, res) => {
  try {
    const distributor = await Distributor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(distributor);
  } catch (error) {
    res.status(400).json({ error: "Unable to update distributor" });
  }
};

// Delete a product by ID
exports.deleteDistributor = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const deletedDistributor = await Distributor.findOneAndDelete(id);

    if (!deletedDistributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }

    res.status(200).json({ message: "Distributor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
