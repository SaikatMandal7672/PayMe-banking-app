"use server"
import { prisma } from "@repo/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";



export const createP2PTransactions = async (reciever: string, amount: number) => {

    const session = await getServerSession(authOptions);
    //@ts-expect-error
    if (!session?.user?.id) {
        return {
            success: false,
            message: "User not signed in"
        }
    }
    if (!reciever || !amount) {
        return {
            success: false,
            message: "Recieved null as one of the parameters"
        }
    }
    //@ts-expect-error
    const userId = session?.user?.id;
    console.log(userId + "\n")
    const recieverDetails = await prisma.user.findFirst({
        where: {
            number: reciever
        }
    })
    if (!recieverDetails) {
        return {
            success: false,
            message: "Reciever not found"
        }
    }
    try {
        let result 
        await prisma.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${userId} FOR UPDATE`;

            const fromBalance = await tx.balance.findUnique({
                where: { userId: userId },
            });
            if (!fromBalance || fromBalance.amount < amount) {
           
                result = {
                    success: false,
                    message: "Insufficient Balance"
                }
                    throw new Error("Insufficient balance")
            }

            await tx.balance.update({
                where: { userId },
                data: { amount: { decrement: amount } },
            });

            await tx.balance.update({
                where: { userId: recieverDetails.id },
                data: { amount: { increment: amount } },
            });

            await tx.p2pTransfers.create({
                data: {
                    fromUserId: userId,
                    toUserId: recieverDetails.id,
                    amount,
                    timestamp: new Date()
                }
            })
            result= {
                success: true,
                message: "Amount sent successfully"
            }
        });
        return result;

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error instanceof Error ? error.message : "Internal Server error occured"
        }

    }
}