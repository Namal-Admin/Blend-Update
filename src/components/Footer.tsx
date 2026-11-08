import React, { useState } from 'react';
import { Mail, Check, ArrowRight, Lock } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (category: Category) => void;
  onOpenTipModal: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTipModal,
  onOpenAdmin,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#111111] text-white pt-12 pb-10 px-4 md:px-[6%] mt-[50px] border-t-2 border-[#e31b23]">
      <div className="max-w-[1250px] mx-auto">
        {/* Main 4-column footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/Real_Blend_Community_Logo_4137823f.png"
                alt="The Real Blend Logo"
                className="w-12 h-12 object-contain bg-white rounded p-0.5"
                referrerPolicy="no-referrer"
              />
              <h2 className="text-[28px] font-black tracking-tight leading-none text-white">
                THE REAL <span className="text-[#e31b23]">BLEND.</span>
              </h2>
            </div>
            <p className="text-[#cccccc] text-[13px] font-bold tracking-widest uppercase">
              News. Trends. Stories That Matter.
            </p>
            <p className="text-[#bbbbbb] text-[13px] leading-[1.8]">
              Independent digital media bringing you verified breaking news, incisive political analysis, lifestyle insights, culture and entertainment from Kenya, across Africa, and around the world.
            </p>
            <p className="text-[#bbbbbb] text-[13px]">
              <strong className="text-white">Contact:</strong>{' '}
              <a href="mailto:info@therealblend.co.ke" className="hover:text-[#e31b23] transition-colors">
                info@therealblend.co.ke
              </a>
            </p>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#e31b23] mb-4">
              Explore Sections
            </h3>
            <ul className="space-y-2 text-[13px] text-[#bbbbbb]">
              {(['Kenya News', 'Africa', 'World News', 'Politics', 'Entertainment', 'Sports', 'Lifestyle', 'Technology'] as Category[]).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-white hover:underline transition-colors cursor-pointer text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial & Community Column */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#e31b23] mb-4">
              Community &amp; Ethics
            </h3>
            <ul className="space-y-2 text-[13px] text-[#bbbbbb]">
              <li>
                <button onClick={onOpenTipModal} className="hover:text-white hover:underline transition-colors cursor-pointer">
                  Submit News Tip / Scoop
                </button>
              </li>
              <li>
                <a href="#news" className="hover:text-white hover:underline transition-colors">
                  Fact-Checking Policy
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-white hover:underline transition-colors">
                  Editorial Standards
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-white hover:underline transition-colors">
                  Advertise With Us
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-white hover:underline transition-colors">
                  Careers &amp; Internships
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-[#e31b23] mb-4">
              Morning Espresso Dispatch
            </h3>
            <p className="text-[#bbbbbb] text-[13px] leading-[1.8] mb-3">
              Get Kenya’s top stories curated and delivered directly to your inbox every morning at 7:00 AM EAT.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 pl-8 text-xs bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#e31b23]"
                />
                <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#e31b23] hover:bg-[#c9151c] text-white font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSubscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Subscribed! Welcome</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe Free</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright line with small CMS admin icon */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#bbbbbb]">
          <p>© 2026 The Real Blend. All Rights Reserved.</p>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span>Nairobi · London · New York</span>
            <span>·</span>
            <span>Independent Digital Media</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <button
              onClick={onOpenAdmin}
              className="p-1 text-neutral-600 hover:text-white hover:bg-neutral-800 rounded transition-colors cursor-pointer"
              title="Admin CMS Access"
              aria-label="Admin CMS Access"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
