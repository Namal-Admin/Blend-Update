import React from 'react';
import { Bookmark, Share2 } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  isSaved: boolean;
  onSelect: (article: Article) => void;
  onToggleSave: (articleId: string) => void;
  onShare: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isSaved,
  onSelect,
  onToggleSave,
  onShare,
}) => {
  return (
    <article
      data-category={article.category}
      className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
    >
      <div>
        {/* Thumbnail with hover effect */}
        <div
          onClick={() => onSelect(article)}
          className="relative h-[190px] w-full overflow-hidden bg-neutral-100 cursor-pointer"
        >
          <img
            src={article.imageUrl}
            alt={article.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out block"
          />

          {/* Quick save button overlay */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(article.id);
              }}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-[#6b21a8] text-white'
                  : 'bg-black/60 hover:bg-black/80 text-white'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save for later'}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare(article);
              }}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
              title="Share story"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content matching .article-content */}
        <div className="p-[17px]">
          {/* Category badge */}
          <span className="inline-block bg-[#6b21a8] text-white px-2.5 py-1 text-[11px] font-black uppercase tracking-wider mb-3">
            {article.category.toUpperCase()}
          </span>

          {/* Title */}
          <h3
            onClick={() => onSelect(article)}
            className="text-[17px] font-black leading-[1.4] mb-2.5 text-[#111111] hover:text-[#6b21a8] transition-colors cursor-pointer line-clamp-2"
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[#666666] text-[13px] leading-[1.6] line-clamp-3">
            {article.excerpt}
          </p>

          {/* Meta row matching .meta */}
          <div className="text-[11px] text-[#888888] mt-3 font-semibold tracking-wider flex items-center justify-between">
            <span>THE REAL BLEND | LATEST NEWS</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Read More button matching: .article a { color: var(--red); font-weight: bold; font-size: 13px; ... } */}
      <div className="px-[17px] pb-[17px] pt-1 border-t border-neutral-100 flex items-center justify-between">
        <button
          onClick={() => onSelect(article)}
          className="text-[#6b21a8] hover:text-[#581c87] font-black text-[13px] inline-flex items-center gap-1 uppercase tracking-wide cursor-pointer transition-transform group-hover:translate-x-1"
        >
          <span>READ MORE</span>
          <span>→</span>
        </button>

        <span className="text-[11px] text-neutral-400 font-medium">
          {article.date}
        </span>
      </div>
    </article>
  );
};
