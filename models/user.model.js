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
        phone: {
            type: Number,
            required: [true, "Phone number is required"]
        },
        role: {
            type: Number,
            required: [true, "User role is required"],
            default: 3
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema, "users");

// module.exports = User;
export default User;