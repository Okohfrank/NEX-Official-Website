import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ContributionGraph } from '../UI/ContributionGraph';
import { 
  User, 
  Mail, 
  BookOpen, 
  Award, 
  Trophy, 
  Wrench, 
  Brain, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Calendar,
  Hammer,
  Edit3,
  Camera,
  X,
  Plus,
  Upload,
  ShieldAlert,
  SlidersHorizontal,
  FileCheck2
} from 'lucide-react';

export const MemberProfile = () => {
  const { currentUser, userRole, updateUserProfile, certificates, leaderboard, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const isAdmin = userRole === 'exec_admin';

  // Form State
  const [name, setName] = useState(currentUser.name || (isAdmin ? 'Mubarak Adeyemi' : 'George Ikechukwu'));
  const [dept, setDept] = useState(currentUser.dept || (isAdmin ? 'Executive Board & Platform Director' : 'Faculty of Engineering (Mechanical)'));
  const [level, setLevel] = useState(currentUser.level || '300 Level');
  const [roleTitle, setRoleTitle] = useState(currentUser.roleTitle || (isAdmin ? 'President & Chief Platform Executive' : 'Verified Member'));
  const [knowledgeArea, setKnowledgeArea] = useState(currentUser.knowledgeArea || 'Renewable & Solar Energy Systems');
  const [photoUrl, setPhotoUrl] = useState(currentUser.photoUrl || currentUser.avatar || '');

  // Focus Areas (Max 2)
  const initialFocus = currentUser.focusAreas || ['Energy', 'Water'];
  const [selectedFocus, setSelectedFocus] = useState(initialFocus);

  // Skills
  const initialSkills = currentUser.skills 
    ? (Array.isArray(currentUser.skills) ? currentUser.skills : currentUser.skills.split(',')) 
    : ['Embedded Systems (C/C++)', 'CAD Design (SolidWorks)', 'Python & Data Analysis'];
  const [skillsList, setSkillsList] = useState(initialSkills);
  const [newSkillText, setNewSkillText] = useState('');

  const focusOptions = ['Energy', 'Water', 'Waste', 'Agriculture', 'Digital Innovation', 'Lab & Precision Tools'];

  const handleImageFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        showToast({
          title: 'Image File Too Large',
          message: 'Please select an image file smaller than 8MB.',
          type: 'warning'
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
        showToast({
          title: 'Gallery Photo Selected!',
          message: 'Your photo has been loaded. Click "Save Profile Changes" to update your account.',
          type: 'success'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFocusToggle = (fa) => {
    if (selectedFocus.includes(fa)) {
      setSelectedFocus(selectedFocus.filter(item => item !== fa));
    } else {
      if (selectedFocus.length >= 2) {
        showToast({
          title: 'Maximum 2 Focus Areas',
          message: 'You can select a maximum of 2 Primary Focus Areas.',
          type: 'warning'
        });
        return;
      }
      setSelectedFocus([...selectedFocus, fa]);
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillText.trim()) return;
    if (!skillsList.includes(newSkillText.trim())) {
      setSkillsList([...skillsList, newSkillText.trim()]);
    }
    setNewSkillText('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkillsList(skillsList.filter(s => s !== skillToRemove));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    updateUserProfile({
      name,
      dept,
      level,
      roleTitle,
      knowledgeArea,
      photoUrl,
      avatar: photoUrl,
      focusAreas: selectedFocus,
      skills: skillsList
    });

    setIsEditing(false);
  };

  const userLeaderboardEntry = leaderboard.find(
    l => l.name.toLowerCase() === (currentUser.name || '').toLowerCase()
  ) || {
    points: currentUser.points || 150,
    rank: 3,
    badges: currentUser.badges || ['Founding Cohort', 'Water Systems Specialist']
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs w-full">
      {/* Profile Main Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Avatar / Profile Picture */}
            <div className="relative group">
              {currentUser.photoUrl || currentUser.avatar ? (
                <img
                  src={currentUser.photoUrl || currentUser.avatar}
                  alt={currentUser.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#2FA137] shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#060721] text-white font-black text-2xl sm:text-3xl flex items-center justify-center shrink-0 shadow-lg border-2 border-[#2FA137]">
                  {currentUser.name ? currentUser.name[0] : (isAdmin ? 'A' : 'M')}
                </div>
              )}
              <button
                onClick={() => setIsEditing(true)}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-[#2FA137] text-white shadow-md hover:bg-[#26892c] transition-all"
                title="Upload Photo from Device Gallery"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  isAdmin 
                    ? 'bg-[#060721] text-white border-slate-800' 
                    : 'bg-[#e6f6e8] text-[#2FA137] border-emerald-200/60'
                }`}>
                  {isAdmin ? 'EXECUTIVE ADMIN BOARD' : (currentUser.role ? currentUser.role.replace(/_/g, ' ') : 'Verified Member')}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  2026 First Cycle
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#060721]">
                {currentUser.name || (isAdmin ? 'Mubarak Adeyemi' : 'George Ikechukwu')}
              </h1>
              <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5 flex-wrap">
                <span>{currentUser.dept || (isAdmin ? 'Executive Council & Platform Operations' : 'Faculty of Engineering (Mechanical)')}</span>
                {!isAdmin && (
                  <>
                    <span>•</span>
                    <span>Level: {currentUser.level || '300 Level'}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md shadow-emerald-600/20 transition-all"
            >
              <Upload className="w-4 h-4 text-white" />
              <span>{isAdmin ? 'Edit Admin Profile & Photo' : 'Upload Photo & Edit Profile'}</span>
            </button>

            {!isAdmin && (
              <div className="flex items-center gap-3 bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100 shadow-xs justify-between sm:justify-start">
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-7 h-7 text-[#2FA137]" />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Skill Points</p>
                    <p className="text-lg font-black text-[#060721]">{userLeaderboardEntry.points} PTS</p>
                  </div>
                </div>
                <div className="pl-3 border-l border-emerald-200/80">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Rank</p>
                  <p className="text-lg font-black text-[#2FA137]">#{userLeaderboardEntry.rank || 3}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact & Registration Meta Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <Mail className="w-4 h-4 text-[#2FA137] shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Official Email</span>
              <span className="font-bold text-slate-800 truncate block">{currentUser.email || (isAdmin ? 'admin@lasu.edu.ng' : 'george.ikechukwu230233765@st.lasu.edu.ng')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <ShieldCheck className="w-4 h-4 text-[#2FA137] shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Access Role</span>
              <span className="font-bold text-slate-800 tracking-wider font-mono">{isAdmin ? 'EXECUTIVE_ADMIN' : (currentUser.matricNumber || '230233765')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <CheckCircle2 className="w-4 h-4 text-[#2FA137] shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Clearance Status</span>
              <span className="font-extrabold text-[#2FA137]">{isAdmin ? 'Full Administrative Clearance' : 'Verified Student Account'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Board Specific Views */}
      {isAdmin ? (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldAlert className="w-5 h-5 text-[#2FA137]" />
              <span>Executive Admin Authorization & Platform Control</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-[#2FA137]">Group Overseer</span>
                <p className="font-black text-lg text-[#060721]">8 Active Groups</p>
                <p className="text-slate-600 font-medium">Placement & Faculty Mentors assigned.</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-[#2FA137]">Review Gate</span>
                <p className="font-black text-lg text-[#060721]">Proposal Queue</p>
                <p className="text-slate-600 font-medium">5-Axis rubric evaluation active.</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-[#2FA137]">Issued Credentials</span>
                <p className="font-black text-lg text-[#060721]">{certificates.length} CV Certificates</p>
                <p className="text-slate-600 font-medium">Verified by Executive Council.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Member Specific Grid Views */
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Skills & Expertise */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
                <Wrench className="w-5 h-5 text-[#2FA137]" />
                <span>Technical Skills & Competencies</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Verified Technical Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {skillsList.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl bg-[#2FA137] text-white font-bold text-xs shadow-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                    Area of Strongest Knowledge:
                  </span>
                  <p className="font-black text-sm text-[#060721] bg-emerald-50 p-3 rounded-xl border border-emerald-200/60 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-[#2FA137]" />
                    <span>{currentUser.knowledgeArea || 'Renewable & Solar Energy Systems'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Focus Areas & Earned Badges */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
                <Award className="w-5 h-5 text-[#2FA137]" />
                <span>Focus Areas & Earned Badges</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Primary Focus Area Interests (Max 2):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedFocus.map((fa, i) => (
                      <span key={i} className="px-3.5 py-1.5 rounded-xl bg-[#060721] text-[#2FA137] font-black text-xs shadow-xs border border-slate-800">
                        {fa} Domain
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Earned Skill Badges:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {userLeaderboardEntry.badges.map((badge, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 font-black text-xs flex items-center gap-1.5 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>{badge}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Living Project Portfolio & Group Placement */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-black text-base text-[#060721] flex items-center gap-2 border-b border-slate-100 pb-2">
              <Hammer className="w-5 h-5 text-[#2FA137]" />
              <span>Living Project Portfolio & Team Contributions</span>
            </h3>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#2FA137]">Active Semester Project</span>
                  <h4 className="font-black text-base text-[#060721]">Solar Water Kiosk with Bio-Sand Filtration</h4>
                  <p className="text-xs text-slate-500 font-medium">Assigned Team: Group Alpha - Clean Hydro Systems</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#2FA137] font-bold text-xs border border-emerald-200 w-fit">
                  Research & Build Phase
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">My Designated Role & Contribution:</span>
                <p className="font-bold text-[#060721]">CAD 3D Modeling & Fluid Flow Calculation Lead</p>
                <p className="text-slate-600 font-medium">Designed multi-stage bio-sand filter housing and integrated solar powered water pump circuitry.</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Issued CV-Ready Certificates Register */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="font-black text-base text-[#060721] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#2FA137]" />
            <span>Issued CV-Ready Certificates ({certificates.length})</span>
          </h3>
          <span className="text-xs font-bold text-[#2FA137] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Verified Credentials</span>
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
            </div>
          ))}
        </div>
      </div>

      {/* Contribution Activity Heatmap */}
      <ContributionGraph />

      {/* EDIT PROFILE & GALLERY PHOTO UPLOAD MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 my-auto space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#2FA137]" />
                <h3 className="text-lg font-black text-[#060721]">
                  {isAdmin ? 'Edit Executive Admin Profile & Photo' : 'Edit Member Profile & Upload Photo'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg font-extrabold text-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hidden File Input for Device Gallery Pick */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageFileUpload}
              className="hidden"
            />

            <form onSubmit={handleSaveProfile} className="space-y-5 text-xs">
              {/* Profile Photo Device Gallery Upload */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-800">
                  Profile Photo (Upload from Gallery or Device Camera)
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Photo Preview */}
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Uploaded Preview"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-[#2FA137] shadow-md shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-[#060721] text-white font-black text-3xl flex items-center justify-center shrink-0 border-2 border-slate-300">
                      {name ? name[0] : (isAdmin ? 'A' : 'M')}
                    </div>
                  )}

                  <div className="space-y-2 flex-1 w-full">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Choose Photo from Gallery / Device</span>
                    </button>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Select your photo file (JPEG, PNG, WEBP max 8MB). It will be saved directly to your account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Name & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold outline-none focus:ring-2 focus:ring-[#2FA137]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isAdmin ? 'Executive Role & Title *' : 'Faculty & Department *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={dept}
                    onChange={e => setDept(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium outline-none focus:ring-2 focus:ring-[#2FA137]"
                  />
                </div>
              </div>

              {!isAdmin ? (
                <>
                  {/* Level & Strongest Knowledge Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Academic Level *</label>
                      <select
                        value={level}
                        onChange={e => setLevel(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold outline-none focus:ring-2 focus:ring-[#2FA137]"
                      >
                        <option value="100 Level">100 Level</option>
                        <option value="200 Level">200 Level</option>
                        <option value="300 Level">300 Level</option>
                        <option value="400 Level">400 Level</option>
                        <option value="500 Level">500 Level</option>
                        <option value="Postgraduate">Postgraduate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Area of Strongest Knowledge *</label>
                      <input
                        type="text"
                        required
                        value={knowledgeArea}
                        onChange={e => setKnowledgeArea(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium outline-none focus:ring-2 focus:ring-[#2FA137]"
                      />
                    </div>
                  </div>

                  {/* Primary Focus Areas (Max 2) */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Primary Focus Area Interests (Select Max 2) *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {focusOptions.map(fa => {
                        const isSelected = selectedFocus.includes(fa);
                        const isDisabled = !isSelected && selectedFocus.length >= 2;
                        return (
                          <button
                            key={fa}
                            type="button"
                            onClick={() => handleFocusToggle(fa)}
                            disabled={isDisabled}
                            className={`p-2.5 rounded-xl border font-bold text-xs transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#2FA137] text-white border-transparent shadow-xs'
                                : isDisabled
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <span>{fa}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Technical Skills Editor */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Technical Skills & Competencies</label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {skillsList.map((sk, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-xl bg-emerald-50 text-[#2FA137] border border-emerald-200 font-bold text-xs flex items-center gap-1.5">
                          <span>{sk}</span>
                          <button type="button" onClick={() => handleRemoveSkill(sk)} className="text-emerald-700 hover:text-red-600 font-extrabold">✕</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type new skill tag (e.g. SolidWorks CAD)..."
                        value={newSkillText}
                        onChange={e => setNewSkillText(e.target.value)}
                        className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="px-4 py-2.5 bg-[#060721] text-white font-bold rounded-xl text-xs flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#2FA137]" />
                        <span>Add Skill</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Executive Bio & Strategic Vision</label>
                  <textarea
                    rows={4}
                    value={knowledgeArea}
                    onChange={e => setKnowledgeArea(e.target.value)}
                    placeholder="Describe your executive vision and platform leadership statement..."
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium outline-none focus:ring-2 focus:ring-[#2FA137]"
                  ></textarea>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-black text-xs shadow-md shadow-emerald-600/20"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
