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
      {/* Header Banner - Dark Background / White Text */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#060721] text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="black">CYCLE RANKINGS</Badge>
            <span className="text-xs text-slate-300 font-semibold">2026 First Cycle</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white">Leaderboard & Recognition System</h1>
          <p className="text-xs text-slate-300 mt-1 font-medium">Earn points through skill-tagged build entries, research logs, and peer nominations.</p>
        </div>

        <button
          onClick={() => setShowCredentialModal(true)}
          className="flex items-center justify-center gap-2 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-lg transition-all shrink-0"
        >
          <Award className="w-4 h-4 text-white shrink-0" />
          <span>Generate LinkedIn Credential Card</span>
        </button>
      </div>

      {/* Leaderboard Table - White Background / Black Text */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
          <Trophy className="w-5 h-5 text-[#2FA137]" />
          <span>Cycle 2026 Top Student Contributors</span>
        </h3>

        <div className="overflow-x-auto max-w-full">
          <table className="w-full text-left text-xs border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px]">
                <th className="py-3">Rank</th>
                <th className="py-3">Member</th>
                <th className="py-3">Faculty / Dept</th>
                <th className="py-3">Skill Badges</th>
                <th className="py-3 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaderboard.map((m) => (
                <tr key={m.rank} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-black text-[#060721]">
                    {m.rank === 1 ? '#1 🥇' : m.rank === 2 ? '#2 🥈' : m.rank === 3 ? '#3 🥉' : `#${m.rank}`}
                  </td>
                  <td className="py-3 pr-2">
                    <p className="font-black text-[#060721] text-sm">{m.name}</p>
                    <span className="text-[10px] text-slate-500 font-bold">{m.badge}</span>
                  </td>
                  <td className="py-3 text-slate-600 font-medium pr-2">{m.dept}</td>
                  <td className="py-3 pr-2">
                    <div className="flex flex-wrap gap-1">
                      {m.skillBadges.map((b, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#2FA137] border border-emerald-200 text-[10px] font-bold">{b}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 text-right font-black text-[#060721] text-sm">
                    {m.points} PTS
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credential Modal */}
      {showCredentialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl my-auto">
            <button
              onClick={() => setShowCredentialModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-slate-300 font-bold text-xs flex items-center gap-1"
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
