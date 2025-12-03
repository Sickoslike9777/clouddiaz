'use client';

import { motion } from 'framer-motion';
import { User, Clock, CreditCard, LogOut, Settings, Play, Zap, Copy, Check, Gift, Users, Plus, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// Импорт модального окна
import PaymentModal from '@/components/features/PaymentModal';

export default function ProfilePage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0.00); // Баланс пользователя
  const referralCode = "DIAZ-PRO-2077";

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddBalance = (amount) => {
    setBalance(prev => prev + amount);
  };

  return (
    <main className="min-h-screen pt-28 pb-10 container mx-auto px-6">
      
      {/* Модальное окно оплаты */}
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddBalance={handleAddBalance}
      />

      {/* Заголовок */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4"
      >
        <div>
          <h1 className="text-4xl font-black text-white mb-2">ЛИЧНЫЙ КАБИНЕТ</h1>
          <p className="text-gray-400">Добро пожаловать, <span className="text-cyan-400 font-bold">Gamer_01</span></p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-400 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20 transition-all"
        >
          <LogOut size={18} /> Выйти
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* === ЛЕВАЯ КОЛОНКА === */}
        <motion.div 
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           className="space-y-6"
        >
          {/* 1. Карточка профиля и БАЛАНС */}
          <div className="bg-[#0f0f16] border border-white/10 rounded-3xl p-8 relative overflow-hidden group shadow-lg">
            <div className="absolute top-0 right-0 p-4">
               <Settings className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-purple-500 to-cyan-500 mb-4 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                 <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                    <img src="/images/hero/main.jpg" className="w-full h-full object-cover opacity-90" />
                 </div>
              </div>
              <h2 className="text-2xl font-bold text-white">Alex Diaz</h2>
              <span className="text-sm text-gray-500 mb-6">alex@clouddiaz.com</span>
              
              {/* БЛОК БАЛАНСА */}
              <div className="w-full bg-[#151520] rounded-2xl p-4 mb-4 border border-white/5 flex justify-between items-center">
                 <div className="text-left">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Баланс</p>
                    <p className="text-2xl font-black text-white">${balance.toFixed(2)}</p>
                 </div>
                 <button 
                   onClick={() => setIsModalOpen(true)}
                   className="bg-cyan-500 text-black p-3 rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                 >
                    <Plus size={24} />
                 </button>
              </div>

              <div className="w-full bg-white/5 rounded-xl p-4 flex justify-between items-center border border-white/5">
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Тариф</p>
                  <p className="text-lg font-bold text-purple-400 flex items-center gap-2 drop-shadow-md">
                    <Zap size={16} fill="currentColor" /> PRO GAMER
                  </p>
                </div>
                <Link href="/tariffs" className="text-xs bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 px-3 py-1.5 rounded transition-colors border border-purple-500/30">
                  Улучшить
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Блок Времени и Рефералки */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
             <div className="bg-[#0f0f16] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                   <Clock size={24} className="text-green-400" />
                   <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded">ACTIVE</span>
                </div>
                <div>
                   <p className="text-gray-400 text-xs mb-1">Осталось</p>
                   <h3 className="text-2xl font-black text-white">28 <span className="text-sm font-medium text-gray-500">дней</span></h3>
                </div>
             </div>

             <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-40 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-2">
                      <Gift size={18} className="text-cyan-400" />
                      <span className="text-xs font-bold text-cyan-400 uppercase">Бонус</span>
                   </div>
                   <div 
                     onClick={handleCopy}
                     className="bg-black/40 border border-white/10 rounded-xl p-2 flex items-center justify-between cursor-pointer mt-2"
                   >
                      <span className="font-mono font-bold text-xs text-white">{referralCode}</span>
                      {copied ? <Check size={14} className="text-green-500"/> : <Copy size={14} className="text-gray-400"/>}
                   </div>
                </div>
             </div>
          </div>
        </motion.div>


        {/* === ПРАВАЯ КОЛОНКА (Без изменений) === */}
        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
           className="lg:col-span-2"
        >
           <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
             <Play size={20} className="text-cyan-400" /> Недавно запущенные
           </h3>

           <div className="space-y-4">
             <div className="group bg-[#0f0f16]/80 backdrop-blur-md border border-white/5 hover:border-cyan-500/50 rounded-2xl p-4 flex items-center gap-5 transition-all hover:bg-[#151520] shadow-lg">
                <div className="w-32 h-20 rounded-xl overflow-hidden relative shadow-md">
                   <img src="/images/games/cyberpunk.jpg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex-1">
                   <h4 className="font-bold text-white text-xl mb-1">Cyberpunk 2077</h4>
                   <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={12}/> 12 ч 30 мин</span>
                      <span className="text-green-400">Онлайн</span>
                   </div>
                </div>
                <Link href="/play/1">
                  <button className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-cyan-400 transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">ИГРАТЬ</button>
                </Link>
             </div>

             <div className="group bg-[#0f0f16]/80 backdrop-blur-md border border-white/5 hover:border-purple-500/50 rounded-2xl p-4 flex items-center gap-5 transition-all hover:bg-[#151520] shadow-lg">
                <div className="w-32 h-20 rounded-xl overflow-hidden relative shadow-md">
                   <img src="/images/games/codmw3.jpg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex-1">
                   <h4 className="font-bold text-white text-xl mb-1">Call of Duty: MW3</h4>
                   <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={12}/> 5 ч 10 мин</span>
                   </div>
                </div>
                <Link href="/play/2">
                  <button className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-purple-400 transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">ИГРАТЬ</button>
                </Link>
             </div>

             <div className="group bg-[#0f0f16]/80 backdrop-blur-md border border-white/5 hover:border-green-500/50 rounded-2xl p-4 flex items-center gap-5 transition-all hover:bg-[#151520] shadow-lg">
                <div className="w-32 h-20 rounded-xl overflow-hidden relative shadow-md">
                   <img src="/images/games/FH5.jpg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex-1">
                   <h4 className="font-bold text-white text-xl mb-1">Forza Horizon 5</h4>
                   <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={12}/> 45 мин</span>
                   </div>
                </div>
                <Link href="/play/3">
                  <button className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-green-400 transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">ИГРАТЬ</button>
                </Link>
             </div>
           </div>
        </motion.div>

      </div>
    </main>
  );
}