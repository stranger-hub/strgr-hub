import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password must not be empty"),
});

export const RegisterSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters long"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    // dob: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Gender is required"),
    // country: z.string().min(1, "Country is required"),
});
