'use client';

import { motion } from 'framer-motion';
import { Shield, Github, Twitter, Linkedin, Server, Users, Activity } from 'lucide-react';

export default function FounderSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Задняя подсветка */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-[3rem] blur-3xl opacity-20 -z-10"></div>

          {/* Карточка */}
          <div className="bg-[#0f0f16]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center shadow-2xl">
            
            {/* === ФОТО (ЛЕВАЯ ЧАСТЬ) === */}
            <div className="relative group shrink-0">
              {/* Рамка вокруг фото */}
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full p-[2px] bg-gradient-to-br from-cyan-400 to-purple-600">
                <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                  {/* 👇 ТВОЕ ФОТО */}
                  <img 
                    src="/images/profile/avatar.jpg" 
                    alt="Diaz Founder" 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                  />
                </div>
              </div>
              
              {/* Бейджик "Verified" */}
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-blue-500 text-white p-2.5 rounded-full border-4 border-[#0f0f16] shadow-lg" title="Verified Founder">
                <Shield size={20} fill="currentColor" />
              </div>
            </div>

            {/* === ТЕКСТ (ПРАВАЯ ЧАСТЬ) === */}
            <div className="text-center md:text-left flex-1">
              
              <div className="flex flex-col md:flex-row items-center md:items-baseline gap-4 mb-4">
                {/* 👇 ИМЯ ИЗМЕНЕНО */}
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
                  Diaz
                </h2>
                <span className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">
                  Lead Architect
                </span>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
                "Мы не просто транслируем видео. Мы уничтожаем расстояние между игроком и сервером. <span className="text-white font-bold">Cloud Diaz</span> создан для того, чтобы железо больше никогда не было ограничением вашей фантазии."
              </p>

              {/* Статистика */}
              <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-6 mb-8">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center justify-center md:justify-start gap-1"><Server size={12}/> Uptime</p>
                  <p className="text-xl font-bold text-white">99.9%</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center justify-center md:justify-start gap-1"><Users size={12}/> Players</p>
                  <p className="text-xl font-bold text-white">50k+</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center justify-center md:justify-start gap-1"><Activity size={12}/> Ping</p>
                  <p className="text-xl font-bold text-green-400 flex items-center justify-center md:justify-start gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 4ms
                  </p>
                </div>
              </div>
              
              {/* Соцсети */}
              <div className="flex justify-center md:justify-start gap-4">
                  <SocialBtn icon={<Github size={20} />} label="GitHub" />
                  <SocialBtn icon={<Linkedin size={20} />} label="LinkedIn" />
                  <SocialBtn icon={<Twitter size={20} />} label="Twitter" />
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialBtn({ icon, label }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all text-sm font-medium border border-white/5 hover:border-white/20">
      {icon} <span>{label}</span>
    </button>
  );
}