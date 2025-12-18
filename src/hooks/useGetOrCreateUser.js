import { useEffect, useState } from "react";
import api from "../api/axios";

const useGetOrCreateUser = (tgUser) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tgUser) return;

    const run = async () => {
      setLoading(true);
      try {
        // 1. Userni bazadan tekshiramiz
        const res = await api.get(`/auth/users/${tgUser.id}/`);
        const existingUser = res.data;

        // 2. Telegramdan kelgan yangi ma'lumotlar
        const currentFullname = `${tgUser.first_name || ""} ${tgUser.last_name || ""}`.trim();
        const currentUsername = tgUser.username || null;

        // 3. Agar bazadagi ma'lumot Telegramdagidan farq qilsa, update qilamiz
        if (
          existingUser.fullname !== currentFullname ||
          existingUser.username !== currentUsername
        ) {
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
          // 4. User topilmasa, yangi yaratamiz
          const payload = {
            user_id: tgUser.id,
            fullname: `${tgUser.first_name || ""} ${tgUser.last_name || ""}`.trim(),
            username: tgUser.username || null,
            phone: "",
          };

          const createRes = await api.post("/auth/users/", payload);
          setUser(createRes.data);
        } else {
          console.error("Xatolik yuz berdi:", err);
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