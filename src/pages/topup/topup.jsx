import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useTopup from "../../hooks/useTopup";
import tick from "../../assets/tick.gif";
import "./topup.scss";
import ccard from "../../assets/card.jpg";
import useTelegramBack from "../../hooks/useTelegramBack";
import { useTranslation } from 'react-i18next';
import Loader from "../loader/loader";

const Topup = () => {
    useTelegramBack("/topupbegin");
    const location = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { amount } = location.state || {};

    const [file, setFile] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [fileError, setFileError] = useState("");
    
    const { submitTopup, loading, success, error: apiError } = useTopup();

    const tg = window.Telegram.WebApp;
    const user_id = tg.initDataUnsafe?.user?.id;

    // Nusxalash funksiyasi
    const handleCopy = (e, text) => {
        e.preventDefault();
        navigator.clipboard.writeText(text.replace(/\s/g, ''))
            .then(() => {
                setCopySuccess(true);
                tg.HapticFeedback.impactOccurred('light');
                setTimeout(() => setCopySuccess(false), 2000);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFileError("");

        if (!amount) {
            navigate("/topupbegin");
            return;
        }

        if (!file) {
            setFileError(t("fileError"));
            tg.HapticFeedback.notificationOccurred('error');
            return;
        }

        try {
            await submitTopup({ user_id, amount, file });
            tg.HapticFeedback.notificationOccurred('success');
        } catch (err) {
            tg.HapticFeedback.notificationOccurred('error');
        }
    };

    if (success) {
        return (
            <div className="topup-status-container">
                <div className="status-card success">
                    <div className="status-icon">
                        <img src={tick} alt="" width="56px" />
                    </div>
                    <h2>{t("submittedTitle")}</h2>
                    <p>{t("submittedMessage")}</p>
                    <button onClick={() => navigate("/")} className="submit-btn">
                        {t("backToHomeButton")}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="topup">
            {loading && (
                <Loader />
            )}
            <form onSubmit={handleSubmit}>
                <p>{t("topupAmount")}: <b>{amount} {t("currency")}</b></p>
                
                <div className="card-wrapper">
                    <img src={ccard} alt="card" width="100%" />
                    
                    {/* Nusxalash tugmasi */}
                    <button 
                        type="button"
                        className="ccardBtn" 
                        onClick={(e) => handleCopy(e, "9860 1766 1880 7588")}
                    >
                        <span className="text">9860 1766 1880 7588</span>
                        <span className="svgIcon">
                            <svg fill="white" viewBox="0 0 384 512" height="1em"><path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path></svg>
                        </span>
                        
                        {/* Nusxalandi Tooltip */}
                        {copySuccess && <div className="copy-tooltip">{t("copied")}</div>}
                    </button>
                </div>

                <p className="instruction-text">{t("instructionText")}</p>

                <label className="custum-file-upload" htmlFor="file">
                    <div className="text">
                        <span>{file ? file.name : t("uploadReceipt")}</span>
                    </div>
                    <input 
                        type="file" 
                        id="file" 
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                            setFileError("");
                        }} 
                        accept="image/*" 
                    />
                </label>

                {/* Xatolik xabarlari (Tugmaning tepasida) */}
                {(fileError || apiError) && (
                    <p className="warning-text">
                        ⚠️ {fileError || apiError}
                    </p>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? t("submitting") : t("submitted")}
                </button>
            </form>
        </div>
    );
};

export default Topup;