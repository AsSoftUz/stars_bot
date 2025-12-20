import './stars.scss'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import useTelegramBack from "../../hooks/useTelegramBack";
import starsImg from "../../assets/stars.webp";

const Stars = () => {

    useTelegramBack("/");
    const navigate = useNavigate();
    const [selected, setSelected] = useState("50");
    
    const options = [
        {
            value: "50",
            price: "USD 0.99"
        },
        {
            value: "100",
            price: "USD 2.99"
        },
        {
            value: "150",
            price: "USD 3.99"
        },
        {
            value: "200",
            price: "USD 4.99"
        },
        {
            value: "250",
            price: "USD 5.99"
        },
        {
            value: "300",
            price: "USD 6.99"
        },
    ]
    return (
        <div className="stars">
            <div className="title">
                <div className="">
                    <img src={starsImg} alt="" />
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg> */}
                </div>
                <h2 className='star-gradient'>Telegram Stars</h2>
            </div>
            
            <form className="plans">
                <h3>Choose a plan</h3>
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={`glass-card plan ${selected === option.value ? "active" : ""}`}>
                        <input
                            type="radio"
                            value={option.value}
                            checked={selected === option.value}
                            onChange={() => setSelected(option.value)}
                        />

                        <div className="contents">
                            <div className="content">
                                <div className="top">
                                    <h3>{option.value}</h3>
                                </div>

                                {/* <p className="per-month">{plan.perMonth}</p> */}
                            </div>
                            <p className="price">{option.price}</p>
                        </div>
                    </label>
                ))}
                <button type="submit" className="neon-glow buy-btn">
                    Buy Stars
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>
                </button>
            </form>
        </div>
    )
}
export default Stars;