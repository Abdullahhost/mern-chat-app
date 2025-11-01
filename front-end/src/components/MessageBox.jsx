import { useCallback, useEffect, useRef, useState } from "react";
import { userId } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { messageIdActions } from "../settings/slice/messageSlice";
import Message from "./messages";
import { authSliceActions } from "../settings/slice/authSlice";
import toast from "react-hot-toast";

import { BsImage } from 'react-icons/bs'

import notification from "../assets/sound/messageSound.mp3";

import { useSocketContext } from "../libs/context";
import { API } from "../libs/productionVariableds";
const MessageBox = () => {
  const getMessage = useSelector((state) => state?.message?.messageData);
  const loadingmessage = useSelector((state) => state?.message?.loadingMessage);
  const reciverId = useSelector((state) => state?.auth?.selectedUser);
  const toggleButton = useSelector((state) => state?.auth?.toggleButton);
  const realtimeSup = useSelector((state) => state.message.realtimeSupport);
  const userName = reciverId?.userName;
  const getProfileimage = reciverId?.profile;

  const { socket } = useSocketContext();

  const dispatch = useDispatch();

  const scrollsmoth = useRef(null);
  const textBox = useRef(null);
  const [imageUpload, setImageUpload] = useState(false);

  const [test, setTest] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [cImage, setProfile] = useState(undefined)

  const [textMessage, setTextMessage] = useState({
    userProfileId: userId?._id,
    message: test,
  });

  const [imageMessage, setImageMessage] = useState({
    userProfileId: userId?._id,
  })



console.log(scrollsmoth)

  const handleFileChange = (e) => {

    setImageUpload(true)
    setProfile(e.target.files[0])
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback((e) => {
    setTextMessage({
      ...textMessage,
      message: e?.target?.value,
    });


    if (!typing) {
      setTyping(true);
      socket.emit("typing");
    }
    debounceStopTyping();
    setTest(e?.target?.value);
  });

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (newMessage) {
        const sound = new Audio(notification);
        sound.play();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reciverId, realtimeSup]);

  useEffect(() => {
    setTimeout(() => {
      scrollsmoth.current?.scrollIntoView(
        {
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        },
        500
      );
    });
  }, [loadingmessage, getMessage]);

  useEffect(() => {
    socket?.on("typing", () => {
      setIsTyping(true);
    });

    socket?.on("stopTyping", () => {
      setIsTyping(false);
    });

    return () => {
      socket?.off("typing");
      socket?.off("stopTyping");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reciverId]);

  let debounceTimeout;
  const debounceStopTyping = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setTyping(false);
      socket.emit("stopTyping");
    }, 8000);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (test !== "" || cImage !== undefined) {
      try {
        if (imageUpload) {
          const formData = new FormData();
          formData.append("userProfileId", imageMessage.userProfileId);
          formData.append("cImage", cImage)

          const res = await axios.post(
            `${API}/messages/send/${reciverId?._id}`,
            formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
          ).finally(() => {
            setProfile(undefined);
            setImageUpload(false);
            dispatch(messageIdActions.setRealtimeSupport(false));
            setTimeout(() => {
              scrollsmoth.current?.scrollIntoView(
                {
                  behavior: "smooth",
                  block: "end",
                  inline: "end",
                },
                50
              );
            });
          })

          dispatch(messageIdActions.setRealtimeSupport(true));
          dispatch(messageIdActions.setMessage([...getMessage, res?.data]));
          setTyping(false);
          socket.emit("stopTyping");

        } else {

          const res = await axios.post(
            `${API}/messages/send/${reciverId?._id}`,
            textMessage, { withCredentials: true }
          );


          dispatch(messageIdActions.setRealtimeSupport(true));
          dispatch(messageIdActions.setMessage([...getMessage, res?.data]));
          setTest("");
          setTyping(false);

          socket.emit("stopTyping");
          textBox?.current?.value === "";



          dispatch(messageIdActions.setRealtimeSupport(false));
          setTimeout(() => {
            scrollsmoth.current?.scrollIntoView(
              {
                behavior: "smooth",
                block: "end",
                inline: "end",
              },
              500
            );
          });
        }


      } catch (error) {
        console.log(error);
      }
      dispatch(messageIdActions.setRealtimeSupport(false));
    } else {
      toast.error("Empty message are not send!");
    }
  };

  const handleToggle = () => {
    dispatch(authSliceActions.setToggle(false));
  };

  useEffect(() => {
    textBox?.current && textBox?.current?.focus();
  }, [reciverId, getMessage]);

  return (
    <div
      style={{ flex: "10" }}
      className={`duration-1000 transition lg:border md:pl-4 hidden flex-none  md:flex lg:flex  flex-col h-[90%] mt-[5%] mb-[20%] lg:h-full lg:m-0 justify-between ml-0 lg:ml-2 ${toggleButton ? " testClass sm:flex md:flex lg:flex flex" : ""
        }`}
    >
      {reciverId && userName !== null && (
        <div className="pr-4  md:px-4 py-1 lg:py-2 flex items-center bg-[#4B49B6]  rounded-md text-white ">
          <span
            onClick={handleToggle}
            className="px-4 mr-4 transition cursor-pointer inline-block text-center ease-in-out py-1 text-xl shadow-sm shadow-black hover:border-2  hover:bg-black hover:text-white rounded-md bg-[#8395f8] font-thin md:hidden"
          >
            ⬅
          </span>
          <span>
            <span className="text-stone-300">To : &nbsp; </span>
          </span>
          {userName + " "}
          <div>{isTyping ? <p> &nbsp; is typing...</p> : null}</div>
        </div>
      )}
      <div className="h-full overflow-auto mt-2 mb-5 pl-0 pr-2 lg:pl-2 lg:pr-6">
        {getMessage === null ? (
          <div className="w-full h-full flex items-center justify-center flex-col ">
            <div className="glitch-wrapper p-10">
              <div
                className="glitch  bg-black rounded-md p-4 uppercase"
                data-text="Select A friend from your friend list to chat."
              >
                Select A friend from your friend list to chat.
              </div>
            </div>

            <div className="">
              <img
                className="w-[100px] mt-10"
                src="chat4.svg"
                alt="chat-logo"
              />
            </div>
          </div>
        ) : loadingmessage ? (
          <div className="loaderBox">
            <span className="loader"></span>
          </div>
        ) : getMessage?.length > 0 ? (
          getMessage?.map((ele) => {
            return (
              <div key={ele?._id} ref={scrollsmoth}>
                <Message
                  getMessage={ele}
                  own={ele?.senderId === userId._id ? true : false}
                  getProfileimage={getProfileimage}
                  ownProfile={userId?.profile}
                />
              </div>
            );
          })
        ) : (
          <div className="w-full h-full flex items-center justify-center flex-col">
            <h1 className="text-lg font-semibold">
              No message to show, type anything to chat!.
            </h1>
            <img className="w-[100px] mt-10" src="chat4.svg" alt="chat-logo" />
          </div>
        )}
      </div>
      {reciverId && (
        <form
          onSubmit={handleSubmit}
          style={{ boxShadow: " box-shadow: 0 -5px 5px -5px #333" }}
          className="w-full flex gap-3 flex-start relative border mb-2"
        >
          <div className="cursor-pointer p-2 w-[60px] h-[40px] relative">
            <input type="file" className="opacity-5 w-full h-full border -mt-2" name='cImage' onChange={handleFileChange} />
            <BsImage className="absolute top-0 left-0 -z-10" size={40} />
          </div>
          <textarea
            ref={textBox}
            className="w-full border rounded-md py-2 px-4"
            name="chatbot"
            cols="40"
            rows="1"
            value={test}
            onChange={(e) => handleChange(e)}
            placeholder={isTyping ? "typing.." : "lets send or drop a message"}
          ></textarea>

          <input type="submit"
            value={"Send"}
            className="text-white bg-[#4B49B6] px-5 py-3 h-fit w-fit rounded-md "
          />
        </form>
      )}
    </div>
  );
};

export default MessageBox;
