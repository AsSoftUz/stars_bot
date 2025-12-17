import { useEffect, useState } from "react";
import api from "../api/axios";

const useGetOneUser = (userId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await api.get(`/auth/users/${userId}/`);
        setData(response.data);
      } catch (err) {
        setIsError(true);
        setError(err.response?.data || err.message);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return {
    data,
    isLoading,
    isError,
    error,
    exists: !!data, // user bor yoki yo‘qligi
  };
};

export default useGetOneUser;
