'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, CreditCard, Bitcoin, Check, Loader2, MapPin, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CheckoutModal({ isOpen, onClose, product }) {
  const { addOrder } = useAuth(); 
  const [step, setStep] = useState('shipping'); // 'shipping' -> 'payment' -> 'processing' -> 'success'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    country: '',
    city: '',
    address: '',
    zip: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = formData.name && formData.email && formData.country && formData.city && formData.address;

  const handlePayment = () => {
    setStep('processing');
    
    // Имитация задержки банка (2.5 сек)
    setTimeout(() => {
      setStep('success');
      
      const orderId = `#LUM-${Math.floor(Math.random()*10000)}`;
      const date = new Date().toLocaleDateString('ru-RU');

      // Сохраняем заказ в историю профиля
      addOrder({
        id: orderId,
        product: product.model,
        price: product.price,
        image: product.image,
        date: date,
        status: "Processing", // Статус заказа
        address: `${formData.city}, ${formData.address}`
      });

    }, 2500);
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep('shipping');
      setFormData({ name: '', email: '', country: '', city: '', address: '', zip: '' });
    }, 500);
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={resetAndClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          ></motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0, y: 50 }} 
            className="relative bg-[#0f0f16] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            
            {/* ЛЕВАЯ ЧАСТЬ */}
            <div className="bg-[#151520] p-6 md:w-1/3 flex flex-col border-r border-white/5">
               <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Your Order</h3>
               <div className="bg-black/30 rounded-2xl p-4 mb-4 flex items-center justify-center border border-white/5">
                  <img src={product.image} alt={product.model} className="w-full h-auto object-contain max-h-32" />
               </div>
               <div className="mb-auto">
                 <h2 className="text-xl font-black text-white italic">{product.model}</h2>
                 <p className="text-xs text-gray-500 mt-1">{product.specs.cpu} • {product.specs.gpu}</p>
               </div>
               <div className="mt-6 pt-6 border-t border-white/10">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Shipping</span>
                    <span className="text-sm text-green-400 font-bold">Free</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Total</span>
                    <span className="text-2xl font-bold text-white">{product.price}</span>
                 </div>
               </div>
            </div>

            {/* ПРАВАЯ ЧАСТЬ */}
            <div className="p-6 md:w-2/3 relative flex flex-col">
               <button onClick={resetAndClose} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={24} /></button>

               {/* ШАГ 1: ДОСТАВКА */}
               {step === 'shipping' && (
                 <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
                      <Truck className="text-purple-500" /> Shipping Info
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="text-xs text-gray-500 ml-1">Name</label>
                        <input name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Alex Diaz" className="w-full bg-[#0a0a10] border border-white/10 rounded-xl p-3 text-white focus:border-purple-500 outline-none" />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="text-xs text-gray-500 ml-1">Email</label>
                        <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="mail@example.com" className="w-full bg-[#0a0a10] border border-white/10 rounded-xl p-3 text-white focus:border-purple-500 outline-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="text-xs text-gray-500 ml-1">Country</label>
                         <input name="country" value={formData.country} onChange={handleInputChange} type="text" placeholder="Germany" className="w-full bg-[#0a0a10] border border-white/10 rounded-xl p-3 text-white focus:border-purple-500 outline-none" />
                       </div>
                       <div>
                         <label className="text-xs text-gray-500 ml-1">City</label>
                         <input name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder="Berlin" className="w-full bg-[#0a0a10] border border-white/10 rounded-xl p-3 text-white focus:border-purple-500 outline-none" />
                       </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                       <div className="col-span-2">
                         <label className="text-xs text-gray-500 ml-1">Address</label>
                         <input name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="Main St, 10" className="w-full bg-[#0a0a10] border border-white/10 rounded-xl p-3 text-white focus:border-purple-500 outline-none" />
                       </div>
                       <div>
                         <label className="text-xs text-gray-500 ml-1">ZIP Code</label>
                         <input name="zip" value={formData.zip} onChange={handleInputChange} type="text" placeholder="10115" className="w-full bg-[#0a0a10] border border-white/10 rounded-xl p-3 text-white focus:border-purple-500 outline-none" />
                       </div>
                    </div>

                    <button 
                      onClick={() => setStep('payment')} 
                      disabled={!isFormValid}
                      className="w-full py-3 mt-2 bg-white text-black font-bold rounded-xl hover:bg-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Proceed to Payment
                    </button>
                 </motion.div>
               )}

               {/* ШАГ 2: ОПЛАТА */}
               {step === 'payment' && (
                 <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      <CreditCard className="text-cyan-500" /> Payment Method
                    </h2>
                    
                    <div className="space-y-3">
                       <div className="p-4 rounded-xl border border-purple-500 bg-purple-500/10 flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-3">
                             <CreditCard size={24} className="text-purple-400"/>
                             <span className="font-bold">Credit Card</span>
                          </div>
                          <div className="w-4 h-4 rounded-full border border-purple-500 bg-purple-500"></div>
                       </div>
                       <div className="p-4 rounded-xl border border-white/10 bg-[#0a0a10] flex items-center justify-between cursor-pointer opacity-50">
                          <div className="flex items-center gap-3">
                             <Bitcoin size={24} className="text-orange-500"/>
                             <span className="font-bold">Crypto</span>
                          </div>
                          <div className="w-4 h-4 rounded-full border border-white/20"></div>
                       </div>
                    </div>

                    <div className="bg-[#0a0a10] p-4 rounded-xl space-y-2">
                       <p className="text-white text-sm font-medium flex items-center gap-2">
                          <MapPin size={16} className="text-gray-500" />
                          {formData.city}, {formData.address}
                       </p>
                       <p className="text-white text-sm font-medium flex items-center gap-2">
                          <Mail size={16} className="text-gray-500" />
                          {formData.email}
                       </p>
                    </div>

                    <div className="flex gap-3">
                       <button onClick={() => setStep('shipping')} className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5">Back</button>
                       <button onClick={handlePayment} className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl font-bold text-white shadow-lg">Pay {product.price}</button>
                    </div>
                 </motion.div>
               )}

               {/* ШАГ 3: ОБРАБОТКА */}
               {step === 'processing' && (
                 <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <Loader2 size={50} className="text-cyan-400 animate-spin" />
                    <p className="text-xl font-bold text-white">Processing order...</p>
                 </div>
               )}

               {/* ШАГ 4: УСПЕХ */}
               {step === 'success' && (
                 <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                       <Check size={48} className="text-green-500" />
                    </div>
                    <div>
                       <h2 className="text-3xl font-black text-white mb-2">ORDER CONFIRMED!</h2>
                       <p className="text-gray-400">Your order has been placed successfully.</p>
                    </div>
                    <button onClick={resetAndClose} className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-gray-200">Awesome</button>
                 </div>
               )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}