import mongoose from 'mongoose';

const ScheduleSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Event name is required"]
        },
        startTime: {
            type: String,
            required: [true, "Start time is required"]
        },
        endTime: {
            type: String,
            required: [true, "End time is required"]
        },
        status: {
            type: String,
            required: [true, "Status is required"],
            default: "planned"
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        duration: {
            type: Number
        },
    },
    {
        timestamps: true, 
        strict: false
    }
);

const Schedule = mongoose.model("Schedule", ScheduleSchema, "schedules");

export default Schedule;