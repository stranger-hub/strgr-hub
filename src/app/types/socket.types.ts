import { ReactNode } from "react";
import { Socket } from "socket.io-client";

export interface SocketContextProps {
    socket: Socket | null;
}

export interface SocketProviderProps {
    children: ReactNode;
}