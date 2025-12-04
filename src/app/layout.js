import './globals.css';
import { Inter } from 'next/font/google';

// === ИМПОРТЫ КОМПОНЕНТОВ ===
import Navbar from '../components/layout/Navbar'; 
import BackgroundManager from '../components/ui/BackgroundManager'; 
import SupportChat from '../components/features/SupportChat';
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
        
        {/* Оборачиваем всё в AuthProvider для работы входа/регистрации */}
        <AuthProvider>
          
          {/* Фон (Видео/Фото) */}
          <BackgroundManager />

          {/* Меню */}
          <Navbar />

          {/* Контент страниц */}
          {children}

          {/* Чат */}
          <SupportChat />

        </AuthProvider>

      </body>
    </html>
  );
}