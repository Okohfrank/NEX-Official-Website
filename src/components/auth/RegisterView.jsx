import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FOCUS_AREAS } from '../../data/mockData';
import { CheckCircle2, ArrowRight, User, Mail, Lock, BookOpen } from 'lucide-react';

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

export const RegisterView = () => {
  const { setActiveTab, changeRole } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    matricNumber: '',
    email: '',
    phone: '',
    department: 'Faculty of Engineering (Mechanical Engineering)',
    level: '300 Level',
    skills: '',
    knowledgeArea: '',
    focusAreas: ['Energy', 'Water'],
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleComplete = () => {
    changeRole('unplaced_member');
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-white animate-in fade-in">
      <div className="w-full max-w-xl bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/90 space-y-6">
        <div className="text-center space-y-2">
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

          <h2 className="text-2xl font-black text-[#060721]">Create Member Account</h2>
          <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
            Join NEX to collaborate on interdisciplinary engineering, agriculture, and environmental research projects.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e6f6e8] text-[#2FA137] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-[#060721]">Application Received!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
              Verification email sent to <strong>{formData.email || 'student@lasu.edu.ng'}</strong>. Your profile has been created in the unplaced member pool.
            </p>
            <button
              onClick={handleComplete}
              className="w-full py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all mt-4"
            >
              Enter Member Operating System
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold mb-1 text-slate-700">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Oyewole Samod Atanda"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1 text-slate-700">Matriculation Number</label>
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
                <label className="block font-bold mb-1 text-slate-700">Level / Academic Year</label>
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
              <label className="block font-bold mb-1 text-slate-700">Faculty & Department (Select or Type Custom)</label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  list="reg-faculty-dept-options"
                  required
                  placeholder="Select or type your Faculty & Department..."
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs font-medium"
                />
                <datalist id="reg-faculty-dept-options">
                  {DEPARTMENT_OPTIONS.map((dept, i) => (
                    <option key={i} value={dept} />
                  ))}
                </datalist>
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700">Institutional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@student.lasu.edu.ng"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700">Primary Focus Area Interests (Max 2)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
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
              className="w-full py-3.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Submit Registration & Verify Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-4 font-medium">
          <p>
            Already registered?{' '}
            <button
              onClick={() => setActiveTab('login')}
              className="font-bold text-[#2FA137] underline hover:opacity-80"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
