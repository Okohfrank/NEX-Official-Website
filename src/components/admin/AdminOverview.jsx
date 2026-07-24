import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../UI/StatCard';
import { GlassCard } from '../UI/GlassCard';
import { ShieldAlert, Users, Award, FileText, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const AdminOverview = () => {
  const { cycle, setActiveTab } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f6e8] text-[#2FA137] text-xs font-bold border border-emerald-200/60">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>EXECUTIVE ADMINISTRATION DASHBOARD</span>
          </div>
          <h1 className="text-2xl font-black text-[#060721]">Cross-Cycle Governance & Analytics</h1>
          <p className="text-xs text-slate-600 font-medium">Executive controls for interdisciplinary placement, proposal review scoring, and content management.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('admin_placement')}
            className="bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
          >
            <span>Manage Group Placement</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Registered Members" value={cycle.totalMembers} subtext="12 Unplaced In Pool" icon={Users} />
        <StatCard label="Active Interdisciplinary Groups" value={cycle.activeGroups} subtext="24 Researching" icon={CheckCircle2} />
        <StatCard label="Proposals Pending Review" value="8" subtext="Review Gate Open" icon={AlertCircle} />
        <StatCard label="Selected Build Projects" value="4" subtext="Capped Limit Reached" icon={Award} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => setActiveTab('admin_placement')} 
          className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2FA137]/40 transition-all cursor-pointer group space-y-3"
        >
          <h3 className="font-black text-base text-[#060721] group-hover:text-[#2FA137] transition-colors">Interdisciplinary Placement Engine</h3>
          <p className="text-xs text-slate-600 font-medium">View unplaced verified members and assemble 5-6 student teams across Engineering, Agriculture, and Environmental Sciences.</p>
          <span className="text-xs font-bold text-[#2FA137] group-hover:translate-x-1 transition-transform inline-block">Launch Placement Engine →</span>
        </div>

        <div 
          onClick={() => setActiveTab('admin_proposals')} 
          className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2FA137]/40 transition-all cursor-pointer group space-y-3"
        >
          <h3 className="font-black text-base text-[#060721] group-hover:text-[#2FA137] transition-colors">Proposal Review Queue & Scoring</h3>
          <p className="text-xs text-slate-600 font-medium">Perform 5-axis technical review scoring (Feasibility, Rigor, Scope, Safety, Skill Use) and assign decision states.</p>
          <span className="text-xs font-bold text-[#2FA137] group-hover:translate-x-1 transition-transform inline-block">Open Review Queue →</span>
        </div>
      </div>
    </div>
  );
};
