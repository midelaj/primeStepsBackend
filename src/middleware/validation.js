const Joi = require("joi");

const userValidationSchema = Joi.object({
	userName: Joi.string().min(3),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net"] },
	}),
	password: Joi.string().min(3),
});

const validateUser = (req, res, next) => {
	const { error } = userValidationSchema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	next();
};

module.exports = validateUser;
