import { create } from "zustand";

type UiState = {
  isNavigationOpen: boolean;
  setNavigationOpen: (open: boolean) => void;
  toggleNavigation: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  isNavigationOpen: false,
  setNavigationOpen: (open) => set({ isNavigationOpen: open }),
  toggleNavigation: () =>
    set((state) => ({ isNavigationOpen: !state.isNavigationOpen })),
}));
