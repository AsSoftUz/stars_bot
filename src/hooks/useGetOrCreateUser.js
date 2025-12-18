import { useEffect, useState } from "react";
import api from "../api/axios";

const useGetOrCreateUser = (tgUser) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tgUser) return;

    // useGetOrCreateUser.js ichida
const run = async () => {
  setLoading(true);
  try {
    const res = await api.get(`/auth/users/${tgUser.id}/`);
    const existingUser = res.data;

    const currentFullname = `${tgUser.first_name || ""} ${tgUser.last_name || ""}`.trim();
    const currentUsername = tgUser.username || null;

    // Username null bo'lsa ham solishtirish uchun:
    const hasNameChanged = existingUser.fullname !== currentFullname;
    const hasUsernameChanged = (existingUser.username || null) !== currentUsername;

    if (hasNameChanged || hasUsernameChanged) {
      const updateRes = await api.patch(`/auth/users/${tgUser.id}/`, {
        fullname: currentFullname,
        username: currentUsername,
      });
      setUser(updateRes.data);
    } else {
      setUser(existingUser);
    }
  } catch (err) {
    if (err.response?.status === 404) {
      // Yangi yaratish qismi...
      const payload = {
        user_id: tgUser.id,
        fullname: `${tgUser.first_name || ""} ${tgUser.last_name || ""}`.trim(),
        username: tgUser.username || null,
        phone: "",
      };
      const createRes = await api.post("/auth/users/", payload);
      setUser(createRes.data);
    } else {
      console.error(err);
      // Xatolik bo'lsa ham loadingdan chiqarish uchun:
      setUser(null); 
    }
  } finally {
    setLoading(false);
  }
};

    run();
  }, [tgUser]);

  return { user, loading };
};

export default useGetOrCreateUser;