import { createContext } from "react";
import { SocketContextProps } from "../types/socket.types";

export const SocketContext = createContext<SocketContextProps | undefined>(undefined);