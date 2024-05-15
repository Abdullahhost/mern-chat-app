import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { userId } from "./index";
import { messageIdActions } from "../settings/slice/messageSlice";

export const useGetMessage = () => {
  const selectedUser = useSelector((state) => state?.auth?.selectedUser);

  const [senderId] = useState({
    userProfileId: userId?._id,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const getMessage = async () => {
      dispatch(messageIdActions.setLoadingMessage(true));
      try {
        if (selectedUser) {
          const res = await axios.post(
            `https://mern-chat-app-ermc.onrender.com/messages/${selectedUser?._id}`,
            senderId
          );
          dispatch(messageIdActions.setMessage(res?.data));
        }
      } catch (error) {
        console.log(error);
      }
      dispatch(messageIdActions.setLoadingMessage(false));
    };
    getMessage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);
};

export default useGetMessage;
