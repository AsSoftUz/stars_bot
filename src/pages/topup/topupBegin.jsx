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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (+amount < 1000) {
            setError("Minimal summa 1000 so'm");
            return;
        }
        // Summani state orqali keyingi sahifaga uzatamiz
        navigate("/topup", { state: { amount } }); 
    };

    return (
        <div className="topup">
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    placeholder="Miqdorni kiriting" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                />
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type="submit" className="submit-btn" disabled={!amount}>
                    Keyingi qadam (Rasm yuklash)
                </button>
            </form>
        </div>
    );
};

export default TopUpBegin;