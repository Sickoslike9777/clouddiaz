'use client';

import { motion } from 'framer-motion';
import { User, Clock, CreditCard, LogOut, Settings, Play, Zap, Copy, Check, Gift, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import PaymentModal from '@/components/features/PaymentModal';
// 👇 Импортируем ВСЕ нужные данные из контекста
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const router = useRouter();
  // 👇 Берем balance, addBalance, subscription из контекста
  const { user, logout, loading, balance, addBalance, subscription } = useAuth();
  
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const referralCode = user ? `DIAZ-${user.uid.substring(0, 6).toUpperCase()}` : "...";

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || !user) return null;

  return (
    <main className="min-h-screen pt-28 pb-10 container mx-auto px-6">
      
      {/* Передаем функцию addBalance из контекста в модалку */}
      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddBalance={addBalance} />

      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">ЛИЧНЫЙ КАБИНЕТ</h1>
          <p className="text-gray-400">ID: <span className="text-cyan-400 font-mono">{user.uid}</span></p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-400 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20 transition-all">
          <LogOut size={18} /> Выйти
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="bg-[#0f0f16] border border-white/10 rounded-3xl p-8 relative overflow-hidden group shadow-lg">
            <div className="absolute top-0 right-0 p-4"><Settings className="text-gray-500 hover:text-white cursor-pointer" /></div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-purple-500 to-cyan-500 mb-4">
                 <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                    <img src="/images/hero/main.jpg" className="w-full h-full object-cover opacity-90" />
                 </div>
              </div>
              <h2 className="text-2xl font-bold text-white">{user.email.split('@')[0]}</h2>
              <span className="text-sm text-gray-500 mb-6">{user.email}</span>
              
              {/* БЛОК БАЛАНСА (Глобальный) */}
              <div className="w-full bg-[#151520] rounded-2xl p-4 mb-4 border border-white/5 flex justify-between items-center">
                 <div className="text-left">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Баланс</p>
                    {/* 👇 Выводим глобальный баланс */}
                    <p className="text-2xl font-black text-white">${balance.toFixed(2)}</p>
                 </div>
                 <button onClick={() => setIsModalOpen(true)} className="bg-cyan-500 text-black p-3 rounded-xl hover:bg-cyan-400 transition-all"><Plus size={24} /></button>
              </div>

              {/* БЛОК ПОДПИСКИ (Глобальный) */}
              <div className="w-full bg-white/5 rounded-xl p-4 flex justify-between items-center border border-white/5">
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Тариф</p>
                  <p className="text-lg font-bold text-purple-400 flex items-center gap-2">
                    <Zap size={16} fill="currentColor" /> 
                    {/* 👇 Показываем купленную подписку или FREE */}
                    {subscription ? subscription.name : "FREE"}
                  </p>
                </div>
                <Link href="/tariffs" className="text-xs bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 px-3 py-1.5 rounded transition-colors">
                  {subscription ? "Продлить" : "Улучшить"}
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
             <div className="bg-[#0f0f16] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                   <Clock size={24} className={subscription ? "text-green-400" : "text-gray-600"} />
                   <span className={`text-[10px] px-2 py-1 rounded ${subscription ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                     {subscription ? "ACTIVE" : "INACTIVE"}
                   </span>
                </div>
                <div>
                   <p className="text-gray-400 text-xs mb-1">Осталось</p>
                   {/* 👇 Показываем дни из подписки */}
                   <h3 className="text-2xl font-black text-white">
                     {subscription ? subscription.expires : 0} <span className="text-sm font-medium text-gray-500">дней</span>
                   </h3>
                </div>
             </div>
             {/* Рефералка (без изменений) */}
             <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-40 relative overflow-hidden group">
                <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-2"><Gift size={18} className="text-cyan-400" /><span className="text-xs font-bold text-cyan-400 uppercase">Бонус</span></div>
                   <div onClick={handleCopy} className="bg-black/40 border border-white/10 rounded-xl p-2 flex items-center justify-between cursor-pointer mt-2"><span className="font-mono font-bold text-xs text-white truncate pr-2">{referralCode}</span>{copied ? <Check size={14} className="text-green-500"/> : <Copy size={14} className="text-gray-400"/>}</div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Правая колонка (Игры) */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
           <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Play size={20} className="text-cyan-400" /> Доступные игры</h3>
           {/* Если подписки нет — показываем замок, если есть — игры */}
           {!subscription ? (
             <div className="flex flex-col items-center justify-center h-64 bg-[#0f0f16] border border-white/5 rounded-3xl text-gray-500">
                <p>Подписка не активна</p>
                <Link href="/tariffs" className="text-cyan-400 mt-2 hover:underline">Купить доступ</Link>
             </div>
           ) : (
             <div className="space-y-4">
                {/* Здесь можно вернуть список игр, если подписка активна */}
                <p className="text-green-400">Доступ к играм открыт!</p>
             </div>
           )}
        </motion.div>

      </div>
    </main>
  );
}