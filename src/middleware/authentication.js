const jwt = require("jsonwebtoken");
const secretKey = "35235lklwkj";

const userAuthentication = async (req, res, next) => {
	const token = await req.header("Authorization")?.split(" ")[1];
	if (!token) return res.status(401).json({ message: "no token found" });
	try {
		const decoded = jwt.verify(token, secretKey);
	} catch (error) {
		return res.status(403).json({ error: error.message });
	}
};

module.exports = { userAuthentication, secretKey };
