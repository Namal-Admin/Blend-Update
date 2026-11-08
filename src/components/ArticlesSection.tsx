import React from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
import { Article, Category } from '../types';
import { ArticleCard } from './ArticleCard';

interface ArticlesSectionProps {
  articles: Article[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: Category | 'Saved';
  onCategoryChange: (category: Category | 'Saved') => void;
  savedArticleIds: string[];
  onSelectArticle: (article: Article) => void;
  onToggleSave: (articleId: string) => void;
  onShare: (article: Article) => void;
  onClearFilters: () => void;
}

const CATEGORY_TABS: (Category | 'Saved')[] = [
  'All',
  'Kenya News',
  'Africa',
  'World News',
  'Politics',
  'Technology',
  'Entertainment',
  'Sports',
  'Lifestyle',
  'Saved'
];

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  articles,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  savedArticleIds,
  onSelectArticle,
  onToggleSave,
  onShare,
  onClearFilters,
}) => {
  return (
    <section id="news" className="scroll-mt-16">
      {/* Section Title matching .section-title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-[22px] font-black tracking-tight border-l-[5px] border-[#6b21a8] pl-3 uppercase text-[#111111]">
          {activeCategory === 'Saved' ? 'SAVED BOOKMARKS' : 'LATEST STORIES'}
        </h2>

        <div className="text-xs text-neutral-500 font-semibold">
          Showing {articles.length} {articles.length === 1 ? 'story' : 'stories'}
          {activeCategory !== 'All' && <span> in <strong className="text-[#6b21a8]">{activeCategory}</strong></span>}
          {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
        </div>
      </div>

      {/* Toolbar matching .toolbar: flex; gap: 12px; margin-bottom: 22px; */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              id="search"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search news, people and stories..."
              className="w-full p-[13px] pl-10 border border-[#cccccc] bg-white text-sm text-[#111111] focus:outline-none focus:border-[#6b21a8] transition-colors"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => {
              // Focus or submit search
              const el = document.getElementById('search');
              el?.focus();
            }}
            className="border-0 bg-[#111111] hover:bg-[#222222] text-white px-5 sm:px-7 font-black text-xs sm:text-sm tracking-wider uppercase transition-colors cursor-pointer select-none shrink-0"
          >
            SEARCH
          </button>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => onCategoryChange(tab)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer rounded-sm ${
                  isActive
                    ? 'bg-[#6b21a8] text-white shadow-xs'
                    : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                }`}
              >
                {tab}
                {tab === 'Saved' && savedArticleIds.length > 0 && (
                  <span className="ml-1.5 text-[10px] bg-black/20 text-current px-1.5 py-0.2 rounded-full font-extrabold">
                    {savedArticleIds.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid matching .articles: repeat(3, 1fr) with gap 22px */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]" id="articles">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isSaved={savedArticleIds.includes(article.id)}
              onSelect={onSelectArticle}
              onToggleSave={onToggleSave}
              onShare={onShare}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white p-12 text-center border border-neutral-200 my-8 shadow-xs">
          <Search className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <h3 className="text-lg font-black text-neutral-800 mb-1 uppercase">
            No Stories Found
          </h3>
          <p className="text-sm text-neutral-500 max-w-md mx-auto mb-5">
            {activeCategory === 'Saved'
              ? 'You have not bookmarked any articles yet. Tap the bookmark icon on any story to save it for offline or later reading.'
              : `We couldn't find any articles matching your search "${searchQuery}". Try using different keywords or reset your filters.`}
          </p>
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#6b21a8] text-white px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
};
