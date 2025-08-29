import mongoose from "mongoose";

export interface IThread extends mongoose.Document {
    text: string;
    author: string;
    community?: mongoose.Types.ObjectId;
    parentId?: string;
    children: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const threadSchema = new mongoose.Schema<IThread>(
    {
        text: {
            type: String,
            required: true
        },
        author: {
            type: String,
            ref: 'User'
        },
        community: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        },
        parentId: {
            type: String
        },
        children: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Thread"
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
    },
    {
        timestamps: true
    }
)


const Thread = mongoose.models?.Thread || mongoose.model("Thread", threadSchema, "Threads")
export default Thread;