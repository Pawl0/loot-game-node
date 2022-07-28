import { SocketAdapter } from "./service/SocketAdapter";
import { createContext } from "react";

export const SocketContext = createContext(
  {} as SocketAdapter
);
