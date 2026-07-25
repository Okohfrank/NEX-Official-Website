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
      {/* Workspace Header - Dark Background / White Text */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#060721] text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-[#2FA137] border border-emerald-500/30 px-3 py-1 rounded-full">
              RESEARCH STAGE
            </span>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Saving Enabled
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{researchWorkspace.groupName}</h1>
          <p className="text-xs text-slate-300 mt-1 font-medium">Guided Research Template & Timestamped Activity Log</p>
        </div>

        <button
          onClick={() => setActiveTab('proposal')}
          className="flex items-center gap-2 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition-all"
        >
          <Send className="w-4 h-4 text-white" />
          <span>Proceed to Proposal Submission</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Guided Research 4 Sections */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
            {[
              { id: 'problem', label: '1. Problem Statement' },
              { id: 'lit', label: '2. Lit Review & Citations' },
              { id: 'findings', label: '3. Findings Summary' },
              { id: 'constraints', label: '4. Local Constraints' }
            ].map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSec(sec.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeSec === sec.id
                    ? 'bg-[#060721] text-white shadow-md'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            {activeSec === 'problem' && (
              <div>
                <h3 className="font-black text-sm mb-2 text-[#060721]">
                  1. Problem Statement & Societal Justification
                </h3>
                <textarea
                  rows={6}
                  value={researchWorkspace.problemStatement}
                  onChange={e => handleSave('problemStatement', e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-[#060721] font-medium text-xs focus:ring-2 focus:ring-[#2FA137] outline-none leading-relaxed shadow-xs"
                ></textarea>
              </div>
            )}

            {activeSec === 'lit' && (
              <div>
                <h3 className="font-black text-sm mb-2 text-[#060721]">
                  2. Background / Literature Research & Sources
                </h3>
                <textarea
                  rows={6}
                  value={researchWorkspace.literatureReview}
                  onChange={e => handleSave('literatureReview', e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-[#060721] font-medium text-xs focus:ring-2 focus:ring-[#2FA137] outline-none leading-relaxed shadow-xs"
                ></textarea>
              </div>
            )}

            {activeSec === 'findings' && (
              <div>
                <h3 className="font-black text-sm mb-2 text-[#060721]">
                  3. Key Research Findings Summary
                </h3>
                <textarea
                  rows={6}
                  value={researchWorkspace.findingsSummary}
                  onChange={e => handleSave('findingsSummary', e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-[#060721] font-medium text-xs focus:ring-2 focus:ring-[#2FA137] outline-none leading-relaxed shadow-xs"
                ></textarea>
              </div>
            )}

            {activeSec === 'constraints' && (
              <div>
                <h3 className="font-black text-sm mb-2 text-[#060721]">
                  4. Local Constraints (Budget, Materials, Climate)
                </h3>
                <textarea
                  rows={6}
                  value={researchWorkspace.constraints}
                  onChange={e => handleSave('constraints', e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-[#060721] font-medium text-xs focus:ring-2 focus:ring-[#2FA137] outline-none leading-relaxed shadow-xs"
                ></textarea>
              </div>
            )}
          </div>
        </div>

        {/* Timestamped Research Log & Mentor Feed */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-black text-sm text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
              <MessageSquare className="w-4 h-4 text-[#2FA137]" />
              <span>Timestamped Research Log</span>
            </h3>

            {/* Log Input */}
            <form onSubmit={handleAddLogSubmit} className="space-y-3">
              <textarea
                rows={3}
                placeholder="Post a research update or lab result..."
                value={logText}
                onChange={e => setLogText(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-[#060721] font-medium text-xs focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs"
              ></textarea>
              <div className="flex items-center justify-between">
                <select
                  value={logTag}
                  onChange={e => setLogTag(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-[#060721] font-bold text-xs shadow-xs"
                >
                  <option>Field Data</option>
                  <option>Lab Test</option>
                  <option>Literature Citation</option>
                  <option>Brainstorming</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#2FA137] text-white font-bold text-xs hover:bg-[#26892c] shadow-md shadow-emerald-600/20"
                >
                  Post Update
                </button>
              </div>
            </form>

            {/* Log Feed */}
            <div className="space-y-3 pt-2 max-h-96 overflow-y-auto pr-1">
              {researchWorkspace.researchLogs.map(log => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-black text-[#060721]">{log.author}</span>
                    <span className="text-slate-500 font-semibold">{log.time}</span>
                  </div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#2FA137] border border-emerald-200 text-[10px] font-extrabold">{log.tag}</span>
                  <p className="text-slate-800 font-medium leading-relaxed">{log.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
