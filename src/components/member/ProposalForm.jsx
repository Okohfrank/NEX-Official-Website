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
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-sky-500/30 text-center space-y-2">
        <Badge variant="green">RESEARCH STAGE COMPLETE</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
          Formal Proposal Submission
        </h1>
        <p className="text-xs text-slate-300">
          Once submitted, your proposal will enter the <strong>Admin Proposal Review Queue</strong> for executive 5-axis scoring.
        </p>
      </div>

      <GlassCard>
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h2 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
              Proposal Submitted to Review Queue!
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Your proposal has been locked for review. Technical & Research Lead <strong>Engr. Femi Babatunde</strong> and assigned reviewers will score your submission across Feasibility, Rigor, Scope, Safety, and Skill Use.
            </p>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg"
            >
              Return to Member Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            <div>
              <label className="block font-bold mb-1 text-slate-900 dark:text-white">Problem Statement & Justification</label>
              <textarea
                rows={3}
                defaultValue={researchWorkspace.problemStatement}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-900 dark:text-white">Proposed Solution Concept & Engineering Approach</label>
              <textarea
                rows={4}
                defaultValue="Multi-stage bio-sand and activated coconut charcoal column with integrated solar UV-C sterilization for continuous Epe village borehole water treatment."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-900 dark:text-white">Preliminary Scope & Objectives</label>
              <textarea
                rows={3}
                defaultValue="1. Reduce heavy iron precipitate from 3.4 mg/L to < 0.3 mg/L.\n2. Build prototype under ₦150,000 budget.\n3. Validate 2,500 L/day flow rate."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Final Proposal for Review</span>
            </button>
          </form>
        )}
      </GlassCard>
    </div>
  );
};
