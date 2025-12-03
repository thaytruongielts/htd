export type FormulaMode = 'positive' | 'negative' | 'question';

export interface AdverbData {
  label: string;
  shortLabel: string;
  value: number;
  color: string;
}

export interface SpellingRuleData {
  name: string;
  value: number;
  color: string;
}

export interface FormulaContent {
  title: string;
  color: string;
  tobe: {
    structure: string;
    example: string;
  };
  verb: {
    structure: string;
    example: string;
  };
}

export interface AnalysisResult {
  base: string;
  suffix: string;
  explanation: string;
}
