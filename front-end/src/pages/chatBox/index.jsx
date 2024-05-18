import AllUser from "../../components/AllUser";
import MessageBox from "../../components/MessageBox";
import useGetMessage from "../../hooks/useGetMessage";

const Chat = () => {
  useGetMessage();

  return (
    <>
      <div className="flex items-start w-full h-[100vh_-_10vh] m-[auto_0] lg:h-[100vh] justify-between">
        <AllUser />
        <MessageBox />
      </div>
    </>
  );
};

export default Chat;
