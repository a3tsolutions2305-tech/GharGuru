import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Users,
  Award,
  ChevronRight,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { BOARDS, GRADES, SUBJECTS, MUMBAI_LOCALITIES, INITIAL_TUTORS } from '../data/mockTutors';
import { TutorCard } from '../components/tutor/TutorCard';
import { EnquiryModal } from '../components/tutor/EnquiryModal';
import { TutorProfile } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // Search state
  const [locality, setLocality] = useState('');
  const [board, setBoard] = useState('all');
  const [grade, setGrade] = useState('all');
  const [subject, setSubject] = useState('all');

  // Enquiry modal state
  const [selectedTutorForEnquiry, setSelectedTutorForEnquiry] = useState<TutorProfile | null>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (locality && locality !== 'all') params.set('locality', locality);
    if (board && board !== 'all') params.set('board', board);
    if (grade && grade !== 'all') params.set('grade', grade);
    if (subject && subject !== 'all') params.set('subject', subject);
    navigate(`/tutors?${params.toString()}`);
  };

  const featuredTutors = INITIAL_TUTORS.filter(t => t.featured).slice(0, 3);

  const faqs = [
    {
      q: 'How does GharGuru verify home tutors in Mumbai?',
      a: 'Every tutor on GharGuru undergoes a multi-tier physical and credential screening: government ID verification (Aadhaar/Passport), degree & university certificate verification, proof of address, and a reference or background interview before home visits.'
    },
    {
      q: 'Can we have a trial session at our home before committing?',
      a: 'Yes! We encourage a 30 to 45-minute introductory diagnostic session right in your home. This allows both the parent and student to evaluate the tutor’s teaching style, communication, and temperament.'
    },
    {
      q: 'What education boards do tutors cover in Mumbai?',
      a: 'Our tutors specialize in Central Board of Secondary Education (CBSE), Maharashtra State Board (SSC/HSC with Balbharati textbooks), Indian Certificate of Secondary Education (ICSE/ISC), and the National Institute of Open Schooling (NIOS).'
    },
    {
      q: 'How are tuition fees structured and paid?',
      a: 'Tutors set transparent hourly or monthly rates clearly visible on their profile (typically ₹500 to ₹1500/hr depending on board, grade, and subject). In this pilot stage, parents pay tutors directly with zero commission markup.'
    },
    {
      q: 'What happens if a tutor is not the right fit for my child?',
      a: 'You can switch tutors or request another recommendation anytime without penalty. Our Smart Match tool helps you find alternative educators in your locality within 24 hours.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#D7E6D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D7E6D3] text-[#173F32] font-semibold text-xs border border-[#173F32]/10">
                <ShieldCheck className="w-4 h-4 text-[#D99B58]" />
                <span>Verified Home Tutors in Mumbai</span>
                <span className="text-black/30">•</span>
                <span className="text-[#4E5B54]">CBSE • SSC • ICSE • NIOS</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#102C24] tracking-tight leading-[1.15]">
                Great learning <br />
                <span className="italic font-normal text-[#173F32]">begins right at home.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4E5B54] max-w-xl leading-relaxed">
                Connect with patient, background-verified neighborhood educators tailored to your child’s learning pace, board curriculum, and schedule.
              </p>

              {/* Quick Search Panel */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#D7E6D3] shadow-lg">
                <form onSubmit={handleQuickSearch} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {/* Locality */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F32] mb-1">
                        Neighborhood
                      </label>
                      <select
                        value={locality}
                        onChange={e => setLocality(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] focus:outline-none"
                      >
                        <option value="all">Any Mumbai Area</option>
                        {MUMBAI_LOCALITIES.map(loc => (
                          <option key={loc} value={loc.split('(')[0].trim()}>
                            {loc.split('(')[0].trim()}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Board */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F32] mb-1">
                        Board
                      </label>
                      <select
                        value={board}
                        onChange={e => setBoard(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] focus:outline-none"
                      >
                        <option value="all">All Boards</option>
                        {BOARDS.map(b => (
                          <option key={b.id} value={b.code}>
                            {b.code}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Class */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F32] mb-1">
                        Class / Grade
                      </label>
                      <select
                        value={grade}
                        onChange={e => setGrade(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] focus:outline-none"
                      >
                        <option value="all">All Grades</option>
                        {GRADES.map(g => (
                          <option key={g.id} value={g.displayName}>
                            {g.displayName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#173F32] mb-1">
                        Subject
                      </label>
                      <select
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] focus:outline-none"
                      >
                        <option value="all">All Subjects</option>
                        {SUBJECTS.map(s => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] text-[#4E5B54]">
                      Popular in Mumbai: <strong className="text-[#173F32]">ICSE Maths (Bandra)</strong>, <strong className="text-[#173F32]">CBSE Physics (Powai)</strong>
                    </span>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Search className="w-4 h-4 text-[#D99B58]" />
                      Find My Tutor
                    </button>
                  </div>
                </form>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/requirement-builder"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#173F32] hover:text-[#D99B58] transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#D99B58]" />
                  Need help choosing? Try the 2-Minute Parent Requirement Builder
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative warm card */}
                <div className="absolute inset-0 bg-[#D7E6D3]/60 rounded-3xl transform rotate-2 translate-x-2 translate-y-2 -z-10" />

                <div className="bg-white rounded-3xl p-4 border border-[#D7E6D3] shadow-xl overflow-hidden space-y-4">
                  {/* Photo of authentic home tutoring */}
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-[#F5F3E9]">
                    <img
                      src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                      alt="Home tutor mentoring a student in a warm domestic study"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#D7E6D3] shadow-sm flex items-center gap-2 text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span className="font-bold text-[#173F32]">Verified Home Visit</span>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-2xl bg-[#F5F3E9] border border-[#D7E6D3]/60">
                      <div className="text-[11px] text-[#4E5B54]">Pilot Coverage</div>
                      <div className="font-bold text-sm text-[#173F32]">Mumbai West & Central</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#F5F3E9] border border-[#D7E6D3]/60">
                      <div className="text-[11px] text-[#4E5B54]">In-Person Audit</div>
                      <div className="font-bold text-sm text-[#173F32]">100% ID Verified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE-STEP PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D99B58]">
            Simple & Transparent
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#102C24] mt-1">
            How GharGuru works for your family
          </h2>
          <p className="text-sm text-[#4E5B54] mt-2">
            No endless agency cold calls. Find genuine neighborhood educators who teach in person at your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-6 border border-[#D7E6D3] shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#173F32] text-white flex items-center justify-center font-bold text-lg mb-4">
                01
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#102C24] mb-2">
                Specify your needs
              </h3>
              <p className="text-xs text-[#4E5B54] leading-relaxed">
                Choose your child’s education board (CBSE, SSC, ICSE, NIOS), grade, specific subjects, locality in Mumbai, and hourly budget.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-[#173F32] flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-[#D99B58]" />
              Takes under 2 minutes
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-6 border border-[#D7E6D3] shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D99B58] text-[#102C24] flex items-center justify-center font-bold text-lg mb-4">
                02
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#102C24] mb-2">
                Review verified profiles
              </h3>
              <p className="text-xs text-[#4E5B54] leading-relaxed">
                Inspect authentic degree certificates, years of experience, board pass records, hourly rates, and transparent parent feedback.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-[#173F32] flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-[#D99B58]" />
              Explainable Smart Match scores
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-6 border border-[#D7E6D3] shadow-xs relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#173F32] text-white flex items-center justify-center font-bold text-lg mb-4">
                03
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#102C24] mb-2">
                1-on-1 Trial at home
              </h3>
              <p className="text-xs text-[#4E5B54] leading-relaxed">
                Meet the tutor right at your home for a diagnostic session. Confirm syllabus alignment and teaching rapport before starting regular sessions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-[#173F32] flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-[#D99B58]" />
              Zero upfront platform commission
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED TUTORS CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D99B58]">
              Handpicked Educators
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#102C24] mt-1">
              Featured Verified Home Tutors
            </h2>
            <p className="text-sm text-[#4E5B54] mt-1">
              Proven results in board examinations across Bandra, Powai, Andheri, and Dadar.
            </p>
          </div>

          <Link
            to="/tutors"
            className="text-xs font-bold px-4 py-2.5 rounded-xl border border-[#173F32] text-[#173F32] hover:bg-[#173F32] hover:text-white transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>View All {INITIAL_TUTORS.length} Tutors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTutors.map(tutor => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onSelectEnquiry={t => setSelectedTutorForEnquiry(t)}
            />
          ))}
        </div>
      </section>

      {/* 4. VERIFICATION PILLARS (TRUST & SAFETY) */}
      <section className="bg-white border-y border-[#D7E6D3] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D99B58]">
                Rigorous Safety Standards
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#102C24]">
                Who gets to enter your home? Only the verified.
              </h2>
              <p className="text-sm text-[#4E5B54] leading-relaxed">
                Inviting an educator into your living room requires uncompromising trust. GharGuru screens every listing manually with strict documentary checks before public listing.
              </p>

              <div className="pt-2">
                <Link
                  to="/tutors"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#173F32] hover:text-[#D99B58] transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D99B58]" />
                  <span>Browse Verified Educators in Your Locality</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#F5F3E9] border border-[#D7E6D3]">
                <div className="w-9 h-9 rounded-xl bg-[#173F32] text-white flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#D99B58]" />
                </div>
                <h4 className="font-bold text-sm text-[#173F32] mb-1">Government ID Audit</h4>
                <p className="text-xs text-[#4E5B54] leading-relaxed">
                  Verified Aadhaar, PAN card, or Passport matching the tutor’s legal bank records.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F5F3E9] border border-[#D7E6D3]">
                <div className="w-9 h-9 rounded-xl bg-[#173F32] text-white flex items-center justify-center mb-3">
                  <GraduationCap className="w-5 h-5 text-[#D99B58]" />
                </div>
                <h4 className="font-bold text-sm text-[#173F32] mb-1">University Degrees</h4>
                <p className="text-xs text-[#4E5B54] leading-relaxed">
                  Authentic graduation certificates verified from recognized Indian colleges and universities.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F5F3E9] border border-[#D7E6D3]">
                <div className="w-9 h-9 rounded-xl bg-[#173F32] text-white flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5 text-[#D99B58]" />
                </div>
                <h4 className="font-bold text-sm text-[#173F32] mb-1">Neighborhood Residence</h4>
                <p className="text-xs text-[#4E5B54] leading-relaxed">
                  Residential address verification ensuring tutors actually reside within the stated commute zone.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F5F3E9] border border-[#D7E6D3]">
                <div className="w-9 h-9 rounded-xl bg-[#173F32] text-white flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-[#D99B58]" />
                </div>
                <h4 className="font-bold text-sm text-[#173F32] mb-1">Parent Feedback Loops</h4>
                <p className="text-xs text-[#4E5B54] leading-relaxed">
                  Every enquiry and session outcome is monitored with ongoing accountability and resolution support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCAL MUMBAI LEARNING GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D99B58]">
            Local Learning Directory
          </span>
          <h2 className="font-editorial text-3xl font-bold text-[#102C24] mt-1">
            Explore Tutors by Mumbai Locality
          </h2>
          <p className="text-sm text-[#4E5B54] mt-2">
            Select your residential enclave to discover tutors willing to travel to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'Bandra West', sub: 'Pali Hill, Carter Rd', count: 4 },
            { name: 'Andheri West', sub: 'Lokhandwala, Versova', count: 5 },
            { name: 'Powai', sub: 'Hiranandani, Chandivali', count: 3 },
            { name: 'Juhu', sub: 'Vile Parle, JVPD', count: 4 },
            { name: 'Dadar', sub: 'Matunga, Prabhadevi', count: 3 },
            { name: 'Chembur', sub: 'Diamond Garden, Ghatkopar', count: 3 },
          ].map(area => (
            <Link
              key={area.name}
              to={`/tutors?locality=${encodeURIComponent(area.name)}`}
              className="p-4 rounded-2xl bg-white border border-[#D7E6D3] hover:border-[#173F32] hover:shadow-md transition-all text-center group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#D7E6D3] text-[#173F32] flex items-center justify-center mx-auto mb-2 group-hover:bg-[#173F32] group-hover:text-white transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs text-[#102C24] group-hover:text-[#173F32]">
                {area.name}
              </div>
              <div className="text-[10px] text-gray-500 truncate">{area.sub}</div>
              <div className="text-[10px] text-[#D99B58] font-bold mt-1">
                {area.count} Tutors Available
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. TEACH WITH GHARGURU (TUTOR RECRUITMENT BANNER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#173F32] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D99B58]">
              Join GharGuru&apos;s Mentor Community
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight">
              Are you a dedicated educator in Mumbai?
            </h2>
            <p className="text-sm text-[#F5F3E9]/80 leading-relaxed">
              Earn between ₹30,000 to ₹80,000 monthly by teaching motivated students in your local neighborhood. Set your own schedule, define your travel radius, and teach without commission deductions.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/become-a-tutor"
                className="px-6 py-3 rounded-xl bg-[#D99B58] text-[#102C24] font-bold text-xs hover:bg-[#D99B58]/90 transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Create Tutor Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/become-a-tutor"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/20 inline-flex items-center gap-2"
              >
                Teacher Standards & Criteria
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D99B58]">
            Questions & Answers
          </span>
          <h2 className="font-editorial text-3xl font-bold text-[#102C24] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#D7E6D3] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#102C24] hover:text-[#173F32] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#D99B58] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#4E5B54] leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Enquiry Modal */}
      {selectedTutorForEnquiry && (
        <EnquiryModal
          tutor={selectedTutorForEnquiry}
          isOpen={true}
          onClose={() => setSelectedTutorForEnquiry(null)}
        />
      )}
    </div>
  );
};
