'use server'

import { getServerSession } from "next-auth";
import { prisma } from "@repo/database";
import { authOptions } from "../auth";
import { revalidatePath } from "next/cache";

export async function createOnRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
 
    
    //@ts-expect-error
    const userId = session?.user?.id;

    if (!userId) {
        return {
            success: false,
            message: "User not logged in",
        }
    }

    // const token = fetch("www.hdfcbank.com/getToken",amount , bankDetails)
    const token = Math.floor(Math.random() * 100000000).toString();

    await prisma.onRampTransaction.create({
        data: {
            userId,
            amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token,
        }
    });

    revalidatePath('/dashboard');

    return {
        success: true,
        message: "Transaction initiated"
    }
}