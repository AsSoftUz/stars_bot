import { useState, useCallback } from 'react';

// Environmentga mos keladigan API URL ni olish (CRA uchun)
const API_URL = import.meta.env.API;

/**
 * Telegram foydalanuvchi ma'lumotlarini serverga POST orqali yuboruvchi custom hook.
 * * @returns {{ registerUser: (userData: Object) => Promise<void>, loading: boolean, error: string | null }}
 */
function useRegisterUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Bu funksiya komponent ichida chaqiriladigan asosiy funksiya
  const registerUser = useCallback(async (telegramUser) => {
    if (!API_URL) {
      setError("Konfiguratsiya xatosi: Auth API URL topilmadi.");
      return;
    }
    
    // 1. Swagger talab qilgan formatga ma'lumotlarni moslashtirish
    // Eslatma: 'balance' uchun boshlang'ich qiymat 0 berilgan
    const requestBody = {
      user_id: telegramUser.id,
      fullname: `${telegramUser.first_name || ''} ${telegramUser.last_name || ''}`.trim(),
      phone: telegramUser.phone || '', // Agar Telegram WebApp phone o'tkazmasa, bo'sh satr
      username: telegramUser.username || '', // Agar username bo'lmasa, bo'sh satr
      balance: 0, // Boshlang'ich balans 0 ga sozlandi
    };

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Agar server auth uchun initData xashini talab qilsa, uni ham shu yerga qo'shish kerak.
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        // Server tomonidan kelgan xatolarni JSON formatida o'qishga harakat qilish
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || `Server xatosi: ${response.status}`);
      }
      
      // Ro'yxatdan o'tish muvaffaqiyatli: (Serverdan keladigan javobni qaytarish mumkin)
      const successData = await response.json();
      console.log("Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi:", successData);
      
      return successData;

    } catch (err) {
      console.error("Ro'yxatdan o'tkazish xatosi:", err);
      setError(err.message);
      throw err; // Komponentda ushlash uchun xatoni qayta tashlash

    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  return { registerUser, loading, error };
}

export default useRegisterUser;