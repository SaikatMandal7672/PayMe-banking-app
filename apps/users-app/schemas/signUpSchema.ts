import { z } from "zod";

export const signUpSchema =  z.object({
    phone : z.string().max(10),
    password : z.string().min(6),
})