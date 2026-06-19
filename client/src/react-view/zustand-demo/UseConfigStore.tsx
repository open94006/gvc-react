import { create } from 'zustand';

interface TestConfig {
  text: string;
  updateText: (text: string) => void;
}

export const useConfigStore = create<TestConfig>(set => {
  return {
    text: '',
    updateText: text => set({ text }),
  };
});
