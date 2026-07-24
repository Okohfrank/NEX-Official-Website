import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { FileCheck2, Globe, CheckSquare, Square, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PublishingCompiler = () => {
  const { buildWorkspace, researchWorkspace, currentUser, setActiveTab } = useApp();
  const [consents, setConsents] = useState({
    member1: true,
    member2: true,
    member3: true,
    member4: true,
    member5: false
  });
  const [published, setPublished] = useState(false);

  const allConsented = Object.values(consents).every(Boolean);

  const toggleConsent = (key) => {
    setConsents(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePublish = () => {
    if (!allConsented) return;
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    setPublished(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto">
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-sky-500/30 text-center space-y-2">
        <Badge variant="sky font-bold">AUTO-COMPILED FINAL REPORT</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
          Documentation & Publication Pipeline
        </h1>
        <p className="text-xs text-slate-300">
          Auto-aggregates Research Workspace data, Build Logs, and Testing metrics into an open academic report.
        </p>
      </div>

      {published ? (
        <GlassCard className="text-center py-12 space-y-4">
          <Globe className="w-16 h-16 text-sky-400 mx-auto animate-pulse" />
          <h2 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
            Project Live on Public Showcase!
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Your final engineering report has been published open-access. It is now linked permanently to each team member's NEX Profile and research contribution portfolio.
          </p>
          <button
            onClick={() => setActiveTab('showcase')}
            className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg"
          >
            View Live in Public Showcase
          </button>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {/* Compiled Document Preview Card */}
          <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">NEX TECHNICAL REPORT #2026-44</span>
              <h2 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white mt-1">
                {buildWorkspace.groupName}
              </h2>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1">Problem Statement</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {researchWorkspace.problemStatement}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1">Testing & Validated Metrics</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {buildWorkspace.testingData.map((t, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <p className="font-bold text-slate-900 dark:text-white">{t.testObj}</p>
                    <p className="text-emerald-500 font-semibold text-[11px] mt-0.5">{t.result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Member Consent Section */}
          <GlassCard className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Team Member Publication Consent Sign-Off
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Per NEX documentation integrity rules, all 5 interdisciplinary team members must confirm consent before public release.
            </p>

            <div className="space-y-2">
              {[
                { id: 'member1', name: 'Tunde Lawal (Build Lead)' },
                { id: 'member2', name: 'Zainab Alabi (Safety Inspector)' },
                { id: 'member3', name: 'Kelechi Okafor (Feedstock Spec.)' },
                { id: 'member4', name: 'Sam Charles (Telemetry)' },
                { id: 'member5', name: 'Amina Yusuf (Documentation)' }
              ].map((m) => {
                const checked = consents[m.id];
                return (
                  <button
                    key={m.id}
                    onClick={() => toggleConsent(m.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs transition-all ${
                      checked
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    <span className="font-medium">{m.name}</span>
                    {checked ? <CheckSquare className="w-4 h-4 text-emerald-500" /> : <Square className="w-4 h-4 text-slate-400" />}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handlePublish}
              disabled={!allConsented}
              className={`w-full py-3.5 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 ${
                allConsented
                  ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/25 cursor-pointer'
                  : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{allConsented ? 'Publish Open Access Report to Showcase' : 'Awaiting 1 Member Consent'}</span>
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
