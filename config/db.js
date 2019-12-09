const mongoose = require("mongoose");
const config = require("config");
// const db = config.get("mongoURI") || "mongodb://localhost:27017";
const db = process.env.DBURI || config.get("mongoURI_2");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
	  useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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
