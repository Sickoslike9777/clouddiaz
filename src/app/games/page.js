'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, Star, MonitorPlay, Flame, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // 👇 ИМПОРТИРУЕМ КОМПОНЕНТ IMAGE
import { games } from '@/data/gamesData'; 

const categories = ["Все", "RPG", "Shooter", "Racing", "Arcade", "Action", "Survival"];

export default function GamesPage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredGame, setHoveredGame] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!games || !Array.isArray(games)) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  const filteredGames = games.filter(game => {
    const categoryMatch = activeCategory === "Все" || 
      (game.category && game.category.toUpperCase().includes(activeCategory.toUpperCase())) ||
      (game.tags && game.tags.some(t => t.toUpperCase() === activeCategory.toUpperCase()));
    const searchMatch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredGame = games.find(g => g.title.includes("Fortnite")) || games[0];

  return (
    <main className="min-h-screen text-white relative overflow-x-hidden selection:bg-cyan-400 selection:text-black">
      
      {/* === HERO СЕКЦИЯ === */}
      <section className="relative h-[65vh] flex items-end pb-16 group z-10 mt-20">
        <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden mx-6">
           {featuredGame && (
             <>
              {/* 👇 ОПТИМИЗИРОВАННАЯ КАРТИНКА (fill = растянуть на родителя) */}
              <Image 
                src={featuredGame.image} 
                alt={featuredGame.title} 
                fill
                priority // Загружать сразу (это первый экран)
                className="object-cover transition-transform duration-[20s] group-hover:scale-105"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-[#05050a]/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#05050a]/80 via-transparent to-transparent"></div>
             </>
           )}
        </div>

        {/* ... (Контент Hero секции остался без изменений) ... */}
        <div className="container mx-auto px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {featuredGame && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center gap-1">
                    <Flame size={12} fill="currentColor" /> ХИТ СЕЗОНА
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                    <Star fill="currentColor" size={14} />
                    <span className="font-bold text-sm">{featuredGame.rating}</span>
                  </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-4 leading-none tracking-tight text-white drop-shadow-2xl">
                  {featuredGame.title}
                </h1>
                
                <p className="text-gray-200 text-lg mb-8 line-clamp-2 max-w-lg font-medium drop-shadow-lg">
                  Погрузись в мир будущего с трассировкой лучей. Запускай прямо сейчас в браузере без установок.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link href={`/play/${featuredGame.id}`}>
                    <button className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-cyan-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105 active:scale-95">
                      <Play fill="currentColor" size={20} />
                      ИГРАТЬ
                    </button>
                  </Link>
                  <button className="px-8 py-4 rounded-xl font-bold border border-white/30 hover:bg-white/10 backdrop-blur-md transition-colors text-white">
                     ТРЕЙЛЕР
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>


      {/* === ПАНЕЛЬ ФИЛЬТРОВ === */}
      <section className="sticky top-20 z-40 bg-[#05050a]/80 backdrop-blur-xl border-y border-white/5 py-4 shadow-2xl mt-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar p-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap outline-none"
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-200 ${activeCategory === cat ? "text-white" : "text-gray-400 hover:text-white"}`}>
                    {cat}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72 group">
              <input 
                type="text" 
                placeholder="Найти игру..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a24] border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500/50 focus:bg-[#22222e] transition-all text-white placeholder-gray-500 shadow-inner"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-cyan-400 transition-colors" size={20} />
            </div>

          </div>
        </div>
      </section>


      {/* === СЕТКА ИГР === */}
      <section className="container mx-auto px-6 py-12 min-h-[60vh] relative z-10">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredGames.map((game) => (
              <motion.div
                layout
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredGame(game.id)}
                onMouseLeave={() => setHoveredGame(null)}
                className="group relative h-[420px] rounded-[2rem] overflow-hidden border border-white/5 bg-[#15151e] shadow-xl hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer"
              >
                <Link href={`/play/${game.id}`} className="block w-full h-full">
                  
                  {/* 👇 ОПТИМИЗИРОВАННАЯ КАРТИНКА ИГРЫ */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image 
                      src={game.image} 
                      alt={game.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-[#05050a]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/0 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {game.isNew && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-[10px] font-black px-3 py-1 rounded-lg shadow-lg z-20 flex items-center gap-1">
                      <Sparkles size={10} /> NEW
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                     <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        <Play fill="currentColor" className="ml-1" size={28} />
                     </div>
                  </div>

                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 pointer-events-none">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      
                      <div className="flex justify-between items-end mb-2">
                        <div className="absolute -top-10 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 transform -translate-y-2 group-hover:translate-y-0">
                           <span className="text-[10px] font-bold px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-400 rounded backdrop-blur-sm">
                             RTX 4090 ON
                           </span>
                        </div>
                        
                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg ml-auto border border-white/5">
                           <Star className="text-yellow-400 fill-yellow-400" size={12} />
                           <span className="text-xs font-bold text-white">{game.rating || 4.5}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white leading-tight mb-1 group-hover:text-cyan-400 transition-colors drop-shadow-md">
                        {game.title}
                      </h3>
                      
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                        {game.category || "Game"}
                      </p>

                    </div>
                  </div>

                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredGames.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-gray-500">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <MonitorPlay size={40} className="opacity-50" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">Ничего не найдено</h3>
             <p>Попробуй изменить фильтры или поисковый запрос</p>
          </div>
        )}

      </section>
    </main>
  );
}