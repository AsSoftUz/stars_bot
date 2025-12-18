import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTopup from "../../hooks/useTopup";
import "./topup.scss";

// topup.jsx
const Topup = () => {
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const { submitTopup, loading, error: apiError } = useTopup();
    
    const tg = window.Telegram.WebApp;
    const userData = tg.initDataUnsafe?.user;
    const user_id = userData?.id || 123456; // Test uchun default ID

    const handleChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        if (value === "") setError("");
        else if (+value < 1000) setError("Minimal summa 1000 so'm");
        else setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (+amount < 1000 || !file) return;

        try {
            await submitTopup({ user_id, amount, file });
            // Telegram orqali xabar berish yoki sahifani almashtirish
            tg.showAlert("To'lov cheki yuborildi! Tasdiqlanishini kuting.");
            navigate("/");
        } catch (err) {
            console.error("Xatolik:", err);
        }
    };

    return (
        <div className="topup">
            <nav>
                <button onClick={() => navigate("/")} className="back-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                </button>
                <div className="left"><h2>Hisobni to'ldirish</h2></div>
            </nav>

            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    placeholder="Miqdorni kiriting" 
                    value={amount} 
                    onChange={handleChange} 
                />
                <label className="amount-req">Min. 1000 so'm</label>
                
                {(error || apiError) && <p className="error">{error || apiError}</p>}

                <label className="custum-file-upload" htmlFor="file">
                    <div className="icon">
                        {/* SVG ikonkani shu yerda qoldiring */}
                    </div>
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

                <button type="submit" disabled={loading || !!error || !amount || !file}>
                    {loading ? "Yuborilmoqda..." : "Jo'natish"}
                </button>
            </form>
        </div>
    );
}