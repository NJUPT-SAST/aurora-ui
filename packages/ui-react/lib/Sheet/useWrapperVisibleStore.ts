import { create } from 'zustand';

interface State {
  wrapperVisible: boolean;
}

interface Action {
  open: () => void;
  close: () => void;
}

export const useWrapperVisibleStore = create<State & Action>((set) => ({
  wrapperVisible: false,
  open: () => set(() => ({ wrapperVisible: true })),
  close: () => set({ wrapperVisible: false }),
}));
