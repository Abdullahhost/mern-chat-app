import { Navigate } from "react-router-dom";

import Chat from "../chatBox";

// eslint-disable-next-line react/prop-types
const ChatProtected = ({ getDataInformation }) => {
  if (!getDataInformation) {
    return <Navigate to="/" replace />;
  } else {
    return <Chat />;
  }
};

export default ChatProtected;
