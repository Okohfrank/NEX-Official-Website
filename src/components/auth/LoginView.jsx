import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { supabase, generateOtpCode } from '../../lib/supabase';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, Eye, EyeOff, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

export const LoginView = () => {
  const { setActiveTab, changeRole, setCurrentUser, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Login Steps: 'login' | 'exec_passcode' | 'otp_2fa'
  const [step, setStep] = useState('login');
  const [targetRole, setTargetRole] = useState('unplaced_member');
  const [execPasscode, setExecPasscode] = useState('');
  const [generatedLoginOtp, setGeneratedLoginOtp] = useState('');
  const [userOtpInput, setUserOtpInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);

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
      // 1. Check Supabase profiles for user
      let matchedProfile = null;
      if (supabase) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', cleanEmail)
          .single();
        if (profile) matchedProfile = profile;
      }

      if (matchedProfile) {
        setActiveProfile(matchedProfile);
        setTargetRole(matchedProfile.role || 'unplaced_member');
      } else {
        // If not found in DB yet, create dynamic user object
        setActiveProfile({
          name: cleanEmail.split('@')[0].replace('.', ' ').toUpperCase(),
          email: cleanEmail,
          dept: 'Faculty of Engineering',
          level: '300 Level',
          points: 120,
          role: 'unplaced_member'
        });
        setTargetRole('unplaced_member');
      }

      // Generate 2FA code
      const code = generateOtpCode();
      setGeneratedLoginOtp(code);

      showToast({
        title: 'Login Verification Code Sent!',
        message: `A 6-digit confirmation code has been dispatched to ${cleanEmail}.`,
        type: 'success'
      });

      setStep('otp_2fa');
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

    // Authorized
    changeRole('exec_admin');
    setCurrentUser({
      name: 'Exec Admin Council',
      email: 'admin@lasu.edu.ng',
      dept: 'Executive Council & Governance',
      level: 'Executive Level',
      points: 500,
      role: 'exec_admin'
    });
    setActiveTab('admin_overview');

    showToast({
      title: 'Executive Access Granted!',
      message: 'Welcome to the Executive Administration Dashboard.',
      type: 'success'
    });
  };

  const handleVerifyLoginOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!userOtpInput.trim()) {
      setErrorMessage('Please enter the 6-digit verification code sent to your email.');
      return;
    }

    if (userOtpInput.trim() !== generatedLoginOtp.trim()) {
      setErrorMessage('Incorrect verification code. Access denied. Please check your inbox.');
      return;
    }

    // Verification Success: Set dynamic user details
    const finalRole = targetRole || (activeProfile ? activeProfile.role : 'unplaced_member');
    changeRole(finalRole);
    
    if (activeProfile) {
      setCurrentUser({
        name: activeProfile.name || activeProfile.full_name || 'Member',
        email: activeProfile.email || email,
        dept: activeProfile.faculty_dept || activeProfile.dept || 'Faculty of Engineering',
        level: activeProfile.level || '300 Level',
        points: activeProfile.points || 120,
        role: finalRole
      });
    }

    setActiveTab('dashboard');

    showToast({
      title: 'Authentication Authorized!',
      message: `Welcome back, ${activeProfile ? (activeProfile.name || activeProfile.full_name) : 'Member'}!`,
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
              : step === 'otp_2fa' 
              ? 'Two-Factor Authentication' 
              : 'Sign In to Member Portal'}
          </h2>
          <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
            {step === 'exec_passcode'
              ? 'Enter your Executive Security Passcode to access governance controls.'
              : step === 'otp_2fa'
              ? `Enter the 6-digit confirmation code dispatched to ${email}.`
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
        ) : step === 'otp_2fa' ? (
          /* 2FA OTP SCREEN */
          <form onSubmit={handleVerifyLoginOtp} className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center space-y-1">
              <KeyRound className="w-6 h-6 text-[#2FA137] mx-auto mb-1" />
              <p className="font-bold text-[#060721] text-xs">Security Verification Required</p>
              <p className="text-[11px] text-slate-600">Dispatched to <strong>{email}</strong></p>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 text-center">6-Digit Confirmation Code</label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={userOtpInput}
                onChange={e => setUserOtpInput(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white text-slate-900 font-black text-center text-xl tracking-[0.5em] outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Verify & Launch Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => { setStep('login'); setErrorMessage(''); }}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-900 font-semibold pt-1"
            >
              ← Re-enter Credentials
            </button>
          </form>
        ) : (
          /* LOGIN CREDENTIALS FORM */
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
              <span>Sign In to Member Portal</span>
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
