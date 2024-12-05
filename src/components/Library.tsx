import React from 'react';
import { Book } from 'lucide-react';
import { useReaderStore } from '../store/useReaderStore';

export function Library() {
  const { books, setCurrentBook } = useReaderStore();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer aspect-[2/3] flex flex-col"
          onClick={() => setCurrentBook(book)}
        >
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex-1 bg-gray-100 flex items-center justify-center">
              <Book className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <div className="p-2 bg-white/90 absolute bottom-0 w-full">
            <h3 className="font-semibold text-sm truncate">{book.title}</h3>
            {book.author && (
              <p className="text-gray-600 text-xs truncate">{book.author}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}