const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes/index.js");

const app = express();
const port = 3001;

app.use(express.json());
app.use("/", router);
mongoose
	.connect("mongodb://127.0.0.1:27017/primesteps")
	.then(() => {
		console.log("succesfully connected to the database");
	})
	.catch((err) => console.err("database connection errr", err));
app.listen(port, () => {
	console.log(`App is listening to port: ${port}`);
});
