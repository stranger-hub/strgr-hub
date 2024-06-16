"use server";
import { signOut } from "next-auth/react";

export const signout = async () => {
    return await signOut({ callbackUrl: "/auth/login" });
}
  