'use client';

import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Swords, Crown, Target, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// 👇 Импортируем хук авторизации и наше новое окно
import { useAuth } from '@/context/AuthContext';
import TournamentModal from '@/components/features/TournamentModal';

const tournaments = [
  {
    id: 1,
    game: "Counter-Strike 2",
    title: "Berlin Major Qualifier",
    image: "/images/games/cs2.jpg",
    date: "15 Oct, 18:00 CET",
    location: "Berlin (Online)",
    prize: "$5,000",
    entry: "Free",
    players: { current: 14, max: 16 },
    format: "5x5",
    rewards: ["$2,500", "$1,500", "$1,000"],
    status: "OPEN",
    color: "from-yellow-600 to-yellow-400"
  },
  {
    id: 2,
    game: "Fortnite",
    title: "London Royal Cup",
    image: "/images/games/fortnite.jpg",
    date: "16 Oct, 20:00 CET",
    location: "London Server",
    prize: "10,000 V-Bucks",
    entry: "Free",
    players: { current: 89, max: 100 },
    format: "SOLO",
    rewards: ["5000 VB", "3000 VB", "2000 VB"],
    status: "OPEN",
    color: "from-purple-600 to-blue-500"
  },
  {
    id: 3,
    game: "Dota 2",
    title: "Stockholm Mid War",
    image: "/images/games/dota2.png",
    date: "18 Oct, 19:30 CET",
    location: "Stockholm (EU West)",
    prize: "Arcana Item",
    entry: "$5",
    players: { current: 32, max: 32 },
    format: "1x1 MID",
    rewards: ["SF Arcana", "Immortal Set", "Dota Plus"],
    status: "FULL",
    color: "from-red-600 to-orange-500"
  },
  {
    id: 4,
    game: "Apex Legends",
    title: "Paris Predators",
    image: "/images/games/apex.jpg",
    date: "20 Oct, 17:00 CET",
    location: "Frankfurt 1",
    prize: "$1,000",
    entry: "Free",
    players: { current: 12, max: 20 },
    format: "TRIO",
    rewards: ["$500", "$300", "$200"],
    status: "OPEN",
    color: "from-red-500 to-pink-600"
  }
];

export default function TournamentsPage() {
  const router = useRouter();
  const { user } = useAuth(); // Проверяем юзера
  const [selectedTournament, setSelectedTournament] = useState(null); // Для модалки

  const handleJoin = (tournament) => {
    // 1. Если не вошел - кидаем на логин
    if (!user) {
      router.push('/login');
      return;
    }
    // 2. Иначе открываем окно успеха
    setSelectedTournament(tournament);
  };

  return (
    <main className="min-h-screen bg-[#05050a] text-white pt-28 pb-20">
      
      {/* 👇 ПОДКЛЮЧАЕМ ОКНО */}
      <TournamentModal 
        isOpen={!!selectedTournament} 
        onClose={() => setSelectedTournament(null)} 
        tournament={selectedTournament}
      />

      <div className="container mx-auto px-6 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-cyan-400 font-bold tracking-[0.3em] text-sm uppercase mb-2 block">
            EU Cybersport League
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            ТУРНИРЫ <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">CLOUD DIAZ</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Международные турниры на европейских серверах. Докажи свой скилл и заработай $.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          
          {tournaments.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-[#0f0f16] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <div className="h-40 w-full relative overflow-hidden">
                 <div className={`absolute inset-0 bg-gradient-to-t from-[#0f0f16] to-transparent z-10 opacity-90`}></div>
                 <img src={t.image} alt={t.game} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 
                 <div className="absolute top-4 right-4 z-20">
                    {t.status === "FULL" ? (
                      <span className="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded border border-red-500/30">SOLD OUT</span>
                    ) : (
                      <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded border border-green-500/30 animate-pulse">REGISTRATION</span>
                    )}
                 </div>
                 
                 <div className="absolute bottom-4 left-6 z-20">
                    <p className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">{t.game}</p>
                    <h3 className="text-xl font-black text-white">{t.title}</h3>
                 </div>
              </div>

              <div className="p-6">
                 <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                       <Calendar size={16} className="text-purple-400" />
                       <span>{t.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                       <MapPin size={16} className="text-purple-400" />
                       <span>{t.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                       <Trophy size={16} className="text-yellow-400" />
                       <span className="text-yellow-400 font-bold">{t.prize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                       <Target size={16} className="text-purple-400" />
                       <span>Entry: {t.entry}</span>
                    </div>
                 </div>

                 <div className="mb-6">
                    <div className="flex justify-between text-xs mb-2">
                       <span className="text-gray-400 flex items-center gap-1"><Users size={12}/> Players</span>
                       <span className={`font-bold ${t.status === "FULL" ? 'text-red-400' : 'text-white'}`}>
                         {t.players.current} / {t.players.max}
                       </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <div 
                         className={`h-full rounded-full ${t.status === "FULL" ? 'bg-red-500' : 'bg-cyan-500'}`} 
                         style={{ width: `${(t.players.current / t.players.max) * 100}%` }}
                       ></div>
                    </div>
                 </div>

                 <button 
                   onClick={() => handleJoin(t)}
                   disabled={t.status === "FULL"}
                   className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                     t.status === "FULL" 
                     ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
                     : 'bg-white text-black hover:bg-cyan-400 hover:scale-[1.02] shadow-lg'
                   }`}
                 >
                   {t.status === "FULL" ? 'CLOSED' : 'JOIN NOW'}
                 </button>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}