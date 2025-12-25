import "./premium.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useTelegramBack from "../../hooks/useTelegramBack";
import useGetPremium from "../../hooks/useGetPremium";
import { useTranslation } from 'react-i18next';

const Premium = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    // Telegram orqaga qaytish tugmasi
    useTelegramBack("/");

    // Hookdan ma'lumotlar va buy funksiyasini olamiz
    const { premiumOptions, loading, error, buyPremium } = useGetPremium();
    
    // Tanlangan butun plan obyektini saqlash uchun state
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Ma'lumotlar kelganda birinchi plan obyektini avtomatik tanlash
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

    // Satib olish (Subscribe) funksiyasi
    const handleSubscribe = async () => {
        if (!selectedPlan) return;

        // Telegram WebApp orqali foydalanuvchi ma'lumotlarini olish
        const tg = window.Telegram?.WebApp;
        const user = tg?.initDataUnsafe?.user;

        // Swaggerda so'ralgan payload
        const payload = {
            username: user?.username || "unknown",
            miqdor: parseFloat(selectedPlan.price), // Plan narxi
            user_id: user?.id || 0
        };

        try {
            setIsSubmitting(true);
            await buyPremium(payload); // POST so'rovi
            
            // Muvaffaqiyatli bo'lsa tranzaksiya sahifasiga o'tish
            tg?.showAlert(t("Success! Your request is being processed."));
            navigate("/tranzaction");
        } catch (err) {
            tg?.showPopup({
                title: t("Error"),
                message: err.toString(),
                buttons: [{ type: "ok" }]
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="loader">{t("Loading...")}</div>;
    if (error) return <div className="error">{t("Error")}: {error}</div>;

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
                                    {plan.duration >= 6 && (
                                        <span className="save">
                                            {plan.duration === 12 ? t("SAVE 33%") : t("SAVE 10%")}
                                        </span>
                                    )}
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
                {isSubmitting ? t("Processing...") : t("Subscribe")}
            </button>
        </div>
    );
};

export default Premium;