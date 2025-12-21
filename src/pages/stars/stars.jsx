import './stars.scss'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import useTelegramBack from "../../hooks/useTelegramBack";
import starsImg from "../../assets/stars.webp";
import useStars from "../../hooks/useGetStars"; // Hookni import qilish

const Stars = () => {
    useTelegramBack("/");
    const navigate = useNavigate();
    
    // Hookdan ma'lumotlarni olamiz
    const { starsOptions, loading, error } = useStars();
    const [selected, setSelected] = useState(null);

    // Ma'lumotlar kelganda birinchi elementni avtomatik tanlangan qilish
    useEffect(() => {
        if (starsOptions.length > 0) {
            setSelected(starsOptions[0].id.toString());
        }
    }, [starsOptions]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedPlan = starsOptions.find(opt => opt.id.toString() === selected);
        console.log("Tanlangan plan:", selectedPlan);
        // Bu yerda to'lov logikasini chaqirasiz
    };

    if (loading) return <div className="loader">Yuklanmoqda...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="stars">
            <div className="title">
                <img src={starsImg} alt="Stars" />
                <h2 className='star-gradient'>Telegram Stars</h2>
            </div>
            
            <form className="plans" onSubmit={handleSubmit}>
                <h3>Choose a plan</h3>
                
                {starsOptions.map((option) => (
                    <label
                        key={option.id}
                        className={`glass-card plan ${selected === option.id.toString() ? "active" : ""}`}>
                        <input
                            type="radio"
                            name="star_plan"
                            value={option.id}
                            checked={selected === option.id.toString()}
                            onChange={() => setSelected(option.id.toString())}
                        />

                        <div className="contents">
                            <div className="content">
                                <div className="top">
                                    <h3>{option.stars_count}</h3>
                                    <span>Stars</span>
                                </div>
                            </div>
                            {/* Narxni formatlash (masalan so'mda yoki USD da) */}
                            <p className="price">{Number(option.price).toLocaleString()} UZS</p>
                        </div>
                    </label>
                ))}

                <button 
                    type="submit" 
                    className="neon-glow buy-btn" 
                    disabled={!selected}
                >
                    Buy Stars
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>
                </button>
            </form>
        </div>
    )
}

export default Stars;