const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    courseId : {
        type:Number,
        required:true
    },

    studentId:{
        type:Number,
        required:true
    },

    studentName:{
        type:String,
        required:true
    },

    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },

    review:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model(
    "Review",
    reviewSchema
);