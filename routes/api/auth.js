const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// @route 	GET api/auth
// @desc 	Test route
// @access	Public
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (error) {
		console.error(error.mesage);
		res.status(500).send("Server Error!");
	}
});

// @route 	POST api/auth
// @desc 	Authenticate user & get token
// @access	Public
router.post(
	"/",
	[
		check("email", "Please type your email").isEmail(),
		// Check request is email
		check("password", "Password is required").exists()
		// Check request is password
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			// See if user not exists
			if (!user) {
				return res.status(400).json({
					errors: [{ msg: "Username or password is not correct!" }]
				});
			}

			// Compare password with plaintext
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({
					errors: [{ msg: "Username or password is not correct!" }]
				});
			}

			// Return jsonwebtoken
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: 36000 },
				(err, token) => {
					if (err) throw err;
					return res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send(`Server error! 
			${err.message}`);
		}
	}
);

module.exports = router;

