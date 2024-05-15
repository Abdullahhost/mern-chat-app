import { createContext, useContext } from "react";

export const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};