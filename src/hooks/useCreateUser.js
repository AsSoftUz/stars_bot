// src/hooks/useCreateUser.js

import { useState, useCallback } from 'react';
import axios from 'axios';

// .env faylidan asosiy API URL'ini olish
// Masalan: VITE_API_BASE_URL=http://localhost:8000
const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Yangi foydalanuvchini yaratish uchun custom hook.
 *
 * @returns {object} createUser funksiyasi, yuklanish holati, xato va ma'lumotlar.
 */
export const useCreateUser = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Foydalanuvchi ma'lumotlarini qabul qilib, API'ga POST so'rovini yuboradi.
   * @param {object} userData - Yangi foydalanuvchi ma'lumotlari.
   * @param {string} userData.user_id - Foydalanuvchining unikal ID'si (katta butun son).
   * @param {string} userData.fullname - To'liq ismi.
   * @param {string} userData.phone - Telefon raqami.
   * @param {string} userData.username - Foydalanuvchi nomi.
   */
  const createUser = useCallback(async (userData) => {
    // Ma'lumotlar to'g'ri kelishini tekshirish
    if (!userData || !API_BASE_URL) {
      document.writeln(API_BASE_URL)
      setError({API_BASE_URL});
      return;
    }

    // So'rov uchun to'g'ri formatdagi ma'lumotlar
    const payload = {
      user_id: String(userData.user_id), // IDni stringga o'tkazish tavsiya etiladi, ayniqsa 64-bitli butun sonlar uchun
      fullname: userData.fullname,
      phone: userData.phone,
      username: userData.username,
    };

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const url = `${API_BASE_URL}/auth/users/`;
      console.log("API ga yuborilayotgan URL:", url); // <<< Shu qatorni qo'shing!

      const response = await axios.post(url, payload);  

      setData(response.data); // API'dan kelgan javobni saqlash
      console.log("Foydalanuvchi yaratildi:", response.data);

    } catch (err) {
      // Xatolarni aniqroq boshqarish
      if (axios.isAxiosError(err)) {
        // Axios xatosi: server javobi yoki tarmoq xatosi
        setError(err.response?.data || { message: err.message, status: err.response?.status });
      } else {
        // Boshqa xato
        setError({ message: 'Noma’lum xato yuz berdi.' });
      }
      console.error("Foydalanuvchini yaratishda xato:", err);
    } finally {
      setLoading(false);
    }
  }, []); // Dependensiyalar yo'q

  return { createUser, data, error, loading };
};