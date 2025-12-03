import { AdverbData, FormulaContent, FormulaMode, SpellingRuleData } from './types';

export const ADVERBS: AdverbData[] = [
  { label: 'Always (Luôn luôn)', shortLabel: 'Always', value: 100, color: '#059669' }, // emerald-600
  { label: 'Usually (Thường xuyên)', shortLabel: 'Usually', value: 80, color: '#10b981' }, // emerald-500
  { label: 'Often (Thường)', shortLabel: 'Often', value: 60, color: '#34d399' }, // emerald-400
  { label: 'Sometimes (Thỉnh thoảng)', shortLabel: 'Sometimes', value: 40, color: '#fbbf24' }, // amber-400
  { label: 'Rarely (Hiếm khi)', shortLabel: 'Rarely', value: 15, color: '#f87171' }, // red-400
  { label: 'Never (Không bao giờ)', shortLabel: 'Never', value: 0, color: '#ef4444' } // red-500
];

export const SPELLING_DATA: SpellingRuleData[] = [
  { name: 'Thêm "s" (Đa số)', value: 70, color: '#f59e0b' },
  { name: 'Thêm "es" (o,s,x,z,ch,sh)', value: 20, color: '#3b82f6' },
  { name: 'Đổi "y" -> "ies"', value: 10, color: '#10b981' },
];

export const FORMULAS: Record<FormulaMode, FormulaContent> = {
  positive: {
    title: "Khẳng Định (+)",
    color: "emerald",
    tobe: {
      structure: "S + am/is/are + N/Adj",
      example: "I am a student."
    },
    verb: {
      structure: "S + V(s/es) + Object",
      example: "She plays soccer."
    }
  },
  negative: {
    title: "Phủ Định (-)",
    color: "rose",
    tobe: {
      structure: "S + am/is/are + not + N/Adj",
      example: "He is not (isn't) tired."
    },
    verb: {
      structure: "S + do/does + not + V(nguyên)",
      example: "They do not (don't) know."
    }
  },
  question: {
    title: "Nghi Vấn (?)",
    color: "blue",
    tobe: {
      structure: "Am/Is/Are + S + N/Adj ?",
      example: "Are you happy?"
    },
    verb: {
      structure: "Do/Does + S + V(nguyên) ?",
      example: "Does she live here?"
    }
  }
};