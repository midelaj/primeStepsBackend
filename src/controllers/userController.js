const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../middleware/authentication");

exports.createUser = async (req, res) => {
	try {
		const password = req.body.password;
		const hashPassword = await bcrypt.hash(password, 10);
		const user = new User({
			userName: req.body.userName,
			email: req.body.email,
			password: hashPassword,
		});
		const newuser = await user.save();
		res.status(200).json({
			message: "successfully user created",
			newuser,
		});
	} catch (error) {
		return res.json({ error: error.message });
	}
};

exports.getAllUser = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({ message: "users founde succesfully", users });
	} catch (error) {
		return res.json({ error: error.message });
	}
};

exports.userLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.json({ message: "user not found" });
		const isMatch = await bcrypt.compare(password, user.password);
		const token = jwt.sign(
			{ userId: user._Id, userName: user.userName },
			secretKey,
			{ expiresIn: "1h" },
		);
		res.json({ message: "user found", user, token });
	} catch (error) {
		return res.json({ error: error.message });
	}
};
