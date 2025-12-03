'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Lock, ArrowRight, Gamepad2, AlertCircle, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  
  const [isRegistering, setIsRegistering] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      router.push('/profile'); 
    } catch (err) {
      console.error("Firebase Error:", err);
      
      // 👇 ВЫВОДИМ ТОЧНЫЙ КОД ОШИБКИ, ЧТОБЫ ПОНЯТЬ ПРИЧИНУ
      // Частые ошибки:
      // auth/email-already-in-use — почта занята
      // auth/weak-password — пароль слабый
      // auth/operation-not-allowed — НЕ ВКЛЮЧЕН ВХОД В КОНСОЛИ FIREBASE
      
      if (err.code === 'auth/email-already-in-use') {
        setError('Эта почта уже используется.');
      } else if (err.code === 'auth/weak-password') {
        setError('Пароль должен быть не менее 6 символов.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Неверная почта или пароль.');
      } else {
        // Показываем технический текст ошибки, если причина другая
        setError(`Ошибка: ${err.code} — ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md p-4">
        {/* Градиентная подложка */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-3xl blur opacity-50 animate-pulse"></div>
        
        <div className="relative bg-[#0a0a12] border border-white/10 rounded-3xl p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
               <Gamepad2 size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">
              {isRegistering ? 'РЕГИСТРАЦИЯ' : 'ВХОД'}
            </h1>
            <p className="text-gray-400 text-sm">
              {isRegistering ? 'Создай аккаунт и начни играть' : 'Добро пожаловать назад, геймер'}
            </p>
          </div>

          {/* Блок ошибки */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-xl mb-4 text-sm flex flex-col gap-1 animate-pulse break-words">
              <div className="flex items-center gap-2 font-bold">
                 <AlertCircle size={16} /> ОШИБКА
              </div>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#151520] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-all placeholder-gray-600"
                required 
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="Пароль" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#151520] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500 transition-all placeholder-gray-600"
                required 
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'ОБРАБОТКА...' : (isRegistering ? 'СОЗДАТЬ АККАУНТ' : 'ВОЙТИ')}
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта?'} {' '}
            <button 
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="text-white hover:text-cyan-400 underline decoration-cyan-400/50 underline-offset-4 font-bold cursor-pointer"
            >
              {isRegistering ? 'Войти' : 'Регистрация'}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}