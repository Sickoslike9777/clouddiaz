'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Rocket, Gem, MonitorPlay } from 'lucide-react';

// === ИМПОРТЫ КОМПОНЕНТОВ ===
import Button from '../components/ui/Button';
import GameGrid from '../components/features/GameGrid';
import FounderSection from '../components/layout/FounderSection'; 

export default function Home() {
  return (
    // Фон прозрачный, чтобы был виден глобальный фон из layout.js
    <main className="flex min-h-screen flex-col text-white relative overflow-x-hidden isolate">
      
      {/* === 1. HERO СЕКЦИЯ (Главный экран) === */}
      <section className="relative min-h-[90vh] flex items-center pt-28 pb-10 overflow-hidden">
          <div className="container mx-auto px-6 z-10">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
              
              {/* --- ЛЕВАЯ КОЛОНКА (Текст) --- */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 text-center lg:text-left"
              >
                 {/* Бейджик */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <MonitorPlay size={16} className="text-cyan-400 animate-pulse" />
                  <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">
                    Облачный гейминг v2.0
                  </span>
                </div>
                
                {/* Заголовок */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tighter drop-shadow-2xl">
                  ТВОЙ ПК <br />
                  ТЕПЕРЬ В <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse">ОБЛАКЕ</span>
                </h1>
                
                {/* Описание */}
                <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed pl-6 border-l-4 border-purple-500/50 drop-shadow-md">
                  Забудь о железе. Играй во всё что пожелаешь на ультрах в 4K и 120 FPS через браузер на любом устройстве.
                </p>
                
                {/* Кнопки */}
                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                  <Link href="/games"> 
                    <Button variant="cyber-white" size="lg" icon={<Rocket size={20} />}>
                      Начать играть
                    </Button>
                  </Link>
                  
                  <Link href="/tariffs">
                    <Button variant="cyber-outline" size="lg" icon={<Gem size={20} />}>
                      Смотреть тарифы
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* --- ПРАВАЯ КОЛОНКА (Картинка) --- */}
              <motion.div 
                 initial={{ opacity: 0, scale: 0.8, x: 50 }}
                 animate={{ opacity: 1, scale: 1, x: 0 }}
                 transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
                 className="flex-1 relative w-full max-w-lg lg:max-w-none"
              >
                  {/* Свечение за картинкой */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-3xl blur-[60px] opacity-40 -z-10 animate-pulse-slow"></div>
                  
                  <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-cyan-500/20 z-10 group">
                    <img 
                      src="/images/hero/main.jpg" 
                      alt="Main Hero Image"
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Плашка статуса */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-[#0a0a12]/80 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-lg shadow-purple-500/20 z-30 flex items-center gap-3"
                  >
                    <div className="h-3 w-3 bg-green-500 rounded-full animate-ping"></div>
                    <div>
                      <p className="text-gray-400 font-bold text-xs uppercase tracking-wider">Status:</p>
                      <p className="text-white font-black text-lg leading-none">RTX 4090 READY</p>
                    </div>
                  </motion.div>
              </motion.div>

            </div>
          </div>
      </section>

      {/* === 2. КАТАЛОГ ИГР === */}
      <GameGrid /> 

      {/* === 3. ВИЗИТКА СОЗДАТЕЛЯ === */}
      <FounderSection />

    </main>
  );
}