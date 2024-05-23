import { useDispatch, useSelector } from "react-redux";

import { useSocketContext } from "../libs/context";
import { authSliceActions } from "../settings/slice/authSlice";
import { useEffect, useRef, useState } from "react";
import { userId } from "../hooks";
import axios from "axios";
import { dateFormat } from "../libs/dateFormat";

// eslint-disable-next-line react/prop-types
const SingleUser = ({ userInfo }) => {
  // eslint-disable-next-line react/prop-types
  const { profile, userName, _id } = userInfo;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(_id);

  const selectedUser = useSelector((state) => state?.auth?.selectedUser);
  const getMessage = useSelector((state) => state?.message?.messageData);

  const dispatch = useDispatch();

  const userRef = useRef(null);

  const [senderId] = useState({
    userProfileId: userId?._id,
  });
  const [getLastMessage, setGetLastMessage] = useState("");

  const [userPopUp, setUserPopUp] = useState(null);
  const handleClick = async (userInfo) => {
    dispatch(authSliceActions.setSelectedUser(userInfo));
    dispatch(authSliceActions.setToggle());
  };

  useEffect(() => {
    const getLastMessage = async () => {
      try {
        const res = await axios.post(
          `https://mern-chat-app-ermc.onrender.com/messages/${_id}`,
          senderId
        );

        const fullMessageInfo = getMessage ? getMessage : res?.data;

        fullMessageInfo
          ? setGetLastMessage(fullMessageInfo?.slice(-1).pop())
          : "";
      } catch (error) {
        console.log(error);
      }
    };
    getLastMessage();
    return () => getLastMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let handler = (e) => {
      if (!userRef?.current?.contains(e.target)) {
        setUserPopUp(null);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    let intervalId = setInterval(dateFormat, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className={`w-full min-w-[320px] md:min-w-[250px] lg:w-[320px] flex items-center  justify-between 
    group hover:bg-[#62616e] border-b-[1px] hover:border-b-4 hover:border-[#2563EB] 
    hover:text-white rounded-md transition-all 
    duration-200 my-2  cursor-pointer ${
      selectedUser?._id === _id
        ? "bg-[#4b49b6] text-white font-bold border-b-4 border-[#ffffff94]"
        : "border-[#ebeaea]"
    } item`}
    >
      {userPopUp && (
        <div className="csAnimation fixed top-0 left-0 w-full h-full z-20 bg-[#00000091] backdrop-blur-sm p-5 grid place-items-center">
          <div
            onClick={() => setUserPopUp(null)}
            className="fixed top-[25px] right-[60px] bg-slate-50 px-[10px] py-1 rounded-full z-50 border-4 border-red-500"
          >
            <span className="z-50 text-black">✖</span>
          </div>
          <img
            ref={userRef}
            className="w-fit h-fit max-w-[80%] max-h-[90vh] object-contain z-[40]"
            src={userPopUp}
            alt="User Image"
          />
        </div>
      )}
      <div
        onClick={() => setUserPopUp(profile)}
        className={` min-w-fit px-2 py-2 relative  ${
          isOnline ? "activestatus" : ""
        }`}
      >
        <img
          className={`w-[40px] h-[40px] rounded-full group-hover:border-2 object-cover object-center ${
            selectedUser?._id === _id ? "border-2" : ""
          }`}
          src={profile}
          alt="UserImage"
        />
      </div>
      <div
        onClick={() => handleClick(userInfo, _id)}
        tabIndex={0}
        className="w-full  h-[40px] px-3 overflow-hidden"
      >
        <div className="flex justify-between items-center">
          <h2
            className={`text-lg text-stone-700 group-hover:text-slate-100 leading-4 truncate text-nowrap ${
              selectedUser?._id === _id
                ? "font-semibold text-slate-100"
                : "font-semibold text-stone-700"
            }`}
          >
            {userName}
          </h2>

          <small className="text-nowrap">
            {getLastMessage ? dateFormat(getLastMessage?.createdAt) : ""}
          </small>
        </div>
        <div className="w-full truncate">
          <small
            className={`font-thin text-[.75rem] group-hover:text-white leading-[2px]${
              selectedUser?._id === _id ? "text-white" : "text-slate-800"
            }`}
          >
            {getLastMessage ? (
              <small className="font-semibold text-[12px] font-sans">
                {getLastMessage?.message}
              </small>
            ) : (
              "Hey, I am using shomachar app."
            )}
          </small>
        </div>
      </div>
      <br />
    </div>
  );
};

export default SingleUser;
