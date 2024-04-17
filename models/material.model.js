import mongoose from 'mongoose';

const MaterialSchema = mongoose.Schema(
    {
        materialURL: {
            type: String,
            required: [true, "Material URL is required"]
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

const Material = mongoose.model("Material", MaterialSchema, "materials");

export default Material;