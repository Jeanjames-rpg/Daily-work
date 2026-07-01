const Review = require("../models/Review");

const getReviews = (req,res) =>{

    res.json({
        message: "All Reviews"
    });
};

const addReview = async (req, res) => {

   try {
   
    const review = await Review.create({

        courseId: req.body.courseId,

        studentId: req.body.studentId,

        studentName: req.body.studentName,

        rating: req.body.rating,

        review: req.body.review

    });

    res.status(201).json(review);

   } catch (error) {
    
    res.status(500).json({
        
        message : error.message

    });

   }

};

module.exports = {
    getReviews,
    addReview
};