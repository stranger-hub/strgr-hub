"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const signup = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: true, msg: "Invalid fields!" };
    }

    const { username, email, password, gender } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return { error: true, msg: "Email already in use!" };
    }

    await db.user.create({
        data: {
            name: username,
            email: email,
            password: hashedPassword,
            gender: gender,
            // countryCode: country,
        }
    });

    // TODO: Send verification email

    return { error: false, msg : "User created!" };
}