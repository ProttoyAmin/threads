"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}


export async function updateUser(updatedUser: Params): Promise<void> {

    try {
        await connectToDatabase();

        await User.findOneAndUpdate(
            { id: updatedUser.userId },
            {
                username: updatedUser.username,
                name: updatedUser.name,
                bio: updatedUser.bio,
                image: updatedUser.image,
                onboard: true
            },
            { upsert: true }
        )

        if (updatedUser.path === "/profile/edit") {
            revalidatePath(updatedUser.path);
        }

    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);
    }


}