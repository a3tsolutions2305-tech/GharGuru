import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  DollarSign,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Send,
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { BOARDS, GRADES, SUBJECTS, MUMBAI_LOCALITIES } from '../data/mockTutors';
import { TutorProfile } from '../types';
import { storage } from '../services/storage';

export const BecomeTutor: React.FC = () => {
  const navigate = useNavigate();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [locality, setLocality] = useState(MUMBAI_LOCALITIES[0].split('(')[0].trim());
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState(5);
  const [selectedBoards, setSelectedBoards] = useState<string[]>(['CBSE', 'ICSE']);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics']);
  const [selectedGrades, setSelectedGrades] = useState<string[]>(['Class 9', 'Class 10 (Board Exam)']);
  const [hourlyFee, setHourlyFee] = useState(800);
  const [teachingApproach, setTeachingApproach] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleBoard = (b: string) => {
    if (selectedBoards.includes(b)) {
      if (selectedBoards.length > 1) setSelectedBoards(selectedBoards.filter(x => x !== b));
    } else {
      setSelectedBoards([...selectedBoards, b]);
    }
  };

  const toggleSubject = (s: string) => {
    if (selectedSubjects.includes(s)) {
      if (selectedSubjects.length > 1) setSelectedSubjects(selectedSubjects.filter(x => x !== s));
    } else {
      setSelectedSubjects([...selectedSubjects, s]);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!phone.trim() || phone.length < 8) errs.phone = 'Contact number is required';
    if (!headline.trim()) errs.headline = 'Please add a short headline (e.g. ICSE Physics Specialist)';
    if (!qualification.trim()) errs.qualification = 'Highest qualification degree is required';
    if (!bio.trim() || bio.length < 30) errs.bio = 'Bio should be at least 30 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const newTutorId = `tut-${Date.now()}`;
    const newProfile: TutorProfile = {
      id: newTutorId,
      userId: `u-${newTutorId}`,
      fullName,
      headline,
      bio,
      qualificationSummary: qualification,
      educationDegrees: [qualification],
      yearsOfExperience: experience,
      teachingApproach: teachingApproach || 'Concept-oriented problem solving and exam discipline.',
      profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      gender: 'Female',
      languages: ['English', 'Hindi'],
      listingStatus: 'pending_review',
      verificationStatus: 'pending',
      boards: selectedBoards as any,
      grades: selectedGrades,
      subjects: selectedSubjects,
      primaryLocality: locality,
      serviceAreas: [{ locality, city: 'Mumbai', pincode: '400050', travelRadiusKm: 5 }],
      fee: {
        pricingType: 'hourly',
        amountInr: hourlyFee,
        sessionDurationMinutes: 60,
        notes: 'Introductory pilot listing.'
      },
      availability: [
        { day: 'Monday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
        { day: 'Wednesday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
        { day: 'Friday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true }
      ],
      verificationRecords: [
        { id: `vr-${Date.now()}`, type: 'ID Proof', status: 'pending', notes: 'Submitted for verification' }
      ],
      reviews: [],
      rating: 5.0,
      totalReviews: 0,
      profileCompleteness: 85,
      createdAt: new Date().toISOString()
    };

    storage.updateTutor(newProfile);

    // Switch current user to this tutor
    storage.setCurrentUser({
      id: `u-${newTutorId}`,
      email,
      full_name: fullName,
      role: 'tutor',
      phone,
      created_at: new Date().toISOString()
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D99B58]">
          Teach Right at Home with GharGuru
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#102C24]">
          Empower young minds in your local Mumbai neighborhood
        </h1>
        <p className="text-sm text-[#4E5B54] leading-relaxed">
          Join an elite network of dedicated home educators. Earn high hourly fees, choose students within your preferred commute radius, and build direct, long-lasting mentoring relationships.
        </p>
      </div>

      {/* 3 Pillars / Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#D7E6D3] shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-[#173F32] text-white flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-[#D99B58]" />
          </div>
          <h3 className="font-bold text-base text-[#102C24]">0% Commission Pilot</h3>
          <p className="text-xs text-[#4E5B54] leading-relaxed">
            Keep 100% of what parents pay you. Set your own hourly rate with complete financial transparency.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#D7E6D3] shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-[#173F32] text-white flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#D99B58]" />
          </div>
          <h3 className="font-bold text-base text-[#102C24]">No Long Commutes</h3>
          <p className="text-xs text-[#4E5B54] leading-relaxed">
            Select your exact residential locality and travel radius (e.g. Bandra, Powai, Andheri) to teach close to home.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#D7E6D3] shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-[#173F32] text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#D99B58]" />
          </div>
          <h3 className="font-bold text-base text-[#102C24]">Verified Parent Requests</h3>
          <p className="text-xs text-[#4E5B54] leading-relaxed">
            Receive genuine enquiries from parents seeking serious, structured curriculum guidance.
          </p>
        </div>
      </div>

      {/* Registration Form Box */}
      <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-10 shadow-sm max-w-3xl mx-auto">
        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#102C24]">
              Educator Profile Submitted for Verification
            </h2>
            <p className="text-xs sm:text-sm text-[#4E5B54] max-w-md mx-auto leading-relaxed">
              Your mentor profile has been saved. Our quality team audits academic certificates and contact records within 24–48 hours. You are currently signed in as <strong className="text-[#173F32]">{fullName}</strong>.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/tutor/dashboard"
                className="px-6 py-2.5 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-colors"
              >
                Open Tutor Portal & Manage Schedule
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8 border-b border-gray-100 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D99B58]">
                Tutor Onboarding Application
              </span>
              <h2 className="font-editorial text-2xl font-bold text-[#102C24] mt-0.5">
                Create Your GharGuru Mentor Profile
              </h2>
              <p className="text-xs text-[#4E5B54] mt-1">
                Fill out your teaching credentials. All submissions undergo identity and degree verification.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#173F32] mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                    placeholder="e.g. Radhika Sharma"
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F32] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                    placeholder="e.g. radhika.sharma@example.com"
                  />
                  {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#173F32] mb-1">
                    Contact Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                    placeholder="e.g. +91 98201 98765"
                  />
                  {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F32] mb-1">
                    Primary Mumbai Locality *
                  </label>
                  <select
                    value={locality}
                    onChange={e => setLocality(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] focus:outline-none"
                  >
                    {MUMBAI_LOCALITIES.map(loc => (
                      <option key={loc} value={loc.split('(')[0].trim()}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Headline & Bio */}
              <div>
                <label className="block text-xs font-bold text-[#173F32] mb-1">
                  Professional Headline *
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={e => setHeadline(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                  placeholder="e.g. Senior ICSE Mathematics & Physics Specialist • 7+ Yrs Exp"
                />
                {errors.headline && <p className="text-[11px] text-rose-600 mt-1">{errors.headline}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#173F32] mb-1">
                    Highest Educational Qualification *
                  </label>
                  <input
                    type="text"
                    value={qualification}
                    onChange={e => setQualification(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                    placeholder="e.g. M.Sc. Applied Mathematics (Mumbai Univ)"
                  />
                  {errors.qualification && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.qualification}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F32] mb-1">
                    Teaching Experience (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="35"
                    value={experience}
                    onChange={e => setExperience(Number(e.target.value))}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                  />
                </div>
              </div>

              {/* Education Boards Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-[#173F32] mb-2">
                  Curriculum Boards You Can Teach
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BOARDS.map(b => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => toggleBoard(b.code)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-colors cursor-pointer ${
                        selectedBoards.includes(b.code)
                          ? 'bg-[#173F32] text-white border-[#173F32]'
                          : 'bg-[#F5F3E9] text-[#173F32] border-[#D7E6D3]'
                      }`}
                    >
                      {b.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subjects Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-[#173F32] mb-2">
                  Key Subjects
                </label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleSubject(s.name)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                        selectedSubjects.includes(s.name)
                          ? 'bg-[#173F32] text-white border-[#173F32]'
                          : 'bg-[#F5F3E9] text-[#173F32] border-[#D7E6D3]'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hourly Fee */}
              <div>
                <label className="block text-xs font-bold text-[#173F32] mb-1">
                  Desired In-Home Hourly Fee (INR)
                </label>
                <div className="relative max-w-xs">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-xs">₹</span>
                  <input
                    type="number"
                    min="300"
                    max="5000"
                    step="50"
                    value={hourlyFee}
                    onChange={e => setHourlyFee(Number(e.target.value))}
                    className="w-full text-xs pl-8 pr-4 py-2.5 rounded-xl border border-[#D7E6D3] font-bold text-[#173F32] focus:outline-none"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">/ hour</span>
                </div>
              </div>

              {/* Bio & Philosophy */}
              <div>
                <label className="block text-xs font-bold text-[#173F32] mb-1">
                  Introduction & Bio *
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                  placeholder="Share your teaching journey, background, student achievements, and past school affiliations..."
                />
                {errors.bio && <p className="text-[11px] text-rose-600 mt-1">{errors.bio}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#D99B58]" />
                  {isSubmitting ? 'Creating Profile...' : 'Submit Profile for Verification'}
                </button>
                <p className="text-[11px] text-[#4E5B54] text-center mt-2">
                  All mentor applications are verified strictly under our quality standards before in-home tuition matching.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
