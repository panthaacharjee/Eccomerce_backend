const express = require('express');
const { route } = require('../app');
const router = express.Router();
const {getAllProducts, createProduct, updateProduct, deleteProduct} = require('../controllers/productControllers');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


router.route("/products").get(getAllProducts); 
router.route("/product/new").post(isAuthenticatedUser, authorizeRoles('admin'),createProduct);
router.route("/product/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct);



module.exports = router;