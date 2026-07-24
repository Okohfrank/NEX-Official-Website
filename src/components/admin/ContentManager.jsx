import React from 'react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../UI/GlassCard';
import { Badge } from '../UI/Badge';
import { Sparkles, Upload, Megaphone, Inbox } from 'lucide-react';

export const ContentManager = () => {
  return (
    <div className="space-y-8 animate-in fade-in bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f6e8] text-[#2FA137] text-xs font-bold border border-emerald-200/60 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CONTENT & COMMUNICATIONS MANAGEMENT</span>
        </div>
        <h1 className="text-2xl font-black text-[#060721]">Homepage Stats & Public Content Control</h1>
        <p className="text-xs text-slate-600 font-medium">Managed by Executive Council & Web Systems Team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-black text-sm text-[#060721] flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[#2FA137]" />
            <span>Post Official Society Announcement</span>
          </h3>
          <textarea
            rows={3}
            placeholder="Type announcement text for Member Dashboard banner..."
            className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
          ></textarea>
          <button
            onClick={() => alert("Announcement published to all member dashboards!")}
            className="px-5 py-2.5 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all"
          >
            Publish Announcement
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-black text-sm text-[#060721] flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#2FA137]" />
            <span>Upload Annual Report / Research PDF</span>
          </h3>
          <input
            type="text"
            placeholder="Publication Title"
            className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
          />
          <button
            onClick={() => alert("PDF document uploaded to Open Publications Archive!")}
            className="px-5 py-2.5 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all"
          >
            Upload PDF Asset
          </button>
        </div>
      </div>
    </div>
  );
};
