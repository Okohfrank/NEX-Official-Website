import React, { useState } from 'react';
import { COHORT_PROJECTS } from '../../data/cohortProjectsData';
import { 
  X, 
  Download, 
  FileText, 
  Video, 
  Image as ImageIcon,
  Search, 
  CheckCircle2, 
  FolderGit2, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const getFileIcon = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase();
  if (['mp4', 'mov', 'avi', 'webm'].includes(ext)) return <Video className="w-3.5 h-3.5 text-blue-500" />;
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return <ImageIcon className="w-3.5 h-3.5 text-violet-500" />;
  return <FileText className="w-3.5 h-3.5 text-red-500" />;
};

const getFileTypeLabel = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase();
  if (['mp4', 'mov', 'avi', 'webm'].includes(ext)) return 'Video';
  if (['pdf'].includes(ext)) return 'PDF';
  if (['pptx', 'ppt'].includes(ext)) return 'Slides';
  if (['docx', 'doc'].includes(ext)) return 'Document';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'Image';
  return 'File';
};

const FOCUS_COLORS = {
  'Energy': 'bg-amber-50 text-amber-700 border-amber-200',
  'Water': 'bg-sky-50 text-sky-700 border-sky-200',
  'Waste': 'bg-orange-50 text-orange-700 border-orange-200',
  'Digital Innovation': 'bg-violet-50 text-violet-700 border-violet-200',
  'Infrastructure': 'bg-slate-100 text-slate-700 border-slate-300',
};

export const CohortProjectsModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  if (!isOpen) return null;

  const domains = ['All', 'Water', 'Energy', 'Waste', 'Digital Innovation', 'Infrastructure'];

  const filteredProjects = COHORT_PROJECTS.filter(project => {
    const matchesDomain = selectedDomain === 'All' || project.focusArea === selectedDomain;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      project.title.toLowerCase().includes(query) ||
      String(project.groupNumber).toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query);
    return matchesDomain && matchesSearch;
  });

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-neutral-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-[#060721] text-white p-6 sm:p-8 border-b border-slate-800 shrink-0 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#2FA137]/20 rounded-full blur-3xl pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            title="Close Cohort Showcase"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-[#2FA137] border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              NEX FOUNDING COHORT • HARMATTAN 2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Cohort Teams & Technical Submissions
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Browse and download engineering reports, presentation slides, prototype demos, and working mechanism videos submitted by our founding student teams.
            </p>
          </div>

          {/* Search & Domain Filter Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by group number or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-white/15 focus:outline-hidden focus:border-[#2FA137] transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              {domains.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDomain(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                    selectedDomain === d
                      ? 'bg-[#2FA137] text-white shadow-md'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/60 dark:bg-black/40">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold px-1">
            <span>Showing {filteredProjects.length} Cohort Submission{filteredProjects.length === 1 ? '' : 's'}</span>
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2FA137]" />
              Verified Submissions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map(proj => {
              const isExpanded = expandedId === proj.id;
              const badgeColor = FOCUS_COLORS[proj.focusArea] || 'bg-slate-100 text-slate-700 border-slate-300';

              return (
                <div 
                  key={proj.id}
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-slate-200 dark:border-neutral-800 shadow-xs hover:shadow-lg hover:border-[#2FA137]/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#060721] text-white font-black text-xs tracking-wider">
                        {proj.groupNumber === 'Special' ? 'SPECIAL' : `GROUP ${proj.groupNumber}`}
                      </span>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${badgeColor}`}>
                        {proj.focusArea}
                      </span>
                    </div>

                    <h3 className="font-black text-base sm:text-lg text-[#060721] dark:text-white leading-snug">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed font-normal">
                      {proj.description}
                    </p>

                    {/* Deliverables */}
                    <div className="pt-2 border-t border-slate-100 dark:border-neutral-800 space-y-2">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                        className="w-full flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:text-[#2FA137] transition-colors"
                      >
                        <span>{proj.deliverables.length} Deliverable{proj.deliverables.length > 1 ? 's' : ''} Available</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <div className="space-y-1.5 animate-in slide-in-from-top-2">
                          {proj.deliverables.map((deliv, idx) => (
                            <a
                              key={idx}
                              href={deliv.path}
                              download={deliv.file}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 hover:border-[#2FA137]/40 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/40 transition-all group"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                {getFileIcon(deliv.file)}
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-[#060721] dark:text-white truncate">{deliv.name}</p>
                                  <p className="text-[10px] text-slate-400 font-medium">{getFileTypeLabel(deliv.file)}</p>
                                </div>
                              </div>
                              <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2FA137] shrink-0 transition-colors" />
                            </a>
                          ))}
                        </div>
                      )}

                      {!isExpanded && (
                        <div className="flex flex-wrap gap-1.5">
                          {proj.deliverables.map((deliv, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 px-2 py-0.5 rounded-md">
                              {getFileIcon(deliv.file)}
                              <span className="truncate max-w-[120px] font-medium">{deliv.name}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-3 border-t border-slate-100 dark:border-neutral-800">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white text-xs font-bold transition-transform active:scale-95 shadow-sm"
                    >
                      <Download className="w-3 h-3" />
                      <span>{isExpanded ? 'Collapse' : 'View & Download Files'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 space-y-2">
              <FolderGit2 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No project submissions match your filter.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedDomain('All'); }}
                className="text-xs font-bold text-[#2FA137] hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white dark:bg-neutral-900 border-t border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <p>Projects validated and submitted under NEX Cohort 1 Research & Build Cycle.</p>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-800 dark:text-slate-200 font-bold transition-colors w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
