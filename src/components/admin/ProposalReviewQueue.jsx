import React, { useState } from 'react';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { Award, CheckCircle2, XCircle, RefreshCw, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProposalReviewQueue = () => {
  const [proposals, setProposals] = useState([
    {
      id: "prop-101",
      groupName: "Group Alpha - Clean Hydro Systems",
      focusArea: "Water",
      title: "Solar Water Kiosk with Bio-Sand Filtration",
      status: "Under Review",
      scores: { feasibility: 4, rigor: 5, scope: 4, safety: 5, skillUse: 4 },
      feedback: "Excellent literature review and clear safety protocol for iron precipitate disposal."
    },
    {
      id: "prop-102",
      groupName: "Group Beta - Circular Plastics",
      focusArea: "Waste",
      title: "Plastic Waste to Eco-Thermal Bricks",
      status: "Under Review",
      scores: { feasibility: 5, rigor: 4, scope: 4, safety: 4, skillUse: 5 },
      feedback: "Strong interdisciplinary synergy between Chemical Engineering and Building Technology."
    }
  ]);

  const handleDecision = (id, newStatus) => {
    if (newStatus === 'Approved') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    setProposals(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  return (
    <div className="space-y-8 animate-in fade-in bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f6e8] text-[#2FA137] text-xs font-bold border border-emerald-200/60 mb-1">
          <Award className="w-3.5 h-3.5" />
          <span>PROPOSAL REVIEW & SELECTION QUEUE</span>
        </div>
        <h1 className="text-2xl font-black text-[#060721]">Executive 5-Axis Technical Scoring Sheet</h1>
        <p className="text-xs text-slate-600 font-medium">Reviewed by Technical & Research Lead. Max 4 Selected Projects approved for full prototype build per cycle.</p>
      </div>

      <div className="space-y-6">
        {proposals.map(p => (
          <div key={p.id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] text-[#2FA137] font-extrabold uppercase">{p.groupName}</span>
                <h3 className="text-lg font-black text-[#060721]">{p.title}</h3>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                p.status === 'Approved' ? 'bg-emerald-50 text-[#2FA137] border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {p.status}
              </span>
            </div>

            {/* 5-Axis Scoring matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 text-xs text-center">
              <div>
                <p className="text-[10px] text-slate-500 font-medium">1. Tech Feasibility</p>
                <p className="font-black text-[#2FA137]">{p.scores.feasibility} / 5</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-medium">2. Research Rigor</p>
                <p className="font-black text-[#2FA137]">{p.scores.rigor} / 5</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-medium">3. Realistic Scope</p>
                <p className="font-black text-[#2FA137]">{p.scores.scope} / 5</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-medium">4. Safety Awareness</p>
                <p className="font-black text-[#2FA137]">{p.scores.safety} / 5</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-medium">5. Skill Synergy</p>
                <p className="font-black text-[#2FA137]">{p.scores.skillUse} / 5</p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Mandatory Written Reviewer Feedback</label>
              <p className="text-xs text-slate-700 p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-medium">
                {p.feedback}
              </p>
            </div>

            {/* Decision Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleDecision(p.id, 'Approved')}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve for Development (Selected Project)</span>
              </button>

              <button
                onClick={() => handleDecision(p.id, 'Approved with Revisions')}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-100 border border-amber-200 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Request Revisions</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
