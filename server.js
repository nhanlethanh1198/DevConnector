const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.disable("x-powered-by");

// Init Middleware
app.use(express.json({ extended: false }));

// Connect Database
try {
	connectDB();
	app.get("/", (req, res) => {
		try {
			res.send("API Running");
		} catch (error) {
			res.json({
				msg: error.response.statusText,
				status: error.response.status
			});
		}
	});
} catch (error) {
	console.log("Error while fetching from database!");
}

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
