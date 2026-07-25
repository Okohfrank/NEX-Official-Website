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
      {/* Header Banner - Dark Background / White Text */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#060721] text-white border border-slate-800 shadow-2xl text-center space-y-2">
        <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-[#2FA137] border border-emerald-500/30 px-3 py-1 rounded-full">
          AUTO-COMPILED FINAL REPORT
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Documentation & Publication Pipeline
        </h1>
        <p className="text-xs text-slate-300 font-medium max-w-md mx-auto">
          Auto-aggregates Research Workspace data, Build Logs, and Testing metrics into an open academic report.
        </p>
      </div>

      {published ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm text-center py-12 space-y-4">
          <Globe className="w-16 h-16 text-[#2FA137] mx-auto animate-pulse" />
          <h2 className="text-2xl font-black text-[#060721]">
            Project Live on Public Showcase!
          </h2>
          <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
            Your final engineering report has been published open-access. It is now linked permanently to each team member's NEX Profile and research contribution portfolio.
          </p>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-6 py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20"
          >
            Return to Member Dashboard
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Compiled Document Preview Card - White Background / Black Text */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-black text-[#2FA137] uppercase tracking-widest block">NEX TECHNICAL REPORT #2026-44</span>
              <h2 className="text-2xl font-black text-[#060721] mt-1">
                {buildWorkspace.groupName}
              </h2>
            </div>

            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 mb-1">Problem Statement</h4>
              <p className="text-xs text-slate-800 font-medium leading-relaxed">
                {researchWorkspace.problemStatement}
              </p>
            </div>

            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 mb-2">Testing & Validated Metrics</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {buildWorkspace.testingData.map((t, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="font-black text-[#060721]">{t.testObj}</p>
                    <p className="text-[#2FA137] font-bold text-[11px] mt-0.5">{t.result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Member Consent Section - White Background / Black Text */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-black text-base text-[#060721]">
              Team Member Publication Consent Sign-Off
            </h3>
            <p className="text-xs text-slate-600 font-medium">
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
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold transition-all ${
                      checked
                        ? 'bg-emerald-50 border-emerald-200 text-[#2FA137]'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{m.name}</span>
                    {checked ? <CheckSquare className="w-4 h-4 text-[#2FA137]" /> : <Square className="w-4 h-4 text-slate-400" />}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handlePublish}
              disabled={!allConsented}
              className={`w-full py-3.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                allConsented
                  ? 'bg-[#2FA137] hover:bg-[#26892c] text-white shadow-emerald-600/20 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
            >
              <Globe className="w-4 h-4 text-white" />
              <span>{allConsented ? 'Publish Open Access Report to Showcase' : 'Awaiting Member Consent'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
