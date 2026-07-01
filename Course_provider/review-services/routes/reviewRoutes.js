const express = require("express");

const router = express.Router();

const {
    getReviews,
    addReview,
    getCourseReviews
} = require("../controllers/reviewController");

router.get("/",getReviews);

router.post("/",addReview);

router.get("/course/:courseId",getCourseReviews)

module.exports = router;