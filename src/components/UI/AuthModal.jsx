import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FOCUS_AREAS } from '../../data/mockData';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Lock, KeyRound } from 'lucide-react';

const DEPARTMENT_OPTIONS = [
  "Faculty of Engineering (Mechanical Engineering)",
  "Faculty of Engineering (Chemical & Polymer Engineering)",
  "Faculty of Engineering (Electronic & Computer Engineering)",
  "Faculty of Engineering (Aeronautical & Astronautical Engineering)",
  "Faculty of Engineering (Civil & Environmental Engineering)",
  "Faculty of Engineering (Industrial & Production Engineering)",
  "Faculty of Agriculture (Agronomy & Soil Science)",
  "Faculty of Agriculture (Animal Science)",
  "Faculty of Agriculture (Agricultural Economics & Extension)",
  "Faculty of Agriculture (Fisheries & Aquatic Science)",
  "Faculty of Environmental Sciences (Building Technology)",
  "Faculty of Environmental Sciences (Estate Management)",
  "Faculty of Environmental Sciences (Urban & Regional Planning)",
  "Faculty of Environmental Sciences (Environmental Management)",
  "Faculty of Environmental Sciences (Architecture)",
  "Faculty of Environmental Sciences (Quantity Surveying)",
  "Faculty of Science (Computer Science)",
  "Faculty of Science (Physics & Electronics)",
  "Faculty of Science (Chemistry & Biochemistry)"
];

export const AuthModal = ({ isOpen, onClose }) => {
  const { changeRole } = useApp();

  const [mode, setMode] = useState('register'); // register | login | code_verify | verified
  const [accessCode, setAccessCode] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    matricNumber: '',
    email: '',
    phone: '',
    department: 'Faculty of Engineering (Mechanical Engineering)',
    level: '300 Level',
    skills: 'CAD 3D, IoT, Python',
    knowledgeArea: 'Thermodynamics',
    focusAreas: ['Energy', 'Water'],
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      setMode('code_verify');
    } else {
      setMode('verified');
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setMode('verified');
  };

  const handleCompleteLogin = () => {
    changeRole('unplaced_member');
    onClose();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in cursor-pointer"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 max-h-[90vh] overflow-y-auto cursor-default"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-20 shadow-xs"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {mode === 'code_verify' ? (
          <div className="py-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#e6f6e8] text-[#2FA137] flex items-center justify-center mx-auto shadow-xs">
                <KeyRound className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-[#060721]">Encrypted Access Verification</h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto font-medium">
                Enter your encrypted 6-digit Security Access Passcode to authorize dashboard entry.
              </p>
            </div>

            <form onSubmit={handleVerifyCode} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-700 text-center">Encrypted Passcode / Security PIN</label>
                <div className="relative max-w-xs mx-auto">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    maxLength={12}
                    placeholder="••••••••••••"
                    value={accessCode}
                    onChange={e => setAccessCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-center tracking-widest text-base outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Authorize & Enter Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : mode === 'verified' ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e6f6e8] text-[#2FA137] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-[#060721]">Account Authorized!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
              Institutional credentials verified for <strong>{formData.email || 'student@lasu.edu.ng'}</strong>. Access granted to NEX Operating System.
            </p>
            <button
              onClick={handleCompleteLogin}
              className="w-full py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all mt-4"
            >
              Enter Member Operating System
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f6e8] text-[#2FA137] text-xs font-bold border border-emerald-200/60">
                <ShieldCheck className="w-4 h-4 text-[#2FA137]" />
                <span>NEX Institutional Portal</span>
              </div>
              <h3 className="text-2xl font-black text-[#060721]">
                {mode === 'register' ? 'Join NEX Innovation Society' : 'Member Login'}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                {mode === 'register'
                  ? 'Connect with interdisciplinary teams across Engineering, Agriculture, and Environmental Sciences.'
                  : 'Access your active Cycle workspace, research logs, and build logs.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {mode === 'register' && (
                <>
                  <div>
                    <label className="block font-bold mb-1 text-slate-700">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oyewole Samod Atanda"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1 text-slate-700">Matric Number</label>
                      <input
                        type="text"
                        required
                        placeholder="200408112"
                        value={formData.matricNumber}
                        onChange={e => setFormData({ ...formData, matricNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1 text-slate-700">Level / Year</label>
                      <select
                        value={formData.level}
                        onChange={e => setFormData({ ...formData, level: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs"
                      >
                        <option>100 Level</option>
                        <option>200 Level</option>
                        <option>300 Level</option>
                        <option>400 Level</option>
                        <option>500 Level</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700">Faculty & Department (Search or Type)</label>
                    <input
                      type="text"
                      list="faculty-dept-options"
                      required
                      placeholder="Type or select Faculty & Department..."
                      value={formData.department}
                      onChange={e => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs"
                    />
                    <datalist id="faculty-dept-options">
                      {DEPARTMENT_OPTIONS.map((dept, i) => (
                        <option key={i} value={dept} />
                      ))}
                    </datalist>
                  </div>
                </>
              )}

              <div>
                <label className="block font-bold mb-1 text-slate-700">Institutional Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@student.lasu.edu.ng"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs"
                />
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block font-bold mb-1 text-slate-700">Primary Focus Area Interests (Max 2)</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {FOCUS_AREAS.map(fa => (
                      <label key={fa.id} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-medium hover:border-[#2FA137]/40 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.focusAreas.includes(fa.title)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, focusAreas: [...formData.focusAreas, fa.title] });
                            } else {
                              setFormData({ ...formData, focusAreas: formData.focusAreas.filter(a => a !== fa.title) });
                            }
                          }}
                          className="rounded text-[#2FA137] focus:ring-[#2FA137]"
                        />
                        <span className="text-[#060721] font-bold">{fa.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all mt-4 flex items-center justify-center gap-2"
              >
                <span>{mode === 'register' ? 'Submit Application & Verify Email' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2 text-xs text-slate-500 font-medium">
                {mode === 'register' ? (
                  <p>Already have a verified account? <button type="button" onClick={() => setMode('login')} className="text-[#2FA137] font-bold hover:underline">Sign In</button></p>
                ) : (
                  <p>Don't have an account? <button type="button" onClick={() => setMode('register')} className="text-[#2FA137] font-bold hover:underline">Register Now</button></p>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
