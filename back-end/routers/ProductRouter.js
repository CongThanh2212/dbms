const express = require("express");
const productController = require("../controllers/ProductController");

let router = express.Router();

router.get("/", productController.getAllProduct);
router.get("/by-time", productController.getAllProductByCreatedTime);
router.get("/by-category/:categoryId", productController.getProductByCategory);
router.get("/by-id/:productId", productController.getProductById);
router.get("/by-set/:productSetId", productController.getProductByProductSet);
router.get("/by-provider/:providerId", productController.getProductByAuthor);
router.get("/get-by-sold/sort", productController.getProductBySoldNumber);
router.get("/admin/info", productController.getProductInfo);
router.post("/admin/add", productController.addProductAdmin);
router.post("/add", productController.addProduct);
router.put("/admin/update", productController.updateProductAdmin);
router.put("/update", productController.updateProduct);
router.delete("/delete/:productId", productController.deleteProduct);

module.exports = router;
