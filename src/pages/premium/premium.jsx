import "./premium.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useTelegramBack from "../../hooks/useTelegramBack";
import useGetPremium from "../../hooks/useGetPremium";
import { useTranslation } from 'react-i18next';
import Loader from "../loader/loader";

const Premium = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    useTelegramBack("/");

    const { premiumOptions, loading, error, buyPremium } = useGetPremium();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Muvaffaqiyatli holat uchun yangi state
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (premiumOptions.length > 0 && !selectedPlan) {
            setSelectedPlan(premiumOptions[0]);
        }
    }, [premiumOptions, selectedPlan]);

    const features = [
        { id: 1, text: t("Double Limits") },
        { id: 2, text: t("4 GB Upload Size") },
        { id: 3, text: t("Faster Download Speed") },
        { id: 4, text: t("Voice-to-Text Conversion") },
        { id: 5, text: t("Premium Stickers") },
        { id: 6, text: t("Unique Reactions") },
        { id: 7, text: t("Animated Emoji Status") }
    ];

    const handleSubscribe = async () => {
        if (!selectedPlan) return;

        const tg = window.Telegram?.WebApp;
        const user = tg?.initDataUnsafe?.user;

        const payload = {
            user_id: user?.id || 6937643642,
            username: user?.username ? `@${user.username}` : "@Coder_Abdullayev", 
            duration: selectedPlan.duration
        };

        try {
            setIsSubmitting(true);
            await buyPremium(payload);
            
            // Alert o'rniga muvaffaqiyat holatini yoqamiz
            setIsSuccess(true);
            
            // 3 soniyadan keyin tranzaksiyalar sahifasiga yo'naltirish (ixtiyoriy)
            setTimeout(() => {
                navigate("/tranzaction");
            }, 3000);

        } catch (err) {
            tg?.showPopup({
                title: t("Xatolik"),
                message: typeof err === 'string' ? err : JSON.stringify(err),
                buttons: [{ type: "ok" }]
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // 1. Yuklanish holati
    if (loading) return <Loader />;

    // 2. Muvaffaqiyatli sahifa (Alert o'rniga)
    if (isSuccess) {
        return (
            <div className="premium-page success-view">
                <div className="glass-card success-card">
                    <div className="success-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h2>{t("Muvaffaqiyatli!")}</h2>
                    <p>{t("Sizning so'rovingiz qabul qilindi va tez orada ko'rib chiqiladi.")}</p>
                    <button className="subscribe-btn" onClick={() => navigate("/tranzaction")}>
                        {t("Tranzaksiyalarga o'tish")}
                    </button>
                </div>
            </div>
        );
    }

    // 3. Xatolik holati
    if (error) return <div className="error-container">
        <p>{t("Xatolik")}: {error}</p>
        <button onClick={() => window.location.reload()}>{t("Qayta urinish")}</button>
    </div>;

    // 4. Asosiy Premium sahifasi
    return (
        <div className="premium-page">
            <nav>
                <div className="left">
                    <h2>Telegram Premium</h2>
                </div>
            </nav>

            <div className="hero glass-card">
                <div className="bg-circle"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path>
                    <path d="M5 21h14"></path>
                </svg>
                <h2 className="premium-gradient">Premium</h2>
                <p>{t("Exclusive features and doubled limits for power users.")}</p>
            </div>

            <div className="plans">
                <h3>{t("Choose a plan")}</h3>
                {premiumOptions.map((plan) => (
                    <label
                        key={plan.id}
                        className={`glass-card plan ${selectedPlan?.id === plan.id ? "active" : ""}`}
                        onClick={() => setSelectedPlan(plan)}
                    >
                        <input
                            type="radio"
                            name="premium_plan"
                            checked={selectedPlan?.id === plan.id}
                            readOnly
                        />

                        <div className="contents">
                            <div className="content">
                                <div className="top">
                                    <h3>{plan.duration} {t("Months")}</h3>
                                    {plan.duration === 12 && <span className="save">SAVE 33%</span>}
                                    {plan.duration === 6 && <span className="save">SAVE 10%</span>}
                                </div>
                                <p className="per-month">UZS {plan.perMonth} / {t("month")}</p>
                            </div>
                            <p className="price">UZS {plan.formattedPrice}</p>
                        </div>
                    </label>
                ))}
            </div>

            <div className="features glass-card">
                <h3>{t("Premium Features")}</h3>
                {features.map((feature) => (
                    <p key={feature.id}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(168 85 247)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        {feature.text}
                    </p>
                ))}
            </div>
            
            <button 
                className="subscribe-btn" 
                disabled={isSubmitting || !selectedPlan}
                onClick={handleSubscribe}
            >
                {isSubmitting ? t("Yuborilmoqda...") : t("Subscribe")}
            </button>
        </div>
    );
};

export default Premium;