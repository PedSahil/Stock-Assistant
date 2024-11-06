const express = require("express");
// const distributorController = require('../controllers/distributorController');
const router = express.Router()
const {
  createDistributor,
  getAllDistributor,
  deleteDistributor,
  updateDistributor,
} = require("../controllers/distributorController");

router.get('/', getAllDistributor);
router.post('/', createDistributor);
router.put('/:id', updateDistributor);
router.delete('/:id',deleteDistributor);

module.exports = router;