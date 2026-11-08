import React from 'react';
import { Clock, User } from 'lucide-react';
import { Article } from '../types';

interface FeaturedGridProps {
  topStory: Article;
  sideStory: Article;
  onSelectArticle: (article: Article) => void;
}

export const FeaturedGrid: React.FC<FeaturedGridProps> = ({
  topStory,
  sideStory,
  onSelectArticle
}) => {
  return (
    <div className="mb-10">
      <h2 className="text-[22px] font-black tracking-tight border-l-[5px] border-[#6b21a8] pl-3 mb-5 uppercase text-[#111111]">
        TOP STORIES
      </h2>

      {/* Grid matching .featured: 2fr 1fr on desktop, 1fr on mobile */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Top Story (2 cols) */}
        <div
          onClick={() => onSelectArticle(topStory)}
          className="lg:col-span-2 relative min-h-[340px] sm:min-h-[400px] md:min-h-[460px] bg-[#222222] text-white overflow-hidden cursor-pointer group shadow-sm"
        >
          <img
            src={topStory.imageUrl}
            alt={topStory.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80';
            }}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {/* Gradient scrim matching .featured-main::after */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

          {/* Content container */}
          <div className="absolute z-20 bottom-6 left-5 right-5 sm:left-7 sm:right-7">
            <span className="inline-block bg-[#6b21a8] text-white px-2.5 py-1 text-[11px] font-black tracking-wider uppercase mb-3">
              TOP STORY
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-black leading-tight mb-2 text-white group-hover:text-neutral-200 transition-colors">
              {topStory.title}
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm line-clamp-2 mb-3 max-w-2xl font-normal leading-relaxed">
              {topStory.excerpt}
            </p>
            <div className="flex items-center gap-4 text-[11px] text-neutral-300">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#6b21a8]" />
                <span>{topStory.author}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#6b21a8]" />
                <span>{topStory.readTime}</span>
              </span>
              <span>·</span>
              <span className="text-[#6b21a8] font-bold tracking-wide uppercase hover:underline">
                READ STORY →
              </span>
            </div>
          </div>
        </div>

        {/* Side Story (1 col) */}
        <div
          onClick={() => onSelectArticle(sideStory)}
          className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[460px] bg-[#222222] text-white overflow-hidden cursor-pointer group shadow-sm"
        >
          <img
            src={sideStory.imageUrl}
            alt={sideStory.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop&q=80';
            }}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {/* Gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

          {/* Content container */}
          <div className="absolute z-20 bottom-6 left-5 right-5">
            <span className="inline-block bg-[#6b21a8] text-white px-2.5 py-1 text-[11px] font-black tracking-wider uppercase mb-3">
              CURRENT AFFAIRS
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-black leading-snug mb-2 text-white group-hover:text-neutral-200 transition-colors">
              {sideStory.title}
            </h2>
            <p className="text-neutral-300 text-xs line-clamp-2 mb-3 font-normal leading-relaxed">
              {sideStory.excerpt}
            </p>
            <div className="flex items-center gap-3 text-[11px] text-neutral-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#6b21a8]" />
                <span>{sideStory.readTime}</span>
              </span>
              <span>·</span>
              <span className="text-[#6b21a8] font-bold tracking-wide uppercase hover:underline">
                READ MORE →
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
