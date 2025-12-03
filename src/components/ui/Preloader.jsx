'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Блокируем скролл, пока идет загрузка
    document.body.style.overflow = 'hidden';

    // 2. Логика прогресс-бара
    const totalTime = 2500; // 2.5 секунды
    const intervalTime = 30;
    
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Случайный шаг для эффекта "живой" загрузки
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, intervalTime);

    // 3. Отключение прелоадера
    const timeout = setTimeout(() => {
      setIsLoading(false);
      // Возвращаем скролл
      document.body.style.overflow = 'auto';
    }, totalTime);

    // Очистка при размонтировании (на всякий случай)
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader" // 👈 ВАЖНО: Этот ключ исправляет ошибку removeChild
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05050a]"
        >
          {/* ФОНОВЫЕ ЭФФЕКТЫ */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>

          {/* КОНТЕНТ */}
          <div className="relative z-10 flex flex-col items-center w-64">
            
            {/* Логотип / Спиннер */}
            <div className="relative w-24 h-24 mb-8">
               {/* Вращающиеся кольца */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-4 border-transparent border-t-cyan-500 border-l-cyan-500 rounded-full"
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-2 border-4 border-transparent border-b-purple-500 border-r-purple-500 rounded-full"
               />
               
               {/* Центр */}
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-xl font-black text-white tracking-tighter">CD</span>
               </div>
            </div>

            {/* Текст статуса */}
            <div className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-2 animate-pulse">
              System Initializing...
            </div>

            {/* Проценты */}
            <div className="text-4xl font-black text-white mb-4 tabular-nums">
              {Math.round(progress)}%
            </div>

            {/* Прогресс бар (Полоска) */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}