import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../UI/StatCard';
import { ContributionGraph } from '../UI/ContributionGraph';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import {
  Users,
  BookOpen,
  Hammer,
  Trophy,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const MemberDashboard = () => {
  const { currentUser, cycle, setActiveTab } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-black dark:bg-zinc-900 text-white border border-zinc-800 shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="black">{cycle.name}</Badge>
              <span className="text-xs text-zinc-300 font-semibold">Stage: {cycle.status}</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-black bg-white px-2.5 py-0.5 rounded-full capitalize">
                {currentUser.role || 'Unplaced Member'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Welcome Back, {currentUser.name}!
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              {currentUser.dept} • Level: {currentUser.level || 'Member'}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-900 dark:bg-zinc-800 p-4 rounded-2xl border border-zinc-800">
            <Trophy className="w-8 h-8 text-white shrink-0" />
            <div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-extrabold">Total Points</p>
              <p className="text-xl font-black text-white font-display">{currentUser.points || 120} PTS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cycle Stage Progress Timeline */}
      <GlassCard className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          2026 Cycle Innovation Pipeline Status
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          {[
            { step: '1. Group Placement', desc: 'Completed', done: true },
            { step: '2. Guided Research', desc: 'Active', active: true },
            { step: '3. Proposal Review', desc: 'Gate Pending' },
            { step: '4. Prototype Build', desc: 'Selected Only' },
            { step: '5. Publication', desc: 'Final Gate' }
          ].map((s, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border transition-all ${
                s.done
                  ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-black dark:text-white font-bold'
                  : s.active
                  ? 'bg-black text-white dark:bg-white dark:text-black border-transparent font-extrabold shadow-md'
                  : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400'
              }`}
            >
              <p className="font-semibold">{s.step}</p>
              <p className="text-[10px] opacity-80 mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Quick Action Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard onClick={() => setActiveTab('mygroup')} className="space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-black dark:text-white">My Group Roster</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">View team members across Engineering, Agriculture & Environmental Sciences.</p>
          <span className="text-xs font-bold text-black dark:text-white group-hover:translate-x-1 transition-transform inline-block">Open Roster →</span>
        </GlassCard>

        <GlassCard onClick={() => setActiveTab('research')} className="space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-black dark:text-white">Guided Research Workspace</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Collaborate on problem statements, literature reviews, and post Research Log updates.</p>
          <span className="text-xs font-bold text-black dark:text-white group-hover:translate-x-1 transition-transform inline-block">Open Workspace →</span>
        </GlassCard>

        <GlassCard onClick={() => setActiveTab('leaderboard')} className="space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-black dark:text-white">Leaderboard & Badges</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Track cycle rankings, earn skill badges, and generate shareable credentials.</p>
          <span className="text-xs font-bold text-black dark:text-white group-hover:translate-x-1 transition-transform inline-block">View Rankings →</span>
        </GlassCard>
      </div>

      {/* Contribution Activity Heatmap */}
      <ContributionGraph />
    </div>
  );
};
