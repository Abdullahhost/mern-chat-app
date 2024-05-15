import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { messageIdActions } from "../settings/slice/messageSlice";
import { useSocketContext } from "../libs/context";

const useRealTimeMessage = () => {
  const { socket } = useSocketContext();
  const getMessage = useSelector((state) => state?.message?.messageData);
  const dispatch = useDispatch;

  useEffect(() => {
    if (getMessage) {
      socket?.on("newMessage", (newMessage) => {
        dispatch(messageIdActions.setMessage([...getMessage, newMessage]));
      });
    }
    return () => socket?.off("newMessage");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, messageIdActions.setMessage, getMessage]);
};

export default useRealTimeMessage;
