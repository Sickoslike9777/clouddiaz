'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Cpu, MemoryStick } from 'lucide-react';
import { useState } from 'react';
// 👇 Импортируем модалку
import CheckoutModal from '@/components/features/CheckoutModal';

const lumenSeries = [
  {
    id: 1,
    model: "LUMEN CORE",
    price: "$1,199",
    image: "/images/pc/pc1.png",
    specs: { cpu: "Core i5-13400F", gpu: "RTX 4060 8GB", ram: "16GB DDR4" },
    desc: "Идеальный старт. Тянет все современные игры в FullHD на высоких настройках.",
    color: "from-blue-600 to-cyan-500",
    shadow: "shadow-cyan-500/20"
  },
  {
    id: 2,
    model: "LUMEN PRO",
    price: "$1,899",
    image: "/images/pc/pc2.png",
    specs: { cpu: "Core i7-13700K", gpu: "RTX 4070 Ti", ram: "32GB DDR5" },
    desc: "Золотой стандарт. 2K гейминг с трассировкой лучей без компромиссов.",
    color: "from-purple-600 to-pink-500",
    shadow: "shadow-purple-500/20"
  },
  {
    id: 3,
    model: "LUMEN ELITE",
    price: "$3,499",
    image: "/images/pc/pc3.png",
    specs: { cpu: "Core i9-14900K", gpu: "RTX 4080 Super", ram: "64GB DDR5" },
    desc: "Доминация в 4K. Стриминг, рендеринг и игры на ультра-настройках одновременно.",
    color: "from-orange-500 to-red-500",
    shadow: "shadow-orange-500/20"
  },
  {
    id: 4,
    model: "LUMEN X",
    price: "$6,999",
    image: "/images/pc/pc4.png",
    specs: { cpu: "Core i9-14900KS", gpu: "RTX 4090 OC", ram: "96GB DDR5" },
    desc: "Вершина эволюции. Кастомное водяное охлаждение. Самый мощный ПК в линейке.",
    color: "from-white to-gray-400",
    shadow: "shadow-white/20",
    isFlagship: true
  }
];

export default function LumenPage() {
  // 👇 Состояние для выбранного ПК
  const [selectedPC, setSelectedPC] = useState(null);

  return (
    <main className="min-h-screen bg-[#05050a] text-white pt-24 pb-20">
      
      {/* 👇 Модальное окно (Открывается если selectedPC не null) */}
      <CheckoutModal 
        isOpen={!!selectedPC} 
        product={selectedPC} 
        onClose={() => setSelectedPC(null)} 
      />

      <div className="container mx-auto px-6 mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4">СЕРИЯ <span className="text-purple-500">LUMEN</span></h1>
        <p className="text-gray-400">International Delivery Available</p>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          
          {lumenSeries.map((pc, index) => (
            <motion.div
              key={pc.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group rounded-[2.5rem] overflow-hidden bg-[#0f0f16] border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-2xl ${pc.shadow}`}
            >
              <div className={`absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br ${pc.color} opacity-5 blur-[100px] rounded-full group-hover:opacity-10 transition-opacity`}></div>

              <div className="flex flex-col h-full p-8 md:p-10 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-black italic tracking-wide mb-2">{pc.model}</h2>
                    {pc.isFlagship && <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">FLAGSHIP</span>}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl md:text-3xl font-bold">{pc.price}</p>
                  </div>
                </div>

                <div className="relative h-[350px] w-full my-4 flex items-center justify-center">
                   <img src={pc.image} alt={pc.model} className="max-h-full w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110" />
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6 bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="text-center">
                    <Cpu size={20} className="mx-auto mb-1 text-gray-400" />
                    <span className="text-xs font-bold block">{pc.specs.cpu}</span>
                  </div>
                  <div className="text-center border-l border-white/10">
                    <Zap size={20} className="mx-auto mb-1 text-gray-400" />
                    <span className="text-xs font-bold block">{pc.specs.gpu}</span>
                  </div>
                  <div className="text-center border-l border-white/10">
                    <MemoryStick size={20} className="mx-auto mb-1 text-gray-400" />
                    <span className="text-xs font-bold block">{pc.specs.ram}</span>
                  </div>
                </div>

                <div className="mt-auto">
                   <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">{pc.desc}</p>
                   {/* 👇 КНОПКА ОТКРЫВАЕТ МОДАЛКУ */}
                   <button 
                     onClick={() => setSelectedPC(pc)}
                     className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all bg-gradient-to-r ${pc.color} hover:brightness-110 text-white shadow-lg`}
                   >
                     <ShoppingCart size={20} />
                     BUY NOW
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}