import { useContext, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { url } = useContext(AuthContext);
  const { messages, setMessages, selectedConversation } = useConversation();
  const token = localStorage.getItem("token");

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${url}/api/messages/send/${selectedConversation._id}`,
        { message },
        {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
