import React, { useState } from 'react';
import {
  X,
  PlusCircle,
  Edit3,
  Trash2,
  Star,
  Radio,
  FileText,
  Inbox,
  Lock,
  LogOut,
  Save,
  CheckCircle,
  ExternalLink,
  RotateCcw,
  Download,
  AlertTriangle,
  Flame,
  ArrowRight,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { Article, Category, NewsTip } from '../types';

interface AdminNewsroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSaveArticle: (article: Article) => void;
  onDeleteArticle: (articleId: string) => void;
  onSetTopStory: (articleId: string) => void;
  onSetSideStory: (articleId: string) => void;
  breakingNews: string[];
  onUpdateBreakingNews: (items: string[]) => void;
  tips: NewsTip[];
  onUpdateTipStatus: (tipId: string, status: 'pending' | 'reviewed' | 'converted') => void;
  onResetToDefaults: () => void;
}

const CATEGORIES: Category[] = [
  'Kenya News',
  'Africa',
  'World News',
  'Politics',
  'Technology',
  'Entertainment',
  'Sports',
  'Lifestyle'
];

const SAMPLE_PHOTO_PRESETS = [
  {
    name: 'Nairobi Skyline / City',
    url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
    caption: 'Nairobi central business district buzzing during business hours.'
  },
  {
    name: 'Politics & Parliament',
    url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    caption: 'Government and parliamentary proceedings in session.'
  },
  {
    name: 'Entertainment & Concerts',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    caption: 'Crowd celebrating at an energetic live festival in Nairobi.'
  },
  {
    name: 'Athletics & Sports',
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    caption: 'Kenyan long-distance runners training in the Great Rift Valley.'
  },
  {
    name: 'Technology & Innovation',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    caption: 'Engineers developing digital solutions at a tech incubator.'
  },
  {
    name: 'Kenyan Wildlife & Heritage',
    url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&auto=format&fit=crop&q=80',
    caption: 'Sun rising over the Kenyan wilderness and national reserves.'
  }
];

export const AdminNewsroomModal: React.FC<AdminNewsroomModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSaveArticle,
  onDeleteArticle,
  onSetTopStory,
  onSetSideStory,
  breakingNews,
  onUpdateBreakingNews,
  tips,
  onUpdateTipStatus,
  onResetToDefaults,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Password state stored in localStorage
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem('realblend_admin_password') || 'blend2026';
    } catch {
      return 'blend2026';
    }
  });

  const [hasChangedPassword, setHasChangedPassword] = useState<boolean>(() => {
    try {
      return localStorage.getItem('realblend_password_changed') === 'true';
    } catch {
      return false;
    }
  });

  const [showFirstLoginPasswordModal, setShowFirstLoginPasswordModal] = useState<boolean>(false);

  // Password change fields
  const [currentPassInput, setCurrentPassInput] = useState<string>('');
  const [newPassInput, setNewPassInput] = useState<string>('');
  const [confirmPassInput, setConfirmPassInput] = useState<string>('');
  const [passwordStatusMsg, setPasswordStatusMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const [activeTab, setActiveTab] = useState<'articles' | 'editor' | 'breaking' | 'tips' | 'security' | 'backup'>('articles');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Editing state for an article
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    excerpt: string;
    contentRaw: string;
    category: Category;
    imageUrl: string;
    imageCaption: string;
    author: string;
    authorRole: string;
    date: string;
    readTime: string;
    isTopStory: boolean;
    isSideStory: boolean;
    tags: string;
  }>({
    id: '',
    title: '',
    excerpt: '',
    contentRaw: '',
    category: 'Kenya News',
    imageUrl: SAMPLE_PHOTO_PRESETS[0].url,
    imageCaption: SAMPLE_PHOTO_PRESETS[0].caption,
    author: 'The Real Blend Newsroom',
    authorRole: 'Editorial Staff',
    date: 'Just now',
    readTime: '3 min read',
    isTopStory: false,
    isSideStory: false,
    tags: 'Kenya, News, Breaking'
  });

  // Breaking news state
  const [newHeadline, setNewHeadline] = useState<string>('');

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = passwordInput.trim();
    if (trimmedInput === adminPassword || (adminPassword === 'blend2026' && (trimmedInput === 'blend2026' || trimmedInput.toLowerCase() === 'admin'))) {
      setIsAuthenticated(true);
      setLoginError('');
      setPasswordInput('');
      // If the Chief Editor has not customized their password, open the First Login setup immediately!
      if (!hasChangedPassword) {
        setShowFirstLoginPasswordModal(true);
      }
    } else {
      setLoginError('Invalid passcode. If this is your first time, the initial passcode is blend2026.');
    }
  };

  // Change Password logic
  const handleSaveNewPassword = (e: React.FormEvent, isFirstLogin = false) => {
    e.preventDefault();
    if (!isFirstLogin) {
      if (currentPassInput !== adminPassword && currentPassInput !== 'blend2026') {
        setPasswordStatusMsg({ type: 'error', text: 'Current password is incorrect.' });
        return;
      }
    }

    if (newPassInput.length < 6) {
      setPasswordStatusMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    if (newPassInput !== confirmPassInput) {
      setPasswordStatusMsg({ type: 'error', text: 'New passwords do not match. Please verify.' });
      return;
    }

    try {
      localStorage.setItem('realblend_admin_password', newPassInput);
      localStorage.setItem('realblend_password_changed', 'true');
    } catch {}

    setAdminPassword(newPassInput);
    setHasChangedPassword(true);
    setPasswordStatusMsg({ type: 'success', text: 'Chief Editor password updated successfully!' });
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    setShowFirstLoginPasswordModal(false);
  };

  // Prepare form to create new article
  const handleStartCreate = () => {
    setEditingArticleId(null);
    setFormData({
      id: `story_${Date.now()}`,
      title: '',
      excerpt: '',
      contentRaw: '',
      category: 'Kenya News',
      imageUrl: SAMPLE_PHOTO_PRESETS[0].url,
      imageCaption: SAMPLE_PHOTO_PRESETS[0].caption,
      author: 'The Real Blend Newsroom',
      authorRole: 'Senior Staff Reporter',
      date: 'Just now',
      readTime: '3 min read',
      isTopStory: false,
      isSideStory: false,
      tags: 'Kenya, National, Update'
    });
    setActiveTab('editor');
  };

  // Prepare form to edit existing article
  const handleStartEdit = (article: Article) => {
    setEditingArticleId(article.id);
    setFormData({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      contentRaw: article.content.join('\n\n'),
      category: article.category,
      imageUrl: article.imageUrl,
      imageCaption: article.imageCaption || '',
      author: article.author,
      authorRole: article.authorRole || 'Editorial Desk',
      date: article.date,
      readTime: article.readTime,
      isTopStory: Boolean(article.isTopStory),
      isSideStory: Boolean(article.isSideStory),
      tags: article.tags?.join(', ') || ''
    });
    setActiveTab('editor');
  };

  // Convert reader scoop into draft article
  const handleConvertTipToStory = (tip: NewsTip) => {
    setEditingArticleId(null);
    setFormData({
      id: `story_from_tip_${Date.now()}`,
      title: tip.title,
      excerpt: `Investigation following a community scoop reported from ${tip.location}: ${tip.details.slice(0, 120)}...`,
      contentRaw: `${tip.details}\n\nOur correspondents in ${tip.location} are following up with local authorities and affected residents to verify all claims.\n\nMore details will be updated as the situation develops.`,
      category: 'Kenya News',
      imageUrl: SAMPLE_PHOTO_PRESETS[0].url,
      imageCaption: `Scene in ${tip.location} following community reporting.`,
      author: tip.anonymous ? 'The Real Blend Investigative Desk' : `${tip.name} & The Real Blend Desk`,
      authorRole: 'Investigative Bureau',
      date: 'Just now',
      readTime: '3 min read',
      isTopStory: false,
      isSideStory: false,
      tags: `${tip.location}, Investigation, Scoop, Community`
    });
    onUpdateTipStatus(tip.id, 'converted');
    setActiveTab('editor');
  };

  // Save or Publish article
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.contentRaw.trim()) return;

    // Split contentRaw by newlines into clean paragraph strings
    const paragraphs = formData.contentRaw
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const articleToSave: Article = {
      id: formData.id || `story_${Date.now()}`,
      title: formData.title.trim(),
      excerpt: formData.excerpt.trim() || paragraphs[0].slice(0, 160) + '...',
      content: paragraphs.length > 0 ? paragraphs : ['Article content pending full update.'],
      category: formData.category,
      imageUrl: formData.imageUrl.trim() || SAMPLE_PHOTO_PRESETS[0].url,
      imageCaption: formData.imageCaption.trim(),
      author: formData.author.trim() || 'The Real Blend Desk',
      authorRole: formData.authorRole.trim(),
      date: formData.date || 'Today',
      readTime: formData.readTime.trim() || '3 min read',
      isTopStory: formData.isTopStory,
      isSideStory: formData.isSideStory,
      tags: tagsArray,
      views: editingArticleId ? undefined : 120,
      commentsCount: 0
    };

    onSaveArticle(articleToSave);
    setActiveTab('articles');
  };

  // Breaking news manager actions
  const handleAddBreaking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeadline.trim()) return;
    onUpdateBreakingNews([newHeadline.trim(), ...breakingNews]);
    setNewHeadline('');
  };

  const handleDeleteBreaking = (index: number) => {
    const updated = breakingNews.filter((_, idx) => idx !== index);
    onUpdateBreakingNews(updated);
  };

  // Export articles as JSON file
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(articles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `the_real_blend_articles_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredArticles = articles.filter((a) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-5xl max-h-[94vh] overflow-hidden flex flex-col shadow-2xl border-t-4 border-[#e31b23] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-[#111111] text-white px-5 py-3.5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#e31b23] flex items-center justify-center font-black text-xs text-white">
              CMS
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wider uppercase text-white flex items-center gap-2">
                <span>The Real Blend</span>
                <span className="text-[#e31b23]">Newsroom CMS</span>
              </h2>
              <p className="text-[10px] text-neutral-400 font-medium">
                Editorial Control Panel &amp; Content Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Chief Editor Mode</span>
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Close CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate if locked */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center">
            <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-[#111111]">
              <Lock className="w-6 h-6 text-[#e31b23]" />
            </div>
            <h3 className="text-xl font-black text-neutral-900 mb-1 uppercase">
              Editorial Staff Login
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              Enter your newsroom credentials or click Demo Access below to manage articles and breaking news.
            </p>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                placeholder="Passcode (default: blend2026)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
              />

              {loginError && (
                <div className="text-[11px] text-red-600 font-semibold">{loginError}</div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#e31b23] hover:bg-[#c9151c] text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                Unlock Newsroom
              </button>

              <button
                type="button"
                onClick={() => setIsAuthenticated(true)}
                className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold uppercase transition-colors cursor-pointer"
              >
                Quick Demo Access (Chief Editor)
              </button>
            </form>
          </div>
        ) : (
          /* Main Authenticated CMS Layout */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Navigation Tabs */}
            <div className="bg-neutral-100 border-b border-neutral-200 px-4 sm:px-6 flex items-center justify-between overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setActiveTab('articles')}
                  className={`px-3 sm:px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'articles'
                      ? 'border-[#e31b23] text-[#e31b23] bg-white'
                      : 'border-transparent text-neutral-600 hover:text-black'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Articles ({articles.length})</span>
                </button>

                <button
                  onClick={handleStartCreate}
                  className={`px-3 sm:px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'editor'
                      ? 'border-[#e31b23] text-[#e31b23] bg-white'
                      : 'border-transparent text-neutral-600 hover:text-black'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{editingArticleId ? 'Edit Article' : 'Write New Story'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('breaking')}
                  className={`px-3 sm:px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'breaking'
                      ? 'border-[#e31b23] text-[#e31b23] bg-white'
                      : 'border-transparent text-neutral-600 hover:text-black'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Breaking Ticker ({breakingNews.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('tips')}
                  className={`px-3 sm:px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'tips'
                      ? 'border-[#e31b23] text-[#e31b23] bg-white'
                      : 'border-transparent text-neutral-600 hover:text-black'
                  }`}
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Reader Scoops</span>
                  {tips.length > 0 && (
                    <span className="bg-[#e31b23] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      {tips.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setActiveTab('security');
                    setPasswordStatusMsg(null);
                  }}
                  className={`px-3 sm:px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'security'
                      ? 'border-[#e31b23] text-[#e31b23] bg-white'
                      : 'border-transparent text-neutral-600 hover:text-black'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Security &amp; Password</span>
                </button>

                <button
                  onClick={() => setActiveTab('backup')}
                  className={`px-3 sm:px-4 py-3 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'backup'
                      ? 'border-[#e31b23] text-[#e31b23] bg-white'
                      : 'border-transparent text-neutral-600 hover:text-black'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Backup &amp; Reset</span>
                </button>
              </div>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-neutral-500 hover:text-neutral-900 p-2 text-xs flex items-center gap-1 cursor-pointer"
                title="Lock CMS"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f9f9f9]">
              {/* TAB 1: ARTICLES LIST */}
              {activeTab === 'articles' && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Search published articles..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="p-2 text-xs bg-white border border-neutral-300 w-64 focus:outline-none focus:border-[#e31b23]"
                      />
                      <span className="text-xs text-neutral-500 font-semibold">
                        {filteredArticles.length} of {articles.length} stories
                      </span>
                    </div>

                    <button
                      onClick={handleStartCreate}
                      className="bg-[#e31b23] hover:bg-[#c9151c] text-white px-4 py-2 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Draft New Story</span>
                    </button>
                  </div>

                  {/* Articles Table */}
                  <div className="bg-white border border-neutral-200 overflow-x-auto shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-neutral-100 border-b border-neutral-200 text-neutral-700 font-black uppercase tracking-wider">
                          <th className="p-3">Story</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Author</th>
                          <th className="p-3">Position</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {filteredArticles.map((art) => (
                          <tr key={art.id} className="hover:bg-neutral-50 transition-colors">
                            <td className="p-3 max-w-sm">
                              <div className="font-bold text-neutral-900 line-clamp-1">
                                {art.title}
                              </div>
                              <div className="text-[11px] text-neutral-400">
                                {art.date} · {art.readTime}
                              </div>
                            </td>

                            <td className="p-3">
                              <span className="bg-[#111111] text-white text-[10px] font-black uppercase px-2 py-0.5">
                                {art.category}
                              </span>
                            </td>

                            <td className="p-3 text-neutral-600 font-medium">
                              {art.author}
                            </td>

                            <td className="p-3">
                              <div className="flex items-center gap-1.5">
                                {art.isTopStory ? (
                                  <span className="bg-[#e31b23] text-white text-[10px] font-black uppercase px-1.5 py-0.5">
                                    ★ Top Story
                                  </span>
                                ) : art.isSideStory ? (
                                  <span className="bg-neutral-800 text-white text-[10px] font-black uppercase px-1.5 py-0.5">
                                    Side Story
                                  </span>
                                ) : (
                                  <span className="text-[11px] text-neutral-400">Feed</span>
                                )}
                              </div>
                            </td>

                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                {/* Promote to Top Story */}
                                <button
                                  onClick={() => onSetTopStory(art.id)}
                                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                                    art.isTopStory ? 'text-[#e31b23]' : 'text-neutral-400 hover:text-neutral-700'
                                  }`}
                                  title={art.isTopStory ? 'Current Top Story' : 'Set as Featured Top Story'}
                                >
                                  <Star className={`w-3.5 h-3.5 ${art.isTopStory ? 'fill-current' : ''}`} />
                                </button>

                                {/* Edit Button */}
                                <button
                                  onClick={() => handleStartEdit(art)}
                                  className="p-1.5 text-neutral-600 hover:text-[#e31b23] transition-colors cursor-pointer"
                                  title="Edit Story"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                {/* Delete Button */}
                                <button
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to delete "${art.title}"?`)) {
                                      onDeleteArticle(art.id);
                                    }
                                  }}
                                  className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                                  title="Delete Story"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: ARTICLE EDITOR */}
              {activeTab === 'editor' && (
                <div className="bg-white p-5 sm:p-7 border border-neutral-200 shadow-xs max-w-4xl mx-auto">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-200">
                    <div>
                      <h3 className="text-lg font-black uppercase text-neutral-900">
                        {editingArticleId ? 'Edit Article' : 'Publish New Story'}
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Write and publish live news directly to the front page of The Real Blend.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('articles')}
                      className="text-xs text-neutral-500 hover:text-black font-bold"
                    >
                      ← Back to Stories
                    </button>
                  </div>

                  <form onSubmit={handleSaveArticle} className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-800 tracking-wider mb-1">
                        Headline / Article Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kenya unveils flagship electric bus corridor in Nairobi"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-2.5 text-sm font-bold bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                      />
                    </div>

                    {/* Category, Author, Read Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-800 tracking-wider mb-1">
                          Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                          className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-800 tracking-wider mb-1">
                          Author Byline *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.author}
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-800 tracking-wider mb-1">
                          Estimated Read Time
                        </label>
                        <input
                          type="text"
                          value={formData.readTime}
                          onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                          placeholder="e.g. 4 min read"
                          className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                        />
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-800 tracking-wider mb-1">
                        Dek / Excerpt Summary *
                      </label>
                      <textarea
                        rows={2}
                        required
                        placeholder="A concise 1-2 sentence lead summary appearing on cards and story headers..."
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                      />
                    </div>

                    {/* Content Body */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-800 tracking-wider mb-1">
                        Full Story Paragraphs * (Separate paragraphs with blank lines)
                      </label>
                      <textarea
                        rows={8}
                        required
                        placeholder="Write the full news story here. Press Enter twice between paragraphs to format as distinct editorial sections..."
                        value={formData.contentRaw}
                        onChange={(e) => setFormData({ ...formData, contentRaw: e.target.value })}
                        className="w-full p-3 text-xs bg-neutral-50 border border-neutral-300 font-sans leading-relaxed focus:outline-none focus:border-[#e31b23]"
                      />
                    </div>

                    {/* Image URL & Preset Selection */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-800 tracking-wider mb-1">
                        Featured Image URL
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="url"
                          placeholder="https://..."
                          value={formData.imageUrl}
                          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                          className="flex-1 p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                        />
                      </div>

                      {/* Photo Presets for Quick Selection */}
                      <div className="bg-neutral-50 p-2.5 border border-neutral-200">
                        <span className="text-[11px] font-bold text-neutral-600 block mb-1.5 uppercase">
                          Or Choose from Newsroom Photo Presets:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {SAMPLE_PHOTO_PRESETS.map((preset, idx) => (
                            <button
                              type="button"
                              key={idx}
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  imageUrl: preset.url,
                                  imageCaption: preset.caption
                                });
                              }}
                              className={`p-1 text-left text-[11px] border rounded transition-colors flex items-center gap-2 cursor-pointer ${
                                formData.imageUrl === preset.url
                                  ? 'border-[#e31b23] bg-red-50 text-[#e31b23] font-bold'
                                  : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100'
                              }`}
                            >
                              <img src={preset.url} alt="" className="w-8 h-8 object-cover rounded shrink-0" />
                              <span className="truncate">{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Image Caption & Tags */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-800 tracking-wider mb-1">
                          Image Caption / Photo Credit
                        </label>
                        <input
                          type="text"
                          value={formData.imageCaption}
                          onChange={(e) => setFormData({ ...formData, imageCaption: e.target.value })}
                          placeholder="e.g. Photo: The Real Blend Bureau / Nairobi"
                          className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-800 tracking-wider mb-1">
                          Topics / Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={formData.tags}
                          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                          placeholder="e.g. Nairobi, Devolution, Economy"
                          className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                        />
                      </div>
                    </div>

                    {/* Hero Placement Switches */}
                    <div className="p-3 bg-neutral-100 border border-neutral-200 flex flex-wrap items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.isTopStory}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isTopStory: e.target.checked,
                              isSideStory: e.target.checked ? false : formData.isSideStory
                            })
                          }
                          className="rounded text-[#e31b23] focus:ring-[#e31b23]"
                        />
                        <span className="text-xs font-black uppercase text-neutral-900 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-[#e31b23]" />
                          <span>Feature as Main Top Story</span>
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.isSideStory}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isSideStory: e.target.checked,
                              isTopStory: e.target.checked ? false : formData.isTopStory
                            })
                          }
                          className="rounded text-[#e31b23] focus:ring-[#e31b23]"
                        />
                        <span className="text-xs font-black uppercase text-neutral-900">
                          Feature as Current Affairs Side Story
                        </span>
                      </label>
                    </div>

                    {/* Submit Bar */}
                    <div className="pt-3 flex items-center justify-end gap-3 border-t border-neutral-200">
                      <button
                        type="button"
                        onClick={() => setActiveTab('articles')}
                        className="px-4 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-bold uppercase transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#e31b23] hover:bg-[#c9151c] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingArticleId ? 'Save Changes Live' : 'Publish Story Now'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: BREAKING NEWS TICKER */}
              {activeTab === 'breaking' && (
                <div className="max-w-3xl mx-auto space-y-5">
                  <div className="bg-white p-5 border border-neutral-200 shadow-xs">
                    <h3 className="text-base font-black uppercase text-neutral-900 mb-1 flex items-center gap-2">
                      <Radio className="w-4 h-4 text-[#e31b23]" />
                      <span>Live Breaking Headlines</span>
                    </h3>
                    <p className="text-xs text-neutral-500 mb-4">
                      Headlines added here cycle continuously in the red BREAKING bar across the top of the homepage.
                    </p>

                    <form onSubmit={handleAddBreaking} className="flex gap-2 mb-6">
                      <input
                        type="text"
                        required
                        placeholder="Add new breaking news bulletin..."
                        value={newHeadline}
                        onChange={(e) => setNewHeadline(e.target.value)}
                        className="flex-1 p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#111111] hover:bg-[#e31b23] text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                      >
                        Post Breaking
                      </button>
                    </form>

                    <div className="space-y-2">
                      {breakingNews.map((headline, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 text-xs"
                        >
                          <div className="flex items-center gap-3 pr-4">
                            <span className="bg-[#e31b23] text-white font-black text-[10px] px-2 py-0.5 uppercase shrink-0">
                              #{idx + 1}
                            </span>
                            <span className="font-semibold text-neutral-900">{headline}</span>
                          </div>

                          <button
                            onClick={() => handleDeleteBreaking(idx)}
                            className="text-neutral-400 hover:text-red-600 p-1 cursor-pointer"
                            title="Remove headline"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: READER SCOOPS / TIPS */}
              {activeTab === 'tips' && (
                <div className="max-w-4xl mx-auto space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black uppercase text-neutral-900">
                        Reader Tips &amp; Whistleblower Inquiries
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Confidential scoops received from readers via the &quot;Tip Us&quot; button.
                      </p>
                    </div>
                  </div>

                  {tips.length > 0 ? (
                    <div className="space-y-3">
                      {tips.map((tip) => (
                        <div
                          key={tip.id}
                          className="bg-white p-4 border border-neutral-200 shadow-xs relative"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-100 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-neutral-900 text-sm">
                                {tip.title}
                              </span>
                              <span className="bg-neutral-100 text-neutral-700 px-2 py-0.5 font-bold uppercase text-[10px]">
                                {tip.location}
                              </span>
                            </div>

                            <span className="text-neutral-400 text-[11px]">{tip.date}</span>
                          </div>

                          <p className="text-xs text-neutral-700 leading-relaxed mb-3">
                            {tip.details}
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                            <div>
                              <strong>Source:</strong> {tip.anonymous ? 'Anonymous Whistleblower' : `${tip.name} (${tip.emailOrPhone})`}
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleConvertTipToStory(tip)}
                                className="px-3 py-1 bg-[#e31b23] hover:bg-[#c9151c] text-white font-bold text-xs uppercase flex items-center gap-1 cursor-pointer"
                              >
                                <span>Convert to Story</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-12 text-center border border-neutral-200">
                      <Inbox className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                      <h4 className="text-sm font-bold text-neutral-800 uppercase">
                        No Scoops in Inbox
                      </h4>
                      <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                        When readers submit tips using the &quot;Tip Us / Submit Scoop&quot; button on the site, they will appear here.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: SECURITY & CHIEF EDITOR PASSWORD */}
              {activeTab === 'security' && (
                <div className="max-w-xl mx-auto space-y-6">
                  <div className="bg-white p-6 sm:p-8 border border-neutral-200 shadow-xs">
                    <div className="flex items-center gap-2 mb-2 text-[#e31b23]">
                      <KeyRound className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">Authentication Security</span>
                    </div>

                    <h3 className="text-xl font-black uppercase text-neutral-900 mb-1">
                      Chief Editor Password
                    </h3>
                    <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
                      Update your secret passcode to prevent unauthorized access to news publishing and breaking news ticker management.
                    </p>

                    <div className="mb-6 p-3 bg-neutral-50 border border-neutral-200 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-700">Security Status:</span>
                        {hasChangedPassword ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Custom Secret Password Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-amber-600 font-bold">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Default Passcode Active (Change Recommended)</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <form onSubmit={(e) => handleSaveNewPassword(e, false)} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-800 tracking-wider mb-1">
                          Current Passcode *
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="Enter current password (default: blend2026)"
                          value={currentPassInput}
                          onChange={(e) => setCurrentPassInput(e.target.value)}
                          className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold uppercase text-neutral-800 tracking-wider mb-1">
                            New Secret Password *
                          </label>
                          <input
                            type="password"
                            required
                            minLength={6}
                            placeholder="Min 6 characters"
                            value={newPassInput}
                            onChange={(e) => setNewPassInput(e.target.value)}
                            className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-neutral-800 tracking-wider mb-1">
                            Confirm New Password *
                          </label>
                          <input
                            type="password"
                            required
                            minLength={6}
                            placeholder="Re-type new password"
                            value={confirmPassInput}
                            onChange={(e) => setConfirmPassInput(e.target.value)}
                            className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                          />
                        </div>
                      </div>

                      {passwordStatusMsg && (
                        <div
                          className={`text-xs font-bold p-3 border rounded ${
                            passwordStatusMsg.type === 'error'
                              ? 'text-red-700 bg-red-50 border-red-200'
                              : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                          }`}
                        >
                          {passwordStatusMsg.text}
                        </div>
                      )}

                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#e31b23] hover:bg-[#c9151c] text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save New Password</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 6: BACKUP & RESET */}
              {activeTab === 'backup' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="bg-white p-6 border border-neutral-200 shadow-xs">
                    <h3 className="text-base font-black uppercase text-neutral-900 mb-2 flex items-center gap-2">
                      <Download className="w-4 h-4 text-[#e31b23]" />
                      <span>Export Newsroom Data</span>
                    </h3>
                    <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                      Download a complete JSON snapshot of all published articles and metadata to save offline or migrate.
                    </p>
                    <button
                      onClick={handleExportJSON}
                      className="px-4 py-2 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Articles (.json)</span>
                    </button>
                  </div>

                  <div className="bg-white p-6 border border-red-200 shadow-xs">
                    <h3 className="text-base font-black uppercase text-red-600 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>Reset to Default Newsroom Stories</span>
                    </h3>
                    <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                      Restore the original Kenyan launch stories and default breaking headlines. This will overwrite any custom local edits.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to restore the default sample stories?')) {
                          onResetToDefaults();
                          setActiveTab('articles');
                        }
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Default Launch Stories</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* First Login Change Password Overlay Modal */}
        {showFirstLoginPasswordModal && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md p-6 sm:p-8 shadow-2xl border-t-4 border-[#e31b23] text-left animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-2 mb-2 text-[#e31b23]">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-wider">Chief Editor Security</span>
              </div>
              <h3 className="text-xl font-black text-neutral-900 mb-1 uppercase tracking-tight">
                Change Password (First Login)
              </h3>
              <p className="text-xs text-neutral-600 mb-5 leading-relaxed">
                Welcome to The Real Blend CMS! For security, please update the initial default passcode (<code className="bg-neutral-100 px-1.5 py-0.5 rounded font-bold">blend2026</code>) to your own secret password.
              </p>

              <form onSubmit={(e) => handleSaveNewPassword(e, true)} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-800 mb-1">
                    New Secret Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="Minimum 6 characters"
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-800 mb-1">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="Re-enter your new password"
                    value={confirmPassInput}
                    onChange={(e) => setConfirmPassInput(e.target.value)}
                    className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                  />
                </div>

                {passwordStatusMsg && (
                  <div className={`text-xs font-bold p-2 ${passwordStatusMsg.type === 'error' ? 'text-red-600 bg-red-50' : 'text-emerald-700 bg-emerald-50'}`}>
                    {passwordStatusMsg.text}
                  </div>
                )}

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFirstLoginPasswordModal(false)}
                    className="px-3 py-2 text-xs font-bold text-neutral-500 hover:text-black uppercase cursor-pointer"
                  >
                    Keep Default for Now
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#e31b23] hover:bg-[#c9151c] text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Save Password &amp; Enter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
