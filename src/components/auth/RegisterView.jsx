import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FOCUS_AREAS } from '../../data/mockData';
import { ShieldCheck, User, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export const RegisterView = () => {
  const { setActiveTab, changeRole } = useApp();
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState({
    fullName: '',
    matricNumber: '',
    email: '',
    department: 'Faculty of Engineering (Mechanical)',
    level: '300 Level',
    focusAreas: ['Energy', 'Water'],
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('success');
  };

  const handleFinish = () => {
    changeRole('unplaced_member');
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 bg-white animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-xl border border-slate-200/90 space-y-6">
        {step === 'success' ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e6f6e8] text-[#2FA137] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h2 className="text-2xl font-black text-[#060721]">Registration Complete!</h2>
            <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
              Verification email sent to <strong>{formData.email || 'student@lasu.edu.ng'}</strong>. Your account is placed in the Verified Member pool for interdisciplinary group assignment.
            </p>
            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all mt-4"
            >
              Enter Member Operating System
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center space-y-2 mb-6">
              <div 
                className="flex items-center justify-center gap-3 cursor-pointer mb-3" 
                onClick={() => setActiveTab('home')}
              >
                <img 
                  src="/logo.png" 
                  alt="NEX Emblem" 
                  className="h-10 w-auto object-contain" 
                />
                <div className="flex flex-col text-left text-[11px] font-black tracking-tight leading-[1.1]">
                  <span className="text-[#060721]">NETWORK OF</span>
                  <span className="text-[#060721]">ENGINEERING</span>
                  <span className="text-[#2FA137] tracking-wider">XCELLENCE</span>
                </div>
              </div>

              <h2 className="text-xl font-black text-[#060721]">Create NEX Account</h2>
              <p className="text-xs text-slate-600 font-medium">
                Join students across Engineering, Agriculture, and Environmental Sciences.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Submit Application & Verify Email</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-4 mt-4 font-medium">
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setActiveTab('login')}
                  className="font-bold text-[#2FA137] underline hover:opacity-80"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
