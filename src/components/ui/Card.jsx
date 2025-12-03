'use client';
import { motion } from 'framer-motion';

const Card = ({ title, genre, image, isNew, rating }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }} // Карточка чуть всплывает вверх
      className="group relative bg-cyber-card rounded-2xl overflow-hidden border border-white/5 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(138,43,226,0.3)] hover:border-accent-purple/50"
    >
      {/* Картинка */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-transparent z-10 opacity-80" />
        <motion.img
          whileHover={{ scale: 1.1 }} // Увеличение картинки при наведении
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        
        {/* Бейджик NEW */}
        {isNew && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-accent-cyan text-black text-xs font-bold rounded-full uppercase tracking-wider">
            New
          </div>
        )}
        
        {/* Рейтинг */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-white text-xs font-bold">{rating}</span>
        </div>
      </div>

      {/* Контент снизу */}
      <div className="p-6 relative z-20">
        <p className="text-accent-cyan text-xs font-semibold tracking-widest uppercase mb-2">{genre}</p>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-purple transition-colors">{title}</h3>
        
        {/* Кнопка "Играть" */}
        <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium transition-all duration-300 group-hover:bg-accent-purple group-hover:border-accent-purple group-hover:text-white shadow-[0_0_0_0_rgba(138,43,226,0)] group-hover:shadow-[0_0_20px_rgba(138,43,226,0.5)]">
          ИГРАТЬ СЕЙЧАС
        </button>
      </div>
    </motion.div>
  );
};

export default Card;