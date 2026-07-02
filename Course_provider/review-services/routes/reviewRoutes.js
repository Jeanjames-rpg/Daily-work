const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const {
    getReviews,
    addReview,
    getCourseReviews
} = require("../controllers/reviewController");

router.get("/",getReviews);

router.post("/",authMiddleware,addReview);

router.get("/course/:courseId",getCourseReviews)

module.exports = router;