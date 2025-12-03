import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ADVERBS } from '../constants';
import { BarChart2, ArrowRight } from 'lucide-react';

const AdverbSection: React.FC = () => {
  return (
    <section id="adverbs" className="bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-stone-100 bg-stone-50">
        <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
          <BarChart2 className="w-8 h-8 text-amber-500" />
          <span>Trạng Từ Chỉ Tần Suất</span>
        </h2>
        <p className="mt-2 text-stone-600">
          Trực quan hóa mức độ thường xuyên của các hành động và vị trí chính xác của trạng từ trong câu.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* Chart Side */}
        <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-stone-100">
          <h3 className="font-bold text-stone-700 mb-6 text-center text-sm uppercase tracking-wide">Thước Đo Tần Suất (%)</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={ADVERBS}
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis 
                  dataKey="shortLabel" 
                  type="category" 
                  tick={{ fill: '#78716c', fontSize: 12, fontWeight: 600 }}
                  width={70}
                />
                <Tooltip
                  cursor={{ fill: '#f5f5f4' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${value}%`, 'Tần suất']}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {ADVERBS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Position Simulator Side */}
        <div className="p-6 md:p-8 bg-stone-50 flex flex-col justify-center">
          <h3 className="font-bold text-stone-700 mb-6 text-center text-sm uppercase tracking-wide">Vị Trí Trong Câu</h3>

          <div className="space-y-6">
            {/* Rule 1 */}
            <div className="bg-white p-5 rounded-xl border-l-4 border-amber-500 shadow-sm hover:shadow-md transition-all group cursor-default">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-stone-800 text-sm">Trước Động Từ Thường</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-semibold">Phổ biến</span>
              </div>
              <div className="text-lg font-mono text-stone-600 group-hover:text-amber-700 transition-colors flex items-center gap-2">
                She 
                <span className="font-bold underline text-amber-600 decoration-2 underline-offset-2">always</span> 
                gets up.
              </div>
              <div className="mt-2 text-xs text-stone-400 font-mono bg-stone-100 inline-block px-2 py-1 rounded">
                S + [Adverb] + V
              </div>
            </div>

            {/* Rule 2 */}
            <div className="bg-white p-5 rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-all group cursor-default">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-stone-800 text-sm">Sau Động Từ "To Be"</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">Lưu ý</span>
              </div>
              <div className="text-lg font-mono text-stone-600 group-hover:text-blue-700 transition-colors flex items-center gap-2">
                He <span className="italic text-stone-400">is</span> <span className="font-bold underline text-blue-600 decoration-2 underline-offset-2">never</span> late.
              </div>
              <div className="mt-2 text-xs text-stone-400 font-mono bg-stone-100 inline-block px-2 py-1 rounded">
                S + am/is/are + [Adverb]
              </div>
            </div>

            {/* Rule 3 */}
            <div className="bg-white p-5 rounded-xl border-l-4 border-stone-400 shadow-sm hover:shadow-md transition-all group cursor-default">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-stone-800 text-sm">Giữa Trợ Động Từ & V</span>
                <span className="text-xs bg-stone-200 text-stone-600 px-2 py-1 rounded font-semibold">Auxiliary</span>
              </div>
              <div className="text-lg font-mono text-stone-600 group-hover:text-stone-800 transition-colors flex items-center gap-2">
                I <span className="italic text-stone-400">do</span> <span className="font-bold underline text-stone-600 decoration-2 underline-offset-2">not often</span> go...
              </div>
              <div className="mt-2 text-xs text-stone-400 font-mono bg-stone-100 inline-block px-2 py-1 rounded">
                Aux + [Adverb] + V
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdverbSection;
