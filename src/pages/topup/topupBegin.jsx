import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTelegramBack from "../../hooks/useTelegramBack";
import "./topup.scss";
import { useTranslation } from 'react-i18next';

const TopUpBegin = () => {
    useTelegramBack("/");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || +amount < 1000) {
            setError(t("amountError"));
            return;
        }
        // DIQQAT: API'ga yubormaymiz, faqat keyingi sahifaga summani uzatamiz
        navigate("/topup", { state: { amount: amount } });
    };

    return (
        <div className="topup">
            <h2>{t("topupBeginTitle")}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder={t("minimalAmountPlaceholder")}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                {error && <p className="error-msg">⚠️ {error}</p>}
                <button type="submit" className="submit-btn" disabled={!amount}>
                    {t("proceedToTopupButton")}
                </button>
            </form>
        </div>
    );
};
export default TopUpBegin;