import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTelegramBack from "../../hooks/useTelegramBack";
import "./topup.scss";

const TopUpBegin = () => {
    useTelegramBack("/");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || +amount < 1000) {
            setError("Minimal summa 1000 so'm");
            return;
        }
        // DIQQAT: API'ga yubormaymiz, faqat keyingi sahifaga summani uzatamiz
        navigate("/topup", { state: { amount: amount } });
    };

    return (
        <div className="topup">
            <h2>Hisobni to'ldirish</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    placeholder="Miqdorni kiriting" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                />
                {error && <p className="error-msg">⚠️ {error}</p>}
                <button type="submit" className="submit-btn" disabled={!amount}>
                    Keyingi qadam
                </button>
            </form>
        </div>
    );
};
export default TopUpBegin;