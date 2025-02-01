import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import brcypt from "bcryptjs";

export default {
    providers: [
        GitHub,
        Google,
        Credentials({
            authorize: async (credentials) => {
                const validatedFields = LoginSchema.safeParse(credentials);

                if(validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if(!user || !user.password) return null;

                    const passwordsMatch = await brcypt.compare(password, user.password);
                    if(passwordsMatch) {
                        return user;
                    }
                }

                return null;
            }
        })
    ],
} satisfies NextAuthConfig;
