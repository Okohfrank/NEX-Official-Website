import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

export const LoginView = () => {
  const { setActiveTab, changeRole } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetRole, setTargetRole] = useState('unplaced_member');
  const [accessCode, setAccessCode] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setTargetRole('unplaced_member');
    setStep('passcode_verify');
  };

  const handleAdminDirectLogin = () => {
    setTargetRole('exec_admin');
    setStep('passcode_verify');
  };

  const handleVerifyPasscode = (e) => {
    e.preventDefault();
    if (targetRole === 'exec_admin') {
      changeRole('exec_admin');
      setActiveTab('admin_overview');
    } else {
      changeRole('unplaced_member');
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 bg-white animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-200/90 space-y-6">
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

          <h2 className="text-xl font-black text-[#060721]">
            {step === 'passcode_verify' ? 'Encrypted Security Passcode' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {step === 'passcode_verify'
              ? 'Enter your 6-digit Security Access Passcode to authorize dashboard entry.'
              : 'Sign in to access your NEX member workspace and research logs.'}
          </p>
        </div>

        {step === 'passcode_verify' ? (
          <form onSubmit={handleVerifyPasscode} className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center space-y-1">
              <KeyRound className="w-6 h-6 text-[#2FA137] mx-auto mb-1" />
              <p className="font-bold text-[#060721] text-xs">Passcode Verification Required</p>
              <p className="text-[11px] text-slate-500">Authorized for {email || 'student@lasu.edu.ng'}</p>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 text-center">Encrypted Passcode / PIN</label>
              <div className="relative max-w-xs mx-auto">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  maxLength={12}
                  placeholder="e.g. NEX-2026"
                  value={accessCode}
                  onChange={e => setAccessCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-center tracking-widest text-base outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                />
              </div>
              <p className="text-[11px] text-center text-[#2FA137] font-bold mt-1.5 bg-emerald-50 py-1 px-3 rounded-lg border border-emerald-200/60 max-w-xs mx-auto">
                Passcode: <span className="font-extrabold underline">NEX-2026</span> (or enter any code)
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Authorize & Enter Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setStep('login')}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-900 font-semibold pt-2"
            >
              ← Back to Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold mb-1 text-slate-700">Institutional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@student.lasu.edu.ng"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setActiveTab('forgot_password')}
                  className="text-[#2FA137] hover:underline font-bold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign In to Member Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleAdminDirectLogin}
              className="w-full py-3 rounded-xl bg-[#060721] hover:bg-[#060721]/90 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#2FA137]" />
              <span>Sign In as Executive Admin</span>
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-4 font-medium">
          <p>
            Don't have an account?{' '}
            <button
              onClick={() => setActiveTab('register')}
              className="font-bold text-[#2FA137] underline hover:opacity-80"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
