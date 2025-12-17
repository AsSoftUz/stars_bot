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
        const res = await api.get(`/auth/users/${tgUser.id}/`);
        setUser(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          const payload = {
            user_id: tgUser.id,
            fullname: `${tgUser.first_name || ""} ${tgUser.last_name || ""}`,
            username: tgUser.username || null,
            phone: "",
          };

          const createRes = await api.post("/auth/users/", payload);
          setUser(createRes.data);
        } else {
          console.error(err);
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
