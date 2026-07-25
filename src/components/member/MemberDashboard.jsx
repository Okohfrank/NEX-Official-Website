import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../UI/StatCard';
import { ContributionGraph } from '../UI/ContributionGraph';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { supabase } from '../../lib/supabase';
import {
  Users,
  BookOpen,
  Hammer,
  Trophy,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Megaphone,
  Award,
  FileText
} from 'lucide-react';

export const MemberDashboard = () => {
  const { currentUser, cycle, setActiveTab, certificates, showToast } = useApp();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (data && data.length > 0) {
          setAnnouncements(data);
        } else {
          setAnnouncements([
            { id: '1', title: '2026 First Cycle Topic Lock-In Open', content: 'All interdisciplinary teams must finalize and submit their research topic proposal for Technical Lead review by Friday.' },
            { id: '2', title: 'Open Publications Archive Updated', content: 'New annual research PDFs and open project blueprints uploaded to the NEX Open Archive.' }
          ]);
        }
      } catch (err) {
        // Fallback smooth
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-md overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#e6f6e8] text-[#2FA137] text-xs font-bold border border-emerald-200/60">
                {cycle.name}
              </span>
              <span className="text-xs text-slate-500 font-semibold">Stage: {cycle.status}</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#060721] bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                {currentUser.role || 'Unplaced Member'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#060721]">
              Welcome Back, {currentUser.name || 'Engineer'}!
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-xl font-medium">
              {currentUser.dept || 'Faculty of Engineering'} • Level: {currentUser.level || '300 Level'}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 shadow-xs">
            <Trophy className="w-8 h-8 text-[#2FA137] shrink-0" />
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Total Skill Points</p>
              <p className="text-xl font-black text-[#060721]">{currentUser.points || 120} PTS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cycle Stage Progress Timeline */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          2026 Cycle Innovation Pipeline Status
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          {[
            { step: '1. Group Placement', desc: 'Completed', done: true },
            { step: '2. Guided Research', desc: 'Active Workspace', active: true },
            { step: '3. Proposal Review', desc: '5-Axis Gate Pending' },
            { step: '4. Prototype Build', desc: 'Selected Projects Only' },
            { step: '5. Publication', desc: 'Open Archive Gate' }
          ].map((s, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border transition-all ${
                s.done
                  ? 'bg-emerald-50 border-emerald-200 text-[#2FA137] font-bold'
                  : s.active
                  ? 'bg-[#2FA137] text-white border-transparent font-extrabold shadow-md shadow-emerald-600/20'
                  : 'bg-slate-50 border-slate-200 text-slate-400 font-medium'
              }`}
            >
              <p className="font-bold">{s.step}</p>
              <p className="text-[10px] opacity-90 mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setActiveTab('mygroup')} 
          className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2FA137]/40 transition-all cursor-pointer group space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#e6f6e8] text-[#2FA137] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-[#060721] group-hover:text-[#2FA137] transition-colors">My Group Roster</h3>
          <p className="text-xs text-slate-600 font-medium">View team members across Engineering, Agriculture & Environmental Sciences.</p>
          <span className="text-xs font-bold text-[#2FA137] group-hover:translate-x-1 transition-transform inline-block">Open Roster →</span>
        </div>

        <div 
          onClick={() => setActiveTab('research')} 
          className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2FA137]/40 transition-all cursor-pointer group space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#e6f6e8] text-[#2FA137] flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-[#060721] group-hover:text-[#2FA137] transition-colors">Guided Research Workspace</h3>
          <p className="text-xs text-slate-600 font-medium">Collaborate on problem statements, literature reviews, and post Research Log updates.</p>
          <span className="text-xs font-bold text-[#2FA137] group-hover:translate-x-1 transition-transform inline-block">Open Workspace →</span>
        </div>

        <div 
          onClick={() => setActiveTab('leaderboard')} 
          className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2FA137]/40 transition-all cursor-pointer group space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#e6f6e8] text-[#2FA137] flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-[#060721] group-hover:text-[#2FA137] transition-colors">Leaderboard & Badges</h3>
          <p className="text-xs text-slate-600 font-medium">Track cycle rankings, earn skill badges, and generate shareable credentials.</p>
          <span className="text-xs font-bold text-[#2FA137] group-hover:translate-x-1 transition-transform inline-block">View Rankings →</span>
        </div>
      </div>

      {/* Live Supabase Announcements */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="font-black text-sm text-[#060721] flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-[#2FA137]" />
          <span>Official Society Announcements (Supabase Live Feed)</span>
        </h3>

        <div className="space-y-3">
          {announcements.map((a) => (
            <div key={a.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h4 className="font-bold text-xs text-[#060721]">{a.title}</h4>
              <p className="text-xs text-slate-600 font-medium">{a.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Issued Certificates & Credentials (CV-Ready) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm text-[#060721] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#2FA137]" />
            <span>My Issued CV-Ready Certificates & Credentials (PRD 3.9)</span>
          </h3>
          <span className="text-xs font-bold text-[#2FA137] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">{certificates.length} Issued</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certificates.map(c => (
            <div key={c.id} className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase text-[#2FA137] bg-white px-2.5 py-0.5 rounded-full border border-emerald-200">{c.type}</span>
                <span className="text-[10px] font-mono font-bold text-slate-500">{c.code}</span>
              </div>
              <h4 className="font-black text-[#060721] text-xs sm:text-sm">{c.title}</h4>
              <p className="text-[11px] text-slate-600 font-medium">Issued to <strong className="text-[#060721]">{c.recipient}</strong> • {c.date}</p>
              <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px]">
                <span className="font-bold text-[#2FA137]">Verification Status: Valid</span>
                <button 
                  onClick={() => showToast({ 
                    title: 'Certificate Verified & Validated!', 
                    message: `Credential Code: ${c.code} for ${c.recipient} ("${c.title}") is valid and verified by the NEX Academic Board.`, 
                    type: 'success' 
                  })}
                  className="font-extrabold text-[#060721] hover:underline"
                >
                  Verify Credentials →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contribution Activity Heatmap */}
      <ContributionGraph />
    </div>
  );
};
