import { useEffect, useState } from 'react';
import ePub from 'epubjs';
import type { Book, Navigation, ReaderSettings } from '../types/epub';

interface UseEpubRenditionProps {
  book: Book;
  settings: ReaderSettings;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function useEpubRendition({ book, settings, containerRef }: UseEpubRenditionProps) {
  const [rendition, setRendition] = useState<any>(null);
  const [navigation, setNavigation] = useState<Navigation[]>([]);

  useEffect(() => {
    if (!book || !containerRef.current) return;

    const epubBook = ePub(book.file);
    
    epubBook.loaded.navigation.then((nav) => {
      const toc = nav.toc.map((item: any) => ({
        label: item.label,
        href: item.href,
      }));
      setNavigation(toc);
    });

    const options = {
      width: '100%',
      height: '100%',
      spread: 'none',
      flow: 'scrolled-doc',
      manager: 'continuous'
    };

    const newRendition = epubBook.renderTo(containerRef.current, options);
    setRendition(newRendition);

    newRendition.display();

    return () => {
      setRendition(null);
      if (newRendition) {
        try {
          newRendition.destroy();
        } catch (e) {
          console.warn('Error destroying rendition:', e);
        }
      }
      epubBook.destroy();
    };
  }, [book]);

  useEffect(() => {
    if (!rendition) return;

    rendition.themes.fontSize(`${settings.fontSize}px`);
    rendition.themes.font(settings.fontFamily);
    
    const theme = {
      light: { body: { background: '#ffffff', color: '#000000' } },
      dark: { body: { background: '#1a1a1a', color: '#ffffff' } },
      sepia: { body: { background: '#f4ecd8', color: '#5b4636' } },
    }[settings.theme];

    rendition.themes.override('color', theme.body.color);
    rendition.themes.override('background', theme.body.background);
  }, [rendition, settings]);

  return {
    rendition,
    navigation,
    display: (href: string) => rendition?.display(href),
  };
}