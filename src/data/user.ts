import { db } from "@/lib/db"

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            }
        });

        return user;
    } catch(error: any) {
        console.log(error?.message);
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id,
            }
        });
        console.log("themUser in fn", user);

        return user;
    } catch(error: any) {
        console.log(error?.message);
        return null;
    }
};