const express = require("express");
const productController = require("../controller/productController");
const router = express.Router();
router.get("/products", productController.productGetController);

module.exports = router;
