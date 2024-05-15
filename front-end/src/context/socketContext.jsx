import { useEffect, useState } from "react";

import io from "socket.io-client";
import { userId } from "../hooks";

import { socketContext } from "../libs/context";

// eslint-disable-next-line react/prop-types
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // const [test, setTest] = useState(null);
  // console.log(test);
  useEffect(() => {
    if (userId) {
      const socket = io("https://mern-chat-app-eta-two.vercel.app", {
        query: {
          userId: userId?._id,
        },
      });
      // socket.on("newMessage", (newMessage) => {
      //   setTest(newMessage);
      // });

      setSocket(socket);
      socket?.on("getOnlineUsers", (user) => {
        setOnlineUsers(user);
      });
      return () => socket?.close();
    } else {
      if (socket) {
        setSocket(false);
        setOnlineUsers(false);
        socket?.close();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
