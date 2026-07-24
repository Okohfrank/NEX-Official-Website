import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { HelpCircle, ThumbsUp, Plus, CheckCircle2 } from 'lucide-react';

export const BountyBoard = () => {
  const { bounties, upvoteBounty } = useApp();
  const [showSubmit, setShowSubmit] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [focus, setFocus] = useState('Energy');

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="sky">COMMUNITY PROBLEM BOUNTY BOARD</Badge>
          <h1 className="text-2xl font-extrabold font-display mt-1">Submit & Upvote Real-World Problems</h1>
          <p className="text-xs text-slate-300">Report community challenges for executive consideration in upcoming NEX semester cycles.</p>
        </div>

        <button
          onClick={() => setShowSubmit(!showSubmit)}
          className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
        >
          {showSubmit ? 'Cancel Submission' : '+ Report New Problem'}
        </button>
      </div>

      {/* Submission Form */}
      {showSubmit && (
        <GlassCard className="space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Submit Community Problem</h3>
          <input
            type="text"
            placeholder="Problem Title (e.g., Campus Cafeteria Organic Waste Sorting)"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
          />
          <textarea
            rows={3}
            placeholder="Detailed description of the societal or campus problem..."
            value={desc}
            onChange={e => setDesc(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs outline-none"
          ></textarea>
          <button
            onClick={() => {
              alert("Problem submitted for Executive review!");
              setShowSubmit(false);
            }}
            className="px-4 py-2 bg-sky-500 text-slate-950 font-bold text-xs rounded-xl"
          >
            Submit Problem
          </button>
        </GlassCard>
      )}

      {/* Bounty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bounties.map(b => (
          <GlassCard key={b.id} className="space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="sky">{b.focusArea}</Badge>
                {b.flaggedNextCycle && (
                  <Badge variant="amber">Candidate for Next Cycle</Badge>
                )}
              </div>

              <h3 className="font-bold text-base font-display text-slate-900 dark:text-white">{b.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{b.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Reported by {b.submittedBy} ({b.dept})</span>
              <button
                onClick={() => upvoteBounty(b.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-500 font-bold text-xs hover:bg-sky-500/20"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{b.votes} Upvotes</span>
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
