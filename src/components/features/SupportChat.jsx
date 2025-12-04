'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Mic, MicOff, Minus, Bot, ExternalLink } from 'lucide-react';

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Привет! Я AI-помощник Cloud Diaz. Чем могу помочь?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // 👇 ВПИШИ СЮДА СВОЙ ЮЗЕРНЕЙМ ТЕЛЕГРАМА (без @)
  const telegramUsername = "KseniaOnishenko"; 

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  // Инициализация голоса
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'ru-RU';

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputText((prev) => prev + " " + transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => setIsListening(false);
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return alert("Ваш браузер не поддерживает голосовой ввод");
    isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
    setIsListening(!isListening);
  };

  // 🔥 УМНАЯ ЛОГИКА ОТВЕТОВ 🔥
  const getSmartResponse = (text) => {
    const lowerText = text.toLowerCase();

    // 1. Оператор / Телеграм
    if (lowerText.includes('оператор') || lowerText.includes('человек') || lowerText.includes('телеграм') || lowerText.includes('tg') || lowerText.includes('связь')) {
      return `Я перевел ваш запрос оператору. Пожалуйста, напишите нам в Telegram для быстрого решения: t.me/${telegramUsername}`;
    }

    // 2. Деньги
    if (lowerText.includes('деньг') || lowerText.includes('пополнил') || lowerText.includes('оплат') || lowerText.includes('баланс')) {
      return "Зачисление обычно мгновенное. Если возникла проблема, нажмите кнопку Telegram сверху и отправьте чек оператору.";
    }

    // 3. Лаги
    if (lowerText.includes('лаг') || lowerText.includes('фриз') || lowerText.includes('качество')) {
      return "Попробуйте сменить сервер на Франкфурт-2 в настройках. Если не поможет — напишите нам в Telegram (кнопка в шапке чата).";
    }

    if (lowerText.includes('игр') || lowerText.includes('фортнайт')) {
      return "Все игры уже установлены и обновлены. Просто жмите 'Играть'!";
    }

    if (lowerText.includes('привет')) {
      return "Приветствую! Готов помочь.";
    }

    return "Я пока не понял вопрос. Вы можете написать живому оператору в Telegram (кнопка сверху).";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText; 

    setMessages((prev) => [...prev, { id: Date.now(), text: userText, sender: 'user' }]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getSmartResponse(userText);
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="pointer-events-auto bg-[#0f0f16]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col mb-3 rounded-2xl origin-bottom-right w-[calc(100vw-32px)] h-[60vh] sm:w-[380px] sm:h-[500px] max-h-[80vh]"
          >
            {/* ШАПКА ЧАТА */}
            <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-4 flex justify-between items-center border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center relative">
                  <Bot size={20} className="text-cyan-400" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0f0f16]"></span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Cloud Support</h3>
                  <p className="text-[10px] text-cyan-400 font-mono uppercase">AI Assistant</p>
                </div>
              </div>
              
              {/* 👇 КНОПКИ СПРАВА */}
              <div className="flex items-center gap-2">
                {/* Кнопка Telegram */}
                <a 
                  href={`https://t.me/${telegramUsername}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#229ED9] hover:bg-[#1b81b0] text-white p-2 rounded-lg transition-colors flex items-center justify-center"
                  title="Написать в Telegram"
                >
                  <Send size={16} className="-ml-0.5 mt-0.5 transform -rotate-45" />
                </a>

                {/* Свернуть */}
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Minus size={18} className="text-white/70 hover:text-white" />
                </button>
              </div>
            </div>

            {/* ТЕЛО СООБЩЕНИЙ */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-[#1a1a24] text-gray-200 rounded-tl-none border border-white/5'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a24] p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ВВОД */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#0a0a10] border-t border-white/10 flex gap-2 items-center shrink-0">
              <button type="button" onClick={toggleListening} className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}>
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder={isListening ? "Слушаю..." : "Сообщение..."} className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-gray-600 h-full py-2" />
              <button type="submit" disabled={!inputText.trim()} className="p-3 bg-cyan-500 text-black rounded-xl hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><Send size={18} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto bg-gradient-to-r from-purple-600 to-cyan-500 p-4 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center relative group z-[100]"
      >
        <AnimatePresence mode='wait'>
          {isOpen ? <X key="close" size={28} className="text-white" /> : <MessageSquare key="chat" size={28} className="text-white" />}
        </AnimatePresence>
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-black"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}