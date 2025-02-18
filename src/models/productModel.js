const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: true,
	},
	productBrand: {
		type: String,
		reqiured: true,
	},
	productSizes: {
		type: [String],
		required: true,
	},
	productPrice: {
		type: Number,
		required: true,
	},
	productImages: {
		type: [String],
		required: true,
	},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
