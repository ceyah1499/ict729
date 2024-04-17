import mongoose from 'mongoose';

const RoleSchema = mongoose.Schema(
    {
        roleName: {
            type: String,
            required: [true, "Role name is required"],
            default: "student"
        },
    },
    {
        timestamps: true
    }
);

const Role = mongoose.model("Role", RoleSchema, "roles");

export default Role;