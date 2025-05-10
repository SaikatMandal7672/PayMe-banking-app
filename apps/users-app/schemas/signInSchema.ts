import { z } from "zod";

export const signInSchema =  z.object({
    phone : z.string(),
    password : z.string(),
})