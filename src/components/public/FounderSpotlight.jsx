import React from 'react';
import { FOUNDER_DATA } from '../../data/mockData';
import { handleImageError } from '../../utils/imageFallback';
import { Award, GraduationCap, CheckCircle } from 'lucide-react';

export const FounderSpotlight = () => {
  return (
    <section id="founder" className="py-12 sm:py-16 bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="rounded-3xl p-6 sm:p-12 bg-slate-50/70 text-slate-900 border border-slate-200/90 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-sm">
                <img
                  src={FOUNDER_DATA.photo}
                  alt={FOUNDER_DATA.name}
                  onError={(e) => handleImageError(e, 'person', FOUNDER_DATA.name)}
                  className="rounded-3xl w-full h-80 sm:h-96 object-cover object-top border-2 border-[#2FA137]/30 shadow-xl transition-all duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4 p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-slate-200 text-center shadow-md backdrop-blur-md">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2FA137]">FOUNDER & VISIONARY</span>
                  <h4 className="text-sm sm:text-base font-black text-[#060721]">{FOUNDER_DATA.name}</h4>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6f6e8] text-[#2FA137] text-xs font-bold border border-emerald-200/60">
                <GraduationCap className="w-4 h-4 text-[#2FA137]" />
                <span>FOUNDER SPOTLIGHT</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-snug sm:leading-tight text-[#060721] tracking-tight">
                "Engineering education must extend beyond the classroom into real, implemented solutions."
              </h2>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-[#2FA137] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#060721] leading-snug">{FOUNDER_DATA.credentials}</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{FOUNDER_DATA.institution}</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {FOUNDER_DATA.narrative}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <CheckCircle className="w-4 h-4 text-[#2FA137] shrink-0" />
                  <span>Bridging research to community impact</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <CheckCircle className="w-4 h-4 text-[#2FA137] shrink-0" />
                  <span>Uniting Engineering, Agriculture & Environmental Sciences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
