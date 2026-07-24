import React, { useState } from 'react';
import { PUBLISHED_PROJECTS, FOCUS_AREAS } from '../../data/mockData';
import { GlassCard } from '../UI/GlassCard';
import { handleImageError } from '../../utils/imageFallback';
import { Search, ExternalLink, Calendar, X, Sparkles } from 'lucide-react';

export const ProjectShowcase = () => {
  const [selectedFocus, setSelectedFocus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = PUBLISHED_PROJECTS.filter(p => {
    const matchesFocus = selectedFocus === 'All' || p.focusArea === selectedFocus;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFocus && matchesSearch;
  });

  return (
    <section id="featured-projects" className="pt-4 pb-12 sm:pt-6 sm:pb-16 bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-16 space-y-6 sm:space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2FA137]">
                UPCOMING INTERDISCIPLINARY MISSIONS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#060721] mt-1">
                Featured Projects (Upcoming Missions)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                As NEX rolls out for the 2026 academic cycle, explore candidate missions undergoing problem definition and prototype planning.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-auto">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search upcoming projects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 outline-none focus:ring-2 focus:ring-[#2FA137] w-full sm:w-64 shadow-xs"
              />
            </div>
          </div>

          {/* Horizontally Scrollable Focus Area Pill Selector for Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200/80">
            <button
              onClick={() => setSelectedFocus('All')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedFocus === 'All'
                  ? 'bg-[#2FA137] text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              All Domains
            </button>
            {FOCUS_AREAS.map(fa => (
              <button
                key={fa.id}
                onClick={() => setSelectedFocus(fa.title)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedFocus === fa.title
                    ? 'bg-[#2FA137] text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {fa.title}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(proj => (
            <GlassCard 
              key={proj.id} 
              onClick={() => setSelectedProject(proj)} 
              className="flex flex-col justify-between group overflow-hidden p-0 bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2FA137]/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Image Container with Hover Slide-In Focus Area Badge */}
                <div className="relative rounded-t-2xl overflow-hidden h-44 sm:h-52 bg-slate-100">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    onError={(e) => handleImageError(e, 'project', proj.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Focus Area Tag sliding in from the left on hover */}
                  <div className="absolute top-4 left-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-10">
                    <span className="bg-[#060721] text-[#2FA137] font-black text-[11px] px-3.5 py-1.5 rounded-r-xl shadow-xl tracking-wider uppercase">
                      {proj.focusArea}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0 space-y-3">
                  <div>
                    <span className="text-[10px] text-[#2FA137] font-extrabold uppercase tracking-wider">{proj.cycle}</span>
                    <h3 className="text-base sm:text-lg font-black text-[#060721] leading-snug mt-0.5 group-hover:text-[#2FA137] transition-colors">
                      {proj.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                    {proj.abstract}
                  </p>

                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Target Impact:</span>
                      <span className="font-bold text-[#060721]">{proj.metrics.impact}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 flex items-center justify-between text-xs text-[#060721] font-bold group-hover:text-[#2FA137] transition-colors">
                <span>View Candidate Mission Overview</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedProject && (
          <div 
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md cursor-pointer"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 max-h-[90vh] overflow-y-auto animate-in fade-in cursor-default"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-20 shadow-xs"
                title="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="relative rounded-2xl overflow-hidden h-48 sm:h-64">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    onError={(e) => handleImageError(e, 'project', selectedProject.title)}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-[#2FA137] text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-md">
                    {selectedProject.focusArea}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-[#2FA137] font-extrabold tracking-wider uppercase">{selectedProject.cycle}</span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#060721] mt-1">{selectedProject.title}</h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Designated Team: {selectedProject.teamName}</p>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">Project Overview</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {selectedProject.abstract}
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
