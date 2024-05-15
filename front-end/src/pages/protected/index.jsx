import { Navigate } from "react-router-dom";

import Login from "../login";

// eslint-disable-next-line react/prop-types
const Protected = ({ getDataInformation }) => {
  if (getDataInformation) {
    return (
      <Navigate to="https://mern-chat-app-eta-two.vercel.app/chat" replace />
    );
  } else {
    return <Login />;
  }
};

export default Protected;
