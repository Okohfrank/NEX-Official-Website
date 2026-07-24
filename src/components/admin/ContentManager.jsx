import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Sparkles, Upload, Megaphone, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContentManager = () => {
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [pubTitle, setPubTitle] = useState('');
  const [pubAbstract, setPubAbstract] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    if (!announcementTitle || !announcementText) return;

    try {
      const { error } = await supabase.from('announcements').insert([
        { title: announcementTitle, content: announcementText }
      ]);

      if (error) {
        setStatusMsg({ type: 'error', text: `Error: ${error.message}` });
      } else {
        setStatusMsg({ type: 'success', text: 'Announcement published successfully to all member dashboards via Supabase!' });
        setAnnouncementTitle('');
        setAnnouncementText('');
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Database error posting announcement.' });
    }
  };

  const handleUploadPublication = async (e) => {
    e.preventDefault();
    if (!pubTitle) return;

    try {
      const { error } = await supabase.from('publications').insert([
        { title: pubTitle, abstract: pubAbstract || 'Official research publication from NEX student cohort.' }
      ]);

      if (error) {
        setStatusMsg({ type: 'error', text: `Error: ${error.message}` });
      } else {
        setStatusMsg({ type: 'success', text: 'PDF Research asset registered in Open Publications Archive via Supabase!' });
        setPubTitle('');
        setPubAbstract('');
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Database error publishing asset.' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in w-full">
      <div className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f6e8] text-[#2FA137] text-xs font-bold border border-emerald-200/60 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CONTENT & COMMUNICATIONS MANAGEMENT</span>
        </div>
        <h1 className="text-2xl font-black text-[#060721]">Homepage Stats & Public Content Control</h1>
        <p className="text-xs text-slate-600 font-medium">Post live announcements to all member dashboards and register new annual research PDF assets in Supabase.</p>
      </div>

      {statusMsg && (
        <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 animate-in fade-in ${
          statusMsg.type === 'success' ? 'bg-emerald-50 text-[#2FA137] border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handlePostAnnouncement} className="bg-white p-6 border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="font-black text-sm text-[#060721] flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[#2FA137]" />
            <span>Post Official Society Announcement</span>
          </h3>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Announcement Title</label>
            <input
              type="text"
              required
              placeholder="e.g. 2026 First Cycle Mid-Term Review Date"
              value={announcementTitle}
              onChange={e => setAnnouncementTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Announcement Content</label>
            <textarea
              rows={3}
              required
              placeholder="Type announcement text for Member Dashboard banner..."
              value={announcementText}
              onChange={e => setAnnouncementText(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all"
          >
            Publish Announcement to Supabase
          </button>
        </form>

        <form onSubmit={handleUploadPublication} className="bg-white p-6 border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="font-black text-sm text-[#060721] flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#2FA137]" />
            <span>Upload Annual Report / Research PDF</span>
          </h3>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Publication Title</label>
            <input
              type="text"
              required
              placeholder="e.g. NEX 2026 Water Purity Technical Blueprint PDF"
              value={pubTitle}
              onChange={e => setPubTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Abstract Summary</label>
            <textarea
              rows={3}
              placeholder="Executive summary of technical findings..."
              value={pubAbstract}
              onChange={e => setPubAbstract(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all"
          >
            Register PDF Asset in Supabase Archive
          </button>
        </form>
      </div>
    </div>
  );
};
