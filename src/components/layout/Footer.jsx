import React from 'react';
import { useApp } from '../../context/AppContext';
import { FOCUS_AREAS } from '../../data/mockData';
import { Globe, Share2, Link as LinkIcon, Mail } from 'lucide-react';

export const Footer = () => {
  const { setActiveTab } = useApp();

  const handleLandingScroll = (secId) => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById(secId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <footer className="bg-white text-slate-900 border-t border-slate-200/90 pt-10 pb-8">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Logo (Full Width on Mobile, 1 Col on Desktop) */}
          <div className="col-span-2 lg:col-span-1 space-y-3.5 border-b lg:border-b-0 pb-6 lg:pb-0 border-slate-100">
            <div 
              className="flex items-center gap-3 cursor-pointer shrink-0" 
              onClick={() => handleLandingScroll('hero')}
            >
              <img 
                src="/logo.png" 
                alt="NEX Emblem" 
                className="h-10 sm:h-11 w-auto object-contain" 
              />
              <div className="flex flex-col text-[11px] md:text-xs font-black tracking-tight leading-[1.1]">
                <span className="text-[#060721]">NETWORK OF</span>
                <span className="text-[#060721]">ENGINEERING</span>
                <span className="text-[#2FA137] tracking-wider">XCELLENCE</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Network of Engineering Xcellence is an interdisciplinary innovation society uniting students across Engineering, Agriculture, and Environmental Sciences to turn research into real-world built solutions.
            </p>
            <p className="text-xs text-[#060721] font-black pt-1">
              Founded by Oyewole Samod Atanda
            </p>
          </div>

          {/* Col 2: Focus Areas (Left Column on Mobile) */}
          <div className="col-span-1">
            <h4 className="font-black text-xs uppercase tracking-wider text-[#2FA137] mb-3">Focus Domains</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              {FOCUS_AREAS.map(fa => (
                <li key={fa.id}>
                  <button
                    onClick={() => handleLandingScroll('focus-areas')}
                    className="hover:text-[#2FA137] transition-colors text-left"
                  >
                    {fa.title} Engineering
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation (Right Column on Mobile) */}
          <div className="col-span-1">
            <h4 className="font-black text-xs uppercase tracking-wider text-[#2FA137] mb-3">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><button onClick={() => handleLandingScroll('founder')} className="hover:text-[#2FA137] transition-colors text-left">About & Founder</button></li>
              <li><button onClick={() => handleLandingScroll('leadership')} className="hover:text-[#2FA137] transition-colors text-left">Executive Council</button></li>
              <li><button onClick={() => handleLandingScroll('featured-projects')} className="hover:text-[#2FA137] transition-colors text-left">Featured Projects</button></li>
              <li><button onClick={() => handleLandingScroll('partnerships')} className="hover:text-[#2FA137] transition-colors text-left">Partnerships & Grants</button></li>
              <li><button onClick={() => handleLandingScroll('publications')} className="hover:text-[#2FA137] transition-colors text-left">Publications</button></li>
            </ul>
          </div>

          {/* Col 4: Location & Contact (Full Width on Mobile below links) */}
          <div className="col-span-2 lg:col-span-1 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 space-y-3">
            <h4 className="font-black text-xs uppercase tracking-wider text-[#2FA137]">Location & Contact</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Lagos State University (LASU), Ojo Campus<br />Faculty of Engineering Hub
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a href="#" className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-[#e6f6e8] text-slate-700 hover:text-[#2FA137] transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-[#e6f6e8] text-slate-700 hover:text-[#2FA137] transition-all">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-[#e6f6e8] text-slate-700 hover:text-[#2FA137] transition-all">
                <LinkIcon className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-[#e6f6e8] text-slate-700 hover:text-[#2FA137] transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} NEX - Network of Engineering Xcellence. All rights reserved.</p>
          <p className="font-bold text-[#060721]">
            Built for Academic Excellence & Real-World Impact
          </p>
        </div>
      </div>
    </footer>
  );
};
