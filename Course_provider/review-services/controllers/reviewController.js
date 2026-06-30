const getReviews = (req,res) =>{

    res.json({
        message: "All Reviews"
    });
};

const addReview = (req, res) => {

    res.json({
        message: "Review Added"
    });
};

module.exports = {
    getReviews,
    addReview
};