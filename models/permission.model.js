import mongoose from 'mongoose';

const PermissionSchema = mongoose.Schema(
    {
        permissionName: {
            type: String,
            required: [true, "Permission name is required"]
        },
        permissionDetails: {
            type: String,
            required: [true, "Permission details are required"]
        },
        roleID: {
            type: Number,
            required: [true, "Role ID is required"],
            default: 0
        },
    },
    {
        timestamps: true
    }
);

const Permission = mongoose.model("Permission", PermissionSchema, "permissions");

export default Permission;