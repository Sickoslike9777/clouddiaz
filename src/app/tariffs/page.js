'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap, Crown, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Подключаем глобальные данные

const plansData = [
  {
    id: 1,
    name: "START",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Попробовать мощь облака. Идеально для теста.",
    icon: <Clock className="w-6 h-6" />,
    features: [
      { text: "GTX 1080 Ti эквивалент", included: true },
      { text: "Разрешение 1080p", included: true },
      { text: "Сессии по 30 минут", included: true },
      { text: "RTX выключен", included: false },
    ],
    color: "from-blue-400 to-cyan-300",
    buttonColor: "border-cyan-400 text-cyan-400 hover:bg-cyan-400/10",
  },
  {
    id: 2,
    name: "PRO GAMER",
    priceMonthly: 9.99,
    priceYearly: 101.90, // Скидка ~15% (было бы 119.88)
    description: "Золотая середина. Играй без ограничений.",
    icon: <Zap className="w-6 h-6" />,
    features: [
      { text: "RTX 3070 Ti эквивалент", included: true },
      { text: "До 2K разрешения", included: true },
      { text: "Безлимитное время", included: true },
      { text: "RTX включен", included: true },
    ],
    highlight: true,
    color: "from-purple-600 to-pink-500",
    buttonColor: "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30",
  },
  {
    id: 3,
    name: "ULTRA 4K",
    priceMonthly: 19.99,
    priceYearly: 203.90, // Скидка ~15%
    description: "Максимальная графика. Твой RTX 4090 в облаке.",
    icon: <Crown className="w-6 h-6" />,
    features: [
      { text: "RTX 4090 (24GB VRAM)", included: true },
      { text: "4K 120 FPS / 8K Ready", included: true },
      { text: "Отдельный сервер", included: true },
      { text: "Запись геймплея", included: true },
    ],
    highlight: false,
    color: "from-yellow-400 to-orange-500",
    buttonColor: "border-yellow-400 text-yellow-400 hover:bg-yellow-400/10",
  },
];

export default function TariffsPage() {
  const { user, buySubscription } = useAuth();
  const router = useRouter();
  
  const [billingCycle, setBillingCycle] = useState('month'); // 'month' | 'year'
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (plan) => {
    // 1. Если не вошел — кидаем на вход
    if (!user) {
      router.push('/login');
      return;
    }

    // 2. Определяем цену
    const cost = billingCycle === 'month' ? plan.priceMonthly : plan.priceYearly;

    if (cost === 0) return; // Бесплатный тариф

    // 3. Пробуем купить
    const result = buySubscription(plan.name, cost, billingCycle);

    if (result.success) {
      setShowSuccess(true); // Показываем анимацию успеха
      setTimeout(() => {
        router.push('/profile'); // Через 2 сек в профиль
      }, 2500);
    } else {
      setError(`Недостаточно средств. Нужно $${cost}`);
      setTimeout(() => setError(''), 3000); // Убираем ошибку через 3 сек
    }
  };

  return (
    <main className="min-h-screen bg-[#05050a] text-white pt-28 pb-20 relative">
      
      {/* === АЛЕРТ ОШИБКИ (Если нет денег) === */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-500/90 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 backdrop-blur-md"
          >
            <AlertCircle /> {error} <Link href="/profile" className="underline font-bold ml-2">Пополнить</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === МОДАЛКА УСПЕХА === */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-[#0f0f16] p-8 rounded-3xl border border-green-500/30 text-center shadow-[0_0_50px_rgba(34,197,94,0.2)]"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Check size={40} className="text-black" />
              </div>
              <h2 className="text-3xl font-black text-white mb-2">СПАСИБО!</h2>
              <p className="text-gray-400">Подписка активирована.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-6">ВЫБЕРИ МОЩНОСТЬ</h1>
          
          {/* ПЕРЕКЛЮЧАТЕЛЬ МЕСЯЦ / ГОД */}
          <div className="inline-flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => setBillingCycle('month')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${billingCycle === 'month' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Ежемесячно
            </button>
            <button 
              onClick={() => setBillingCycle('year')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${billingCycle === 'year' ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              На год <span className="bg-white text-black text-[10px] px-1.5 rounded">-15%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plansData.map((plan) => (
            <div key={plan.id} className={`relative group rounded-3xl p-1 z-10 ${plan.highlight ? 'md:-mt-8 md:mb-8' : ''}`}>
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${plan.color} opacity-20 blur-sm group-hover:opacity-40 transition-opacity`}></div>
              <div className="relative h-full bg-[#0f0f16]/90 backdrop-blur-xl rounded-[22px] p-8 border border-white/5 flex flex-col">
                
                {plan.highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-b-lg shadow-lg">ХИТ</div>}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-200">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-black text-white">
                      {plan.priceMonthly === 0 ? "Free" : `$${billingCycle === 'month' ? plan.priceMonthly : (plan.priceYearly / 12).toFixed(2)}`}
                    </span>
                    <span className="text-sm text-gray-500">/ мес</span>
                  </div>
                  {billingCycle === 'year' && plan.priceYearly > 0 && (
                    <p className="text-xs text-green-400 mt-1">Оплата ${plan.priceYearly} в год</p>
                  )}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      {f.included ? <Check size={16} className="text-white mt-0.5" /> : <X size={16} className="text-gray-600 mt-0.5" />}
                      <span className={f.included ? "text-gray-300" : "text-gray-600"}>{f.text}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${plan.buttonColor}`}
                >
                  {plan.priceMonthly === 0 ? 'Попробовать' : (user ? 'Купить подписку' : 'Войти и купить')}
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}