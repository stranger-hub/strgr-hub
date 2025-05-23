"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: true, msg: "Invalid fields" };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            // redirect: false,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });

        return { error: false, msg: "Logged in successfully!" }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": 
                    return { error: true, msg: "Invalid credentials" }
                default: 
                    return { error: true, msg: "Something went wrong!" }
            }
        }

        throw error;
    }
};