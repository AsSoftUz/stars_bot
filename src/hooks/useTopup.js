// src/hooks/useTopup.js
import { useState } from "react";
import api from "../api/axios";

const useTopup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submitTopup = async ({ user_id, amount, file }) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const formData = {
                user_id: user_id,
                amount: amount,
                receipt_image: file,
            };

            const res = await api.post("/invoices/invoices_create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setSuccess(true);
            return res.data;

        } catch (err) {
            const message =
                err.response?.data?.message || "Topup yuborishda xatolik";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        submitTopup,
        loading,
        error,
        success,
    };
};

export default useTopup;
