import mongoose from 'mongoose';

const ReviewSchema = mongoose.Schema(
    {
        rating: {
            type: Number,
            required: [true, "Rating is required"],
            default: 5
        },
        comment: {
            type: String,
            required: [true, "Review text is required"]
        },
        reviewDate: {
            type: Date,
            default: Date.now
        },
        courseID: {
            type: Number,
            required: [true, "Course ID is required"]
        },
// not a useful decision
        studentID: {
            type: Number,
            required: [true, "Student ID is required"]
        },
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model("Review", ReviewSchema, "reviews");

export default Review;