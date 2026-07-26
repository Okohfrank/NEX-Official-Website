import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FOCUS_AREAS } from '../../data/mockData';
import { registerUserWithSupabase, confirmUserInSupabase, generateNexEmailHtml } from '../../lib/supabase';
import { 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Mail, 
  Lock, 
  BookOpen, 
  Wrench, 
  Brain, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Plus, 
  X,
  Award,
  Search,
  KeyRound,
  ShieldCheck,
  Sparkles,
  Send
} from 'lucide-react';

const PREDEFINED_SKILLS = [
  "Embedded Systems (C/C++)",
  "CAD Design (SolidWorks/Fusion360)",
  "Python & Scientific Computing",
  "Circuit & PCB Design",
  "Data Analysis & Statistics",
  "Machine Learning / AI",
  "Full-Stack Web Development",
  "Water Quality Analysis",
  "Soil & Agronomy Science",
  "Environmental Impact Assessment",
  "3D Printing & Prototyping",
  "Structural Calculation"
];

const KNOWLEDGE_AREAS = [
  "Renewable & Solar Energy Systems",
  "Water Purification & Hydrology",
  "Robotics & Embedded Hardware",
  "Sustainable Agriculture & Bio-tech",
  "Smart Cities & Structural Tech",
  "AI & Scientific Data Models",
  "Waste Management & Circular Economy",
  "Lab Tools & Scientific Instrumentation"
];

export const RegisterView = () => {
  const { setActiveTab, changeRole, updateUserProfile, showToast } = useApp();
  
  // Step state: 'form' | 'otp_verify' | 'completed'
  const [step, setStep] = useState('form');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // OTP state
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtpInput, setUserOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field errors object
  const [errors, setErrors] = useState({});
  const [skillSearchText, setSkillSearchText] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    matricNumber: '',
    email: '',
    department: '',
    level: '300 Level',
    skills: ['Embedded Systems (C/C++)', 'CAD Design (SolidWorks/Fusion360)'],
    knowledgeArea: 'Renewable & Solar Energy Systems',
    focusAreas: ['Energy', 'Water'],
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });

  // Handle adding custom skill
  const handleAddSkill = (e) => {
    if (e) e.preventDefault();
    const trimmed = skillSearchText.trim();
    if (!trimmed) return;

    if (!formData.skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, trimmed]
      }));
    }
    setSkillSearchText('');
  };

  // Toggle predefined skill
  const handleSkillToggle = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s !== skill)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  // Toggle focus areas (Max 2)
  const handleFocusAreaToggle = (title) => {
    if (formData.focusAreas.includes(title)) {
      setFormData(prev => ({
        ...prev,
        focusAreas: prev.focusAreas.filter(a => a !== title)
      }));
    } else {
      if (formData.focusAreas.length >= 2) return;
      setFormData(prev => ({
        ...prev,
        focusAreas: [...prev.focusAreas, title]
      }));
    }
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};

    // 1. Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().split(' ').length < 2) {
      newErrors.fullName = 'Please enter at least your first name and last name.';
    }

    // 2. Matriculation Number (exactly 9 digits)
    const cleanMatric = formData.matricNumber.trim();
    if (!cleanMatric) {
      newErrors.matricNumber = 'Matriculation Number is required.';
    } else if (!/^\d{9}$/.test(cleanMatric)) {
      newErrors.matricNumber = 'Matriculation Number must be exactly 9 digits (e.g. 230233765).';
    }

    // 3. Department
    if (!formData.department.trim()) {
      newErrors.department = 'Faculty & Department is required.';
    }

    // 4. Email validation (Supports Institutional + Gmail)
    const cleanEmail = formData.email.trim();
    if (!cleanEmail) {
      newErrors.email = 'Email Address is required.';
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(cleanEmail)) {
        newErrors.email = 'Please enter a valid email address (e.g. name@st.lasu.edu.ng or user@gmail.com).';
      }
    }

    // 5. Skills
    if (formData.skills.length === 0) {
      newErrors.skills = 'Please select or add at least 1 technical skill.';
    }

    // 6. Focus Areas (1 to 2)
    if (formData.focusAreas.length === 0) {
      newErrors.focusAreas = 'Please select at least 1 Primary Focus Area Interest (Max 2).';
    }

    // 7. Password (Standard Format Rule)
    const STANDARD_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^_\-~])[A-Za-z\d@$!%*?&#^_\-~]{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (!STANDARD_PASSWORD_REGEX.test(formData.password)) {
      newErrors.password = 'Password must follow standard format: minimum 8 characters, containing at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (e.g. @$!%*?&).';
    }

    // 8. Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password and Confirm Password do not match.';
    }

    // 9. Terms
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must accept the NEX Code of Conduct & Ethics Guidelines.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const res = await registerUserWithSupabase(formData);
      setIsSubmitting(false);

      if (res.success) {
        setGeneratedOtp(res.otpCode);
        setStep('otp_verify');
        showToast({
          title: 'Verification Code Dispatched!',
          message: `A 6-digit confirmation code has been generated for ${formData.email}.`,
          type: 'success'
        });
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpError('');
    
    if (!userOtpInput.trim() || userOtpInput.trim().length < 6) {
      setOtpError('Please enter the 6-digit confirmation code sent to your email.');
      return;
    }

    setIsSubmitting(true);
    const res = await confirmUserInSupabase(formData, userOtpInput);
    setIsSubmitting(false);

    if (res && res.error) {
      setOtpError(res.error);
      return;
    }

    setStep('completed');
    showToast({
      title: 'Account Verified & Activated!',
      message: 'Welcome to NEX! Your profile is verified and active in the pool.',
      type: 'success'
    });
  };

  const handleComplete = () => {
    updateUserProfile({
      name: formData.fullName,
      email: formData.email,
      dept: formData.department,
      level: formData.level,
      matricNumber: formData.matricNumber,
      skills: formData.skills,
      knowledgeArea: formData.knowledgeArea,
      focusAreas: formData.focusAreas
    });
    changeRole('unplaced_member');
    setActiveTab('dashboard');
  };

  const filteredPredefinedSkills = PREDEFINED_SKILLS.filter(s =>
    s.toLowerCase().includes(skillSearchText.toLowerCase())
  );

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 bg-slate-50/50 animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div 
            className="flex items-center justify-center gap-3 cursor-pointer mb-2" 
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

          <h2 className="text-2xl font-black text-[#060721]">
            {step === 'otp_verify' ? 'Email Security Verification' : step === 'completed' ? 'Account Verified!' : 'Create Member Account'}
          </h2>
          <p className="text-xs text-slate-600 font-medium max-w-lg mx-auto">
            {step === 'otp_verify' 
              ? `Enter the 6-digit confirmation code delivered to ${formData.email}`
              : 'Join NEX to participate in interdisciplinary research, group matching, build modules, and publish solutions.'}
          </p>
        </div>

        {/* STEP 2: 6-DIGIT EMAIL VERIFICATION */}
        {step === 'otp_verify' ? (
          <div className="space-y-6">
            {/* Custom Branded Email Notification Simulation Card */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#2FA137]" />
                  <span className="font-mono text-[11px] text-slate-300">NEX Official Security Mailer</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] border border-emerald-500/40">
                  CONFIRMATION DISPATCHED
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-slate-300 font-medium">To: <strong className="text-white">{formData.email}</strong></p>
                <p className="text-slate-300 font-medium">Subject: <strong className="text-[#2FA137]">Your 6-Digit NEX Account Verification Code</strong></p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <p className="text-[#2FA137] font-bold text-xs">✉ Security Email Dispatched!</p>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  A security verification email containing your 6-digit confirmation code has been dispatched to <strong className="text-white">{formData.email}</strong>.
                </p>
                <p className="text-[10px] text-slate-400 pt-1">Code expires in 15 minutes • Check your inbox or spam folder</p>
              </div>
            </div>            {/* OTP & Link Verification Form */}
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {otpError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
                <p className="font-bold text-[#060721] text-xs">✉ How to Confirm Your Account:</p>
                <ul className="text-[11px] text-slate-700 space-y-1 list-disc pl-4 font-medium">
                  <li><strong>Method 1 (Instant Link):</strong> Open your email inbox and click <strong>"Confirm email address"</strong>. Then click the button below.</li>
                  <li><strong>Method 2 (6-Digit OTP):</strong> If you received a 6-digit code, enter it below to verify.</li>
                </ul>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Enter 6-Digit Confirmation Code (Optional if Link Clicked) *</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#2FA137] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6 digits (e.g. 584920)"
                    value={userOtpInput}
                    onChange={e => {
                      setUserOtpInput(e.target.value.replace(/\D/g, ''));
                      setOtpError('');
                    }}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-[#060721] text-base font-black tracking-widest outline-none focus:ring-2 focus:ring-[#2FA137] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Verifying Code...' : 'Verify 6-Digit Code'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    setIsSubmitting(true);
                    await confirmUserInSupabase(formData);
                    setIsSubmitting(false);
                    setStep('completed');
                    showToast({
                      title: 'Account Activated!',
                      message: 'Your account is verified and ready.',
                      type: 'success'
                    });
                  }}
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#060721] hover:bg-[#060721]/90 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2FA137]" />
                  <span>I've Clicked Email Link</span>
                </button>
              </div>
            </form>
          </div>
        ) : step === 'completed' ? (
          /* STEP 3: ACTIVATION COMPLETE */
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e6f6e8] text-[#2FA137] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-[#060721]">Account Verified & Activated!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto font-medium leading-relaxed">
              Your profile has been saved to the database for <strong className="text-[#060721]">{formData.email}</strong>.<br />
              You are now an active member in the <strong className="text-[#2FA137]">Unplaced Pool</strong> ready for group matching.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1 max-w-md mx-auto">
              <p className="font-extrabold text-[#060721]">Verified Profile Record:</p>
              <p><span className="text-slate-500 font-medium">Full Name:</span> <span className="font-bold">{formData.fullName}</span></p>
              <p><span className="text-slate-500 font-medium">Matric Number:</span> <span className="font-bold">{formData.matricNumber}</span></p>
              <p><span className="text-slate-500 font-medium">Email:</span> <span className="font-bold">{formData.email}</span></p>
              <p><span className="text-slate-500 font-medium">Department:</span> <span className="font-bold">{formData.department}</span></p>
              <p><span className="text-slate-500 font-medium">Selected Focus Areas:</span> <span className="font-bold text-[#2FA137]">{formData.focusAreas.join(', ')}</span></p>
            </div>

            <button
              onClick={handleComplete}
              className="w-full py-3.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all mt-4"
            >
              Enter Member Operating System
            </button>
          </div>
        ) : (
          /* STEP 1: REGISTRATION FORM */
          <form onSubmit={handleSubmit} className="space-y-5 text-xs" noValidate>
            {/* Global Error Banner */}
            {Object.keys(errors).length > 0 && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold space-y-1 animate-in fade-in">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Please fix the following validation errors to proceed:</span>
                </div>
                <ul className="list-disc list-inside font-medium text-[11px] pl-5 space-y-0.5">
                  {Object.values(errors).map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 1: Academic Identity */}
            <div className="space-y-3.5 pt-1">
              <h3 className="text-xs font-black text-[#2FA137] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                <User className="w-4 h-4" />
                <span>1. Academic & Personal Identity</span>
              </h3>

              <div>
                <label className="block font-bold mb-1 text-slate-700">Full Name (First & Last Name) *</label>
                <input
                  type="text"
                  placeholder="e.g. George Ikechukwu"
                  value={formData.fullName}
                  onChange={e => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: null });
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-slate-900 outline-none shadow-xs font-medium ${
                    errors.fullName ? 'border-red-500 focus:ring-2 focus:ring-red-400' : 'border-slate-300 focus:ring-2 focus:ring-[#2FA137]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-700">Matriculation Number (Exactly 9 Digits) *</label>
                  <input
                    type="text"
                    maxLength={9}
                    placeholder="e.g. 230233765"
                    value={formData.matricNumber}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      setFormData({ ...formData, matricNumber: val });
                      if (errors.matricNumber) setErrors({ ...errors, matricNumber: null });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-slate-900 outline-none shadow-xs font-bold tracking-wider ${
                      errors.matricNumber ? 'border-red-500 focus:ring-2 focus:ring-red-400' : 'border-slate-300 focus:ring-2 focus:ring-[#2FA137]'
                    }`}
                  />
                  {errors.matricNumber ? (
                    <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.matricNumber}</span>
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-500 mt-1">Must be exactly 9 numeric digits.</p>
                  )}
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700">Level / Academic Year *</label>
                  <select
                    value={formData.level}
                    onChange={e => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs font-semibold"
                  >
                    <option value="100 Level">100 Level</option>
                    <option value="200 Level">200 Level</option>
                    <option value="300 Level">300 Level</option>
                    <option value="400 Level">400 Level</option>
                    <option value="500 Level">500 Level</option>
                    <option value="Postgraduate / Researcher">Postgraduate / Researcher</option>
                  </select>
                </div>
              </div>

              {/* Department Input */}
              <div>
                <label className="block font-bold mb-1 text-slate-700">Faculty & Department *</label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-[#2FA137] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Mechanical Engineering, Faculty of Engineering"
                    value={formData.department}
                    onChange={e => {
                      setFormData({ ...formData, department: e.target.value });
                      if (errors.department) setErrors({ ...errors, department: null });
                    }}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-slate-900 outline-none shadow-xs font-medium ${
                      errors.department ? 'border-red-500 focus:ring-2 focus:ring-red-400' : 'border-slate-300 focus:ring-2 focus:ring-[#2FA137]'
                    }`}
                  />
                </div>
                {errors.department ? (
                  <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.department}</span>
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-500 mt-1">Input your department and faculty name.</p>
                )}
              </div>

              {/* Email Input (Supports Institutional Email + Gmail) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Email Address (Institutional or Personal) *</label>
                  <span className="text-[10px] font-extrabold text-[#2FA137] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Institutional / Gmail Supported
                  </span>
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    placeholder="e.g. george.ikechukwu230233765@st.lasu.edu.ng or user@gmail.com"
                    value={formData.email}
                    onChange={e => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: null });
                    }}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-slate-900 outline-none shadow-xs font-medium ${
                      errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-400' : 'border-slate-300 focus:ring-2 focus:ring-[#2FA137]'
                    }`}
                  />
                </div>
                {errors.email ? (
                  <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0 text-red-600" />
                    <span>{errors.email}</span>
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-500 mt-1">
                    Use your institutional email (<span className="font-bold text-[#2FA137]">@st.lasu.edu.ng</span>) or personal email (<span className="font-bold text-slate-700">Gmail/Yahoo</span>).
                  </p>
                )}
              </div>
            </div>

            {/* Section 2: Skills & Knowledge Profile */}
            <div className="space-y-3.5 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-black text-[#2FA137] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                <Wrench className="w-4 h-4" />
                <span>2. Skills & Knowledge Profile</span>
              </h3>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Technical Skills (Search or Type Custom) *</label>
                  <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {formData.skills.length} Selected
                  </span>
                </div>

                {/* Selected Skills Tags */}
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    {formData.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#2FA137] text-white font-bold text-[11px] shadow-xs"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className="hover:bg-[#26892c] rounded-full p-0.5 transition-colors"
                          title="Remove Skill"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Skill search / custom input */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Type custom skill tag or search..."
                      value={skillSearchText}
                      onChange={e => setSkillSearchText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill(e);
                        }
                      }}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-[#2FA137]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-[#060721] hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#2FA137]" />
                    <span>Add Custom</span>
                  </button>
                </div>

                {/* Predefined skill suggestion chips */}
                <div className="mt-2.5 flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {filteredPredefinedSkills.map((sk, idx) => {
                    const isSelected = formData.skills.includes(sk);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSkillToggle(sk)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          isSelected
                            ? 'bg-[#2FA137] text-white border border-transparent shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? `✓ ${sk}` : `+ ${sk}`}
                      </button>
                    );
                  })}
                </div>

                {errors.skills && (
                  <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.skills}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">Area of Strongest Knowledge *</label>
                <div className="relative">
                  <Brain className="w-4 h-4 text-[#2FA137] absolute left-3.5 top-3" />
                  <select
                    value={formData.knowledgeArea}
                    onChange={e => setFormData({ ...formData, knowledgeArea: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs font-semibold"
                  >
                    {KNOWLEDGE_AREAS.map((ka, i) => (
                      <option key={i} value={ka}>{ka}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Focus Areas (Max 2) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Primary Focus Area Interests (Select Max 2) *</label>
                  <span className="text-[10px] font-bold text-slate-500">
                    {formData.focusAreas.length}/2 Selected
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FOCUS_AREAS.map(fa => {
                    const isSelected = formData.focusAreas.includes(fa.title);
                    const isDisabled = !isSelected && formData.focusAreas.length >= 2;
                    return (
                      <button
                        key={fa.id}
                        type="button"
                        onClick={() => handleFocusAreaToggle(fa.title)}
                        disabled={isDisabled}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#2FA137] text-white border-transparent shadow-xs'
                            : isDisabled
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-extrabold text-xs">{fa.title}</span>
                        <span className={`text-[10px] font-medium mt-1 ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                          {isSelected ? '✓ Selected' : 'Click to select'}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.focusAreas && (
                  <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.focusAreas}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Section 3: Password & Security */}
            <div className="space-y-3.5 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-black text-[#2FA137] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                <Lock className="w-4 h-4" />
                <span>3. Password & Security Security Credentials</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-700">Password (Standard Format) *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min 8 chars, A-Z, a-z, 0-9, @#$"
                      value={formData.password}
                      onChange={e => {
                        setFormData({ ...formData, password: e.target.value });
                        if (errors.password) setErrors({ ...errors, password: null });
                      }}
                      className={`w-full px-3.5 py-2.5 pr-10 rounded-xl border bg-white text-slate-900 outline-none shadow-xs font-medium ${
                        errors.password ? 'border-red-500 focus:ring-2 focus:ring-red-400' : 'border-slate-300 focus:ring-2 focus:ring-[#2FA137]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0 text-red-600" />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700">Confirm Password *</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={e => {
                        setFormData({ ...formData, confirmPassword: e.target.value });
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                      }}
                      className={`w-full px-3.5 py-2.5 pr-10 rounded-xl border bg-white text-slate-900 outline-none shadow-xs font-medium ${
                        errors.confirmPassword ? 'border-red-500 focus:ring-2 focus:ring-red-400' : 'border-slate-300 focus:ring-2 focus:ring-[#2FA137]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0 text-red-600" />
                      <span>{errors.confirmPassword}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={e => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#2FA137] focus:ring-[#2FA137]"
                />
                <span className="text-slate-600 text-xs font-medium leading-tight">
                  I agree to the <strong className="text-[#060721]">NEX Code of Ethics</strong>, interdisciplinary placement rules, and research publication terms.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.agreeTerms}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-[#2FA137] hover:bg-[#26892c] text-white font-black text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? 'Generating Verification Code...' : 'Register Profile & Send Verification Code'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Existing account link */}
        <div className="text-center pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-medium">Already registered an account? </span>
          <button
            onClick={() => setActiveTab('login')}
            className="text-[#2FA137] font-black hover:underline ml-1"
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
};
