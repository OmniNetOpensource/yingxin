import { useReducer } from 'react';
import type { ReactNode } from 'react';
import {
  AnalysisContext,
  type AnalysisAction,
  type AnalysisState,
} from './analysisContextObject';

const initialState: AnalysisState = {
  userText: '',
  result: null,
  loading: false,
  error: null,
};

function analysisReducer(state: AnalysisState, action: AnalysisAction): AnalysisState {
  switch (action.type) {
    case 'SET_USER_TEXT':
      return { ...state, userText: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload, error: null };
    case 'SET_RESULT':
      return { ...state, result: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(analysisReducer, initialState);
  return (
    <AnalysisContext.Provider value={{ state, dispatch }}>
      {children}
    </AnalysisContext.Provider>
  );
}
