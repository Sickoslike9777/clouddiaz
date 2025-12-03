'use client';

import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, Clock } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    id: 1,
    name: "START",
    price: "Free",
    period: "/ 30 min",
    description: "Попробовать мощь облака. Идеально для теста.",
    icon: <Clock className="w-6 h-6" />,
    features: [
      { text: "GTX 1080 Ti эквивалент", included: true },
      { text: "Разрешение 1080p", included: true },
      { text: "Сессии по 30 минут", included: true },
      { text: "RTX выключен", included: false },
      { text: "Есть очереди", included: false },
    ],
    highlight: false,
    color: "from-blue-400 to-cyan-300",
    buttonColor: "border-cyan-400 text-cyan-400 hover:bg-cyan-400/10",
  },
  {
    id: 2,
    name: "PRO GAMER",
    price: "$9.99",
    period: "/ месяц",
    description: "Золотая середина. Играй без ограничений.",
    icon: <Zap className="w-6 h-6" />,
    features: [
      { text: "RTX 3070 Ti эквивалент", included: true },
      { text: "До 2K разрешения", included: true },
      { text: "Безлимитное время", included: true },
      { text: "RTX включен", included: true },
      { text: "Приоритетная очередь", included: true },
    ],
    highlight: true,
    color: "from-purple-600 to-pink-500",
    buttonColor: "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30",
  },
  {
    id: 3,
    name: "ULTRA 4K",
    price: "$19.99",
    period: "/ месяц",
    description: "Максимальная графика. Твой RTX 4090 в облаке.",
    icon: <Crown className="w-6 h-6" />,
    features: [
      { text: "RTX 4090 (24GB VRAM)", included: true },
      { text: "4K 120 FPS / 8K Ready", included: true },
      { text: "HDR + Surround 7.1", included: true },
      { text: "Отдельный сервер (без очереди)", included: true },
      { text: "Запись геймплея", included: true },
    ],
    highlight: false,
    color: "from-yellow-400 to-orange-500",
    buttonColor: "border-yellow-400 text-yellow-400 hover:bg-yellow-400/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function TariffsPage() {
  return (
    <main className="min-h-screen bg-[#05050a] text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            ВЫБЕРИ СВОЮ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 animate-pulse">
              МОЩНОСТЬ
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg md:text-xl"
          >
            От бесплатного теста до мощнейшего ПК в мире. Меняй тариф в любой момент.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative group rounded-3xl p-1 z-10 ${plan.highlight ? 'md:-mt-8 md:mb-8' : ''}`}
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${plan.color} opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-500`}></div>
              
              <div className="relative h-full bg-[#0f0f16]/90 backdrop-blur-xl rounded-[22px] p-8 border border-white/5 flex flex-col overflow-hidden">
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-b-lg shadow-lg tracking-wider">
                    BESTSELLER
                  </div>
                )}

                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} p-0.5 mb-4`}>
                     <div className="w-full h-full bg-black/50 rounded-[10px] flex items-center justify-center backdrop-blur-md">
                        {plan.icon}
                     </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-200">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl md:text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-sm text-gray-500 font-medium">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-3 leading-relaxed">{plan.description}</p>
                </div>

                <div className="h-px w-full bg-white/10 mb-6"></div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      {feature.included ? (
                        <div className={`mt-0.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center bg-gradient-to-br ${plan.color}`}>
                           <Check size={10} className="text-black font-bold" />
                        </div>
                      ) : (
                         <X size={18} className="text-gray-600" />
                      )}
                      <span className={feature.included ? "text-gray-300" : "text-gray-600 line-through decoration-gray-600/50"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/login" className="block mt-auto">
                  <button className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all duration-300 border border-transparent ${plan.buttonColor}`}>
                    {plan.id === 1 ? 'Попробовать' : 'Подключить'}
                  </button>
                </Link>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}