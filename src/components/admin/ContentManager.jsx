import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import { 
  Sparkles, 
  Upload, 
  Megaphone, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  HelpCircle, 
  Users, 
  Plus, 
  Award,
  BookOpen
} from 'lucide-react';

export const ContentManager = () => {
  const { 
    addEvent, 
    addBounty, 
    addExecutive
  } = useApp();

  const [executives, setExecutives] = useState([]);
  const [events, setEvents] = useState([]);
  const [bounties, setBounties] = useState([]);
  const [activeTab, setActiveTab] = useState('announcements');
  const [statusMsg, setStatusMsg] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const [{ data: execs }, { data: evts }, { data: bnts }] = await Promise.all([
        supabase.from('executives').select('*').order('exec_order', { ascending: true }),
        supabase.from('events').select('*').order('created_at', { ascending: false }),
        supabase.from('bounties').select('*').order('created_at', { ascending: false })
      ]);
      if (execs) setExecutives(execs);
      if (evts) setEvents(evts);
      if (bnts) setBounties(bnts);
    } catch (err) { console.error('Content fetch error:', err); }
  };

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  // Form States
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementText, setAnnouncementText] = useState('');

  const [evtTitle, setEvtTitle] = useState('');
  const [evtSpeaker, setEvtSpeaker] = useState('');
  const [evtDate, setEvtDate] = useState('');
  const [evtTime, setEvtTime] = useState('');
  const [evtLocation, setEvtLocation] = useState('');
  const [evtCategory, setEvtCategory] = useState('');

  const [bountyTitle, setBountyTitle] = useState('');
  const [bountyDomain, setBountyDomain] = useState('');
  const [bountyBy, setBountyBy] = useState('');
  const [bountyDesc, setBountyDesc] = useState('');

  const [execName, setExecName] = useState('');
  const [execRole, setExecRole] = useState('');
  const [execDept, setExecDept] = useState('');
  const [execOrder, setExecOrder] = useState('');
  const [execBio, setExecBio] = useState('');
  const [execQuote, setExecQuote] = useState('');
  const [execPhoto, setExecPhoto] = useState('');

  const [pubTitle, setPubTitle] = useState('');
  const [pubAbstract, setPubAbstract] = useState('');

  // Handlers
  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    if (!announcementTitle || !announcementText) return;

    try {
      await supabase.from('announcements').insert([{
        title: announcementTitle,
        content: announcementText,
        author: 'Admin / NEX Leadership',
        priority: 'High'
      }]);
      setStatusMsg({ type: 'success', text: 'Announcement published successfully to all member dashboard feeds!' });
      setAnnouncementTitle('');
      setAnnouncementText('');
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to publish announcement.' });
    }
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!evtTitle || !evtSpeaker) return;

    addEvent({
      title: evtTitle,
      speaker: evtSpeaker,
      date: evtDate || 'Sat, Aug 1, 2026',
      time: evtTime || '10:00 AM WAT',
      location: evtLocation || 'Engineering Lecture Theatre 1',
      category: evtCategory
    });

    setStatusMsg({ type: 'success', text: `Workshop "${evtTitle}" published to Member Events Calendar!` });
    setEvtTitle('');
    setEvtSpeaker('');
    setEvtDate('');
    setEvtTime('');
    setEvtLocation('');
    
    setTimeout(fetchDashboardData, 1500);
  };

  const handleCreateBounty = (e) => {
    e.preventDefault();
    if (!bountyTitle || !bountyDesc) return;

    addBounty({
      title: bountyTitle,
      domain: bountyDomain,
      submittedBy: bountyBy,
      description: bountyDesc,
      status: 'Active Mission Candidate'
    });

    setStatusMsg({ type: 'success', text: `Problem Bounty "${bountyTitle}" added to Problem Bounty Board!` });
    setBountyTitle('');
    setBountyDesc('');
    
    setTimeout(fetchDashboardData, 1500);
  };

  const handleCreateExecutive = async (e) => {
    e.preventDefault();
    if (!execName || !execRole) return;

    addExecutive({
      name: execName,
      role: execRole,
      dept: execDept,
      order: execOrder,
      bio: execBio,
      quote: execQuote,
      photo: execPhoto
    });

    setStatusMsg({ type: 'success', text: `Executive Council profile for "${execName}" published to Leadership page!` });
    setExecName('');
    setExecRole('');
    setExecBio('');
    setExecQuote('');
    setExecPhoto('');
    
    // Refresh local lists
    setTimeout(fetchDashboardData, 1500);
  };

  const handleUploadPublication = async (e) => {
    e.preventDefault();
    if (!pubTitle) return;

    try {
      await supabase.from('publications').insert([{
        title: pubTitle,
        abstract: pubAbstract,
        domain: 'Research Collection',
        authors: 'NEX Teams',
        link: '#'
      }]);
      setStatusMsg({ type: 'success', text: `Research publication "${pubTitle}" registered in Open Archive!` });
      setPubTitle('');
      setPubAbstract('');
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to upload publication.' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in w-full">
      {/* Page Header */}
      <div className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f6e8] text-[#2FA137] text-xs font-bold border border-emerald-200/60 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CONTENT & COMMUNITY MANAGEMENT CONSOLE</span>
        </div>
        <h1 className="text-2xl font-black text-[#060721]">Platform Content, Workshops & Leadership Control</h1>
        <p className="text-xs text-slate-600 font-medium">Create workshops, review bounties, manage executive council profiles, and broadcast announcements.</p>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none border-t border-slate-100 mt-4">
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'announcements'
                ? 'bg-[#060721] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-[#2FA137]" />
            <span>Announcements</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'events'
                ? 'bg-[#060721] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#2FA137]" />
            <span>Workshops & Events ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bounties')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'bounties'
                ? 'bg-[#060721] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#2FA137]" />
            <span>Problem Bounties ({bounties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('executives')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'executives'
                ? 'bg-[#060721] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#2FA137]" />
            <span>Executive Council ({executives.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('publications')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'publications'
                ? 'bg-[#060721] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-[#2FA137]" />
            <span>Research Publications</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between animate-in fade-in ${
          statusMsg.type === 'success' ? 'bg-emerald-50 text-[#2FA137] border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'
        }`}>
          <div className="flex items-center gap-2">
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{statusMsg.text}</span>
          </div>
          <button onClick={() => setStatusMsg(null)} className="text-slate-400 hover:text-slate-700 font-extrabold">✕</button>
        </div>
      )}

      {/* TAB 1: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <form onSubmit={handlePostAnnouncement} className="bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4 max-w-2xl">
          <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
            <Megaphone className="w-5 h-5 text-[#2FA137]" />
            <span>Broadcast Official Society Announcement</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Announcement Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. 2026 First Cycle Mid-Term Review Gate Date"
              value={announcementTitle}
              onChange={e => setAnnouncementTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Announcement Content *</label>
            <textarea
              rows={4}
              required
              placeholder="Type announcement message to display across Member Dashboards..."
              value={announcementText}
              onChange={e => setAnnouncementText(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-medium"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Announcement to All Member Feeds</span>
          </button>
        </form>
      )}

      {/* TAB 2: EVENTS & WORKSHOPS */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <form onSubmit={handleCreateEvent} className="lg:col-span-6 bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
              <Calendar className="w-5 h-5 text-[#2FA137]" />
              <span>Create & Publish Workshop / Event</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Event / Workshop Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Embedded Firmware & Sensor Calibration Masterclass"
                value={evtTitle}
                onChange={e => setEvtTitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Facilitator / Speaker *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engr. Dr. Charles Nwankwo"
                  value={evtSpeaker}
                  onChange={e => setEvtSpeaker(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={evtCategory}
                  onChange={e => setEvtCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-semibold"
                >
                  <option value="Technical Workshop">Technical Workshop</option>
                  <option value="Research Masterclass">Research Masterclass</option>
                  <option value="Industry Guest Lecture">Industry Guest Lecture</option>
                  <option value="Prototype Review Gate">Prototype Review Gate</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date String</label>
                <input
                  type="text"
                  placeholder="e.g. Saturday, Aug 1, 2026"
                  value={evtDate}
                  onChange={e => setEvtDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Time & Venue</label>
                <input
                  type="text"
                  placeholder="e.g. 10:00 AM • Faculty LT 1"
                  value={evtLocation}
                  onChange={e => setEvtLocation(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Event to Events Calendar</span>
            </button>
          </form>

          {/* Active Events List */}
          <div className="lg:col-span-6 space-y-3">
            <h4 className="font-black text-sm text-[#060721]">Current Published Events & RSVP Counts ({events.length})</h4>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {events.map(evt => (
                <div key={evt.id} className="bg-white p-4 border border-slate-200 rounded-2xl shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2FA137]">{evt.category}</span>
                    <span className="text-xs font-bold text-[#060721] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">{evt.rsvps} Members RSVPed</span>
                  </div>
                  <h4 className="text-sm font-black text-[#060721]">{evt.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">{evt.speaker} • {evt.date} ({evt.location})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROBLEM BOUNTIES */}
      {activeTab === 'bounties' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <form onSubmit={handleCreateBounty} className="lg:col-span-6 bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
              <HelpCircle className="w-5 h-5 text-[#2FA137]" />
              <span>Post Real-World Problem Bounty</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bounty Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Automated Poultry Farm Temperature & Ammonia Controller"
                value={bountyTitle}
                onChange={e => setBountyTitle(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Domain Focus *</label>
                <select
                  value={bountyDomain}
                  onChange={e => setBountyDomain(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-semibold"
                >
                  <option value="Water Purity & Hydrology">Water Purity & Hydrology</option>
                  <option value="Renewable Energy">Renewable Energy</option>
                  <option value="Smart Agriculture">Smart Agriculture</option>
                  <option value="Waste & Circular Economy">Waste & Circular Economy</option>
                  <option value="Lab & Precision Tools">Lab & Precision Tools</option>
                  <option value="Digital & AI Models">Digital & AI Models</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Submitted / Sponsored By</label>
                <input
                  type="text"
                  placeholder="e.g. Ministry of Agriculture / Admin"
                  value={bountyBy}
                  onChange={e => setBountyBy(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Problem Statement & Scope *</label>
              <textarea
                rows={3}
                required
                placeholder="Describe problem context, technical target, and expected societal impact..."
                value={bountyDesc}
                onChange={e => setBountyDesc(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-medium"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Bounty to Problem Bounty Board</span>
            </button>
          </form>

          {/* Active Bounties List */}
          <div className="lg:col-span-6 space-y-3">
            <h4 className="font-black text-sm text-[#060721]">Active Problem Bounties ({bounties.length})</h4>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {bounties.map(b => (
                <div key={b.id} className="bg-white p-4 border border-slate-200 rounded-2xl shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2FA137]">{b.domain}</span>
                    <span className="text-[11px] font-bold text-slate-500">Submitted by {b.submittedBy}</span>
                  </div>
                  <h4 className="text-sm font-black text-[#060721]">{b.title}</h4>
                  <p className="text-xs text-slate-600 font-medium line-clamp-2">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EXECUTIVE COUNCIL & LEADERSHIP */}
      {activeTab === 'executives' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <form onSubmit={handleCreateExecutive} className="lg:col-span-6 bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
              <Users className="w-5 h-5 text-[#2FA137]" />
              <span>Add Executive Council Member</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mubarak Adeyemi"
                  value={execName}
                  onChange={e => setExecName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Executive Title / Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vice President / Technical Lead"
                  value={execRole}
                  onChange={e => setExecRole(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Faculty / Department</label>
                <input
                  type="text"
                  placeholder="e.g. Dept of Electronic & Computer Eng"
                  value={execDept}
                  onChange={e => setExecDept(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hierarchy Display Order (1 to 10)</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={execOrder}
                  onChange={e => setExecOrder(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-bold text-center"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Executive Bio & Achievements *</label>
              <textarea
                rows={3}
                required
                placeholder="2-3 sentences highlighting background, skills, and honors..."
                value={execBio}
                onChange={e => setExecBio(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-medium"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Executive Quote (Optional)</label>
              <input
                type="text"
                placeholder="Short motivational quote for profile modal..."
                value={execQuote}
                onChange={e => setExecQuote(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Executive Member to Leadership Page</span>
            </button>
          </form>

          {/* Current Exec Roster */}
          <div className="lg:col-span-6 space-y-3">
            <h4 className="font-black text-sm text-[#060721]">Current Published Executive Roster ({executives.length})</h4>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {executives.map(ex => (
                <div key={ex.id} className="bg-white p-4 border border-slate-200 rounded-2xl shadow-xs flex items-center gap-3">
                  <img src={ex.photo} alt={ex.name} className="w-12 h-14 rounded-xl object-cover border border-slate-200" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-extrabold text-[#2FA137] uppercase">#{ex.order} • {ex.role}</span>
                    <h4 className="text-xs font-black text-[#060721] truncate">{ex.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium truncate">{ex.dept}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PUBLICATIONS */}
      {activeTab === 'publications' && (
        <form onSubmit={handleUploadPublication} className="bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4 max-w-2xl">
          <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
            <Upload className="w-5 h-5 text-[#2FA137]" />
            <span>Upload Annual Report / Research PDF Blueprint</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Publication Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. NEX 2026 Water Purity Technical Blueprint PDF"
              value={pubTitle}
              onChange={e => setPubTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Abstract Summary</label>
            <textarea
              rows={4}
              placeholder="Executive summary of technical findings and open hardware designs..."
              value={pubAbstract}
              onChange={e => setPubAbstract(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-medium"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Register PDF Asset in Public Archive</span>
          </button>
        </form>
      )}
    </div>
  );
};
