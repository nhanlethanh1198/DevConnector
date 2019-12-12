const mongoose = require("mongoose");
const config = require("config");
require("dotenv").config();

const db = process.env.LOCAL_URI || config.get("mongoURI_2");

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log("MongoDB Connected...");
	} catch (err) {
		console.log("Error!");
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
