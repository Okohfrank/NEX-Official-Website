import React from 'react';
import { FOCUS_AREAS } from '../../data/mockData';
import { GlassCard } from '../UI/GlassCard';
import { Droplets, Zap, Recycle, Sprout, Building2, Cpu, ArrowUpRight } from 'lucide-react';

export const FocusAreas = () => {
  const iconMap = { Droplets, Zap, Recycle, Sprout, Building2, Cpu };

  return (
    <section id="focus-areas" className="py-12 sm:py-16 bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-16 space-y-10">
        <div className="text-center mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2FA137]">
            PROBLEM DOMAINS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#060721] mt-1">
            Six Focus Areas of Impact
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            NEX directs multi-week semester Missions toward tangible societal challenges across these key engineering domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOCUS_AREAS.map(fa => {
            const Icon = iconMap[fa.icon] || Cpu;
            return (
              <div 
                key={fa.id} 
                className="group bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2FA137]/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#e6f6e8] text-[#2FA137] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#2FA137] transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-[#060721] mb-2 group-hover:text-[#2FA137] transition-colors">
                  {fa.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {fa.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {fa.subdomains.map((sub, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
