const express = require("express");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const reviewRoutes = require("./routes/reviewRoutes");

const cors = require("cors");

const cookieParser = require("cookie-parser");


dotenv.config();

connectDB();

const app = express();

app.use(cookieParser());

// console.log("JWT_SECRET length:", process.env.JWT_SECRET.length);

app.use(
    cors({
    origin: "http://localhost:3000",
    credentials:true,
    })
);

// Parse JSON request bodies
app.use(express.json());

// Register routes
app.use("/api/reviews", reviewRoutes);

const PORT =process.env.PORT || 5000;

console.log("Express JWT:", process.env.JWT_SECRET);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});