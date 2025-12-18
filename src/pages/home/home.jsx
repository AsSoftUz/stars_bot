import "./home.scss";
import PremiumImg1 from "../../assets/premium.jpg";
import PremiumImg from "../../assets/stars.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useGetOrCreateUser from "../../hooks/useGetOrCreateUser";

const Home = () => {
  const navigate = useNavigate();
  const [tgUser, setTgUser] = useState(null);

  const { user, loading } = useGetOrCreateUser(tgUser);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.expand();

    const userData = tg.initDataUnsafe?.user;
    if (userData) setTgUser(userData);
  }, []);

  if (!tgUser) return <h1>Saytni faqat Telegram orqali oching</h1>;
  if (loading || !user) return <p>Loading...</p>;

    return (
        <div className="home">
            {tgUser ? (
                <div className="user-info">
                    <div className="name">
                        <img src={tgUser.photo_url} alt="Profile picture" />
                        <h1>
                            {user.fullname}
                            {user.username && <p>@{user.username}</p>}
                        </h1>
                    </div>
                </div>
            ) : (
                <h1>Saytni faqat Telegram orqali oching.</h1>
            )}
            <div className="total-balance glass-card">
                <p>Total balance</p>
                <h1>
                    {user.balance} UZS
                </h1>
                <button onClick={() => navigate("/topup")} className="neon-glow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>
                    Top up balance
                </button>
            </div>
            <div className="additions">
                <button onClick={() => navigate("/stars")} className="history glass-card">
                    <div className="addition-image">
                        <img src={PremiumImg} alt="" width="42" height="42" />
                    </div>
                    <h3>Stars</h3>
                    <p>Get stars</p>
                </button>
                <button onClick={() => navigate("/premium")} className="premium glass-card">
                    <div className="addition-image bg">
                        <img src={PremiumImg1} alt="" width="38" height="38" />
                    </div>
                    <h3>Premium</h3>
                    <p>Unlock exclusive features</p>
                </button>
            </div>
            <div className="offers glass-card">
                <div className="offers-main">
                    <div className="details">
                        <span className="glass">New Arrival</span>
                        <h3>Limited Edition Stars</h3>
                        <p>Get +20% bonus on your first purchase <br /> today.</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#fde047" stroke="rgb(253 224 71)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-yellow-300 fill-yellow-300 drop-shadow-lg rotate-12" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                </div>
                <button onClick={() => navigate("/stars")}>
                    Check offers
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-gray-400" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
                </button>
            </div>
        </div>
    )
}
export default Home;