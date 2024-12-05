import React, { useRef, useState } from 'react';
import { ChevronLeft, Menu, Settings, X } from 'lucide-react';
import { useReaderStore } from '../../store/useReaderStore';
import { ReaderSettings } from './ReaderSettings';
import { TableOfContents } from './TableOfContents';
import { useEpubRendition } from '../../hooks/useEpubRendition';

export function ReaderView() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showToc, setShowToc] = useState(true);
  const { currentBook, settings, setCurrentBook } = useReaderStore();

  const { rendition, navigation, display } = useEpubRendition({
    book: currentBook!,
    settings,
    containerRef: viewerRef,
  });

  if (!currentBook) return null;

  return (
    <div className="fixed inset-0 bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`bg-white w-80 flex-shrink-0 flex flex-col shadow-lg ${showToc ? '' : '-ml-80'} transition-all duration-300`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{currentBook.title}</h2>
            <button
              onClick={() => setShowToc(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {currentBook.coverUrl && (
            <div className="aspect-[2/3] mb-4">
              <img
                src={currentBook.coverUrl}
                alt={currentBook.title}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          <TableOfContents
            navigation={navigation}
            onNavigate={display}
            onClose={() => setShowToc(false)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowToc(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentBook(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Library
            </button>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 relative">
          <div ref={viewerRef} className="absolute inset-0" />
        </div>

        {showSettings && (
          <ReaderSettings onClose={() => setShowSettings(false)} />
        )}
      </div>
    </div>
  );
}