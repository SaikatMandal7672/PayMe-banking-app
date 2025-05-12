import express from "express";
import { prisma } from "@repo/database";

const app = express();

app.post("/hdfcWebhook",async (req, res) => {
    //TODO: Add zod validation here
    //TODO: to check if the req is coming from HDFC  
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    // Update balance in db, add txn
    await prisma.balance.update({
        where: {
            userId: paymentInformation.userId
        },
        data: {
            amount: {
                increment: paymentInformation.amount
            }
        }
    })
})