import React from 'react';
import { FileUpload } from './components/FileUpload';
import { Library } from './components/Library';
import { ReaderView } from './components/Reader/ReaderView';
import { useReaderStore } from './store/useReaderStore';

function App() {
  const { books, currentBook } = useReaderStore();

  if (currentBook) {
    return <ReaderView />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">EPUB Reader</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <FileUpload />
        {books.length > 0 && <Library />}
        {books.length === 0 && (
          <div className="text-center mt-8 text-gray-500">
            No books in your library yet. Upload an EPUB file to get started!
          </div>
        )}
      </main>
    </div>
  );
}

export default App;