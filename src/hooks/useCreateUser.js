import { useState } from "react";
import api from "../api/axios";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const axios = require("axios");

  // const TOKEN = "BOT_TOKENINGIZ";
  // const CHAT_ID = "CHAT_ID";

  

  const createUser = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const checkRes = await api.get(`/auth/users/${payload.user_id}/`);
      if (checkRes.data) {
        // axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        //   chat_id: CHAT_ID,
        //   text: "Salom Telegram!",
        // })
        document.writeln("User allaqachon mavjud");
        return checkRes.data;
      } else {
        const res = await api.post("/auth/users/", payload);
        document.writeln("Yangi foydalanuvchi yaratildi");
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
