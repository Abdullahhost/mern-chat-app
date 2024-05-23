/* eslint-disable react/prop-types */
// import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { timeCalculating } from "../libs/timeCalculate";
import { messageIdActions } from "../settings/slice/messageSlice";
import { useSocketContext } from "../libs/context";
import { useDispatch, useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const Message = ({ own, getMessage, getProfileimage, ownProfile }) => {
  // eslint-disable-next-line react/prop-types
  const { message, createdAt } = getMessage;
  const prevMessage = useSelector((state) => state.message.messageData);
  const realtimeSup = useSelector((state) => state.message.realtimeSupport);
  const selectedUser = useSelector((state) => state.auth.selectedUser);
  const { socket } = useSocketContext();

  const dispatch = useDispatch();
  const [lastMessage, setLastMessage] = useState(undefined);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (selectedUser?._id === newMessage?.senderId && newMessage) {
        dispatch(
          messageIdActions.setMessage([
            ...(prevMessage || getMessage),
            newMessage,
          ])
        );
      } else {
        return;
      }
    });
    setLastMessage(prevMessage?.slice(-1).pop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMessage, messageIdActions, selectedUser, realtimeSup]);

  useEffect(() => {
    let intervalId = setInterval(timeCalculating, 1000);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className={`${own ? "justify-end" : ""} flex gap-2 w-full`}>
        <div className="flex gap-2 w-fit max-w-[400px] my-3">
          <img
            className="w-[30px] h-[30px] object-cover rounded-full border-2 border-blue-800"
            src={own ? ownProfile : getProfileimage}
            alt="UserImage"
          />

          <div>
            <div
              className={`px-3 py-[6px] bg-[#4b49b6] rounded-xl text-sm max-w-[300px] relative roundedIcon  ${
                own ? "bg-[#cececa] text-black roundedIcon1" : "text-white"
              } ${lastMessage?.message === message && !own ? "shake" : ""}`}
            >
              {message}
            </div>
            <small className="text-xs">{timeCalculating(createdAt)}</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
