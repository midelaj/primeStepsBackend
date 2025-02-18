const express = require("express");

const router = express.Router();

const userRouter = require("./userRoute.js");
const productRouter = require("./productRouter.js");

router.use("/user", userRouter);
router.use("/product", productRouter);

module.exports = router;
