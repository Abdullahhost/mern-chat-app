import AllUser from "../../components/AllUser";
import MessageBox from "../../components/MessageBox";
import useGetMessage from "../../hooks/useGetMessage";

const Chat = () => {
  useGetMessage();

  return (
    <>
      <div className="flex items-start w-full max-h-[100vh_-_500px] m-[auto_0] h-screen justify-between">
        <AllUser />
        <MessageBox />
      </div>
    </>
  );
};

export default Chat;
