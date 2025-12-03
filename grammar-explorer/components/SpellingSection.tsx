import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SPELLING_DATA } from '../constants';
import { AnalysisResult } from '../types';
import { Search, PenTool, Lightbulb } from 'lucide-react';

const SpellingSection: React.FC = () => {
  const [verbInput, setVerbInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeVerb = () => {
    const input = verbInput.trim().toLowerCase();
    if (!input) return;

    let base = input;
    let suffix = "";
    let explanation = "";

    if (input === 'have') {
      base = "";
      suffix = "has";
      explanation = "Bất quy tắc đặc biệt: Động từ 'have' chuyển thành 'has'.";
    } else if (input.endsWith('y')) {
      const vowels = ['u', 'e', 'o', 'a', 'i'];
      const letterBeforeY = input[input.length - 2];

      if (vowels.includes(letterBeforeY)) {
        suffix = "s";
        explanation = `Trường hợp 2 (Đuôi Y): Trước 'y' là nguyên âm '${letterBeforeY}' (u,e,o,a,i) → Giữ nguyên 'y' thêm 's'.`;
      } else {
        base = input.substring(0, input.length - 1);
        suffix = "ies";
        explanation = `Trường hợp 1 (Đuôi Y): Trước 'y' là phụ âm → Đổi 'y' thành 'i' rồi thêm 'es'.`;
      }
    } else {
      let needsEs = false;
      if (input.endsWith('ch') || input.endsWith('sh') || input.endsWith('ss')) {
        needsEs = true;
      } else {
        const lastChar = input.slice(-1);
        if (['o', 's', 'x', 'z'].includes(lastChar)) {
          needsEs = true;
        }
      }

      if (needsEs) {
        suffix = "es";
        explanation = `Quy tắc thêm "-es": Động từ tận cùng là o, s, ss, ch, sh, x, z (Mẹo: O Chanh Sợ Sẽ Sh) → Thêm 'es'.`;
      } else {
        suffix = "s";
        explanation = `Các trường hợp còn lại: Động từ không thuộc nhóm đặc biệt → Chỉ cần thêm 's'.`;
      }
    }

    setResult({ base, suffix, explanation });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') analyzeVerb();
  };

  return (
    <section id="spelling" className="grid lg:grid-cols-5 gap-8">
      {/* Left: Visualizer & Theory */}
      <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6 border border-stone-100 flex flex-col h-full">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
            <PenTool className="w-6 h-6 text-amber-500" />
            <span>Quy Tắc "s/es"</span>
          </h2>
          <p className="text-sm text-stone-500 mt-2">
            Phân bố các trường hợp chia ngôi thứ 3 số ít.
          </p>
        </div>

        <div className="flex-grow min-h-[250px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={SPELLING_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {SPELLING_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 bg-stone-50 p-4 rounded-xl border border-stone-200 text-sm">
          <p className="font-bold text-stone-700 mb-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Mẹo Nhớ Đuôi "-es":
          </p>
          <p className="text-amber-600 font-bold italic text-lg text-center my-2">"O Chanh Sợ Sẽ Sh"</p>
          <p className="text-stone-400 text-xs text-center">(Ông Chín Sáu Sợ Xe Z)</p>
        </div>
      </div>

      {/* Right: Interactive Verb Analyzer */}
      <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-stone-100 relative overflow-hidden flex flex-col">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <h3 className="text-xl font-bold text-stone-800 mb-2">Máy Phân Tích Động Từ</h3>
        <p className="text-stone-600 mb-8">
          Nhập bất kỳ động từ tiếng Anh nào (ví dụ: <em>watch, study, play, go</em>) để xem cách chia ngôi thứ 3 số ít.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={verbInput}
            onChange={(e) => setVerbInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Nhập động từ (vd: fix)..."
            className="flex-1 px-5 py-4 rounded-xl border-2 border-stone-200 focus:border-amber-500 focus:outline-none text-lg font-bold text-stone-700 bg-stone-50 placeholder-stone-400 transition-colors"
          />
          <button
            onClick={analyzeVerb}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transform active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Phân Tích
          </button>
        </div>

        {/* Result Card */}
        {result && (
          <div className="animate-fade-in-up bg-gradient-to-br from-stone-50 to-white border border-stone-200 rounded-2xl p-6 relative shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="text-center md:text-left">
                <span className="block text-xs text-stone-400 uppercase tracking-wider font-bold mb-2">Kết Quả</span>
                <div className="text-4xl md:text-5xl font-extrabold text-stone-800 tracking-tight">
                  <span className="text-stone-400">{result.base}</span>
                  <span className="text-amber-600 underline decoration-amber-200 decoration-4 underline-offset-4">{result.suffix}</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm h-full flex flex-col justify-center">
                <h4 className="font-bold text-stone-700 mb-2 border-b border-stone-100 pb-2 text-sm">Giải Thích:</h4>
                <p className="text-stone-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: result.explanation }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SpellingSection;
