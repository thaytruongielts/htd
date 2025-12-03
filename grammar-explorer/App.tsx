import React from 'react';
import FormulaSection from './components/FormulaSection';
import SpellingSection from './components/SpellingSection';
import AdverbSection from './components/AdverbSection';
import { Book, GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f4] font-sans text-stone-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-5xl">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-extrabold text-stone-800 tracking-tight leading-none">
                Ngữ Pháp Hiện Tại Đơn
              </h1>
              <p className="text-xs text-stone-500 font-medium">Interactive Grammar Explorer</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-bold text-stone-500">
            <button onClick={() => scrollToSection('formulas')} className="hover:text-amber-600 transition-colors">
              Công Thức
            </button>
            <button onClick={() => scrollToSection('spelling')} className="hover:text-amber-600 transition-colors">
              Quy Tắc "s/es"
            </button>
            <button onClick={() => scrollToSection('adverbs')} className="hover:text-amber-600 transition-colors">
              Trạng Từ
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 space-y-12 max-w-5xl">
        <FormulaSection />
        <SpellingSection />
        <AdverbSection />

        {/* Footer */}
        <footer className="text-center text-stone-400 text-sm pb-8 pt-4 border-t border-stone-200/50">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Book className="w-4 h-4" />
            <span className="font-semibold">Grammar Explorer</span>
          </div>
          <p>© 2024. Dựa trên tài liệu "Tổng Hợp Ngữ Pháp Thì Hiện Tại Đơn".</p>
        </footer>
      </main>
      
      {/* Global styles for animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-fade-in-up {
           animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
