import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Login from "../src/pages/login";

import Protected from "./pages/protected";

import { useEffect, useState } from "react";
import ChatProtected from "./pages/protected/chatProtected";

function App() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [getDataInformation, setUserDataInformation] = useState(userData);

  useEffect(() => {
    setUserDataInformation(userData);
  }, [userData]);

  useEffect(() => {
    if (getDataInformation) {
      <Navigate to={"https://mern-chat-app-eta-two.vercel.app/chat"} />;
    } else {
      <Navigate to={"/"} />;
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route
            path="/"
            element={<Protected getDataInformation={getDataInformation} />}
          />
          <Route
            path="https://mern-chat-app-eta-two.vercel.app/chat"
            element={<ChatProtected getDataInformation={getDataInformation} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// I am get stuck, how can i fix it? please help me? in my mern stack application. when i am trying to login with cookies storing in browser this ganna not work but in testting porpuse in postman it is work or save cookie successfully
