import './globals.css';
import { Inter } from 'next/font/google';

import Navbar from '../components/layout/Navbar'; 
import BackgroundManager from '../components/ui/BackgroundManager'; 
import SupportChat from '../components/features/SupportChat';
import Preloader from '../components/ui/Preloader';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin', 'cyrillic'], display: 'swap' });

export const metadata = {
  title: 'Cloud Diaz | Cloud Gaming',
  description: 'Играй в любые ПК игры через браузер',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-black text-white relative`}>
        <AuthProvider>
          
          {/* 1. Прелоадер живет сам по себе */}
          <Preloader />

          {/* 2. Весь остальной сайт оборачиваем в div */}
          {/* Это защищает структуру DOM от ошибок при удалении прелоадера */}
          <div className="relative z-0">
            <BackgroundManager />
            <Navbar />
            <main>{children}</main>
            <SupportChat />
          </div>

        </AuthProvider>
      </body>
    </html>
  );
}