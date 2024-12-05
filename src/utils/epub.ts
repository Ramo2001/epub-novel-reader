import ePub from 'epubjs';
import type { Book } from '../types/epub';

export async function extractBookMetadata(file: ArrayBuffer): Promise<Partial<Book>> {
  const book = ePub(file);
  
  try {
    await book.ready;
    
    const metadata = await book.loaded.metadata;
    const cover = await book.loaded.cover;
    
    let coverUrl: string | undefined;
    if (cover) {
      coverUrl = await book.coverUrl();
    }

    return {
      title: metadata.title || 'Unknown Title',
      author: metadata.creator || undefined,
      coverUrl,
    };
  } catch (error) {
    console.warn('Failed to extract book metadata:', error);
    return {};
  } finally {
    book.destroy();
  }
}