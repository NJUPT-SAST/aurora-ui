import type { OptionProps } from './Select';
import { createStore, create } from 'zustand';
import { createContext } from 'react';

export const SelectItemContext = createContext<selectItemStore | null>(null);
export const KeySelectItemContext = createContext<keySelectItemStore | null>(null);

export interface SelectItemProps {
  selectItem: OptionProps | undefined;
}

const DEFAULT_PROPS: SelectItemProps = {
  selectItem: undefined,
};

interface SelectItemState extends SelectItemProps {
  updateSelectItem: (value: OptionProps | undefined) => void;
}

export type selectItemStore = ReturnType<typeof createSelectItemStore>;

export const createSelectItemStore = (initProps?: Partial<SelectItemProps>) => {
  return createStore<SelectItemState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    updateSelectItem: (value) => set({ selectItem: value }),
  }));
};

interface KeySelectItemState extends SelectItemProps {
  updateSelectItem: (value: OptionProps | undefined) => void;
}

export type keySelectItemStore = ReturnType<typeof createKeySelectItemStore>;

export const createKeySelectItemStore = (initProps?: Partial<SelectItemProps>) => {
  return createStore<KeySelectItemState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    updateSelectItem: (value) => set({ selectItem: value }),
  }));
};

interface InputStringStore {
  value: string | undefined;
  changeValue: (value: string | undefined) => void;
}

export const useInputStringStore = create<InputStringStore>()((set) => ({
  value: undefined,
  changeValue: (value) => set({ value: value }),
}));
