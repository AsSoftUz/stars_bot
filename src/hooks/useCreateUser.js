import { useState } from "react";
import api from "../api/axios";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/users/", payload);
      document.writeln(res.data)
      return res.data;
    } catch (err) {
      setError(err.response?.data || "Xatolik yuz berdi");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};
