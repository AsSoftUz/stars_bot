import "./home.scss";
import { useEffect, useState } from "react";
import PremiumImg1 from "../../assets/premium.webp";
import PremiumImg from "../../assets/stars.webp";
import { useNavigate } from "react-router-dom";
import useGetOrCreateUser from "../../hooks/useGetOrCreateUser";
import Language from "../language/language";
import profileImg from "../../assets/profile.jpg";
import Loader from "../loader/loader";
import { useTranslation } from 'react-i18next';

const Home = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [tgUser, setTgUser] = useState(null);

  // Hookni chaqiramiz
  const { user, loading } = useGetOrCreateUser(tgUser);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.expand();
    const userData = tg.initDataUnsafe?.user;
    if (userData) {
      setTgUser(userData);
    }
  }, []);

  // 1-bosqich: Telegramdan ma'lumot kelishini kutish
//   if (!tgUser) {
//     return (
//       <div className="home-loading">
//         <h1>Saytni faqat Telegram orqali oching</h1>
//       </div>
//     );
//   }

  // 2-bosqich: API'dan ma'lumot kelishini kutish
  if (loading) {
    return (
      <Loader />
    );
  }

  // 3-bosqich: Agar xatolik tufayli user baribir kelmasa
//   if (!user) {
//     return <p>Ma'lumotlarni yuklashda xatolik yuz berdi.</p>;
//   }
  return (
    <div className="home">
      <div className="user-info">
        <div className="name">
          <img src={tgUser.photo_url || {profileImg}} alt="Profile" />
          <h1>
            {user.fullname}
            {user.username && <p>@{user.username}</p>}
          </h1>
        </div>
        <Language />
      </div>

      <div className="total-balance glass-card">
        <p>{t('totalBalance')}</p>
        {/* <h1>{user.balance || 0} UZS</h1> */}
        <h1>{Number(user.balance).toLocaleString('ru-RU').replace(/,/g, ' ')} UZS</h1>
        <button onClick={() => navigate("/topupbegin")} className="neon-glow">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>
          {t('topup')}
        </button>
      </div>

      <div className="additions">
        <button onClick={() => navigate("/stars")} className="history glass-card">
          <div className="addition-image">
            <img src={PremiumImg} alt="Stars" width="78" height="78" />
          </div>
          <h2>Stars</h2>
        </button>
        <button onClick={() => navigate("/premium")} className="premium glass-card">
          <div className="addition-image bg">
            <img src={PremiumImg1} alt="Premium" width="78" height="78" />
          </div>
          <h2>Premium</h2>
        </button>
      </div>

      {/* <div className="offers glass-card">
        <div className="offers-main">
          <div className="details">
            <span className="glass">New Arrival</span>
            <h3>Limited Edition Stars</h3>
            <p>Get +20% bonus today.</p>
          </div>
        </div>
        <button onClick={() => navigate("/stars")}>
          Check offers
        </button>
      </div> */}
    </div>
  );
};

export default Home;