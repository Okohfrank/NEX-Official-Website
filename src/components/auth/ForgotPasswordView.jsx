import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, CheckCircle2, ArrowLeft, AlertCircle } from 'lucide-react';

export const ForgotPasswordView = () => {
  const { setActiveTab, isEmailRegistered } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = (email || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid institutional email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { registered } = await isEmailRegistered(cleanEmail);
      if (!registered) {
        setErrorMessage('No account found with this email address. Please create an account first.');
        setIsSubmitting(false);
        return;
      }

      setSent(true);
    } catch (err) {
      setErrorMessage('Verification error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[65vh] flex items-center justify-center py-12 px-4 bg-slate-50/50 dark:bg-black animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-xl border border-slate-200/90 dark:border-neutral-800 space-y-6">
        <button
          onClick={() => setActiveTab('login')}
          className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-[#2FA137] font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </button>

        {sent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e6f6e8] dark:bg-emerald-950/40 text-[#2FA137] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h2 className="text-xl font-black text-[#060721] dark:text-white">Password Reset Link Sent</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              We have sent password recovery instructions to <strong className="text-[#060721] dark:text-white">{email}</strong>. Please check your institutional inbox.
            </p>
            <button
              onClick={() => setActiveTab('login')}
              className="w-full py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
            >
              Return to Sign In
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-black text-[#060721] dark:text-white">Reset Password</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                Enter your registered institutional email address to receive a secure password reset authorization link.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">Institutional Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@student.lasu.edu.ng"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-2 focus:ring-[#2FA137] shadow-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Verifying Registration...' : 'Send Password Reset Link'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
