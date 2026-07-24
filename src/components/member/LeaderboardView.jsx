import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { CredentialCard } from '../UI/CredentialCard';
import { Trophy, Award, Sparkles, Share2, Medal, CheckCircle2, X } from 'lucide-react';

export const LeaderboardView = () => {
  const { leaderboard, currentUser } = useApp();
  const [showCredentialModal, setShowCredentialModal] = useState(false);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-black dark:bg-zinc-900 text-white border border-zinc-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="black">CYCLE RANKINGS</Badge>
            <span className="text-xs text-zinc-300 font-semibold">2026 First Cycle</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black">Leaderboard & Recognition System</h1>
          <p className="text-xs text-zinc-400 mt-1">Earn points through skill-tagged build entries, research logs, and peer nominations.</p>
        </div>

        <button
          onClick={() => setShowCredentialModal(true)}
          className="flex items-center justify-center gap-2 bg-white text-black font-bold text-xs px-5 py-3.5 rounded-2xl shadow-lg hover:opacity-90 transition-all shrink-0"
        >
          <Award className="w-4 h-4 text-black shrink-0" />
          <span>Generate LinkedIn Credential Card</span>
        </button>
      </div>

      {/* Leaderboard Table */}
      <GlassCard className="space-y-4">
        <h3 className="font-bold text-sm text-black dark:text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-black dark:text-white" />
          <span>Cycle 2026 Top Student Contributors</span>
        </h3>

        <div className="overflow-x-auto max-w-full">
          <table className="w-full text-left text-xs border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400">
                <th className="py-2.5">Rank</th>
                <th className="py-2.5">Member</th>
                <th className="py-2.5">Faculty / Dept</th>
                <th className="py-2.5">Skill Badges</th>
                <th className="py-2.5 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {leaderboard.map((m) => (
                <tr key={m.rank} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3 font-bold text-black dark:text-white">
                    {m.rank === 1 ? '#1 🥇' : m.rank === 2 ? '#2 🥈' : m.rank === 3 ? '#3 🥉' : `#${m.rank}`}
                  </td>
                  <td className="py-3 pr-2">
                    <p className="font-bold text-black dark:text-white">{m.name}</p>
                    <span className="text-[10px] text-zinc-500 font-semibold">{m.badge}</span>
                  </td>
                  <td className="py-3 text-zinc-500 pr-2">{m.dept}</td>
                  <td className="py-3 pr-2">
                    <div className="flex flex-wrap gap-1">
                      {m.skillBadges.map((b, idx) => (
                        <Badge key={idx} variant="default">{b}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 text-right font-black text-black dark:text-white text-sm">
                    {m.points} PTS
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Credential Modal */}
      {showCredentialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl my-auto">
            <button
              onClick={() => setShowCredentialModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-zinc-300 font-bold text-xs flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              <span>Close Modal</span>
            </button>
            <CredentialCard
              memberName={currentUser.name || "Nkechi Eze"}
              roleName="Interdisciplinary Research Specialist"
              topic="Clean Hydro Bio-Filter Unit for High-Iron Boreholes"
              cycle="2026 First Cycle"
            />
          </div>
        </div>
      )}
    </div>
  );
};
