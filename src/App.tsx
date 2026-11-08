import React, { useState, useEffect, useMemo } from 'react';
import { Lock } from 'lucide-react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { BreakingTicker } from './components/BreakingTicker';
import { FeaturedGrid } from './components/FeaturedGrid';
import { ArticlesSection } from './components/ArticlesSection';
import { ArticleModal } from './components/ArticleModal';
import { TipModal } from './components/TipModal';
import { AdminNewsroomModal } from './components/AdminNewsroomModal';
import { Footer } from './components/Footer';
import { Article, Category, Comment, NewsTip } from './types';
import { INITIAL_ARTICLES, INITIAL_BREAKING_NEWS, INITIAL_COMMENTS } from './data/articles';

const INITIAL_SAMPLE_TIPS: NewsTip[] = [
  {
    id: 'tip_sample_1',
    name: 'Njeri Maina',
    emailOrPhone: '0722 000 111',
    location: 'Nakuru County',
    title: 'New geothermal direct-use greenhouse launched in Menengai',
    details: 'Farmers in Menengai crater have partnered with KenGen to heat agricultural tunnels using natural geothermal brine, boosting strawberry and tomato yields by 40%.',
    anonymous: false,
    date: '10:45 AM, Today',
    status: 'pending'
  },
  {
    id: 'tip_sample_2',
    name: 'Anonymous',
    emailOrPhone: '',
    location: 'Mombasa Port',
    title: 'Zero-emission solar tugboat arrives at Kilindini Harbour',
    details: 'Kenya Ports Authority is test-docking its first electric battery-assisted harbor vessel to cut dockside diesel emissions.',
    anonymous: true,
    date: '08:20 AM, Today',
    status: 'pending'
  }
];

export default function App() {
  // Articles state with localStorage persistence
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('realblend_articles');
      return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
    } catch {
      return INITIAL_ARTICLES;
    }
  });

  // Breaking news state with localStorage persistence
  const [breakingItems, setBreakingItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('realblend_breaking');
      return saved ? JSON.parse(saved) : INITIAL_BREAKING_NEWS;
    } catch {
      return INITIAL_BREAKING_NEWS;
    }
  });

  // Tips state with localStorage persistence
  const [tips, setTips] = useState<NewsTip[]>(() => {
    try {
      const saved = localStorage.getItem('realblend_tips');
      return saved ? JSON.parse(saved) : INITIAL_SAMPLE_TIPS;
    } catch {
      return INITIAL_SAMPLE_TIPS;
    }
  });

  const [activeCategory, setActiveCategory] = useState<Category | 'Saved'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isTipModalOpen, setIsTipModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local storage for saved bookmarks
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('realblend_saved_articles');
      return saved ? JSON.parse(saved) : ['story-top-main', 'story-technology-1'];
    } catch {
      return ['story-top-main', 'story-technology-1'];
    }
  });

  // Local storage for interactive comments
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>(() => {
    try {
      const saved = localStorage.getItem('realblend_comments');
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  // Persist articles
  useEffect(() => {
    try {
      localStorage.setItem('realblend_articles', JSON.stringify(articles));
    } catch {
      // Ignore quota errors
    }
  }, [articles]);

  // Persist breaking news
  useEffect(() => {
    try {
      localStorage.setItem('realblend_breaking', JSON.stringify(breakingItems));
    } catch {
      // Ignore quota errors
    }
  }, [breakingItems]);

  // Persist tips
  useEffect(() => {
    try {
      localStorage.setItem('realblend_tips', JSON.stringify(tips));
    } catch {
      // Ignore quota errors
    }
  }, [tips]);

  // Hidden Admin access: URL hash '#admin' or keyboard shortcut Ctrl+Shift+A / Cmd+Shift+A
  useEffect(() => {
    const checkAdminTrigger = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setIsAdminModalOpen(true);
      }
    };

    checkAdminTrigger();
    window.addEventListener('hashchange', checkAdminTrigger);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret admin shortcut: Ctrl+Shift+A or Cmd+Shift+A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminTrigger);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('realblend_saved_articles', JSON.stringify(savedArticleIds));
    } catch {
      // Ignore quota errors
    }
  }, [savedArticleIds]);

  // Persist comments
  useEffect(() => {
    try {
      localStorage.setItem('realblend_comments', JSON.stringify(commentsMap));
    } catch {
      // Ignore quota errors
    }
  }, [commentsMap]);

  // Toast feedback helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleSave = (articleId: string) => {
    setSavedArticleIds((prev) => {
      if (prev.includes(articleId)) {
        showToast('Story removed from saved bookmarks');
        return prev.filter((id) => id !== articleId);
      } else {
        showToast('Story saved to your reading list!');
        return [...prev, articleId];
      }
    });
  };

  const handleAddComment = (articleId: string, authorName: string, text: string) => {
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      articleId,
      authorName,
      text,
      timestamp: 'Just now',
      likes: 0
    };

    setCommentsMap((prev) => ({
      ...prev,
      [articleId]: [newComment, ...(prev[articleId] || [])]
    }));

    showToast('Your comment has been published!');
  };

  const handleLikeComment = (commentId: string) => {
    if (!selectedArticle) return;
    const articleId = selectedArticle.id;
    setCommentsMap((prev) => {
      const list = prev[articleId] || [];
      const updated = list.map((c) =>
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      );
      return { ...prev, [articleId]: updated };
    });
  };

  const handleShareArticle = (article: Article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!');
    }
  };

  const handleSubmitTip = (tip: NewsTip) => {
    setTips((prev) => [tip, ...prev]);
    showToast('Thank you! Your scoop has been sent to our editorial desk.');
  };

  // Admin CMS handlers
  const handleSaveArticle = (savedArticle: Article) => {
    setArticles((prev) => {
      // If setting this as top story, unset others
      let list = [...prev];
      if (savedArticle.isTopStory) {
        list = list.map((a) => ({ ...a, isTopStory: a.id === savedArticle.id }));
      }
      if (savedArticle.isSideStory) {
        list = list.map((a) => ({ ...a, isSideStory: a.id === savedArticle.id }));
      }

      const existingIndex = list.findIndex((a) => a.id === savedArticle.id);
      if (existingIndex >= 0) {
        list[existingIndex] = savedArticle;
        showToast(`Updated article: "${savedArticle.title.slice(0, 30)}..."`);
      } else {
        list = [savedArticle, ...list];
        showToast(`Published new story: "${savedArticle.title.slice(0, 30)}..."`);
      }
      return list;
    });
  };

  const handleDeleteArticle = (articleId: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== articleId));
    showToast('Article removed from publication.');
  };

  const handleSetTopStory = (articleId: string) => {
    setArticles((prev) =>
      prev.map((a) => ({
        ...a,
        isTopStory: a.id === articleId,
        isSideStory: a.id === articleId ? false : a.isSideStory
      }))
    );
    showToast('Featured Top Story updated!');
  };

  const handleSetSideStory = (articleId: string) => {
    setArticles((prev) =>
      prev.map((a) => ({
        ...a,
        isSideStory: a.id === articleId,
        isTopStory: a.id === articleId ? false : a.isTopStory
      }))
    );
    showToast('Current Affairs Side Story updated!');
  };

  const handleUpdateBreakingNews = (items: string[]) => {
    setBreakingItems(items);
    showToast('Breaking ticker updated!');
  };

  const handleUpdateTipStatus = (tipId: string, status: 'pending' | 'reviewed' | 'converted') => {
    setTips((prev) =>
      prev.map((t) => (t.id === tipId ? { ...t, status } : t))
    );
  };

  const handleResetToDefaults = () => {
    setArticles(INITIAL_ARTICLES);
    setBreakingItems(INITIAL_BREAKING_NEWS);
    setTips(INITIAL_SAMPLE_TIPS);
    showToast('Reset to original default stories and ticker.');
  };

  // Top Story & Side Story
  const topStory = useMemo(() => {
    return articles.find((a) => a.isTopStory) || articles[0];
  }, [articles]);

  const sideStory = useMemo(() => {
    return articles.find((a) => a.isSideStory) || articles[1] || articles[0];
  }, [articles]);

  // Filtered stories for latest stories section
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Category filter
      if (activeCategory === 'Saved') {
        if (!savedArticleIds.includes(article.id)) return false;
      } else if (activeCategory !== 'All') {
        if (article.category !== activeCategory) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = article.title.toLowerCase().includes(query);
        const inExcerpt = article.excerpt.toLowerCase().includes(query);
        const inContent = article.content.some((p) => p.toLowerCase().includes(query));
        const inCategory = article.category.toLowerCase().includes(query);
        const inTags = article.tags?.some((t) => t.toLowerCase().includes(query)) || false;
        const inAuthor = article.author.toLowerCase().includes(query);

        return inTitle || inExcerpt || inContent || inCategory || inTags || inAuthor;
      }

      return true;
    });
  }, [articles, activeCategory, searchQuery, savedArticleIds]);

  // Related articles for the modal
  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return [];
    return articles.filter(
      (a) => a.id !== selectedArticle.id && (a.category === selectedArticle.category || a.isTopStory)
    );
  }, [articles, selectedArticle]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] text-[#111111]">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#111111] text-white text-xs font-bold px-4 py-3 shadow-xl border-l-4 border-[#e31b23] animate-in slide-in-from-bottom duration-200">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <Header
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setActiveCategory('Saved')}
        onOpenTipModal={() => setIsTipModalOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat as Category);
          setSearchQuery('');
        }}
      />

      {/* Navigation */}
      <Navigation
        activeCategory={activeCategory === 'Saved' ? 'All' : activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
      />

      {/* Breaking News Ticker */}
      <BreakingTicker
        items={breakingItems}
        onSelectBreaking={(_text) => {
          setSelectedArticle(topStory);
        }}
      />

      {/* Main Container matching: .container { width: 88%; max-width: 1250px; margin: 30px auto; } */}
      <main className="w-[92%] sm:w-[88%] max-w-[1250px] mx-auto my-[30px] flex-1">
        {/* Show Featured Grid only on Home (All) and when not searching or in saved view */}
        {activeCategory === 'All' && !searchQuery.trim() && (
          <FeaturedGrid
            topStory={topStory}
            sideStory={sideStory}
            onSelectArticle={(article) => setSelectedArticle(article)}
          />
        )}

        {/* Latest Stories Section */}
        <ArticlesSection
          articles={filteredArticles}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          savedArticleIds={savedArticleIds}
          onSelectArticle={(article) => setSelectedArticle(article)}
          onToggleSave={handleToggleSave}
          onShare={handleShareArticle}
          onClearFilters={() => {
            setActiveCategory('All');
            setSearchQuery('');
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
          const newsEl = document.getElementById('news');
          newsEl?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTipModal={() => setIsTipModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Full Article Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
        isSaved={selectedArticle ? savedArticleIds.includes(selectedArticle.id) : false}
        onToggleSave={handleToggleSave}
        comments={selectedArticle ? commentsMap[selectedArticle.id] || [] : []}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
        relatedArticles={relatedArticles}
        onSelectRelated={(article) => setSelectedArticle(article)}
        onShare={handleShareArticle}
      />

      {/* Whistleblower / Scoop Tip Modal */}
      <TipModal
        isOpen={isTipModalOpen}
        onClose={() => setIsTipModalOpen(false)}
        onSubmitTip={handleSubmitTip}
      />

      {/* Admin Newsroom Editorial CMS Modal */}
      <AdminNewsroomModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          if (window.location.hash === '#admin') {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }}
        articles={articles}
        onSaveArticle={handleSaveArticle}
        onDeleteArticle={handleDeleteArticle}
        onSetTopStory={handleSetTopStory}
        onSetSideStory={handleSetSideStory}
        breakingNews={breakingItems}
        onUpdateBreakingNews={handleUpdateBreakingNews}
        tips={tips}
        onUpdateTipStatus={handleUpdateTipStatus}
        onResetToDefaults={handleResetToDefaults}
      />

      {/* Small CMS icon at the bottom for admin updates */}
      <button
        onClick={() => setIsAdminModalOpen(true)}
        className="fixed bottom-3 right-3 z-40 p-2 rounded-full bg-neutral-900/85 hover:bg-[#e31b23] text-neutral-400 hover:text-white shadow-md backdrop-blur-xs transition-all duration-200 border border-neutral-700/60 opacity-60 hover:opacity-100 cursor-pointer group"
        title="Admin Editorial CMS"
        aria-label="Admin Editorial CMS"
      >
        <Lock className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
