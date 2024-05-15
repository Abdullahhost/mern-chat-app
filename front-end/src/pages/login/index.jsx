import { useCallback, useState } from "react";

import defaultUser from "/defaultUser.png";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { Toaster, toast } from "react-hot-toast";

import "./index.css";
import { authSliceActions } from "../../settings/slice/authSlice";
import Skeleton from "../../skeloten";

const Login = () => {
  const [variant, setVariant] = useState("LOGIN");
  const [viewMode, setViewMode] = useState(false);
  const [profilePic, setProfilePic] = useState(undefined);

  const dispatch = useDispatch();

  const [loginvalue, setLoginValue] = useState({
    userName: undefined,
    password: undefined,
  });

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const handleChange = (e) => {
    setLoginValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      profile: profilePic,
    }));
  };
  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const formData = new FormData();
  formData.append("userName", loginvalue.userName);
  formData.append("email", loginvalue.email);
  formData.append("password", loginvalue.password);
  formData.append("profile", profilePic);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (variant === "REGISTER") {
      try {
        dispatch(authSliceActions.loginStart());
        const res = await axios.post(
          "https://mern-chat-app-ermc.onrender.com/register",
          formData,
          { withCredentials: true }
        );

        dispatch(authSliceActions.loginSuccess(res?.data));
        if (res?.status === 201) {
          toast.success("Welcome To chat-app");
          window.location.replace("/chat");
        }
      } catch (err) {
        toast.error(err?.response?.data);
        dispatch(authSliceActions.loginFailer(err?.response?.data));
      }
    } else {
      try {
        dispatch(authSliceActions.loginStart());
        const res = await axios.post(
          "https://mern-chat-app-ermc.onrender.com/login",
          loginvalue,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(authSliceActions.loginSuccess(res?.data));

        if (res.status === 200) {
          toast.success("Login Successfully!");
          window?.location?.replace("/chat");
        }
      } catch (err) {
        toast.error(err?.response?.data?.error);
        dispatch(authSliceActions.loginFailer(err?.response?.data));
      }
    }
  };
  const getData = useSelector((state) => state.auth);

  return (
    <>
      {getData.loading ? (
        <Skeleton />
      ) : (
        <div className="flex items-center transition-all duration-500 flex-col lg:flex-row flex-wrap justify-center w-full h-screen gap-10 overflow-hidden">
          <div className="lg:block transition-all duration-500">
            <img
              className="select-none max-w-[250px] max-h-[250px]  lg:max-w-[600px] lg:max-h-[600px] object-cover object-center rounded-md"
              src={profilePic ? URL?.createObjectURL(profilePic) : defaultUser}
              alt="profileImage"
            />
          </div>
          <div className="lg:border-l pl-0  lg:pl-10 transition-all duration-500">
            <h1 className="text-4xl text-center mb-10">
              {variant === "REGISTER" ? "Register" : "Login"}
            </h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="relative requiredTest">
                <input
                  name="userName"
                  title="userName is required"
                  onChange={handleChange}
                  className="border-b focus:outline-double px-4 py-2 rounded-md mt-5 w-full  
                hover:bg-neutral-50 transition"
                  placeholder="UserName"
                  type="text"
                  required
                  enterKeyHint="next"
                  autoFocus
                />
              </div>

              {variant === "REGISTER" && (
                <div className="relative requiredTest">
                  <input
                    name="email"
                    title="email is required"
                    onChange={handleChange}
                    className="border-b focus:outline-double px-4 py-2 rounded-md mt-5 w-full 
                hover:bg-neutral-50 transition"
                    placeholder="Email"
                    type="email"
                    required
                    enterKeyHint="next"
                  />
                </div>
              )}
              <div className="relative group transition">
                <div className="relative requiredTest">
                  <input
                    name="password"
                    title="password is required"
                    onChange={handleChange}
                    className="border-b focus:outline-double px-4 py-2 rounded-md mt-5 w-full hover:bg-neutral-50 transition 
                  "
                    placeholder="password"
                    type={viewMode ? "text" : "password"}
                    required
                    enterKeyHint="next"
                  />
                </div>
                <div
                  onClick={() => setViewMode(!viewMode)}
                  className="absolute right-3 hidden top-3 group-hover:block"
                >
                  {viewMode ? (
                    <BsEyeSlashFill size={20} />
                  ) : (
                    <BsEyeFill size={20} />
                  )}
                </div>
              </div>
              {variant === "REGISTER" && (
                <input
                  name="profile"
                  title="Not required!"
                  onChange={handleFileChange}
                  className="border-b focus:outline-double px-4 py-2 rounded-md mt-5 w-full relative requiredTest 
                hover:bg-neutral-50 transition"
                  placeholder="Email"
                  type="file"
                  required
                  enterKeyHint="next"
                />
              )}

              <input
                className="border-b mt-10 focus:outline-double px-4 py-2 rounded-md w-full bg-black text-white hover:bg-purple-600 transition"
                type="submit"
              />
            </form>
            <Toaster />
            <div className="mt-10">
              <span>
                {variant === "REGISTER"
                  ? "Already have an Account? "
                  : "Don't haven't Account?"}
              </span>
              <button
                className="bg-slate-50 px-3 py-1 rounded-sm"
                onClick={toggleVariant}
              >
                {variant === "REGISTER"
                  ? "lets go Login page"
                  : "lets go Register page"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
