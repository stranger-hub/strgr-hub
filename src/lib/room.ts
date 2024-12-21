import { Room } from "@prisma/client";
import toast from "react-hot-toast";
import { get } from "./api";

export const getRoom = async (): Promise<Room | undefined> => {
    try {
        const result = await get("/api/rooms");
        if (result.success && result.data) {
            return result.data;
        } else {
            toast.error("cannot create room, please reload and try again!!", {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    } catch (e: any) {
        console.log(e.message);
        throw (e);
    }
}

export const leaveRoom = async (roomId: string) => {
    try {
        await fetch(`/api/rooms?roomId=${roomId}`, {
            method: "PUT",
            keepalive: true,
        });
    } catch (e: any) {
        console.log(e.message);
    }
}