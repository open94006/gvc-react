import { create } from 'zustand';

interface NumberState {
  count: number;
  increment: (n: number) => void;
  resetCount: () => void;
}

export const useCounter = create<NumberState>(set => {
  return {
    count: 0,
    increment: (n: number) => {
      set(state => {
        return { ...state, count: state.count + n };
      });
    },
    resetCount: () => {
      set(state => {
        return { ...state, count: 0 };
      });
    },
  };
});
