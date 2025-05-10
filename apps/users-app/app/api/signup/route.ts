
import * as bcrypt from "bcrypt-ts";
import  {prisma}  from "@repo/database";

export async function POST(request: Request) {


    try {

        const { phone, password } = await request.json();
        const existingUser = await prisma.user.findFirst({
            where: {
                number: phone,
            }
        });
        if (existingUser) {
            return Response.json({
                success: false,
                message: "Username already exists"
            }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                number: phone,
                password: hashedPassword
            }
        });

        return Response.json({
            success: true,
            message: "User registered successfully.",
            user
        }, {
            status: 200
        })

    } catch (error) {
        console.error("Error registering user:", error);
        return Response.json({
            success: false,
            message: error instanceof Error ? error.message : "An unknown error occurred",
        },
            {
                status: 500,
            })
    }
}