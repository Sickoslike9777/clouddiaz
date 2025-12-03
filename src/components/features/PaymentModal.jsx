'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Bitcoin, Check, Loader2, Wallet, Copy, ShieldCheck, ArrowRightLeft } from 'lucide-react';

export default function PaymentModal({ isOpen, onClose, onAddBalance }) {
  const [amount, setAmount] = useState(10);
  const [method, setMethod] = useState(null); // 'card' | 'crypto'
  const [step, setStep] = useState('select'); // 'select' -> 'input' -> 'processing' -> 'success'
  const [network, setNetwork] = useState('TRC20'); // 'TRC20' | 'ERC20'
  
  // Состояние для данных карты
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  // === ТВОИ КОШЕЛЬКИ ===
  const wallets = {
    TRC20: "TKbBc4VRiMt12NUH33ZxgsQVAziUH1e2VY",
    ERC20: "0x36D8291406226c94d0A4a27cd080e20cF6Aa1262"
  };

  const qrCodes = {
    TRC20: "/images/qr/trc20.png",
    ERC20: "/images/qr/erc20.png"
  };

  // === ЛОГИКА ФОРМАТИРОВАНИЯ КАРТЫ ===
  const handleCardNumberChange = (e) => {
    // Убираем все нецифровые символы
    let value = e.target.value.replace(/\D/g, '');
    // Ограничиваем 16 цифрами
    if (value.length > 16) value = value.slice(0, 16);
    // Добавляем пробел после каждых 4 цифр
    // Регулярка ищет 4 цифры, за которыми следует еще цифра, и ставит пробел
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardData({ ...cardData, number: formattedValue });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    
    // Добавляем слэш после 2 цифр (месяца)
    if (value.length >= 3) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setCardData({ ...cardData, expiry: value });
  };

  const handleCVCChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setCardData({ ...cardData, cvc: value });
  };
  // =====================================

  const handleNext = () => {
    if (!method) return;
    setStep('input');
  };

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      onAddBalance(amount);
      setStep('success');
      setTimeout(() => {
        onClose();
        setStep('select');
        setMethod(null);
        // Сбрасываем форму карты
        setCardData({ number: '', expiry: '', cvc: '' });
      }, 2500);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wallets[network]);
    alert(`Адрес ${network} скопирован!`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm"></motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.9, opacity: 0 }} 
            className="relative bg-[#0f0f16] border border-white/10 w-full max-w-md rounded-3xl p-6 shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Wallet className="text-cyan-400" /> Пополнение баланса</h2>
              <button onClick={onClose}><X className="text-gray-500 hover:text-white" /></button>
            </div>

            {/* === ВЫБОР === */}
            {step === 'select' && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-widest mb-3 block">Сумма ($)</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 25, 50, 100].map((val) => (
                      <button key={val} onClick={() => setAmount(val)} className={`py-3 rounded-xl font-bold border transition-all ${amount === val ? 'bg-white text-black border-white' : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20'}`}>${val}</button>
                    ))}
                  </div>
                  <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-3 w-full bg-[#151520] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-500 outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setMethod('card')} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'card' ? 'bg-purple-600/20 border-purple-500 text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'}`}>
                    <CreditCard size={28} /> <span className="text-sm font-bold">Карта</span>
                  </button>
                  <button onClick={() => setMethod('crypto')} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'crypto' ? 'bg-orange-500/20 border-orange-500 text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'}`}>
                    <Bitcoin size={28} /> <span className="text-sm font-bold">Крипто</span>
                  </button>
                </div>

                <button onClick={handleNext} disabled={!method || amount <= 0} className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl font-bold text-white transition-all disabled:opacity-50">Далее</button>
              </div>
            )}

            {/* === ВВОД КАРТЫ (С АВТО-ПРОБЕЛАМИ) === */}
            {step === 'input' && method === 'card' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#2c2c35] to-[#1a1a24] p-4 rounded-xl border border-white/10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-20"><CreditCard size={100} /></div>
                   
                   <p className="text-xs text-gray-400 mb-1">Card Number</p>
                   {/* Ввод номера карты */}
                   <input 
                     type="text" 
                     value={cardData.number}
                     onChange={handleCardNumberChange}
                     placeholder="0000 0000 0000 0000" 
                     className="w-full bg-transparent text-white text-xl font-mono outline-none mb-4 placeholder-gray-600" 
                   />
                   
                   <div className="flex gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-gray-400">Expiry</p>
                        {/* Ввод даты */}
                        <input 
                          type="text" 
                          value={cardData.expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY" 
                          className="bg-transparent text-white font-mono outline-none w-full placeholder-gray-600" 
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400">CVC</p>
                        {/* Ввод CVC */}
                        <input 
                          type="text" 
                          value={cardData.cvc}
                          onChange={handleCVCChange}
                          placeholder="123" 
                          className="bg-transparent text-white font-mono outline-none w-full placeholder-gray-600" 
                        />
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-xs justify-center"><ShieldCheck size={14}/> Платежи защищены SSL</div>
                
                {/* Кнопка активна только если введены данные (простая проверка длины) */}
                <button 
                  onClick={handlePay} 
                  disabled={cardData.number.length < 19 || cardData.expiry.length < 5 || cardData.cvc.length < 3}
                  className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Оплатить ${amount}
                </button>
                <button onClick={() => setStep('select')} className="w-full py-2 text-gray-500 text-sm hover:text-white">Назад</button>
              </div>
            )}

            {/* === ВВОД КРИПТЫ === */}
            {step === 'input' && method === 'crypto' && (
              <div className="space-y-6 text-center">
                <div className="flex justify-center gap-2 mb-4 bg-[#151520] p-1 rounded-xl inline-flex mx-auto">
                   <button onClick={() => setNetwork('TRC20')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${network === 'TRC20' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}>USDT (TRC20)</button>
                   <button onClick={() => setNetwork('ERC20')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${network === 'ERC20' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>ETH (ERC20)</button>
                </div>

                <div className="bg-white p-4 rounded-xl inline-block mx-auto shadow-lg">
                   <img src={qrCodes[network]} alt={`QR Code ${network}`} className="w-32 h-32 object-contain" />
                </div>
                
                <div>
                   <p className="text-sm text-gray-400 mb-2">Отправьте <span className="text-white font-bold">${amount}</span> на адрес <span className="text-cyan-400">{network}</span>:</p>
                   <div onClick={copyToClipboard} className="bg-[#151520] border border-white/10 p-3 rounded-xl flex items-center justify-between cursor-pointer hover:border-cyan-500/50 transition-colors group">
                      <span className="text-xs font-mono text-gray-300 truncate w-56">{wallets[network]}</span>
                      <Copy size={16} className="text-gray-500 group-hover:text-white transition-colors" />
                   </div>
                </div>
                
                <button onClick={handlePay} className={`w-full py-4 font-bold rounded-xl transition-all text-white ${network === 'TRC20' ? 'bg-orange-500 hover:bg-orange-400' : 'bg-purple-600 hover:bg-purple-500'}`}>Я оплатил</button>
                <button onClick={() => setStep('select')} className="w-full py-2 text-gray-500 text-sm hover:text-white">Назад</button>
              </div>
            )}

            {/* === ЗАГРУЗКА === */}
            {step === 'processing' && (
              <div className="text-center py-10">
                <Loader2 size={48} className="text-cyan-400 animate-spin mx-auto mb-4" />
                <p className="text-gray-300">Проверка транзакции...</p>
              </div>
            )}

            {/* === УСПЕХ === */}
            {step === 'success' && (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} className="text-green-500" /></div>
                <h3 className="text-2xl font-bold text-white">Успешно!</h3>
                <p className="text-gray-400">Баланс пополнен на ${amount}</p>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}