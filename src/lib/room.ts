import { Room } from "@prisma/client";
import toast from "react-hot-toast";

export const getRoom = async (): Promise<Room | undefined> => {
    try {
        const res = await fetch("/api/rooms");
        const result = await res.json();
        if (result.success && result.data) {
            return result.data;
        } else {
            toast.error("cannot create room, please reload and try again!!");
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