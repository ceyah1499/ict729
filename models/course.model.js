import mongoose from 'mongoose';

const CourseSchema = mongoose.Schema(
    {
        courseName: {
            type: String,
            required: [true, "Course name is required"]
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        tutorID: {
            type: Number,
            required: [true, "Tutor ID is required"]
        },
    },
    {
        timestamps: true
    }
);

const Course = mongoose.model("Course", CourseSchema, "courses");

export default Course;