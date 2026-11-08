import React, { useState, useEffect } from 'react';
import { Bookmark, Send, Sun, TrendingUp } from 'lucide-react';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenTipModal: () => void;
  onSelectCategory: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenSaved,
  onOpenTipModal,
  onSelectCategory,
}) => {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const formatted = new Date().toLocaleDateString('en-KE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formatted);
  }, []);

  return (
    <header className="bg-[#111111] text-white">
      {/* Topbar: Global & African digital news platform */}
      <div className="bg-[#222222] text-[#cccccc] text-xs px-4 md:px-[6%] py-2 border-b border-neutral-800">
        <div className="max-w-[1250px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3 tracking-wider font-semibold text-[11px] sm:text-xs">
            <span className="text-white">GLOBAL &amp; PAN-AFRICAN DIGITAL NEWS, CULTURE &amp; ENTERTAINMENT</span>
            <span className="hidden lg:inline text-neutral-600">|</span>
            <span className="hidden lg:flex items-center gap-1.5 text-neutral-400">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Nairobi 24°C · London 16°C</span>
              <span className="text-neutral-600">·</span>
              <span className="text-emerald-400 font-medium">USD/KES 129.50</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span id="today" className="text-neutral-300 font-medium">
              {currentDate || 'Loading date...'}
            </span>
            <span className="text-neutral-600">|</span>
            <button
              onClick={onOpenTipModal}
              className="flex items-center gap-1.5 text-[#e31b23] hover:text-white transition-colors font-bold uppercase tracking-wider text-[11px] cursor-pointer"
              title="Submit news tip or scoop"
            >
              <Send className="w-3 h-3" />
              <span>Tip Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Brand row with official logo and bold brand wordmark */}
      <div className="px-4 md:px-[6%] py-4 md:py-6 max-w-[1250px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* User uploaded community logo asset */}
          <div className="relative group shrink-0">
            <img
              src="/assets/aistudio/Real_Blend_Community_Logo_4137823f.png"
              alt="Real Blend Community Logo"
              className="w-14 h-14 md:w-18 md:h-18 object-contain bg-white rounded-lg p-1 shadow-md hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <a href="#" onClick={(e) => { e.preventDefault(); onSelectCategory('All'); }} className="block">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none text-white select-none">
                THE REAL <span className="text-[#e31b23]">BLEND.</span>
              </div>
              <div className="text-[11px] sm:text-xs text-[#cccccc] font-semibold tracking-widest mt-1 uppercase">
                NEWS. TRENDS. STORIES THAT MATTER.
              </div>
            </a>
          </div>
        </div>

        {/* Action utility bar */}
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
          {/* Saved Articles button */}
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 rounded text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            title="View saved bookmarks"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#e31b23]" />
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="bg-[#e31b23] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {/* Tip scoop button */}
          <button
            onClick={onOpenTipModal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#e31b23] hover:bg-[#c9151c] text-white rounded text-xs font-bold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Submit Scoop</span>
          </button>
        </div>
      </div>
    </header>
  );
};
