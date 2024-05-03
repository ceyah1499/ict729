import mongoose from 'mongoose';

const ScheduleSchema = mongoose.Schema(
    {
        eventName: {
            type: String,
            required: [true, "Event name is required"]
        },
        startTime: {
            type: Date,
            required: [true, "Start time is required"]
        },
        endTime: {
            type: Date,
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
    },
    {
        timestamps: true
    }
);

const Schedule = mongoose.model("Schedule", ScheduleSchema, "schedules");

export default Schedule;