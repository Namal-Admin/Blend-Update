import React, { useState, useEffect } from 'react';
import {
  X,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Type,
  MessageSquare,
  ThumbsUp,
  Send,
  Check,
  Clock,
  User,
  ArrowRight
} from 'lucide-react';
import { Article, Comment } from '../types';

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  comments: Comment[];
  onAddComment: (articleId: string, authorName: string, text: string) => void;
  onLikeComment: (commentId: string) => void;
  relatedArticles: Article[];
  onSelectRelated: (article: Article) => void;
  onShare: (article: Article) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  comments,
  onAddComment,
  onLikeComment,
  relatedArticles,
  onSelectRelated,
  onShare,
}) => {
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0); // 0 = base, 1 = lg, 2 = xl
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [authorInput, setAuthorInput] = useState<string>('');
  const [commentInput, setCommentInput] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopSpeech();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      stopSpeech();
    };
  }, [isOpen, onClose]);

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window) || !article) return;

    if (isSpeaking) {
      stopSpeech();
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. ${article.excerpt}. ${article.content.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleCopyLink = () => {
    if (!article) return;
    const url = window.location.href.split('#')[0] + `#story-${article.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!article || !commentInput.trim()) return;

    const name = authorInput.trim() || 'Reader from Kenya';
    onAddComment(article.id, name, commentInput.trim());
    setCommentInput('');
  };

  if (!isOpen || !article) return null;

  const fontSizes = ['text-[15px]', 'text-[17px]', 'text-[19px]'];
  const currentFontSize = fontSizes[fontSizeLevel];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col relative border-t-4 border-[#6b21a8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky top action bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-neutral-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-[#6b21a8] text-white text-[11px] font-black uppercase px-2.5 py-1 tracking-wider">
              {article.category}
            </span>
            <span className="text-neutral-400 text-xs hidden sm:inline">|</span>
            <span className="text-xs text-neutral-500 font-semibold hidden sm:inline">
              THE REAL BLEND EXCLUSIVE
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Speech toggle */}
            {'speechSynthesis' in window && (
              <button
                onClick={handleToggleSpeech}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                  isSpeaking
                    ? 'bg-[#6b21a8] text-white animate-pulse'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                }`}
                title={isSpeaking ? 'Stop narration' : 'Listen to story'}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#6b21a8]" />}
                <span className="hidden sm:inline">{isSpeaking ? 'Stop Voice' : 'Listen'}</span>
              </button>
            )}

            {/* Font Size Adjuster */}
            <button
              onClick={() => setFontSizeLevel((prev) => (prev + 1) % 3)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 cursor-pointer"
              title="Adjust reading text size"
            >
              <Type className="w-3.5 h-3.5 text-neutral-600" />
              <span>A{fontSizeLevel > 0 ? `+${fontSizeLevel}` : ''}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleSave(article.id)}
              className={`p-2 rounded transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-[#6b21a8] text-white'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
              title={isSaved ? 'Story saved' : 'Save story'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Close button */}
            <button
              onClick={() => {
                stopSpeech();
                onClose();
              }}
              className="p-1.5 rounded hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors cursor-pointer ml-1"
              title="Close story"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal content area */}
        <div className="px-5 sm:px-8 md:px-12 py-6 sm:py-8">
          {/* Article Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] leading-[1.25] tracking-tight mb-4">
            {article.title}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed mb-6 border-b border-neutral-200 pb-5">
            {article.excerpt}
          </p>

          {/* Byline and metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-neutral-500 font-medium pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm">
                {article.author.charAt(0)}
              </div>
              <div>
                <div className="text-neutral-900 font-black text-sm flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#6b21a8]" />
                  <span>{article.author}</span>
                </div>
                <div className="text-neutral-500 text-[11px]">
                  {article.authorRole || 'The Real Blend Editorial Desk'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-neutral-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#6b21a8]" />
                <span>{article.date}</span>
              </span>
              <span>·</span>
              <span>{article.readTime}</span>
              {article.views && (
                <>
                  <span>·</span>
                  <span className="font-semibold text-neutral-700">
                    {article.views.toLocaleString()} reads
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Main Visual Asset */}
          <div className="mb-7">
            <div className="max-h-[460px] w-full overflow-hidden bg-neutral-100 shadow-xs">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80';
                }}
                className="w-full h-full object-cover"
              />
            </div>
            {article.imageCaption && (
              <p className="text-xs text-neutral-500 italic mt-2.5 font-normal px-1">
                Photo: {article.imageCaption}
              </p>
            )}
          </div>

          {/* Social Share Ribbon (Kenyan favorites: WhatsApp, X, Facebook, Copy) */}
          <div className="bg-neutral-50 border border-neutral-200 p-3 mb-8 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-black uppercase text-neutral-700 tracking-wider flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#6b21a8]" />
              <span>Share this story:</span>
            </span>

            <div className="flex items-center gap-2">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - Read more on The Real Blend: ' + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded text-xs font-bold transition-colors flex items-center gap-1"
              >
                <span>WhatsApp</span>
              </a>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title + ' via @TheRealBlendKE ')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-black hover:bg-neutral-800 text-white rounded text-xs font-bold transition-colors"
              >
                <span>X (Twitter)</span>
              </a>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Editorial Content Prose with Drop Cap */}
          <div className={`text-[#222222] ${currentFontSize} leading-[1.8] space-y-5 font-normal`}>
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'first-letter:text-5xl first-letter:font-black first-letter:text-[#6b21a8] first-letter:float-left first-letter:mr-3 first-letter:leading-none'
                    : ''
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags row */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase text-neutral-600 mr-1">
                Topics:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs px-2.5 py-1 font-semibold cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Comments Section */}
          <section className="mt-12 pt-8 border-t-2 border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black uppercase tracking-tight text-[#111111] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#6b21a8]" />
                <span>Discussion ({comments.length})</span>
              </h3>
              <span className="text-xs text-neutral-500 font-semibold">
                Join the conversation
              </span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="bg-neutral-50 p-4 border border-neutral-200 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Your Name / Handle"
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  className="p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-[#6b21a8]"
                />
                <div className="text-[11px] text-neutral-400 flex items-center">
                  Share your perspective respectfully with fellow readers.
                </div>
              </div>
              <textarea
                rows={3}
                required
                placeholder="What are your thoughts on this story? Leave a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-neutral-300 focus:outline-none focus:border-[#6b21a8] mb-3"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#111111] hover:bg-[#6b21a8] text-white px-5 py-2 text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((c) => (
                  <div key={c.id} className="p-4 bg-white border border-neutral-200 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-xs text-neutral-900">
                        {c.authorName}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {c.timestamp}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed mb-3">
                      {c.text}
                    </p>
                    <button
                      onClick={() => onLikeComment(c.id)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 hover:text-[#6b21a8] transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{c.likes > 0 ? c.likes : 'Like'}</span>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-neutral-500 italic py-3 text-center">
                  Be the first to share your thoughts on this story!
                </p>
              )}
            </div>
          </section>

          {/* Related Stories */}
          {relatedArticles.length > 0 && (
            <section className="mt-12 pt-8 border-t-2 border-neutral-200">
              <h3 className="text-xl font-black uppercase tracking-tight text-[#111111] mb-5 border-l-4 border-[#6b21a8] pl-3">
                MORE STORIES FOR YOU
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      stopSpeech();
                      onSelectRelated(item);
                    }}
                    className="group bg-neutral-50 hover:bg-neutral-100 p-3 border border-neutral-200 cursor-pointer transition-colors"
                  >
                    <div className="h-28 overflow-hidden mb-2 bg-neutral-200">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] font-black text-[#6b21a8] uppercase block mb-1">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-neutral-900 line-clamp-2 group-hover:text-[#6b21a8] transition-colors leading-snug">
                      {item.title}
                    </h4>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
