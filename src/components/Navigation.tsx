import React, { useState } from 'react';
import { Menu, X, Flame } from 'lucide-react';
import { Category } from '../types';

interface NavigationProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CATEGORIES: Category[] = [
  'All',
  'Kenya News',
  'Africa',
  'World News',
  'Politics',
  'Technology',
  'Entertainment',
  'Sports',
  'Lifestyle'
];

export const Navigation: React.FC<NavigationProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategoryClick = (cat: Category) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);

    // Smooth scroll down to news section if selecting specific category
    if (cat !== 'All') {
      const newsSection = document.getElementById('news');
      if (newsSection) {
        newsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#e31b23] sticky top-0 z-40 shadow-md">
      <div className="max-w-[1250px] mx-auto px-4 md:px-[6%]">
        <div className="flex items-center justify-between py-3">
          {/* Desktop Nav matching user layout */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 flex-wrap">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`text-white font-extrabold text-xs lg:text-sm tracking-wider uppercase transition-all duration-150 relative py-1 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'border-b-2 border-white text-white drop-shadow-sm font-black'
                      : 'text-white/90 hover:text-white hover:underline'
                  }`}
                >
                  {cat === 'All' ? 'HOME' : cat}
                </button>
              );
            })}
          </nav>

          {/* Quick Trending Indicator */}
          <div className="hidden xl:flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-wider pl-4 border-l border-white/20">
            <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Trending Stories</span>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center justify-between w-full">
            <div className="flex items-center gap-2 text-white font-black text-xs tracking-wider uppercase">
              <span>Section:</span>
              <span className="bg-black/25 px-2 py-0.5 rounded text-white">
                {activeCategory === 'All' ? 'HOME' : activeCategory}
              </span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white hover:bg-black/20 rounded transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-1 border-t border-white/20 flex flex-col gap-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`text-left px-3 py-2 text-xs font-black uppercase tracking-wider transition-colors rounded ${
                    isActive ? 'bg-black/30 text-white' : 'text-white hover:bg-white/10'
                  }`}
                >
                  {cat === 'All' ? 'HOME' : cat}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
