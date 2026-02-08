import { createContext } from 'react';
import type { Dispatch } from 'react';
import type { AnalysisResult } from '../types';

export interface AnalysisState {
  userText: string;
  result: AnalysisResult | null;
  loading: boolean;
  error: string | null;
}

export type AnalysisAction =
  | { type: 'SET_USER_TEXT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_RESULT'; payload: AnalysisResult }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET' };

export const AnalysisContext = createContext<{
  state: AnalysisState;
  dispatch: Dispatch<AnalysisAction>;
} | null>(null);
