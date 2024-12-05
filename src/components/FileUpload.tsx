import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useReaderStore } from '../store/useReaderStore';
import { extractBookMetadata } from '../utils/epub';

export function FileUpload() {
  const addBook = useReaderStore((state) => state.addBook);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.name.endsWith('.epub')) return;

    const buffer = await file.arrayBuffer();
    const metadata = await extractBookMetadata(buffer);
    
    const book = {
      id: crypto.randomUUID(),
      title: metadata.title || file.name.replace('.epub', ''),
      author: metadata.author,
      coverUrl: metadata.coverUrl,
      progress: 0,
      file: buffer,
    };

    addBook(book);
  }, [addBook]);

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-8 h-8 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">EPUB files only</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".epub"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}