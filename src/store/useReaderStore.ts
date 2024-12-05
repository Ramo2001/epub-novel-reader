import { create } from 'zustand';
import type { Book, ReaderSettings } from '../types/epub';

interface ReaderStore {
  books: Book[];
  currentBook: Book | null;
  settings: ReaderSettings;
  addBook: (book: Book) => void;
  setCurrentBook: (book: Book | null) => void;
  updateSettings: (settings: Partial<ReaderSettings>) => void;
}

const DEFAULT_SETTINGS: ReaderSettings = {
  fontSize: 16,
  fontFamily: 'serif',
  theme: 'light',
  lineHeight: 1.5,
  margins: 2,
};

export const useReaderStore = create<ReaderStore>((set) => ({
  books: [],
  currentBook: null,
  settings: DEFAULT_SETTINGS,
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  setCurrentBook: (book) => set({ currentBook: book }),
  updateSettings: (newSettings) =>
    set((state) => ({ settings: { ...state.settings, ...newSettings } })),
}));