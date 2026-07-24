import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import {
  BookOpen,
  Send,
  MessageSquare,
  Plus,
  CheckCircle2,
  Lock,
  Sparkles,
  FileText
} from 'lucide-react';

export const ResearchWorkspace = () => {
  const { researchWorkspace, setResearchWorkspace, addResearchLog, setActiveTab } = useApp();
  const [activeSec, setActiveSec] = useState('problem');
  const [logText, setLogText] = useState('');
  const [logTag, setLogTag] = useState('Field Update');

  const handleSave = (field, value) => {
    setResearchWorkspace(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddLogSubmit = (e) => {
    e.preventDefault();
    if (!logText.trim()) return;
    addResearchLog(logText, logTag);
    setLogText('');
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Workspace Header */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-sky-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="sky">RESEARCH STAGE</Badge>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Saving Enabled
            </span>
          </div>
          <h1 className="text-2xl font-extrabold font-display">{researchWorkspace.groupName}</h1>
          <p className="text-xs text-slate-300 mt-1">Guided Research Template & Timestamped Activity Log</p>
        </div>

        <button
          onClick={() => setActiveTab('proposal')}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-sky-500/25 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Proceed to Proposal Submission</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Guided Research 4 Sections */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            {[
              { id: 'problem', label: '1. Problem Statement' },
              { id: 'lit', label: '2. Lit Review & Citations' },
              { id: 'findings', label: '3. Findings Summary' },
              { id: 'constraints', label: '4. Local Constraints' }
            ].map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSec(sec.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSec === sec.id
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          <GlassCard className="space-y-4">
            {activeSec === 'problem' && (
              <div>
                <h3 className="font-bold text-sm mb-2 text-slate-900 dark:text-white">
                  1. Problem Statement & Societal Justification
                </h3>
                <textarea
                  rows={6}
                  value={researchWorkspace.problemStatement}
                  onChange={e => handleSave('problemStatement', e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs focus:ring-2 focus:ring-sky-500 outline-none leading-relaxed"
                ></textarea>
              </div>
            )}

            {activeSec === 'lit' && (
              <div>
                <h3 className="font-bold text-sm mb-2 text-slate-900 dark:text-white">
                  2. Background / Literature Research & Sources
                </h3>
                <textarea
                  rows={6}
                  value={researchWorkspace.literatureReview}
                  onChange={e => handleSave('literatureReview', e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs focus:ring-2 focus:ring-sky-500 outline-none leading-relaxed"
                ></textarea>
              </div>
            )}

            {activeSec === 'findings' && (
              <div>
                <h3 className="font-bold text-sm mb-2 text-slate-900 dark:text-white">
                  3. Key Research Findings Summary
                </h3>
                <textarea
                  rows={6}
                  value={researchWorkspace.findingsSummary}
                  onChange={e => handleSave('findingsSummary', e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs focus:ring-2 focus:ring-sky-500 outline-none leading-relaxed"
                ></textarea>
              </div>
            )}

            {activeSec === 'constraints' && (
              <div>
                <h3 className="font-bold text-sm mb-2 text-slate-900 dark:text-white">
                  4. Local Constraints (Budget, Materials, Climate)
                </h3>
                <textarea
                  rows={6}
                  value={researchWorkspace.constraints}
                  onChange={e => handleSave('constraints', e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs focus:ring-2 focus:ring-sky-500 outline-none leading-relaxed"
                ></textarea>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Timestamped Research Log & Mentor Feed */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sky-500" />
              <span>Timestamped Research Log</span>
            </h3>

            {/* Log Input */}
            <form onSubmit={handleAddLogSubmit} className="space-y-2">
              <textarea
                rows={2}
                placeholder="Post a research update or lab result..."
                value={logText}
                onChange={e => setLogText(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
              ></textarea>
              <div className="flex items-center justify-between">
                <select
                  value={logTag}
                  onChange={e => setLogTag(e.target.value)}
                  className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-[11px]"
                >
                  <option>Field Data</option>
                  <option>Lab Test</option>
                  <option>Literature Citation</option>
                  <option>Brainstorming</option>
                </select>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs hover:bg-sky-400"
                >
                  Post Update
                </button>
              </div>
            </form>

            {/* Log Feed */}
            <div className="space-y-3 pt-2 max-h-96 overflow-y-auto">
              {researchWorkspace.researchLogs.map(log => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-900 dark:text-white">{log.author}</span>
                    <span className="text-slate-400">{log.time}</span>
                  </div>
                  <Badge variant={log.tag === 'Mentor Feedback' ? 'amber' : 'sky'}>{log.tag}</Badge>
                  <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">{log.text}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
