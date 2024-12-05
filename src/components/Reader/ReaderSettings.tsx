import React from 'react';
import { X } from 'lucide-react';
import { useReaderStore } from '../../store/useReaderStore';

const FONT_SIZES = [12, 14, 16, 18, 20, 24];
const FONT_FAMILIES = ['serif', 'sans-serif', 'monospace'];
const THEMES = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
  { id: 'sepia', name: 'Sepia' },
] as const;

interface Props {
  onClose: () => void;
}

export function ReaderSettings({ onClose }: Props) {
  const { settings, updateSettings } = useReaderStore();

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Reader Settings</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size
          </label>
          <div className="flex gap-2">
            {FONT_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => updateSettings({ fontSize: size })}
                className={`px-3 py-1 rounded ${
                  settings.fontSize === size
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Family
          </label>
          <div className="flex gap-2">
            {FONT_FAMILIES.map((font) => (
              <button
                key={font}
                onClick={() => updateSettings({ fontFamily: font })}
                className={`px-3 py-1 rounded ${
                  settings.fontFamily === font
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                style={{ fontFamily: font }}
              >
                Aa
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <div className="flex gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => updateSettings({ theme: theme.id })}
                className={`px-3 py-1 rounded ${
                  settings.theme === theme.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}