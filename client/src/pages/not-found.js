import { useEffect } from 'react';
import Header from '../components/header';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found - polaroid';
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Упс, страница не найдена!</p>
      </div>
    </div>
  );
}
