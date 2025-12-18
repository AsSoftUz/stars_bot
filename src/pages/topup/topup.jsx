import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTopup from "../../hooks/useTopup";
import "./topup.scss";

const Topup = () => {
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    // Hook ichidan success va errorni olamiz
    const { submitTopup, loading, success, error: apiError } = useTopup();

    const tg = window.Telegram.WebApp;
    const userData = tg.initDataUnsafe?.user;
    const user_id = userData?.id;

    const handleChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        if (value === "") setError("");
        else if (+value < 1000) setError("Minimal summa 1000 so'm");
        else setError("");
    };

    const sendAdminNotification = async (data) => {
        const BOT_TOKEN = "8414493373:AAEPaBCmZb35vBZCCRSDlH8Pv-fHG-ZuG8A";
        const ADMIN_ID = "8244991353"; // Bu yerga o'zingizning chat ID'ngizni yozing

        const message = `
🔔 **Yangi To'lov So'rovi!**
👤 **Foydalanuvchi ID:** ${data.user_id}
💰 **Summa:** ${data.amount} so'm
📄 **Holat:** Chek yuborildi.
    `;

        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: ADMIN_ID,
                    text: message,
                    parse_mode: "Markdown",
                }),
            });
        } catch (err) {
            console.error("Adminga xabar yuborishda xatolik:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user_id) {
            alert("Telegram ma'lumotlari yuklanmadi. Iltimos, ilovani qayta ishga tushiring.");
            return;
        }
        if (+amount < 1000 || !file) return;

        try {
            // 1. Backendga yuboramiz
            await submitTopup({ user_id, amount, file });

            // 2. Adminga xabar yuboramiz
            await sendAdminNotification({ user_id, amount });

            // 3. Foydalanuvchiga muvaffaqiyat bildirishnomasi
            tg.HapticFeedback.notificationOccurred('success');
        } catch (err) {
            tg.HapticFeedback.notificationOccurred('error');
            console.error("Xatolik yuz berdi");
        }
    };

    if (success) {
        return (
            <div className="topup-status-container">
                <div className="status-card success">
                    <div className="status-icon">✅</div>
                    <h2>So'rov yuborildi!</h2>
                    <p>To'lovingiz tekshirilmoqda. Tez orada hisobingizga tushadi.</p>
                    <button onClick={() => navigate("/")} className="back-home-btn">
                        Asosiy sahifaga qaytish
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="topup">
            <nav>
                <button onClick={() => navigate("/")} className="back-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                </button>
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
                />
                <label className="amount-req">Min. 1000 so'm</label>

                {/* 2. Xatolik xabarlarini ko'rsatish */}
                {(error || apiError) && (
                    <div className="error-message">
                        ⚠️ {error || apiError}
                    </div>
                )}

                <label className="custum-file-upload" htmlFor="file">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                    <div className="text">
                        <span>{file ? file.name : "Chekni yuklash"}</span>
                    </div>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
                </label>

                <button
                    type="submit"
                    className={`submit-btn ${loading ? 'loading' : ''}`}
                    disabled={loading || !!error || !amount || !file}
                >
                    {loading ? "Yuborilmoqda..." : "Jo'natish"}
                </button>
            </form>
        </div>
    );
};

export default Topup;