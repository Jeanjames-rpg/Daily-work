const express = require("express");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

connectDB();

const app = express();


// Parse JSON request bodies
app.use(express.json());

// Register routes
app.use("/api/reviews", reviewRoutes);

const PORT =process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});