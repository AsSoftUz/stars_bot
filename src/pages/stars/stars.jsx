import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useTelegramBack from "../../hooks/useTelegramBack";
import useGetStars from "../../hooks/useGetStars";
import useBuyStars from "../../hooks/useBuyStars"; 
import starsImg from "../../assets/stars.webp";
import './stars.scss';

const Stars = () => {
    useTelegramBack("/");
    const navigate = useNavigate();
    
    // Telegram WebApp obyektidan foydalanamiz
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe?.user;

    const { starsOptions, loading: fetchLoading, error: fetchError } = useGetStars();
    const { buyStars, loading: buyLoading, error: buyError } = useBuyStars();
    
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (starsOptions?.length > 0) {
            setSelected(starsOptions[0].id.toString());
        }
    }, [starsOptions]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const selectedPlan = starsOptions.find(opt => opt.id.toString() === selected);

        if (!user?.id) {
            alert("Telegram ma'lumotlarini yuklab bo'lmadi!");
            return;
        }

        if (selectedPlan) {
            // Siz so'ragan aniq formatdagi payload
            const payload = {
                user_id: user.id, // 6937643642
                username: user.username ? `@${user.username}` : "no_username", // @Coder_Abdullayev
                amount: selectedPlan.stars_count // 51
            };

            try {
                await buyStars(payload);
                tg.HapticFeedback.notificationOccurred('success');
                
                // Muvaffaqiyatli bo'lsa, xabar ko'rsatib ortga qaytarish
                alert("Yulduzlar uchun so'rov qabul qilindi!");
                navigate("/"); 
            } catch (err) {
                tg.HapticFeedback.notificationOccurred('error');
                console.error("Xatolik:", err);
            }
        }
    };

    if (fetchLoading) return <div className="loader">Yuklanmoqda...</div>;

    return (
        <div className="stars">
            <div className="title">
                <img src={starsImg} alt="Stars" />
                <h2 className='star-gradient'>Telegram Stars</h2>
            </div>
            
            <form className="plans" onSubmit={handleSubmit}>
                <h3>Plan tanlang</h3>
                
                {starsOptions.map((option) => (
                    <label
                        key={option.id}
                        className={`glass-card plan ${selected === option.id.toString() ? "active" : ""}`}
                    >
                        <input
                            type="radio"
                            name="star_plan"
                            value={option.id}
                            checked={selected === option.id.toString()}
                            onChange={() => setSelected(option.id.toString())}
                            style={{ display: 'none' }}
                        />

                        <div className="contents">
                            <div className="content">
                                <div className="top">
                                    <h3>{option.stars_count}</h3>
                                    <span>Yulduz</span>
                                </div>
                            </div>
                            <p className="price">
                                {Number(option.price).toLocaleString()} UZS
                            </p>
                        </div>
                    </label>
                ))}

                {/* API xatolarini ko'rsatish (tugmaning tepasida) */}
                {(fetchError || buyError) && (
                    <p className="warning-text">⚠️ {fetchError || buyError}</p>
                )}

                <button 
                    type="submit" 
                    className={`neon-glow buy-btn ${buyLoading ? 'loading' : ''}`} 
                    disabled={!selected || buyLoading}
                >
                    {buyLoading ? "Yuborilmoqda..." : "Sotib olish"}
                    {!buyLoading && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                            <path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle>
                        </svg>
                    )}
                </button>
            </form>
        </div>
    );
};

export default Stars;