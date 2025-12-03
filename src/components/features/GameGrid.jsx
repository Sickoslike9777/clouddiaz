'use client';
import { games } from '../../data/gamesData';
import Card from '../ui/Card';
import { motion } from 'framer-motion';

const GameGrid = () => {
  return (
    <section className="py-24 bg-cyber-darkest relative z-10">
      <div className="container mx-auto px-6">
        
        {/* Заголовок секции в стиле CyberStore */}
        <div className="flex items-end gap-4 mb-16 border-b border-white/10 pb-6">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Популярные игры
            </h2>
            <span className="text-3xl md:text-5xl font-black text-accent-purple mb-1">///</span>
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }} // Анимация появления при скролле
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Каскадная задержка
            >
              <Card 
                title={game.title}
                genre={game.genre}
                image={game.image}
                rating={game.rating}
                isNew={game.isNew}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameGrid;