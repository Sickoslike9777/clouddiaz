'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Trophy, Calendar } from 'lucide-react';

export default function TournamentModal({ isOpen, onClose, tournament }) {
  if (!tournament) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          
          {/* Затемнение фона */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          ></motion.div>

          {/* Само окно */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 50 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.8, opacity: 0, y: 50 }} 
            className="relative bg-[#0f0f16] border border-green-500/30 w-full max-w-md rounded-3xl p-8 shadow-[0_0_50px_rgba(34,197,94,0.2)] overflow-hidden text-center"
          >
            {/* Закрыть */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
              <X size={24} />
            </button>

            {/* Иконка успеха */}
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
              <CheckCircle size={40} className="text-green-500 animate-bounce" />
            </div>

            <h2 className="text-2xl font-black text-white mb-2 uppercase italic">
              Вы в игре!
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              Регистрация на турнир прошла успешно. Мы отправили детали на вашу почту.
            </p>

            {/* Инфо о турнире */}
            <div className="bg-[#151520] rounded-xl p-4 mb-6 border border-white/5 text-left flex items-center gap-4">
               <img 
                 src={tournament.image} 
                 alt={tournament.game} 
                 className="w-16 h-16 rounded-lg object-cover"
               />
               <div>
                 <h3 className="font-bold text-white text-sm">{tournament.title}</h3>
                 <div className="flex items-center gap-2 text-xs text-yellow-400 mt-1">
                    <Trophy size={12} />
                    <span>Приз: {tournament.prize}</span>
                 </div>
                 <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Calendar size={12} />
                    <span>{tournament.date}</span>
                 </div>
               </div>
            </div>

            {/* Кнопка */}
            <button 
              onClick={onClose} 
              className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all shadow-lg"
            >
              ОТЛИЧНО, ЖДУ БИТВУ
            </button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}