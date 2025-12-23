import "./premium.scss"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useTelegramBack from "../../hooks/useTelegramBack";
import { useTranslation } from 'react-i18next';

const Premium = () => {

    const navigate = useNavigate();
    useTelegramBack("/");
    const [selected, setSelected] = useState("1m");
    const { t, i18n } = useTranslation();

    const plans = [
        { id: "1m", label: t("1Month"), price: 4.99, perMonth: "UZS 4.99" },
        { id: "3m", label: t("3Months"), price: 13.99, perMonth: "UZS 4.66", save: t("SAVE 5%") },
        { id: "6m", label: t("6Months"), price: 26.99, perMonth: "UZS 4.49", save: t("SAVE 10%") },
        { id: "12m", label: t("12Months"), price: 39.99, perMonth: "UZS 3.33", save: t("SAVE 33%") },
    ];

    const features = [
        { id: 1, text: t("Double Limits") },
        { id: 2, text: t("4 GB Upload Size") },
        { id: 3, text: t("Faster Download Speed") },
        { id: 4, text: t("Voice-to-Text Conversion") },
        { id: 5, text: t("Premium Stickers") },
        { id: 6, text: t("Unique Reactions") },
        { id: 7, text: t("Animated Emoji Status") }
    ]

    return (
        <div className="premium-page">
            <nav>
                {/* <button onClick={() => navigate("/")} className="back-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg></button> */}
                <div className="left">
                    <h2>Telegram Premium</h2>
                </div>
            </nav>

            <div className="hero glass-card">
                <div className="bg-circle"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg>
                <h2 className="premium-gradient">Premium</h2>
                <p>{t("Exclusive features and doubled limits for power users.")}</p>
            </div>

            <div className="plans">
                <h3>{t("Choose a plan")}</h3>
                {plans.map((plan) => (
                    <label
                        key={plan.id}
                        className={`glass-card plan ${selected === plan.id ? "active" : ""}`}>
                        <input
                            type="radio"
                            value={plan.id}
                            checked={selected === plan.id}
                            onChange={() => setSelected(plan.id)}
                        />

                        <div className="contents">
                            <div className="content">
                                <div className="top">
                                    <h3>{plan.label}</h3>
                                    {plan.save && <span className="save">{plan.save}</span>}
                                </div>

                                <p className="per-month">{plan.perMonth} / {t("month")}</p>
                            </div>
                            <p className="price">UZS {plan.price}</p>
                        </div>
                    </label>
                ))}
            </div>

            <div className="features glass-card">
                <h3>
                    {t("Premium Features")}
                </h3>

                {features.map((feature) => (
                    <p key={feature.id}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(168 85 247)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-purple-500 shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                        {feature.text}
                    </p>
                ))}
            </div>
            
            <button className="subscribe-btn" onClick={() => navigate("/tranzaction")}>
                {t("Subscribe")}
            </button>

        </div>
    )
}
export default Premium;