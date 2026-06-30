const express = require("express");

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

const PORT = 5000;


// Parse JSON request bodies
app.use(express.json());

// Register routes
app.use("/api/reviews", reviewRoutes);

// app.get('/',(req, res) => {
//     res.send("Review Service Running");
// });



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});