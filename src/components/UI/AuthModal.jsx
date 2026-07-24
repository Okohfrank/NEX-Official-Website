import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FOCUS_AREAS } from '../../data/mockData';
import { X, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { changeRole } = useApp();

  const [mode, setMode] = useState('register'); // register | login | verified
  const [formData, setFormData] = useState({
    fullName: '',
    matricNumber: '',
    email: '',
    phone: '',
    department: 'Faculty of Engineering (Mechanical)',
    level: '300 Level',
    skills: 'CAD 3D, IoT, Python',
    knowledgeArea: 'Thermodynamics',
    focusAreas: ['Energy', 'Water'],
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
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

        {mode === 'verified' ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e6f6e8] text-[#2FA137] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-[#060721]">Account Verified!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
              Institutional email verified for <strong>{formData.email || 'student@lasu.edu.ng'}</strong>. You are now placed in the <strong>Verified (Unplaced)</strong> member pool for 2026 First Cycle placement.
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
                    <label className="block font-bold mb-1 text-slate-700">Faculty & Department</label>
                    <select
                      value={formData.department}
                      onChange={e => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs"
                    >
                      <option>Faculty of Engineering (Chemical & Polymer)</option>
                      <option>Faculty of Engineering (Mechanical)</option>
                      <option>Faculty of Engineering (Electrical/Electronics)</option>
                      <option>Faculty of Engineering (Computer & Software)</option>
                      <option>Faculty of Agriculture (Agronomy & Soil Science)</option>
                      <option>Faculty of Environmental Sciences (Building Tech)</option>
                      <option>Faculty of Environmental Sciences (Urban Planning)</option>
                    </select>
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
