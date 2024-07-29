import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { url } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url + "/api/users", { headers: { token } });
        const data = await res.data;
		
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
