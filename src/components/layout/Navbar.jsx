'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; 
import Button from '../ui/Button'; 
// 👇 Добавили Menu (3 полоски) и X (крестик)
import { Gamepad2, CreditCard, User, Cpu, Trophy, Menu, X, LogIn } from 'lucide-react'; 

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useAuth(); 
  
  // 👇 Состояние для мобильного меню (открыто/закрыто)
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Закрываем мобильное меню, если перешли на другую страницу
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Игры', href: '/games', icon: <Gamepad2 size={18} /> },
    { name: 'Турниры', href: '/tournaments', icon: <Trophy size={18} /> },
    { name: 'Тарифы', href: '/tariffs', icon: <CreditCard size={18} /> },
    { name: 'Lumen PC', href: '/lumen', icon: <Cpu size={18} /> }, 
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      // z-50 чтобы меню было поверх всего
      className="fixed top-0 left-0 right-0 z-50 bg-[#05050a]/90 backdrop-blur-xl border-b border-white/5"
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        
        {/* --- ЛОГОТИП --- */}
        <Link href="/" className="group flex items-center gap-2 relative z-50">
           <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <span className="font-black text-white text-xl">CD</span>
           </div>
           <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider text-white leading-none">
                CLOUD <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">DIAZ</span>
              </span>
              <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase group-hover:text-cyan-400 transition-colors">
                Cloud Gaming
              </span>
           </div>
        </Link>

        {/* --- ДЕСКТОПНОЕ МЕНЮ (Скрыто на мобильных) --- */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="group flex items-center gap-2 text-sm font-bold text-gray-400 transition-all duration-300 hover:text-white uppercase tracking-wide"
            >
              <span className="text-gray-600 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300">
                {link.icon}
              </span>
              <span className="group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {link.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* --- ПРАВАЯ ЧАСТЬ --- */}
        <div className="flex items-center gap-4 relative z-50">
          
          {/* Профиль / Вход (Видно всегда) */}
          {user ? (
            <Link href="/profile">
              <button className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 px-3 py-2 md:px-4 md:py-2 rounded-full hover:bg-white/20 hover:text-cyan-400 transition-all border border-white/5">
                <div className="relative">
                   <User size={18} />
                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </div>
                {/* На мобильном скрываем ник, оставляем только иконку */}
                <span className="max-w-[100px] truncate hidden sm:block">
                  {user.email ? user.email.split('@')[0] : 'User'}
                </span>
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                <User size={20} />
                <span className="hidden sm:block">ВОЙТИ</span>
              </button>
            </Link>
          )}
          
          {/* Кнопка "Попробовать" (Скрыта на мобильных, чтобы не занимать место) */}
          <Link href="/tariffs" className="hidden lg:block">
            <Button variant="primary" size="sm">
               ПОПРОБОВАТЬ БЕСПЛАТНО
            </Button>
          </Link>

          {/* 👇 КНОПКА ГАМБУРГЕР (Только на мобильных) */}
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors"
          >
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* === 🔥 МОБИЛЬНОЕ ВЫПАДАЮЩЕЕ МЕНЮ 🔥 === */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#0a0a12]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="flex items-center gap-4 text-lg font-bold text-gray-300 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all"
                >
                  <span className="text-cyan-400">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
              
              {/* Доп кнопка в меню для мобильных */}
              <div className="pt-4 border-t border-white/10">
                <Link href="/tariffs" className="block">
                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl font-bold text-white shadow-lg">
                    ПОПРОБОВАТЬ БЕСПЛАТНО
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
};

export default Navbar;