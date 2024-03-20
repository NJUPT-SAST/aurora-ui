import { create } from 'zustand';

interface State {
  currentPage: number;
}

interface Action {
  increaseCurrentPage: () => void;
  decreaseCurrentPage: () => void;
  changeCurrentPage: (currentPage: State['currentPage']) => void;
}

export const useCurrentPageStore = create<State & Action>((set) => ({
  currentPage: 1,
  increaseCurrentPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  decreaseCurrentPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
  changeCurrentPage: (newCurrentPage) => set(() => ({ currentPage: newCurrentPage })),
}));
