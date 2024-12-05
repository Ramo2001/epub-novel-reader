import React from 'react';
import { Navigation } from '../../types/epub';

interface Props {
  navigation: Navigation[];
  onNavigate: (href: string) => void;
  onClose: () => void;
}

export function TableOfContents({ navigation, onNavigate }: Props) {
  return (
    <nav className="py-4">
      <h3 className="px-4 text-sm font-medium text-gray-500 mb-2">Chapters</h3>
      <div className="space-y-1">
        {navigation.map((item, index) => (
          <button
            key={index}
            onClick={() => onNavigate(item.href)}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}