export interface Book {
  id: string;
  title: string;
  author?: string;
  coverUrl?: string;
  progress: number;
  file: ArrayBuffer;
}

export interface ReaderSettings {
  fontSize: number;
  fontFamily: string;
  theme: 'light' | 'dark' | 'sepia';
  lineHeight: number;
  margins: number;
}

export interface Navigation {
  label: string;
  href: string;
}