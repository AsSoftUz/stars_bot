import { useState } from "react";
import api from "../api/axios";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axios = require("axios");

  const TOKEN = "8563975841:AAHiSdqaVo3xYHnnXUK9EibkwPfdCA758Ko";
  const CHAT_ID = "8244991353";

  

  const createUser = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const checkRes = await api.get(`/auth/users/${payload.user_id}/`);
      if (checkRes.data) {
        axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
          chat_id: CHAT_ID,
          text: "user bor!",
        })
        return checkRes.data;
      } else {
        const res = await api.post("/auth/users/", payload);
        axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
          chat_id: CHAT_ID,
          text: "user yaratildi!",
        })
        return res.data;
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
