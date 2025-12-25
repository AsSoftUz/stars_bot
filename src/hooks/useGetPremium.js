// src/hooks/usePremium.js
import { useState, useEffect } from "react";
import api from "../api/axios"; // O'zingizning axios instansingiz

const useGetPremium = () => {
    const [premiumOptions, setPremiumOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPremium = async () => {
        try {
            setLoading(true);
            const res = await api.get("/premium/"); // API manzilingiz (swaggerdagidek)
            
            // Faqat is_active: true bo'lganlarini saralash va UI uchun formatlash
            const activePlans = res.data
                .filter(item => item.is_active)
                .map(item => {
                    const total = parseFloat(item.price);
                    return {
                        ...item,
                        // Bir oylik narxni hisoblash (masalan: 100 000 / 3)
                        perMonth: round(total / item.duration).toLocaleString(),
                        // Umumiy narxni formatlash (100000 -> 100 000)
                        formattedPrice: total.toLocaleString()
                    };
                });
            
            setPremiumOptions(activePlans);
        } catch (err) {
            setError(err.message || "Premium planlarni yuklashda xatolik");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPremium();
    }, []);

    return { premiumOptions, loading, error, refetch: fetchPremium };
};

export default useGetPremium;