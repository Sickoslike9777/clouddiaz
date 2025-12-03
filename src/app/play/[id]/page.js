'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { games } from '@/data/gamesData'; 
import { Wifi, Zap, Maximize, Mic, XCircle, Settings, Keyboard, Volume2, VolumeX, Minimize } from 'lucide-react';
import Link from 'next/link';

export default function PlayPage() {
  const params = useParams();
  const videoRef = useRef(null);
  const containerRef = useRef(null); // Ссылка на контейнер для фулскрина
  const [game, setGame] = useState(null);
  const [status, setStatus] = useState('loading'); 
  const [logs, setLogs] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!games) return;
    const foundGame = games.find((g) => g.id.toString() === params.id);

    if (!foundGame) {
      setStatus('error');
      return;
    }

    setGame(foundGame);

    const steps = [
      "Connecting to Frankfurt-AWS-1...",
      "Allocating RTX 4090 (Tier 1)...",
      "Stream Ready! 4K 120 FPS Locked."
    ];

    let delay = 0;
    steps.forEach((step, index) => {
      delay += 800;
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        if (index === steps.length - 1) {
          setStatus('playing');
          // Попытка авто-фулскрина (может быть заблокирована браузером)
          tryEnterFullscreen(); 
        }
      }, delay);
    });

  }, [params.id]);

  // Функция входа/выхода из полноэкранного режима
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      tryEnterFullscreen();
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const tryEnterFullscreen = () => {
    if (containerRef.current) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.log("Авто-фулскрин заблокирован браузером, нужно действие пользователя");
      });
    }
  };

  // Включение звука + Фулскрин (для лучшего UX)
  const handleUnmuteAndFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
    toggleFullscreen();
  };

  if (status === 'error') return <div className="bg-black h-screen text-white flex items-center justify-center">Game not found</div>;

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black text-white overflow-hidden z-50 flex flex-col font-sans">
      
      {/* === 1. ЭКРАН ЗАГРУЗКИ === */}
      {status !== 'playing' && (
        <div className="absolute inset-0 z-50 bg-[#05050a] flex flex-col items-center justify-center">
          {game && (
            <div className="absolute inset-0 opacity-30 blur-2xl scale-110">
               <img src={game.image} className="w-full h-full object-cover" alt="bg" />
            </div>
          )}
          <div className="relative z-10 text-center w-full max-w-md">
            <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_30px_rgba(34,211,238,0.5)]"></div>
            <h2 className="text-3xl font-black mb-6 tracking-widest animate-pulse uppercase">Запуск облака...</h2>
            <div className="font-mono text-sm text-green-400 h-24 flex flex-col items-center">
               {logs.map((log, i) => <div key={i} className="animate-fadeIn">{log}</div>)}
            </div>
          </div>
        </div>
      )}

      {/* === 2. ИГРОВОЙ ПОТОК (ВИДЕО) === */}
      {status === 'playing' && game && (
        <>
          {/* Видео-фон (Чистый, без затемнений для макс. качества) */}
          <div className="absolute inset-0 bg-black">
             <video 
                key={game.video}
                ref={videoRef}
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover" // object-cover растягивает видео на весь экран
             >
                <source src={game.video || "/videos/hero.mp4"} type="video/mp4" />
             </video>
          </div>

          {/* === ИНТЕРФЕЙС (Появляется при наведении) === */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 z-40 flex flex-col justify-between p-6">
             
             {/* Верхняя панель */}
             <div className="flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent pt-4 px-6 pb-12 -mx-6 -mt-6">
                <div className="flex items-center gap-4">
                   {/* Кнопка ВЫХОД */}
                   <Link href="/games">
                      <button className="flex items-center gap-2 bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-lg backdrop-blur-md">
                        <XCircle size={20} />
                        ВЫХОД
                      </button>
                   </Link>
                   
                   <div className="text-shadow">
                      <h1 className="font-bold text-xl leading-none">{game.title}</h1>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                         <span className="text-xs font-mono text-green-400">4ms • 120 FPS</span>
                      </div>
                   </div>
                </div>

                {/* Техническая инфа */}
                <div className="flex gap-4 text-xs font-mono text-white/80 bg-black/40 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                   <div className="flex items-center gap-2"><Wifi size={14} className="text-green-400"/> 1000 Mbps</div>
                   <div className="w-px h-3 bg-white/20"></div>
                   <div className="flex items-center gap-2"><Zap size={14} className="text-yellow-400"/> RTX 4090</div>
                </div>
             </div>

             {/* Нижняя панель управления */}
             <div className="flex justify-center pb-6">
                <div className="bg-[#1a1a2e]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-6 shadow-2xl transform hover:scale-105 transition-transform">
                   <ControlBtn icon={<Settings size={20} />} />
                   <ControlBtn icon={<Mic size={20} />} />
                   
                   <button onClick={() => {
                      if(videoRef.current) {
                        videoRef.current.muted = !videoRef.current.muted;
                        setIsMuted(videoRef.current.muted);
                      }
                   }} className="p-2 rounded-xl hover:bg-white/10 text-white transition-all">
                      {isMuted ? <VolumeX size={20} className="text-red-400"/> : <Volume2 size={20} className="text-green-400"/>}
                   </button>

                   <div className="w-px h-6 bg-white/20"></div>
                   <ControlBtn icon={<Keyboard size={20} />} />
                   
                   {/* Кнопка Фулскрин */}
                   <button 
                      onClick={toggleFullscreen}
                      className="p-2 rounded-xl hover:bg-white/10 text-white transition-colors"
                   >
                     {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                   </button>
                </div>
             </div>
          </div>

          {/* === БОЛЬШАЯ КНОПКА "ВКЛЮЧИТЬ ЗВУК" (ЕСЛИ ЗАМУЧЕНО) === */}
          {/* Она также служит для активации фулскрина, если браузер заблокировал авто-старт */}
          {isMuted && (
            <div 
              onClick={handleUnmuteAndFullscreen}
              className="absolute inset-0 z-30 flex items-center justify-center cursor-pointer group bg-black/10 hover:bg-black/5 transition-colors"
            >
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-full group-hover:scale-110 transition-transform shadow-[0_0_50px_rgba(34,211,238,0.3)]">
                 <div className="flex flex-col items-center gap-2">
                    <VolumeX size={40} className="text-white drop-shadow-lg" />
                    <span className="font-bold text-sm tracking-widest uppercase text-white drop-shadow-md">Включить звук</span>
                 </div>
               </div>
            </div>
          )}

        </>
      )}
    </div>
  );
}

function ControlBtn({ icon }) {
  return (
    <button className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
      {icon}
    </button>
  );
}