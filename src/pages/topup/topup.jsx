import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation qo'shildi
import useTopup from "../../hooks/useTopup";
import "./topup.scss";
import ccard from "../../assets/card.jpg";

const Topup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { amount } = location.state || {}; // Birinchi sahifadan kelgan summa

    const [file, setFile] = useState(null);
    const { submitTopup, loading, success, error: apiError } = useTopup();

    const tg = window.Telegram.WebApp;
    const user_id = tg.initDataUnsafe?.user?.id;

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        .then(() => {
            alert("Nusxalandi: " + text);
        })
        .catch(err => {
            console.error("Xatolik:", err);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!amount) {
            alert("Summa topilmadi, iltimos qaytadan kiriting.");
            navigate("/topupbegin");
            return;
        }

        if (!file) {
            // alert("Iltimos, chek rasmiga yuklang!");
            return;
        }

        try {
            // Endi user_id, amount va file barchasi API'ga bitta FormData'da ketadi
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
                    <div className="status-icon">✅</div>
                    <h2>So'rov yuborildi!</h2>
                    <p>To'lovingiz tekshirilmoqda. Admin tasdiqlagandan so'ng hisobingizga qo'shiladi.</p>
                    <button onClick={() => navigate("/")} className="submit-btn">
                        Asosiy sahifaga qaytish
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="topup">
            <form onSubmit={handleSubmit}>
                <p>To'lov summasi: <b>{amount} so'm</b></p>
                <img src={ccard} alt="card" width="100%" />
                <button className="ccardBtn" onClick={() => handleCopy("9860 1766 1880 7588")}>
                    <span className="text">9860 1766 1880 7588</span>
                    <span className="svgIcon">
                        <svg fill="white" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path></svg>
                    </span>
                </button>
                <label className="custum-file-upload" htmlFor="file">
                    <div className="text">
                        <span>{file ? file.name : "Chekni yuklash"}</span>
                    </div>
                    <input 
                        type="file" 
                        id="file" 
                        onChange={(e) => setFile(e.target.files[0])} 
                        accept="image/*" 
                    />
                </label>

                <button type="submit" className="submit-btn" disabled={loading || !file}>
                    {loading ? "Yuborilmoqda..." : "Tasdiqlash va jo'natish"}
                </button>
                {apiError && <p className="error-msg">⚠️ {apiError}</p>}
            </form>
        </div>
    );
};
export default Topup;