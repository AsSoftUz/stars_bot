import { useEffect, useState, useRef } from "react";
import api from "../api/axios";

const useGetOrCreateUser = (tgUser) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Default holatda true
  const hasFetched = useRef(false); // Takroriy so'rovlarni oldini olish uchun

  useEffect(() => {
    // tgUser bo'lmasa so'rov yubormaymiz
    if (!tgUser) {
      setLoading(false);
      return;
    }

    // Bir marta ishlashini ta'minlash
    if (hasFetched.current) return;
    hasFetched.current = true;

    const syncUser = async () => {
      try {
        setLoading(true);
        const currentFullname = `${tgUser.first_name || ""} ${tgUser.last_name || ""}`.trim();
        const currentUsername = tgUser.username || null;

        try {
          // 1. Userni bazadan qidirish
          const res = await api.get(`/auth/users/${tgUser.id}/`);
          const existingUser = res.data;

          // 2. Ma'lumotlarni solishtirish
          const isChanged = 
            existingUser.fullname !== currentFullname || 
            (existingUser.username || null) !== currentUsername;

          if (isChanged) {
            // 3. O'zgargan bo'lsa Update qilish
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
            // 4. Bazada yo'q bo'lsa yaratish
            const payload = {
              user_id: tgUser.id,
              fullname: currentFullname,
              username: currentUsername,
              phone: "", // Backend majburiy qilsa null emas bo'sh string yuboramiz
            };
            const createRes = await api.post("/auth/users/", payload);
            setUser(createRes.data);
          } else {
            throw err; // Boshqa turdagi xatolarni catch'ga otish
          }
        }
      } catch (error) {
        console.error("Auth Error:", error);
      } finally {
        setLoading(false);
      }
    };

    syncUser();
  }, [tgUser]);

  return { user, loading };
};

export default useGetOrCreateUser;