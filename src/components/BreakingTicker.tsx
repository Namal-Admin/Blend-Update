import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface BreakingTickerProps {
  items: string[];
  onSelectBreaking?: (text: string) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({
  items,
  onSelectBreaking
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, items.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="max-w-[1250px] mx-auto px-4 md:px-[6%] py-3 flex items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          {/* BREAKING badge matching .breaking strong */}
          <span className="bg-[#6b21a8] text-white font-black text-xs uppercase px-3 py-1.5 tracking-wider shrink-0 select-none">
            BREAKING
          </span>

          {/* Headline text */}
          <div
            className="truncate text-[#111111] font-semibold text-xs sm:text-sm hover:text-[#6b21a8] transition-colors cursor-pointer"
            onClick={() => onSelectBreaking && onSelectBreaking(items[currentIndex])}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            title="Click to read details"
          >
            {items[currentIndex]}
          </div>
        </div>

        {/* Ticker controls */}
        <div className="flex items-center gap-1 shrink-0 text-neutral-400">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 hover:text-neutral-700 transition-colors cursor-pointer"
            title={isPaused ? 'Resume ticker' : 'Pause ticker'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handlePrev}
            className="p-1 hover:text-neutral-700 transition-colors cursor-pointer"
            title="Previous breaking headline"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 hover:text-neutral-700 transition-colors cursor-pointer"
            title="Next breaking headline"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
