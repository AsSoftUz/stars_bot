import { useLocation, useNavigate } from "react-router-dom";

const Topup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { amount } = location.state || {}; // Birinchi sahifadan kelgan summa
    
    const [file, setFile] = useState(null);
    const { submitTopup, loading, success, error: apiError } = useTopup();

    const tg = window.Telegram.WebApp;
    const user_id = tg.initDataUnsafe?.user?.id;

    // Agar foydalanuvchi to'g'ridan-to'g'ri shu sahifaga kirsa (summasiz)
    if (!amount) {
        return <button onClick={() => navigate("/topupbegin")}>Oldin summani kiriting</button>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        try {
            // Endi barcha ma'lumotlar bor: user_id, amount va file
            await submitTopup({ user_id, amount, file });
            tg.HapticFeedback.notificationOccurred('success');
        } catch (err) {
            tg.HapticFeedback.notificationOccurred('error');
        }
    };

    if (success) {
        return (
            <div className="status-card success">
                <h2>So'rov yuborildi!</h2>
                <button onClick={() => navigate("/")}>Bosh sahifa</button>
            </div>
        );
    }

    return (
        <div className="topup">
            <form onSubmit={handleSubmit}>
                <p>Tanlangan summa: <b>{amount} so'm</b></p>
                <img src={ccard} alt="card" width="100%" />
                
                <label className="custum-file-upload" htmlFor="file">
                    <span>{file ? file.name : "Chekni yuklash"}</span>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
                </label>

                <button type="submit" disabled={loading || !file} className="submit-btn">
                    {loading ? "Yuborilmoqda..." : "Tasdiqlash va jo'natish"}
                </button>
                {apiError && <p className="error">{apiError}</p>}
            </form>
        </div>
    );
};