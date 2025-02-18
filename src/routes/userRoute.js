const express = require("express");

const {
	createUser,
	getAllUser,
	userLogin,
} = require("../controllers/userController");

const validateUser = require("../middleware/validation");
const { userAuthentication } = require("../middleware/authentication");

const router = express.Router();

router.post("/user", validateUser, createUser);
router.get("/user", getAllUser);
router.post("/user/login", userLogin);

module.exports = router;
