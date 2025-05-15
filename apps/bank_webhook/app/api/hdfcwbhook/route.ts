import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/database";

interface PaymentInformationProps {
    token: string;
    userId: string;
    amount: string;
}

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();

        // Extract payment information
        const paymentInformation: PaymentInformationProps = {
            token: body.token,
            userId: body.userId,
            amount: body.amount
        };

        // Validate required fields
        if (!paymentInformation.token || !paymentInformation.userId || !paymentInformation.amount) {
            return NextResponse.json({
                success: false,
                message: "Missing required fields"
            }, { status: 400 });
        }

        // Check if the transaction has a status of processing 
        const res = await prisma.onRampTransaction.findFirst({
            where: {
                token: paymentInformation.token
            },
            select: {
                status: true,
            }
        }
        )
        if(res?.status === "Success" ){
            return NextResponse.json({
                success:true,
                message:"Transaction has alread been proccessed as Successfull"
            })
        }
        if(res?.status === "Failure" ){
            return NextResponse.json({
                success:true,
                message:"Transaction has alread been proccessed as Failure"
            })
        }


        // Process the transaction
        await prisma.$transaction([
            // Update user balance
            prisma.balance.updateMany({
                where: {
                    userId: paymentInformation.userId
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            // Update transaction status
            prisma.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })
        ]);

        // Return success response
        return NextResponse.json({
            success: true,
            message: "Payment processed successfully"
        },{status:200});
    } catch (error) {
        console.error("Error processing payment webhook:", error);

        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : "An unknown error occurred"
        }, { status: 500 });
    }
}
