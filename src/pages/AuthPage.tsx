import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye,
  EyeOff,
  User as UserIcon,
  GraduationCap,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { storage } from '../services/storage';
import { UserRole } from '../types';
import { BrandMark } from '../components/branding/Logo';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Mode: Sign in vs Register
  const [isRegister, setIsRegister] = useState(location.pathname === '/register');
  const [role, setRole] = useState<UserRole>('parent');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Forgot Password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Errors & Loading
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!password.trim() || password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (isRegister) {
      if (!fullName.trim()) errs.fullName = 'Full legal name is required.';
      if (!phone.trim() || phone.length < 8) errs.phone = 'Valid 10-digit mobile number required.';
      if (password !== confirmPassword) {
        errs.confirmPassword = 'Passwords do not match.';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    if (isRegister) {
      const res = storage.registerUser({
        email,
        password,
        fullName,
        phone,
        role: role === 'tutor' ? 'tutor' : 'parent'
      });

      setIsSubmitting(false);

      if (!res.success) {
        setErrors({ form: res.error || 'Registration failed.' });
        return;
      }

      if (role === 'tutor') {
        navigate('/become-a-tutor');
      } else {
        navigate('/parent/dashboard');
      }
    } else {
      const res = storage.loginUser(email, password);
      setIsSubmitting(false);

      if (!res.success) {
        setErrors({ form: res.error || 'Invalid credentials.' });
        return;
      }

      const loggedUser = res.user!;
      if (loggedUser.role === 'admin') {
        navigate('/admin');
      } else if (loggedUser.role === 'tutor') {
        navigate('/tutor/dashboard');
      } else {
        navigate('/parent/dashboard');
      }
    }
  };



  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-3xl border border-[#D7E6D3] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Editorial Visual Section */}
        <div className="lg:col-span-5 bg-[#173F32] p-8 sm:p-12 text-[#F5F3E9] flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D99B58]/10 rounded-full blur-3xl -z-0" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D7E6D3]/10 rounded-full blur-3xl -z-0" />

          <div className="relative z-10 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <BrandMark size={38} colorScheme="white" />
              <span className="font-editorial text-2xl font-bold tracking-tight text-white">
                Ghar<span className="text-[#D99B58]">Guru</span>
              </span>
            </Link>

            <div className="space-y-2 pt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D99B58]">
                Personalized In-Home Education
              </span>
              <h2 className="font-editorial text-3xl font-bold leading-tight">
                Empowering students with dedicated guidance right at home.
              </h2>
              <p className="text-xs text-[#F5F3E9]/80 leading-relaxed pt-2">
                Join thousands of Mumbai families finding qualified, background-checked mentors for CBSE, ICSE, SSC, and NIOS examinations.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/15">
              <div className="flex items-center gap-3 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#D99B58] shrink-0" />
                <span>100% In-Person Physical ID Verification</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#D99B58] shrink-0" />
                <span>Direct 1-on-1 In-Home Consultation</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Sparkles className="w-4 h-4 text-[#D99B58] shrink-0" />
                <span>Zero Commission Platform for Parents</span>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="relative z-10 pt-8 mt-8 border-t border-white/10 text-xs">
            <p className="italic text-[#F5F3E9]/90 leading-relaxed mb-2">
              &ldquo;GharGuru helped us connect with Ananya ma&apos;am within 24 hours. My son scored 94% in ICSE Mathematics!&rdquo;
            </p>
            <div className="font-bold text-[#D99B58]">Sunita Mehra</div>
            <div className="text-[10px] text-white/60">Parent, Bandra West</div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
          <div>
            {/* Top Toggle: Sign In vs Sign Up */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <div className="flex p-1 bg-[#F5F3E9] rounded-2xl border border-[#D7E6D3]/60">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setErrors({});
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    !isRegister
                      ? 'bg-[#173F32] text-white shadow-xs'
                      : 'text-[#173F32] hover:text-black'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true);
                    setErrors({});
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isRegister
                      ? 'bg-[#173F32] text-white shadow-xs'
                      : 'text-[#173F32] hover:text-black'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <span className="text-[11px] text-[#4E5B54] hidden sm:inline">
                {isRegister ? 'Already registered?' : 'New to GharGuru?'}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setErrors({});
                  }}
                  className="font-bold text-[#173F32] hover:underline cursor-pointer"
                >
                  {isRegister ? 'Sign In' : 'Sign Up'}
                </button>
              </span>
            </div>

            <div className="pt-6 space-y-1">
              <h1 className="font-editorial text-2xl font-bold text-[#102C24]">
                {isRegister ? 'Join GharGuru' : 'Welcome back to your account'}
              </h1>
              <p className="text-xs text-[#4E5B54]">
                {isRegister
                  ? 'Create an account to book consultations and track student progress'
                  : 'Enter your verified credentials to access your dashboard'}
              </p>
            </div>

            {/* General Form Error Banner */}
            {errors.form && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {errors.form}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Role Selection for Registration */}
              {isRegister && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F32] mb-1.5">
                    I want to:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('parent')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        role === 'parent'
                          ? 'border-[#173F32] bg-[#173F32] text-white shadow-xs'
                          : 'border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] hover:bg-[#D7E6D3]'
                      }`}
                    >
                      <UserIcon className="w-4 h-4 text-[#D99B58]" />
                      <div>
                        <div className="font-bold text-xs">Find a Tutor</div>
                        <div className="text-[10px] opacity-80">For my child / self</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('tutor')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        role === 'tutor'
                          ? 'border-[#173F32] bg-[#173F32] text-white shadow-xs'
                          : 'border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] hover:bg-[#D7E6D3]'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4 text-[#D99B58]" />
                      <div>
                        <div className="font-bold text-xs">Teach with GharGuru</div>
                        <div className="text-[10px] opacity-80">Provide home tuition</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Full Name for Registration */}
              {isRegister && (
                <div>
                  <label className="block text-xs font-semibold text-[#173F32] mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                    placeholder="e.g. Sunita Mehra"
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                </div>
              )}

              {/* Email & Phone */}
              <div className={isRegister ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'space-y-4'}>
                <div>
                  <label className="block text-xs font-semibold text-[#173F32] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                </div>

                {isRegister && (
                  <div>
                    <label className="block text-xs font-semibold text-[#173F32] mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                        placeholder="+91 98201 54321"
                      />
                    </div>
                    {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                  </div>
                )}
              </div>

              {/* Password Fields */}
              <div className={isRegister ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'space-y-1'}>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-[#173F32]">Password *</label>
                    {!isRegister && (
                      <button
                        type="button"
                        onClick={() => setShowForgotModal(true)}
                        className="text-[11px] text-[#D99B58] font-bold hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full text-xs pl-10 pr-10 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-[11px] text-rose-600 mt-1">{errors.password}</p>}
                </div>

                {isRegister && (
                  <div>
                    <label className="block text-xs font-semibold text-[#173F32] mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}
              </div>

              {!isRegister && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded text-[#173F32] accent-[#173F32]"
                  />
                  <label htmlFor="rememberMe" className="text-xs text-[#4E5B54] select-none cursor-pointer">
                    Remember my login session on this browser
                  </label>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>{isRegister ? 'Create Free Account' : 'Sign In to Account'}</span>
                  <ArrowRight className="w-4 h-4 text-[#D99B58]" />
                </button>
              </div>
            </form>
          </div>

          {/* Trust and Privacy Assurance */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#4E5B54]">
            <span className="flex items-center gap-1.5 text-[11px] text-[#173F32] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D99B58]" />
              256-bit SSL Encrypted
            </span>
            <span className="text-[11px] text-gray-500">
              Verified Mumbai Tutor Network
            </span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-xl">
            <h3 className="font-editorial text-xl font-bold text-[#102C24]">Reset Your Password</h3>
            {forgotSuccess ? (
              <div className="space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <p className="text-xs text-[#4E5B54]">
                  Password reset instructions sent to <strong>{forgotEmail}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSuccess(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#173F32] text-white text-xs font-bold"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-[#4E5B54]">
                  Enter your registered email address to receive password recovery instructions.
                </p>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full text-xs p-3 rounded-xl border border-[#D7E6D3] focus:outline-none"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (forgotEmail.includes('@')) {
                        setForgotSuccess(true);
                      }
                    }}
                    className="px-5 py-2 rounded-xl bg-[#173F32] text-white text-xs font-bold"
                  >
                    Send Recovery Email
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
