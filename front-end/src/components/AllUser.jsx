import useFetch from "../hooks";
import "./index.css";

import { userId } from "../hooks";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import SingleUser from "./SingleUser";
import { useSelector } from "react-redux";

const AllUser = () => {
  const { data, loading, error } = useFetch(
    "https://mern-chat-app-ermc.onrender.com/user"
  );
  const [query, setQuery] = useState("");
  const toggleButton = useSelector((state) => state.auth.toggleButton);
  const filterForCurrentUser = data?.filter((ele) => {
    return ele?._id !== userId?._id;
  });

  const filterforSerching = filterForCurrentUser?.filter((ele) => {
    return ele.userName.toLowerCase().includes(query);
  });

  const logOut = async () => {
    try {
      const res = await axios.post(
        "https://mern-chat-app-ermc.onrender.com/logout"
      );

      toast.success(res?.data);
      console.log(res?.data);

      localStorage.removeItem("user");
      window.location.replace("/");
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const testSort = filterforSerching?.sort((a, b) => {
    const nameA = a.userName.toUpperCase(); // ignore upper and lowercase
    const nameB = b.userName.toUpperCase(); // ignore upper and lowercase

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <div
        style={{ flex: "3" }}
        className={`flex flex-col items-center md:items-start justify-between h-[80%] m-[auto_0] lg:h-full lg:m-0 border-l ${
          toggleButton ? "hidden md:flex" : "testClass"
        } w-full`}
      >
        <div className="relative customShadow w-full ">
          <div className="border-b border-[#4b49b6] shadow-md my-1 lg:my-4">
            <input
              tabIndex={0}
              className="py-[6px] px-2 border-none outline-none text-md w-full"
              type="search"
              onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
              placeholder="search.. "
            />
          </div>
          <div className="h-[70vh] overflow-y-scroll px-2">
            {loading ? (
              "loading.."
            ) : testSort?.length > 0 ? (
              testSort?.map((ele) => {
                return <SingleUser key={ele?._id} userInfo={ele} />;
              })
            ) : (
              <h1>There is No User to chat with another!</h1>
            )}
          </div>
          {error && <h1>There is Something wrong!</h1>}
        </div>

        <div className="mb-2 relative group w-fit h-fit mx-2 transition-all ">
          <div
            className="absolute top-[-115px] left-[-1200px] lg:left-[-1200px] lg:top-[-115px] 
                          group-hover:left-[-90px] md:group-hover:left-0 shadow-lg rounded-md 
                          backdrop-blur-sm transition-all duration-300 
                          py-4 px-4 bg-[#000000a2] z-50 "
          >
            <h1 className="text-md font-medium text-white">
              {userId?.userName}
            </h1>
            <h1 className="text-sm font-medium text-white">{userId?.email}</h1>
            <button
              className="bg-[#4B49B6] border-2 border-white text-white px-4 py-1 mt-3 rounded-md text-sm"
              onClick={logOut}
            >
              Log out
            </button>
          </div>
          <img
            className="w-10 h-10 rounded-full border-black border-2"
            src={userId?.profile}
            alt="User Image"
          />
        </div>
      </div>
    </>
  );
};

export default AllUser;
