import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { Send, CheckCircle2, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProposalForm = () => {
  const { researchWorkspace, setActiveTab } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto">
      {/* Header Banner - Dark Background / White Text */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#060721] text-white border border-slate-800 shadow-2xl text-center space-y-2">
        <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-[#2FA137] border border-emerald-500/30 px-3 py-1 rounded-full">
          RESEARCH STAGE COMPLETE
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Formal Proposal Submission
        </h1>
        <p className="text-xs text-slate-300 font-medium max-w-md mx-auto">
          Once submitted, your proposal will enter the <strong>Admin Proposal Review Queue</strong> for executive 5-axis technical scoring.
        </p>
      </div>

      {/* Form Card - White Background / Black Text */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#2FA137] mx-auto animate-bounce" />
            <h2 className="text-2xl font-black text-[#060721]">
              Proposal Submitted to Review Queue!
            </h2>
            <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
              Your proposal has been locked for review. Technical & Research Lead <strong>Engr. Dr. Charles Nwankwo</strong> and assigned reviewers will score your submission across Feasibility, Rigor, Scope, Safety, and Skill Use.
            </p>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20"
            >
              Return to Member Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            <div>
              <label className="block font-black mb-1.5 text-[#060721]">Problem Statement & Justification</label>
              <textarea
                rows={3}
                defaultValue={researchWorkspace.problemStatement}
                className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-[#060721] font-medium outline-none focus:ring-2 focus:ring-[#2FA137]"
              ></textarea>
            </div>

            <div>
              <label className="block font-black mb-1.5 text-[#060721]">Proposed Solution Concept & Engineering Approach</label>
              <textarea
                rows={4}
                defaultValue="Multi-stage bio-sand and activated coconut charcoal column with integrated solar UV-C sterilization for continuous Epe village borehole water treatment."
                className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-[#060721] font-medium outline-none focus:ring-2 focus:ring-[#2FA137]"
              ></textarea>
            </div>

            <div>
              <label className="block font-black mb-1.5 text-[#060721]">Preliminary Scope & Objectives</label>
              <textarea
                rows={3}
                defaultValue="1. Reduce heavy iron precipitate from 3.4 mg/L to < 0.3 mg/L.\n2. Build prototype under ₦150,000 budget.\n3. Validate 2,500 L/day flow rate."
                className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-[#060721] font-medium outline-none focus:ring-2 focus:ring-[#2FA137]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-black text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-white" />
              <span>Submit Final Proposal for Review</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
