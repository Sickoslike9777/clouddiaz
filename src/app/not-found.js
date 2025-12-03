import Link from 'next/link';
import Button from '../components/ui/Button'; // Убедись, что путь к кнопке правильный

export default function NotFound() {
  return (
    // ВАЖНО: У этого блока НЕТ своего фона (bg-black и т.д.).
    // Поэтому глобальное видео из layout.js будет видно позади него.
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-white relative z-10 px-6">
      
      <h1 className="text-[120px] md:text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500 animate-pulse">
        404
      </h1>
      
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Страница не найдена
      </h2>
      
      <p className="text-gray-400 mb-10 max-w-md text-lg">
        Кажется, вы забрели туда, где даже облака не летают. Вернитесь на базу.
      </p>
      
      <Link href="/">
        <Button variant="primary" size="lg">
          ВЕРНУТЬСЯ НА ГЛАВНУЮ
        </Button>
      </Link>
    </div>
  );
}