const express = require("express");
const upload = require("../middleware/multer.js");
const {
	createProduct,
	getAllProduct,
} = require("../controllers/productController.js");

const router = express.Router();

router.post("/", upload.array("images", 5), createProduct);
router.get("/", getAllProduct);

module.exports = router;
