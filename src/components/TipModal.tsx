import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { NewsTip } from '../types';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitTip: (tip: NewsTip) => void;
}

export const TipModal: React.FC<TipModalProps> = ({
  isOpen,
  onClose,
  onSubmitTip
}) => {
  const [formData, setFormData] = useState<NewsTip>({
    id: '',
    name: '',
    emailOrPhone: '',
    location: '',
    title: '',
    details: '',
    anonymous: false,
    date: '',
    status: 'pending'
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const completeTip: NewsTip = {
      ...formData,
      id: `tip_${Date.now()}`,
      date: new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' }) + ', Today',
      status: 'pending'
    };
    onSubmitTip(completeTip);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        id: '',
        name: '',
        emailOrPhone: '',
        location: '',
        title: '',
        details: '',
        anonymous: false,
        date: '',
        status: 'pending'
      });
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg p-6 sm:p-8 shadow-2xl relative border-t-4 border-[#e31b23]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-black text-neutral-900 mb-2 uppercase">
              Tip Received!
            </h3>
            <p className="text-sm text-neutral-600 max-w-sm mx-auto">
              Asante sana! Our editorial investigations desk has securely logged your story tip. Our journalists will review the details promptly.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#e31b23] text-white text-[10px] font-black uppercase px-2 py-0.5 tracking-wider">
                CONFIDENTIAL SCOOP
              </span>
              <span className="text-xs text-neutral-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected Source</span>
              </span>
            </div>

            <h2 className="text-2xl font-black text-[#111111] mb-2 uppercase tracking-tight">
              Submit a News Tip
            </h2>
            <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
              Have breaking information, video evidence, community corruption reports, or an untold human interest story? Share it directly with The Real Blend newsroom.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                  Story Title / Subject *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pipeline burst in Nakuru or Emerging Gengetone star"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Location / County *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nairobi, Mombasa, Eldoret"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    disabled={formData.anonymous}
                    placeholder={formData.anonymous ? 'Submitting Anonymously' : 'Your name'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23] disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                  Contact Phone / WhatsApp / Email
                </label>
                <input
                  type="text"
                  disabled={formData.anonymous}
                  placeholder={formData.anonymous ? 'No contact details needed' : 'e.g. 0712 345 678 or email'}
                  value={formData.emailOrPhone}
                  onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                  className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                  Full Details &amp; Context *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide who, what, when, where and why. Mention if you have photos, documents, or video links..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full p-2.5 text-xs bg-neutral-50 border border-neutral-300 focus:outline-none focus:border-[#e31b23]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={formData.anonymous}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      anonymous: e.target.checked,
                      name: e.target.checked ? 'Anonymous Source' : '',
                      emailOrPhone: e.target.checked ? '' : formData.emailOrPhone
                    })
                  }
                  className="rounded text-[#e31b23] focus:ring-[#e31b23] cursor-pointer"
                />
                <label htmlFor="anonymousCheck" className="text-xs text-neutral-700 cursor-pointer select-none">
                  Keep my identity completely anonymous
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#e31b23] hover:bg-[#c9151c] text-white font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Tip to Editors</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
