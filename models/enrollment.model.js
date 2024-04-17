import mongoose from 'mongoose';

const EnrollmentSchema = mongoose.Schema(
    {
        enrollmentDate: {
            type: Date,
            required: [true, "Enrollment date is required"]
        },
        studentID: {
            type: Number,
            required: [true, "Student ID is required"]
        },
        courseID: {
            type: Number,
            required: [true, "Course ID is required"]
        },
    },
    {
        timestamps: true
    }
);

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema, "enrollments");

export default Enrollment;