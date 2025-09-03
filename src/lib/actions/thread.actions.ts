"use server";

import { connectToDatabase } from "../mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createThread(threadInfo: Params) {
    try {
        await connectToDatabase();
        const createdThread = await Thread.create(threadInfo)
        console.log("Got Thread Info: ", threadInfo)
        console.log("CreatedThread: ", createdThread)

        await User.findByIdAndUpdate(threadInfo.author, {
            $push: {
                threads: createdThread._id
            }
        })
    } catch (error: any) {
        throw new Error(`Failed to create a thread: ${error.message}`)
    }
}