'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
// 👇 ВАЖНО: Импортируем хук авторизации
import { useAuth } from '@/context/AuthContext'; 
import Button from '../ui/Button'; 
import { Gamepad2, CreditCard, User, Cpu, Trophy } from 'lucide-react'; 

const Navbar = () => {
  const pathname = usePathname();
  // 👇 Получаем настоящего пользователя из базы
  const { user } = useAuth(); 

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
      className="fixed top-0 left-0 right-0 z-50 bg-[#05050a]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Логотип */}
        <Link href="/" className="group flex items-center gap-2">
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

        {/* Меню */}
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

        {/* Правая часть */}
        <div className="flex items-center gap-4">
          
          {/* 👇 ЛОГИКА: Если user существует, показываем его почту */}
          {user ? (
            <Link href="/profile">
              <button className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 hover:text-cyan-400 transition-all border border-white/5">
                <div className="relative">
                   <User size={18} />
                   {/* Зеленая точка онлайн */}
                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </div>
                {/* Берем часть почты до собачки @ (например, sickoslikework) */}
                <span className="max-w-[100px] truncate">
                  {user.email ? user.email.split('@')[0] : 'User'}
                </span>
              </button>
            </Link>
          ) : (
            // Иначе показываем кнопку Войти
            <Link href="/login">
              <button className="hidden sm:flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                <User size={20} />
                <span>ВОЙТИ</span>
              </button>
            </Link>
          )}
          
          <Link href="/tariffs" className="hidden sm:block">
            <Button variant="primary" size="sm">
               ПОПРОБОВАТЬ БЕСПЛАТНО
            </Button>
          </Link>
        </div>

      </div>
    </motion.header>
  );
};

export default Navbar;