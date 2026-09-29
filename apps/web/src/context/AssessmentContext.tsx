import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { isValidAnswer, isValidAnswers, questions } from '@maa-care/epds-core';

type State = { answers: number[]; complete: boolean };
type Action = { type: 'answer'; index: number; answer: number } | { type: 'complete' } | { type: 'clear' };
export const initialState: State = { answers: [], complete: false };
export function assessmentReducer(state: State, action: Action): State {
  if (action.type === 'clear') return { answers: [], complete: false };
  if (action.type === 'complete') return isValidAnswers(state.answers) ? { ...state, complete: true } : state;
  if (state.complete || !Number.isInteger(action.index) || action.index < 0 || action.index >= questions.length || !isValidAnswer(action.answer)) return state;
  const answers = [...state.answers];
  answers[action.index] = action.answer;
  return { answers, complete: false };
}
const Context = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);
export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
}
export function useAssessment() {
  const context = useContext(Context);
  if (!context) throw new Error('Assessment provider required');
  return context;
}
