'use client';

import { usePathname } from 'next/navigation';

export default function BackgroundManager() {
  const pathname = usePathname();

  // Проверяем: если мы в профиле или на входе -> показываем ВИДЕО
  const isVideoPage = pathname.startsWith('/profile') || pathname.startsWith('/login');

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      
      {isVideoPage ? (
        // === ВАРИАНТ 1: ВИДЕО (Только для Личного кабинета) ===
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        >
           <source src="/videos/bg.mp4" type="video/mp4" />
        </video>
      ) : (
        // === ВАРИАНТ 2: ФОТО (Для Главной, Игр, Тарифов, Lumen) ===
        <div className="absolute inset-0">
           {/* 👇 Используем картинку, которая УЖЕ ЕСТЬ у тебя в папке hero */}
           <img 
             src="/images/hero/main.jpg" 
             alt="Background" 
             className="w-full h-full object-cover"
           />
           {/* Сильное затемнение (85%), чтобы текст хорошо читался на фоне картинки */}
           <div className="absolute inset-0 bg-[#05050a]/85 backdrop-blur-[2px]"></div>
        </div>
      )}

      {/* === ОБЩИЙ СЛОЙ (Тонировка для видео) === */}
      {/* Если это видео-страница, добавляем легкое затемнение (30%) */}
      {isVideoPage && (
        <div className="absolute inset-0 bg-[#05050a]/30"></div>
      )}
      
      {/* Зернистость (Шум) для стиля */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
    </div>
  );
}