import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "User name is required"]
        },
        email: {
            type: String,
            required: [true, "Email address is required"]
        },
        role: {
            type: Number,
            required: [true, "User role is required"],
            default: 0
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema, "users");

// module.exports = User;
export default User;