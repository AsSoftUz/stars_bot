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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!amount) {
            alert("Summa topilmadi, iltimos qaytadan kiriting.");
            navigate("/topupbegin");
            return;
        }

        if (!file) {
            alert("Iltimos, chek rasmiga yuklang!");
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
            <div className="status-card success">
                <h2>✅ So'rov yuborildi!</h2>
                <button onClick={() => navigate("/")}>Asosiy sahifa</button>
            </div>
        );
    }

    return (
        <div className="topup">
            <form onSubmit={handleSubmit}>
                <p>To'lov summasi: <b>{amount} so'm</b></p>
                <img src={ccard} alt="card" width="100%" />
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