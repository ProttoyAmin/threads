import mongoose from "mongoose";

export interface IUser extends mongoose.Document{
    id: string;
    username: string;
    name: string;
    image?: string;
    bio?: string;
    threads: mongoose.Schema.Types.ObjectId[];
    onboard?: boolean;
    communities: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>(
    {
        id: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        bio: {
            type: String
        },
        threads: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Thread"
            }
        ],
        onboard: {
            type: Boolean,
        },
        communities: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Community"
            }
        ]
    },
    {
        timestamps: true
    }
)

const User = mongoose.models?.User || mongoose.model("User", userSchema, "Users");
export default User;