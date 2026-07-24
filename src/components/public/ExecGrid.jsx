import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { handleImageError } from '../../utils/imageFallback';
import { Quote, X } from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const ExecGrid = () => {
  const { executives } = useApp();
  const [selectedExec, setSelectedExec] = useState(null);

  const sortedExecs = [...executives].sort((a, b) => a.order - b.order);

  return (
    <section id="leadership" className="py-12 sm:py-16 bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-16 space-y-8 sm:space-y-10">
        <div className="text-center mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2FA137]">
            GOVERNANCE & LEADERSHIP
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#060721] mt-1">
            NEX Executive Council
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
            Led by an executive council driving research rigor, digital innovation, and interdisciplinary collaboration across Lagos State University.
          </p>
        </div>

        {/* Executive Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedExecs.map(exec => (
            <GlassCard
              key={exec.id}
              onClick={() => setSelectedExec(exec)}
              className="flex flex-col justify-between group overflow-hidden p-0 bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2FA137]/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Picture Frame Container */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                <img
                  src={exec.photo}
                  alt={exec.name}
                  onError={(e) => handleImageError(e, 'person', exec.name)}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#060721]/90 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full border border-white/20 shadow-md">
                  #{exec.order}
                </div>
                
                {exec.instagram ? (
                  <a
                    href={exec.instagram}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="absolute top-3 right-3 p-2.5 bg-[#E1306C] hover:bg-[#c1255b] text-white rounded-full transition-colors shadow-md flex items-center justify-center"
                    title="Instagram Profile"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                ) : exec.linkedin ? (
                  <a
                    href={exec.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="absolute top-3 right-3 p-2.5 bg-[#0A66C2] hover:bg-[#084e96] text-white rounded-full transition-colors shadow-md flex items-center justify-center"
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                ) : null}
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2FA137]">
                    {exec.role}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#060721] mt-0.5 leading-snug group-hover:text-[#2FA137] transition-colors">
                    {exec.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    {exec.dept}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-[11px] text-[#2FA137]">Read Profile</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Selected Exec Modal View */}
        {selectedExec && (
          <div 
            onClick={() => setSelectedExec(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md cursor-pointer"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 my-auto animate-in fade-in cursor-default"
            >
              <button
                onClick={() => setSelectedExec(null)}
                className="absolute top-5 right-5 p-2.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-20 shadow-xs"
                title="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedExec.photo}
                    alt={selectedExec.name}
                    onError={(e) => handleImageError(e, 'person', selectedExec.name)}
                    className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl object-cover object-top border-2 border-emerald-500/30 shrink-0 shadow-md"
                  />
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2FA137]">
                      #{selectedExec.order} • {selectedExec.role}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-[#060721] leading-snug">{selectedExec.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">{selectedExec.dept}</p>

                    {selectedExec.instagram ? (
                      <a
                        href={selectedExec.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-white bg-[#E1306C] hover:bg-[#c1255b] px-3 py-1 rounded-full transition-colors"
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                        <span>Instagram Profile</span>
                      </a>
                    ) : selectedExec.linkedin ? (
                      <a
                        href={selectedExec.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-white bg-[#0A66C2] hover:bg-[#084e96] px-3 py-1 rounded-full transition-colors"
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                        <span>LinkedIn Profile</span>
                      </a>
                    ) : null}
                  </div>
                </div>

                {selectedExec.quote && (
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs italic text-slate-700 flex items-start gap-2.5">
                    <Quote className="w-4 h-4 shrink-0 text-[#2FA137] mt-0.5" />
                    <span>"{selectedExec.quote}"</span>
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">Executive Responsibilities & Biography</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {selectedExec.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
