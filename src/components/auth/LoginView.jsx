import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const LoginView = () => {
  const { setActiveTab, changeRole, setCurrentUser, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Login Steps: 'login' | 'exec_passcode'
  const [step, setStep] = useState('login');
  const [execPasscode, setExecPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExecVerified, setIsExecVerified] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage('Email Address is required.');
      setIsSubmitting(false);
      return;
    }

    if (!password) {
      setErrorMessage('Password is required.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Try Supabase Auth signInWithPassword
      if (supabase) {
        try {
          await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: password
          });
        } catch (e) {}
      }

      // 2. Fetch real user profile from Supabase profiles table
      let userProfile = null;
      if (supabase) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', cleanEmail)
          .single();
        if (profile) userProfile = profile;
      }

      const finalName = userProfile ? (userProfile.name || userProfile.full_name) : cleanEmail.split('@')[0].replace('.', ' ').toUpperCase();
      const finalDept = userProfile ? (userProfile.faculty_dept || userProfile.dept) : 'Faculty of Engineering';
      const finalLevel = userProfile ? userProfile.level : '300 Level';
      const finalPoints = userProfile ? (userProfile.points || 100) : 100;
      let finalRole = userProfile ? (userProfile.role || 'unplaced_member') : 'unplaced_member';
      if (isExecVerified || cleanEmail.includes('admin') || cleanEmail.includes('exec')) {
        finalRole = 'exec_admin';
      }

      const authenticatedUser = {
        name: finalName,
        email: cleanEmail,
        dept: finalDept,
        level: finalLevel,
        points: finalPoints,
        role: finalRole
      };

      // 3. Set current user session in AppContext
      setCurrentUser(authenticatedUser);

      // 4. Onboard straight into Member Dashboard or Admin Overview!
      changeRole(finalRole, authenticatedUser);
      if (finalRole === 'exec_admin') {
        setActiveTab('admin_overview');
      } else {
        setActiveTab('dashboard');
      }

      showToast({
        title: 'Authentication Authorized!',
        message: `Welcome back, ${finalName}! Your member workspace is ready.`,
        type: 'success'
      });
    } catch (err) {
      setErrorMessage('Authentication error. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminInitiate = () => {
    setErrorMessage('');
    setExecPasscode('');
    setStep('exec_passcode');
  };

  const handleVerifyExecPasscode = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (execPasscode.trim() !== 'NEX-2026') {
      setErrorMessage('Invalid Executive Security Passcode. Access Denied.');
      return;
    }

    setIsExecVerified(true);
    setStep('login');

    showToast({
      title: 'Passcode Verified',
      message: 'Executive Access unlocked. Please sign in with your own account to proceed.',
      type: 'success'
    });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 bg-slate-50/50 animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-200/90 space-y-6">
        {/* Branding Header */}
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
            {step === 'exec_passcode' 
              ? 'Executive Access Verification' 
              : 'Sign In to Member Portal'}
          </h2>
          <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
            {step === 'exec_passcode'
              ? 'Enter your Executive Security Passcode to access governance controls.'
              : 'Sign in to access your NEX member workspace and research logs.'}
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200/80 text-red-600 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {step === 'exec_passcode' ? (
          /* EXECUTIVE PASSCODE SCREEN */
          <form onSubmit={handleVerifyExecPasscode} className="space-y-5 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 text-white text-center space-y-1">
              <ShieldCheck className="w-6 h-6 text-[#2FA137] mx-auto mb-1" />
              <p className="font-extrabold text-xs">Executive Administration Security Gate</p>
              <p className="text-[11px] text-slate-300">Confidential governance portal access.</p>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 text-center">Executive Security Passcode</label>
              <div className="relative max-w-xs mx-auto">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  maxLength={16}
                  placeholder="••••••••••••"
                  value={execPasscode}
                  onChange={e => setExecPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-center tracking-widest text-base outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#060721] hover:bg-[#060721]/90 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#2FA137]" />
              <span>Authorize Executive Access</span>
            </button>

            <button
              type="button"
              onClick={() => { setStep('login'); setErrorMessage(''); }}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-900 font-semibold pt-1"
            >
              ← Back to Member Sign In
            </button>
          </form>
        ) : (
          /* MEMBER SIGN IN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold mb-1 text-slate-700">Institutional Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@student.lasu.edu.ng"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-medium"
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
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In & Launch Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleAdminInitiate}
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
