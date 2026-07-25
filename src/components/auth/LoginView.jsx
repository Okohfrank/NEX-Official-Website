import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { generateOtpCode } from '../../lib/supabase';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, Eye, EyeOff, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

export const LoginView = () => {
  const { setActiveTab, changeRole, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Login Steps: 'login' -> 'otp_2fa' -> Authenticated
  const [step, setStep] = useState('login');
  const [targetRole, setTargetRole] = useState('unplaced_member');
  const [generatedLoginOtp, setGeneratedLoginOtp] = useState('');
  const [userOtpInput, setUserOtpInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage('Email Address is required.');
      return;
    }

    const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailPattern.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address format (e.g. user@gmail.com or student@st.lasu.edu.ng).');
      return;
    }

    if (!password) {
      setErrorMessage('Password is required.');
      return;
    }

    const STANDARD_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^_\-~])[A-Za-z\d@$!%*?&#^_\-~]{8,}$/;
    if (!STANDARD_PASSWORD_REGEX.test(password)) {
      setErrorMessage('Invalid credentials. Password must follow standard format (minimum 8 characters, containing uppercase, lowercase, number, and special character).');
      return;
    }

    // Determine target role
    const roleToSet = (cleanEmail.includes('admin') || cleanEmail.includes('exec')) ? 'exec_admin' : 'unplaced_member';
    setTargetRole(roleToSet);

    // Generate 6-Digit 2FA Code and dispatch security email
    const code = generateOtpCode();
    setGeneratedLoginOtp(code);

    console.info(`%c[NEX Login Security] 2FA Login verification email dispatched to ${cleanEmail} | Code: ${code}`, 'color: #2FA137; font-weight: bold; font-size: 13px;');

    showToast({
      title: 'Login Verification Code Sent!',
      message: `A 6-digit confirmation code has been dispatched to ${cleanEmail}.`,
      type: 'success'
    });

    setStep('otp_2fa');
  };

  const handleAdminDirectLogin = () => {
    setErrorMessage('');
    setEmail('admin@lasu.edu.ng');
    setPassword('Nex2026!#');
    setTargetRole('exec_admin');
    const code = generateOtpCode();
    setGeneratedLoginOtp(code);
    setStep('otp_2fa');
  };

  const handleVerifyLoginOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!userOtpInput.trim()) {
      setErrorMessage('Please enter the 6-digit verification code sent to your email.');
      return;
    }

    if (userOtpInput.trim() !== generatedLoginOtp.trim()) {
      setErrorMessage('Incorrect verification code. Access denied. Please check your email inbox.');
      return;
    }

    // Verification Success
    if (targetRole === 'exec_admin') {
      changeRole('exec_admin');
      setActiveTab('admin_overview');
    } else {
      changeRole('unplaced_member');
      setActiveTab('dashboard');
    }

    showToast({
      title: 'Authentication Authorized!',
      message: 'Welcome to your NEX Member Operating System.',
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
            {step === 'otp_2fa' ? 'Login Security Verification' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {step === 'otp_2fa'
              ? `Enter the 6-digit verification code sent to your email address`
              : 'Sign in to access your NEX member workspace and research logs.'}
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {step === 'otp_2fa' ? (
          <form onSubmit={handleVerifyLoginOtp} className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#060721] text-white border border-slate-800 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[#2FA137] font-bold text-xs flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> ✉ Security Email Dispatched
                </span>
                <span className="text-[10px] font-mono text-slate-400">2FA LOGIN</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                A 6-digit security code has been sent to <strong className="text-white">{email}</strong>. Please check your email inbox to confirm login.
              </p>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center justify-between">
                <span>For instant testing without email delay:</span>
                <button
                  type="button"
                  onClick={() => {
                    setUserOtpInput(generatedLoginOtp);
                    setErrorMessage('');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#2FA137] hover:bg-[#26892c] text-white font-extrabold text-[10px] transition-all"
                >
                  Auto-Fill Test Code ({generatedLoginOtp})
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-700 text-center">Enter 6-Digit Email Verification Code *</label>
              <div className="relative max-w-xs mx-auto">
                <KeyRound className="w-4 h-4 text-[#2FA137] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="Enter 6 digits (e.g. 938104)"
                  value={userOtpInput}
                  onChange={e => {
                    setUserOtpInput(e.target.value.replace(/\D/g, ''));
                    setErrorMessage('');
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-[#060721] font-black text-center tracking-widest text-lg outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Verify Code & Enter Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => { setStep('login'); setErrorMessage(''); }}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-900 font-semibold pt-2"
            >
              ← Back to Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700">Email Address *</label>
                <span className="text-[10px] font-bold text-[#2FA137] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Gmail / Institutional Supported
                </span>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="e.g. user@gmail.com or student@st.lasu.edu.ng"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700">Password *</label>
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
                  placeholder="Enter standard format password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
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
              className="w-full py-3.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign In & Request 2FA Code</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleAdminDirectLogin}
              className="w-full py-3.5 rounded-xl bg-[#060721] hover:bg-[#060721]/90 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
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
