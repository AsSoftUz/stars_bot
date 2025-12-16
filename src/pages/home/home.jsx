import "./home.css";
// import img from "../../assets/profile.jpg"; // Bu o'zgaruvchi endi ishlatilmayapti
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreateUser } from '../../hooks/useCreateUser'; // <<< Custom Hook import qilindi!

// Telegram initDataUnsafe obyektidagi user ma'lumotlarining turi
// user_id juda katta bo'lishi mumkinligini eslatib qo'ying
// Telegram user obyekti fieldlari: id, first_name, username, photo_url, language_code, is_premium, ...
/**
 * @typedef {object} TelegramUser
 * @property {number} id - Foydalanuvchi ID'si (katta butun son)
 * @property {string} first_name
 * @property {string} [username]
 * @property {string} [photo_url]
 * @property {boolean} [is_premium]
 */


const Home = () => {
    const navigate = useNavigate();
    /** @type {[TelegramUser | null, import("react").Dispatch<import("react").SetStateAction<TelegramUser | null>>]} */
    const [user, setUser] = useState(null);
    
    // Foydalanuvchining APIga yaratilganligini kuzatish uchun holat
    const [isUserCreated, setIsUserCreated] = useState(false); 
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    console.log("jfldsjkf", API_BASE_URL);
    
    // Custom hookni chaqirish
    const { 
        createUser, 
        data: apiResponseData, // API'dan muvaffaqiyatli kelgan ma'lumot
        error: apiError,       // API so'rovida yuz bergan xato
        loading: apiLoading    // API so'rovi yuklanish holati
    } = useCreateUser();

    // 1. Telegram WebApp ma'lumotlarini olish va API'ga yuborish
    useEffect(() => {
        const tg = window.Telegram.WebApp;
        tg.expand(); // ekranni to'liq qiladi

        /** @type {TelegramUser | undefined} */
        const userData = tg.initDataUnsafe?.user;

        if (userData) {
            setUser(userData);
            
            // Agar foydalanuvchi ma'lumotlari mavjud bo'lsa va hali APIga yuborilmagan bo'lsa
            if (!isUserCreated) {
                console.log("Telegram foydalanuvchisini APIga yuborishga tayyorlanmoqda:", userData.id);

                // API'ga yuboriladigan ma'lumotlarni tayyorlash
                const userPayload = {
                    user_id: userData.id, // Katta butun son (BigInt) bo'lishi mumkin
                    fullname: `${userData.first_name}${userData.last_name ? ' ' + userData.last_name : ''}`,
                    phone: '', // Telegram Mini App odatda telefon raqamini to'g'ridan-to'g'ri bermaydi
                    username: userData.username || `id_${userData.id}`,
                };

                // Custom hook funksiyasini chaqirish
                createUser(userPayload).then(() => {
                    // Muvaffaqiyatli so'rovdan keyin holatni yangilash
                    setIsUserCreated(true);
                }).catch(() => {
                    // Xato yuz bersa ham isUserCreated ni true qilib qo'yish
                    // keyingi yuklanishda qayta urinmaslik uchun (yoki o'zgartirishingiz mumkin)
                    setIsUserCreated(true); 
                });
            }
        }
    }, [isUserCreated, createUser]); // createUser useCallback ichida bo'lgani uchun dependensiya sifatida ishlatish xavfsiz

    // 2. Render qismi
    return (
        <div className="home">
            {/* Foydalanuvchi ma'lumotlari bloki */}
            {user ? (
                <div className="user-info">
                    <div className="name">
                        <img 
                            src={user.photo_url || 'default-profile-icon.png'} // Agar Telegram rasm bermasa, default rasm
                            alt="Profile picture" 
                        />
                        <h1>
                            {user.first_name}
                            <p>@{user.username || 'username_not_set'}</p>
                        </h1>
                    </div>
                </div>
            ) : (
                <h1>Saytni faqat Telegram orqali oching.</h1>
            )}

            {/* API Holati */}
            <div className="api-status">
                {apiLoading && <p style={{ color: 'yellow' }}>✅ Foydalanuvchi ma'lumotlari jo'natilmoqda...</p>}
                {apiError && <p style={{ color: 'red' }}>❌ Xato yuz berdi: {(apiError.message || apiError)}</p>}
                {apiResponseData && !apiError && !apiLoading && (
                    <p style={{ color: 'lime' }}>✅ Foydalanuvchi API'da muvaffaqiyatli yaratildi!</p>
                )}
            </div>

            {/* Qolgan UI elementlari */}
            <div className="total-balance glass-card">
                <p>Total balance</p>
                <h1>
                    100,000 UZS
                </h1>
                <button onClick={() => navigate("/stars")} className="neon-glow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>
                    Top up balance
                </button>
            </div>
            
            <div className="additions">
                <button onClick={() => navigate("/premium")} className="premium glass-card">
                    <div className="addition-image bg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-crown text-white" aria-hidden="true"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg></div>
                    <h3>Premium</h3>
                    <p>Unlock exclusive features</p>
                </button>
                <button onClick={() => navigate("/stars")} className="history glass-card">
                    <div className="addition-image"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag text-cyan-400" aria-hidden="true"><path d="M16 10a4 4 0 0 1-8 0"></path><path d="M3.103 6.034h17.794"></path><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"></path></svg></div>
                    <h3>Stars</h3>
                    <p>Get stars</p>
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