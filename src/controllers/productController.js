const Product = require("../models/productModel.js");

const createProduct = async (req, res) => {
	try {
		if (!req.files || req.files.length === 0) {
			return res.status(400).json({ error: "No image uploaded" });
		}

		const imagePath = Array.isArray(req.files)
			? req.files.map((file) => file.path)
			: [req.files.path];
		const sizes = req.body.sizes;

		const sizeArray = Array.isArray(sizes)
			? sizes
			: sizes.split(" ").map((size) => Number(size.trim()));

		console.log(sizes);
		if (sizeArray.some(isNaN)) {
			return res.status(400).json({
				error: "Invalid size format. Sizes must be numbers.",
			});
		}

		const product = new Product({
			productName: req.body.name,
			productBrand: req.body.brand,
			productPrice: req.body.price,
			productSizes: sizeArray,
			productImages: imagePath,
		});
		const newProduct = await product.save();
		res.status(200).json({
			message: "product upload successfully ",
			newProduct,
		});
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getAllProduct = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json({
			message: "retrieviing data successfully",
			products,
		});
	} catch (error) {
		res.error({ error: error.message });
	}
};

module.exports = { createProduct, getAllProduct };
