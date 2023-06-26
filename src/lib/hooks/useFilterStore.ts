import { create } from "zustand";

interface Filter {
  query: string;
  genre: string | null;
}

interface FilterState {
  filter: Filter;
  setGenre: (genre: string | null) => void;
  setQuery: (query: string) => void;
  resetFilter: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filter: { query: "", genre: null },

  setGenre: (genre: string | null) =>
    set((state) => ({ filter: { ...state.filter, genre } })),

  setQuery: (query: string) =>
    set((state) => ({ filter: { ...state.filter, query } })),

  resetFilter: () =>
    set(() => ({
      filter: { query: "", genre: null },
    })),
}));
