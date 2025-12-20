import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTopup from "../../hooks/useTopup";
import useTelegramBack from "../../hooks/useTelegramBack";
import "./topup.scss";

const TopUpBegin = () => {
    useTelegramBack("/");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const { submitTopup, loading, success, error: apiError } = useTopup();

    const tg = window.Telegram.WebApp;
    const userData = tg.initDataUnsafe?.user;
    const user_id = userData?.id;

    // Success bo'lganda navigate qilishning eng to'g'ri yo'li
    useEffect(() => {
        if (success) {
            navigate("/topup");
        }
    }, [success, navigate]);

    const handleChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        if (value === "") setError("");
        else if (+value < 1000) setError("Minimal summa 1000 so'm");
        else setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user_id) {
            alert("Telegram ma'lumotlari yuklanmadi.");
            return;
        }
        if (+amount < 1000) return;

        try {
            // Birinchi qadamda faqat summani yuboramiz (yoki shunchaki navigate qilsangiz ham bo'ladi)
            await submitTopup({ user_id, amount });
            tg.HapticFeedback.notificationOccurred('success');
        } catch (err) {
            tg.HapticFeedback.notificationOccurred('error');
        }
    };

    return (
        <div className="topup">
            <nav>
                <div className="left">
                    <h2>Hisobni to'ldirish</h2>
                </div>
            </nav>

            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    placeholder="Miqdorni kiriting" 
                    value={amount} 
                    onChange={handleChange}
                    min={1000}
                />
                <label className="amount-req">
                    Min. 1000 so'm
                    {(error || apiError) && <p>⚠️ {error || apiError}</p>}
                </label>

                <button 
                    type="submit" 
                    className={`submit-btn ${loading ? 'loading' : ''}`}
                    disabled={loading || !!error || !amount} // !file olib tashlandi
                >
                    {loading ? "Yuborilmoqda..." : "Keyingi qadam"}
                </button>
            </form>
        </div>
    );
};

export default TopUpBegin;