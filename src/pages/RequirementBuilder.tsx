import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  Search,
  ShieldCheck
} from 'lucide-react';
import { BOARDS, GRADES, SUBJECTS, MUMBAI_LOCALITIES, INITIAL_TUTORS } from '../data/mockTutors';
import { ChildRequirement, TutorProfile } from '../types';
import { storage } from '../services/storage';
import { TutorCard } from '../components/tutor/TutorCard';
import { EnquiryModal } from '../components/tutor/EnquiryModal';

export const RequirementBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [studentName, setStudentName] = useState('Aarav Sharma');
  const [selectedBoard, setSelectedBoard] = useState('ICSE');
  const [selectedGrade, setSelectedGrade] = useState('Class 10 (Board Exam)');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics', 'Physics']);
  const [locality, setLocality] = useState(MUMBAI_LOCALITIES[0].split('(')[0].trim());
  const [timing, setTiming] = useState('Evening (4 PM - 8 PM)');
  const [hourlyBudget, setHourlyBudget] = useState(1000);
  const [monthlyBudget, setMonthlyBudget] = useState(12000);

  const [selectedForEnquiry, setSelectedForEnquiry] = useState<TutorProfile | null>(null);

  const toggleSubject = (subj: string) => {
    if (selectedSubjects.includes(subj)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter(s => s !== subj));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subj]);
    }
  };

  const handleFinishWizard = () => {
    const requirement: ChildRequirement = {
      studentName,
      board: selectedBoard,
      grade: selectedGrade,
      subjects: selectedSubjects,
      locality,
      hourlyBudgetInr: hourlyBudget,
      monthlyBudgetInr: monthlyBudget,
      preferredTiming: timing
    };
    storage.updateChildRequirement(requirement);
    setStep(5); // Show results
  };

  // Get matching tutors ranked by score
  const requirementObject: ChildRequirement = {
    studentName,
    board: selectedBoard,
    grade: selectedGrade,
    subjects: selectedSubjects,
    locality,
    hourlyBudgetInr: hourlyBudget,
    monthlyBudgetInr: monthlyBudget,
    preferredTiming: timing
  };

  const scoredTutors = storage
    .getTutors()
    .filter(t => t.listingStatus === 'approved')
    .map(tutor => {
      const match = storage.calculateSmartMatch(tutor, requirementObject);
      return { tutor, match };
    })
    .sort((a, b) => b.match.scorePercentage - a.match.scorePercentage);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7E6D3] text-[#173F32] font-semibold text-xs border border-[#173F32]/10">
          <Sparkles className="w-3.5 h-3.5 text-[#D99B58]" />
          <span>Interactive Parent Requirement Builder</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#102C24]">
          Find the ideal home tutor in 4 simple steps
        </h1>
        <p className="text-xs sm:text-sm text-[#4E5B54]">
          Answer a few quick questions to receive a curated list of verified neighborhood educators with transparent compatibility scores.
        </p>
      </div>

      {/* Step Indicator (Steps 1 to 4) */}
      {step <= 4 && (
        <div className="flex items-center justify-center max-w-md mx-auto">
          {[1, 2, 3, 4].map(s => (
            <React.Fragment key={s}>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step === s
                    ? 'bg-[#173F32] text-white ring-4 ring-[#D7E6D3]'
                    : step > s
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#D7E6D3] text-[#173F32]'
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded ${
                    step > s ? 'bg-emerald-700' : 'bg-[#D7E6D3]'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Wizard Steps Box */}
      {step <= 4 && (
        <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-10 shadow-sm max-w-2xl mx-auto space-y-6">
          {/* STEP 1: Student Name, Board & Grade */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D99B58]">
                  Step 1 of 4
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#102C24] mt-1">
                  Tell us about the student
                </h2>
                <p className="text-xs text-[#4E5B54] mt-1">
                  Select your child&apos;s educational board and current standard.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173F32] mb-1.5">
                  Student Name or Nickname
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:outline-none"
                  placeholder="e.g. Aarav"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173F32] mb-2">
                  Education Board *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {BOARDS.map(b => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBoard(b.code)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedBoard === b.code
                          ? 'border-[#173F32] bg-[#173F32] text-white shadow-xs'
                          : 'border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] hover:bg-[#D7E6D3]'
                      }`}
                    >
                      <div className="font-bold text-xs">{b.code}</div>
                      <div className="text-[10px] opacity-80 truncate">{b.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173F32] mb-2">
                  Class / Grade *
                </label>
                <select
                  value={selectedGrade}
                  onChange={e => setSelectedGrade(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] focus:outline-none"
                >
                  {GRADES.map(g => (
                    <option key={g.id} value={g.displayName}>
                      {g.displayName} ({g.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue to Subjects</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Key Subjects */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D99B58]">
                  Step 2 of 4
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#102C24] mt-1">
                  Which subjects need personal attention?
                </h2>
                <p className="text-xs text-[#4E5B54] mt-1">
                  Select one or more subjects for {studentName}.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SUBJECTS.map(subj => {
                  const isChecked = selectedSubjects.includes(subj.name);
                  return (
                    <button
                      key={subj.id}
                      type="button"
                      onClick={() => toggleSubject(subj.name)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'border-[#173F32] bg-[#173F32] text-white shadow-xs'
                          : 'border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] hover:bg-[#D7E6D3]'
                      }`}
                    >
                      <span className="font-bold text-xs">{subj.name}</span>
                      {isChecked && <Check className="w-4 h-4 text-[#D99B58]" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue to Location</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Neighborhood & Schedule */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D99B58]">
                  Step 3 of 4
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#102C24] mt-1">
                  Where and when should sessions happen?
                </h2>
                <p className="text-xs text-[#4E5B54] mt-1">
                  We will prioritize verified tutors residing within convenient commute of your home.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173F32] mb-1.5">
                  Your Mumbai Neighborhood
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

              <div>
                <label className="block text-xs font-bold text-[#173F32] mb-1.5">
                  Preferred Time Slot
                </label>
                <div className="space-y-2">
                  {[
                    'Morning (8 AM - 12 PM)',
                    'Afternoon (12 PM - 4 PM)',
                    'Evening (4 PM - 8 PM)',
                    'Weekends Only'
                  ].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTiming(t)}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        timing === t
                          ? 'border-[#173F32] bg-[#173F32] text-white shadow-xs'
                          : 'border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] hover:bg-[#D7E6D3]'
                      }`}
                    >
                      <span className="font-semibold text-xs">{t}</span>
                      {timing === t && <Check className="w-4 h-4 text-[#D99B58]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue to Budget</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Budget Range */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D99B58]">
                  Step 4 of 4
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#102C24] mt-1">
                  Define your tuition budget
                </h2>
                <p className="text-xs text-[#4E5B54] mt-1">
                  Transparent hourly rates. Zero agency commissions.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#173F32]">
                    Maximum Hourly Rate
                  </label>
                  <span className="text-base font-extrabold text-[#173F32]">
                    ₹{hourlyBudget}/hr
                  </span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="2000"
                  step="50"
                  value={hourlyBudget}
                  onChange={e => setHourlyBudget(Number(e.target.value))}
                  className="w-full accent-[#173F32]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>₹400/hr</span>
                  <span>₹1,000/hr (Popular)</span>
                  <span>₹2,000/hr</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F3E9] border border-[#D7E6D3] text-xs space-y-1.5">
                <div className="font-bold text-[#173F32] mb-1">Requirement Summary:</div>
                <div className="flex justify-between text-gray-600">
                  <span>Student & Board:</span>
                  <span className="font-semibold text-black">{studentName} • {selectedBoard} {selectedGrade}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Target Subjects:</span>
                  <span className="font-semibold text-black">{selectedSubjects.join(', ')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Neighborhood:</span>
                  <span className="font-semibold text-black">{locality}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinishWizard}
                  className="px-6 py-2.5 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D99B58]" />
                  <span>Calculate Smart Matches</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* RESULTS SCREEN (STEP 5) */}
      {step === 5 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D7E6D3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D99B58]">
                Match Calculation Complete
              </span>
              <h2 className="font-editorial text-2xl font-bold text-[#102C24] mt-0.5">
                Top Tutors for {studentName} ({selectedBoard} {selectedGrade})
              </h2>
              <p className="text-xs text-[#4E5B54] mt-1">
                Showing educators in <strong className="text-[#173F32]">{locality}</strong> ranked by subject and curriculum alignment.
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded-xl border border-[#173F32] text-[#173F32] text-xs font-bold hover:bg-[#173F32] hover:text-white transition-colors shrink-0"
            >
              Modify Requirements
            </button>
          </div>

          {/* Matching Tutors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scoredTutors.map(({ tutor, match }) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                onSelectEnquiry={t => setSelectedForEnquiry(t)}
                showMatchScore={true}
              />
            ))}
          </div>

          <div className="text-center pt-6">
            <Link
              to="/tutors"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#173F32] hover:text-[#D99B58] transition-colors"
            >
              <span>Explore all verified tutors with custom manual filters</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
      {selectedForEnquiry && (
        <EnquiryModal
          tutor={selectedForEnquiry}
          isOpen={true}
          onClose={() => setSelectedForEnquiry(null)}
        />
      )}
    </div>
  );
};
