const express = require('express');
const multer = require('multer');
const { createProduct,updateProduct,getByregex,getExpiryProducts,getAllProducts,deleteProduct,getProductsByDistributorId } = require('../controllers/productController');

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Route to create a product
router.post('/:distributorId', upload.single('image'), createProduct);

// Route to get all products
router.get('/', getAllProducts);
router.get('/search',getByregex)
router.get('/expiry',getExpiryProducts)
router.get("/:distributorId",getProductsByDistributorId);

router.put('/:id', updateProduct);

// delete a product by id
router.delete('/:id', deleteProduct);

module.exports = router;
