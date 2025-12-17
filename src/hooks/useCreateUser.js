import { useState } from "react";
import api from "../api/axios";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axios = require("axios");

  const TOKEN = "8563975841:AAHiSdqaVo3xYHnnXUK9EibkwPfdCA758Ko";
  const CHAT_ID = "8244991353";

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;


  

  const createUser = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const checkRes = await api.get(`/auth/users/${payload.user_id}/`);
      if (checkRes.data) {
        const resp = fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: 'user bor'
          })
        });
        return checkRes.data;
      } else {
        const res = await api.post("/auth/users/", payload);
        const resp = fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: 'user qoshildi'
          })
        });
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
