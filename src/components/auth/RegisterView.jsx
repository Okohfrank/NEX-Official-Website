import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FOCUS_AREAS } from '../../data/mockData';
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
  Search
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
  const { setActiveTab, changeRole } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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

  // Handle adding custom skill or pressing Enter
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
      newErrors.department = 'Faculty & Department is required. Please type your department.';
    }

    // 4. Institutional Email: firstname.lastname{matricnumber}@st.lasu.edu.ng
    const cleanEmail = formData.email.trim();
    if (!cleanEmail) {
      newErrors.email = 'Institutional Email Address is required.';
    } else {
      const emailPattern = /^[a-zA-Z]+\.[a-zA-Z]+\d{9}@st\.lasu\.edu\.ng$/i;
      if (!emailPattern.test(cleanEmail)) {
        newErrors.email = 'Format must be firstname.lastname{9-digit matric}@st.lasu.edu.ng (e.g. george.ikechukwu230233765@st.lasu.edu.ng).';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const handleComplete = () => {
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

          <h2 className="text-2xl font-black text-[#060721]">Create Member Account</h2>
          <p className="text-xs text-slate-600 font-medium max-w-lg mx-auto">
            Join NEX to participate in interdisciplinary research, group matching, build modules, and publish solutions.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e6f6e8] text-[#2FA137] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-[#060721]">Application Received!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto font-medium leading-relaxed">
              Verification link dispatched to <strong className="text-[#060721]">{formData.email}</strong>.<br />
              Your account is registered in the <strong className="text-[#2FA137]">Unplaced Member Pool</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1 max-w-md mx-auto">
              <p className="font-extrabold text-[#060721]">Registered Profile Details:</p>
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
                <label className="block font-bold mb-1 text-slate-700">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. George Ikechukwu"
                    value={formData.fullName}
                    onChange={e => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: null });
                    }}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-slate-900 outline-none shadow-xs font-medium ${
                      errors.fullName ? 'border-red-500 focus:ring-2 focus:ring-red-400' : 'border-slate-300 focus:ring-2 focus:ring-[#2FA137]'
                    }`}
                  />
                </div>
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
                      const val = e.target.value.replace(/\D/g, ''); // digits only
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

              {/* Department Input (Not a dropdown as requested) */}
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

              {/* Institutional Email with exact format check */}
              <div>
                <label className="block font-bold mb-1 text-slate-700">Institutional Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    placeholder="e.g. george.ikechukwu230233765@st.lasu.edu.ng"
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
                  <p className="text-[10px] text-[#2FA137] font-semibold mt-1 bg-emerald-50 py-1 px-2.5 rounded-md border border-emerald-200/60 inline-block">
                    Format: <span className="font-bold">firstname.lastname&#123;9-digit matric&#125;@st.lasu.edu.ng</span>
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

                {/* Skill search / custom input with working add button */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search or type a skill (e.g. ROS2, Python, CAD)..."
                      value={skillSearchText}
                      onChange={e => setSkillSearchText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill(e);
                        }
                      }}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 outline-none focus:ring-2 focus:ring-[#2FA137] font-medium"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2.5 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Skill</span>
                  </button>
                </div>

                {/* Filtered Predefined Skill Suggestions */}
                <div className="mt-2.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Click to Toggle Popular Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                    {filteredPredefinedSkills.map((skill, i) => {
                      const isSelected = formData.skills.includes(skill);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 ${
                            isSelected
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                          }`}
                        >
                          <span>{skill}</span>
                          {isSelected ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3 text-slate-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {errors.skills && (
                  <p className="text-[11px] text-red-600 font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.skills}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">Area of Strongest Knowledge *</label>
                <div className="relative">
                  <Brain className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    value={formData.knowledgeArea}
                    onChange={e => setFormData({ ...formData, knowledgeArea: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-[#2FA137] outline-none shadow-xs font-semibold"
                  >
                    {KNOWLEDGE_AREAS.map((area, i) => (
                      <option key={i} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Primary Focus Area Interests (Max 2) */}
            <div className="space-y-3.5 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-[#2FA137] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>3. Primary Focus Area Interests (Max 2) *</span>
                </h3>
                <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  formData.focusAreas.length === 2
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  {formData.focusAreas.length} / 2 Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
                {FOCUS_AREAS.map(fa => {
                  const isSelected = formData.focusAreas.includes(fa.title);
                  const isMaxReached = formData.focusAreas.length >= 2;
                  const isDisabled = !isSelected && isMaxReached;

                  return (
                    <label 
                      key={fa.id} 
                      className={`flex items-start gap-2.5 p-3 rounded-2xl border transition-all text-xs ${
                        isDisabled 
                          ? 'bg-slate-100 border-slate-200 opacity-45 cursor-not-allowed select-none' 
                          : isSelected
                          ? 'bg-emerald-50/90 border-[#2FA137] shadow-xs cursor-pointer'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 cursor-pointer'
                      }`}
                    >
                      <input
                        type="checkbox"
                        disabled={isDisabled}
                        checked={isSelected}
                        onChange={() => {
                          handleFocusAreaToggle(fa.title);
                          if (errors.focusAreas) setErrors({ ...errors, focusAreas: null });
                        }}
                        className="mt-0.5 rounded text-[#2FA137] focus:ring-[#2FA137] disabled:cursor-not-allowed cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className={`font-bold ${isSelected ? 'text-[#2FA137]' : 'text-slate-900'}`}>
                            {fa.title}
                          </span>
                          {isDisabled && (
                            <span className="text-[9px] font-extrabold bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                              Disabled (Max 2)
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 line-clamp-1 block leading-tight">
                          {fa.description}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>

              {errors.focusAreas && (
                <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.focusAreas}</span>
                </p>
              )}

              {formData.focusAreas.length >= 2 && !errors.focusAreas && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Maximum limit reached (2 Focus Areas). Uncheck an option to choose a different domain.</span>
                </div>
              )}
            </div>

            {/* Section 4: Passwords & Security */}
            <div className="space-y-3.5 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-black text-[#2FA137] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                <Lock className="w-4 h-4" />
                <span>4. Password Credentials & Security</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-700">Password *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="At least 8 characters"
                      value={formData.password}
                      onChange={e => {
                        setFormData({ ...formData, password: e.target.value });
                        if (errors.password) setErrors({ ...errors, password: null });
                      }}
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-white text-slate-900 outline-none shadow-xs font-medium ${
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
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Repeat password"
                      value={formData.confirmPassword}
                      onChange={e => {
                        setFormData({ ...formData, confirmPassword: e.target.value });
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                      }}
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-white text-slate-900 outline-none shadow-xs font-medium ${
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
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.confirmPassword}</span>
                    </p>
                  )}
                </div>
              </div>

              {formData.confirmPassword && !errors.confirmPassword && (
                <div className="text-[11px] font-bold text-[#2FA137] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match perfectly
                </div>
              )}

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={e => {
                      setFormData({ ...formData, agreeTerms: e.target.checked });
                      if (errors.agreeTerms) setErrors({ ...errors, agreeTerms: null });
                    }}
                    className="mt-0.5 rounded text-[#2FA137] focus:ring-[#2FA137]"
                  />
                  <span className="text-slate-600 text-xs font-medium">
                    I agree to the <strong className="text-[#060721]">NEX Member Code of Conduct</strong> and <strong className="text-[#060721]">Research Integrity Guidelines</strong>.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.agreeTerms}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#2FA137] hover:bg-[#26892c] text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Submit Registration & Create Account</span>
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
