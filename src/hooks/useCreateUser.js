import { useState } from "react";
import api from "../api/axios";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const checkRes = await api.get(`/auth/users/${payload.user_id}/`);
      if (checkRes.data) {
        return checkRes.data + "User already exists";
      } else {
        const res = await api.post("/auth/users/", payload);
        return res.data + "User created successfully";
      }
    } catch (err) {
      setError(err.response?.data || "Xatolik yuz berdi");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};
