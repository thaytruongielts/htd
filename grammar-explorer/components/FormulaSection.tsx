import React, { useState } from 'react';
import { FormulaMode } from '../types';
import { FORMULAS } from '../constants';
import { BookOpen, AlertCircle, ArrowRight } from 'lucide-react';

const FormulaSection: React.FC = () => {
  const [mode, setMode] = useState<FormulaMode>('positive');
  const activeData = FORMULAS[mode];

  // Render formula as distinct blocks for clarity
  const renderStructureBlocks = (structure: string, type: 'tobe' | 'verb') => {
    const parts = structure.split('+').map(p => p.trim());
    
    // Theme colors based on type
    const accentColor = type === 'tobe' ? 'text-blue-700 border-blue-200 bg-blue-50' : 'text-amber-700 border-amber-200 bg-amber-50';
    const highlightClass = type === 'tobe' ? 'bg-blue-600 text-white border-blue-600' : 'bg-amber-500 text-white border-amber-500';

    return (
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {parts.map((part, idx) => {
          let styleClass = "bg-white border-stone-200 text-stone-600 font-medium"; // Default for S, Object
          
          // Identify keywords to style
          if (['am/is/are', 'Am/Is/Are', 'V(s/es)', 'V(nguyên)', 'do/does', 'Do/Does'].some(k => part.includes(k))) {
            styleClass = `${highlightClass} font-bold shadow-sm`;
          } else if (part === 'not') {
            styleClass = "bg-rose-500 text-white border-rose-500 font-bold shadow-sm";
          } else if (part === '?') {
            styleClass = "bg-transparent border-none text-stone-400 font-bold text-xl px-0";
          }

          // Special case for Subject to make it distinct but neutral
          if (part === 'S') {
            styleClass = "bg-stone-100 border-stone-300 text-stone-700 font-bold";
          }

          return (
            <React.Fragment key={idx}>
              <div className={`px-3 py-2 rounded-lg border-2 text-sm md:text-base whitespace-nowrap transition-all duration-300 ${styleClass}`}>
                {part}
              </div>
              {/* Add separator arrow or spacing if not the last item and not followed by punctuation */}
              {idx < parts.length - 1 && parts[idx + 1] !== '?' && (
                <span className="text-stone-300 text-xs"><ArrowRight size={14} /></span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <section id="formulas" className="bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-stone-100 bg-stone-50">
        <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-amber-500" />
          <span>Cấu Trúc Câu (Formulas)</span>
        </h2>
        <p className="mt-2 text-stone-600 leading-relaxed">
          So sánh sự khác biệt giữa động từ <strong>"To Be"</strong> và <strong>Động từ thường</strong>. Chọn các thẻ bên dưới để xem sự thay đổi vị trí của các thành phần trong câu.
        </p>
      </div>

      <div className="p-6 md:p-8">
        {/* Interactive Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
          <button
            onClick={() => setMode('positive')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ring-2 ring-transparent ${
              mode === 'positive'
                ? 'bg-emerald-100 text-emerald-700 ring-emerald-400'
                : 'bg-stone-200 text-stone-600 hover:bg-emerald-50 hover:text-emerald-600'
            }`}
          >
            (+) Khẳng Định
          </button>
          <button
            onClick={() => setMode('negative')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ring-2 ring-transparent ${
              mode === 'negative'
                ? 'bg-rose-100 text-rose-700 ring-rose-400'
                : 'bg-stone-200 text-stone-600 hover:bg-rose-50 hover:text-rose-600'
            }`}
          >
            (-) Phủ Định
          </button>
          <button
            onClick={() => setMode('question')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ring-2 ring-transparent ${
              mode === 'question'
                ? 'bg-blue-100 text-blue-700 ring-blue-400'
                : 'bg-stone-200 text-stone-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            (?) Nghi Vấn
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* To Be Column */}
          <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 relative transition-all duration-300 hover:scale-[1.01] hover:shadow-md group flex flex-col">
            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <span className="text-4xl">🔵</span>
            </div>
            <h3 className="text-lg font-bold text-blue-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Động từ "To Be"
            </h3>
            
            <div className="flex-grow flex flex-col justify-center animate-fade-in space-y-4">
              <div className="min-h-[60px] flex items-center">
                {renderStructureBlocks(activeData.tobe.structure, 'tobe')}
              </div>
              
              <div className="pt-4 border-t border-blue-100/50">
                <div className="flex items-start gap-2 text-sm text-stone-600 bg-white/60 p-3 rounded-xl">
                   <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                   <div>
                     <span className="font-bold text-blue-700 text-xs uppercase tracking-wide block mb-1">Ví Dụ</span>
                     <span className="italic font-medium text-lg">{activeData.tobe.example}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Normal Verb Column */}
          <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 relative transition-all duration-300 hover:scale-[1.01] hover:shadow-md group flex flex-col">
             <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <span className="text-4xl">🟠</span>
            </div>
            <h3 className="text-lg font-bold text-amber-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Động từ Thường (V)
            </h3>
            
            <div className="flex-grow flex flex-col justify-center animate-fade-in space-y-4">
              <div className="min-h-[60px] flex items-center">
                {renderStructureBlocks(activeData.verb.structure, 'verb')}
              </div>

              <div className="pt-4 border-t border-amber-100/50">
                <div className="flex items-start gap-2 text-sm text-stone-600 bg-white/60 p-3 rounded-xl">
                   <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                   <div>
                     <span className="font-bold text-amber-700 text-xs uppercase tracking-wide block mb-1">Ví Dụ</span>
                     <span className="italic font-medium text-lg">{activeData.verb.example}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormulaSection;