import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Heart,
  Scale,
  Award,
  GraduationCap,
  Calendar,
  Send,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { TutorProfile, Enquiry } from '../types';
import { api } from '../services/api';
import { storage } from '../services/storage';
import { SmartMatchBadge } from '../components/tutor/SmartMatchBadge';
import { BOARDS, GRADES } from '../data/mockTutors';

export const TutorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  // Enquiry form state
  const currentUser = storage.getCurrentUser();
  const childReq = storage.getChildRequirement();

  const [parentName, setParentName] = useState(currentUser?.full_name || 'Sunita Mehra');
  const [parentPhone, setParentPhone] = useState(currentUser?.phone || '+91 98201 54321');
  const [parentEmail, setParentEmail] = useState(currentUser?.email || 'sunita.mehra@example.com');
  const [selectedBoard, setSelectedBoard] = useState('CBSE');
  const [selectedGrade, setSelectedGrade] = useState('Class 10 (Board Exam)');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [schedule, setSchedule] = useState('Weekday Evenings (5 PM - 7 PM), 3 days/week');
  const [locality, setLocality] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Review submission state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState(currentUser?.full_name || 'Sunita Mehra');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubject, setReviewSubject] = useState('Mathematics');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      storage.notify('Review Empty', 'Please provide feedback for the tutor.', 'error');
      return;
    }
    if (!tutor) return;

    storage.addReview(tutor.id, {
      parentName: reviewerName,
      rating: newRating,
      comment: reviewComment,
      subject: reviewSubject,
      board: tutor.boards[0] || 'CBSE',
      grade: tutor.grades[0] || 'Class 10'
    });

    const updated = storage.getTutorById(tutor.id);
    if (updated) setTutor(updated);
    setShowReviewForm(false);
    setReviewComment('');
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.getTutor(id).then(res => {
      setTutor(res);
      if (res) {
        setIsSaved(storage.isTutorSaved(res.id));
        setIsCompared(storage.getCompareList().includes(res.id));
        setSelectedBoard(res.boards[0] || 'CBSE');
        setSelectedGrade(res.grades[0] || 'Class 10 (Board Exam)');
        setSelectedSubject(res.subjects[0] || 'Mathematics');
        setLocality(res.primaryLocality.split('(')[0].trim());
        setMessage(
          `Hello ${res.fullName}, we are interested in scheduling an introductory home tuition session in ${res.subjects[0] || 'Mathematics'}.`
        );
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-block w-8 h-8 border-4 border-[#173F32] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-[#4E5B54] mt-3">Loading tutor profile...</p>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-editorial text-2xl font-bold text-[#102C24]">Tutor Profile Not Found</h2>
        <p className="text-xs text-[#4E5B54]">
          The tutor listing you requested may have been relocated or updated.
        </p>
        <Link
          to="/tutors"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#173F32] text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tutor Directory
        </Link>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    const saved = storage.toggleSavedTutor(tutor.id);
    setIsSaved(saved);
  };

  const handleCompareToggle = () => {
    const active = storage.toggleCompare(tutor.id);
    setIsCompared(active);
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!parentName.trim()) errs.parentName = 'Parent name is required';
    if (!parentPhone.trim() || parentPhone.length < 8) errs.parentPhone = 'Valid phone is required';
    if (!message.trim() || message.length < 15) errs.message = 'Please provide at least 15 characters';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    try {
      await api.createEnquiry({
        parentId: currentUser?.id || 'parent_guest',
        parentName,
        parentEmail,
        parentPhone,
        tutorId: tutor.id,
        tutorName: tutor.fullName,
        board: selectedBoard,
        grade: selectedGrade,
        subject: selectedSubject,
        preferredSchedule: schedule,
        locality,
        message
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const matchResult = storage.calculateSmartMatch(tutor, childReq);
  const initials = tutor.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2);

  // Related tutors from same primary locality
  const relatedTutors = storage
    .getTutors()
    .filter(t => t.id !== tutor.id && t.listingStatus === 'approved')
    .slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back link */}
      <div>
        <Link
          to="/tutors"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173F32] hover:text-[#D99B58] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all tutors
        </Link>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-between">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Tutor Photo */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-[#F5F3E9] border-4 border-[#D7E6D3] shadow-md">
                {tutor.profilePhoto ? (
                  <img
                    src={tutor.profilePhoto}
                    alt={tutor.fullName}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-3xl text-[#173F32]">
                    {initials}
                  </div>
                )}
              </div>
              {tutor.verificationStatus === 'verified' && (
                <span
                  className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md"
                  title="GharGuru Verified Home Tutor"
                >
                  <ShieldCheck className="w-7 h-7 text-emerald-700 fill-emerald-100" />
                </span>
              )}
            </div>

            {/* Info */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#102C24]">
                  {tutor.fullName}
                </h1>
                {tutor.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D99B58]/20 text-[#D99B58] border border-[#D99B58]/40">
                    Featured Tutor
                  </span>
                )}
                <SmartMatchBadge matchResult={matchResult} />
              </div>

              <p className="text-sm font-medium text-[#173F32] max-w-xl">
                {tutor.headline}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#4E5B54] pt-1">
                <div className="flex items-center gap-1 font-bold text-[#173F32]">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{tutor.rating.toFixed(2)}</span>
                  <span className="font-normal text-gray-400">({tutor.totalReviews} reviews)</span>
                </div>

                <span>•</span>

                <span className="flex items-center gap-1 font-semibold text-[#102C24]">
                  <GraduationCap className="w-4 h-4 text-[#173F32]" />
                  {tutor.yearsOfExperience} Years Teaching Experience
                </span>

                <span>•</span>

                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#D99B58]" />
                  {tutor.primaryLocality}
                </span>
              </div>

              {/* Quick Tags */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {tutor.boards.map(b => (
                  <span
                    key={b}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#173F32]/10 text-[#173F32]"
                  >
                    {b}
                  </span>
                ))}
                {tutor.subjects.map(s => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#F5F3E9] text-[#102C24] border border-[#D7E6D3]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Action & Pricing Box */}
          <div className="w-full md:w-auto p-5 rounded-2xl bg-[#F5F3E9] border border-[#D7E6D3] flex flex-col justify-between shrink-0 min-w-[240px]">
            <div>
              <div className="text-xs text-[#4E5B54]">In-Home Hourly Fee</div>
              <div className="text-2xl font-extrabold text-[#173F32] flex items-baseline gap-1 my-1">
                ₹{tutor.fee.amountInr.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-gray-500">
                  /{tutor.fee.pricingType === 'hourly' ? 'hour' : 'session'}
                </span>
              </div>
              <p className="text-[11px] text-[#4E5B54] leading-tight mb-3">
                {tutor.fee.notes || 'Includes diagnostic evaluation and revision worksheets.'}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#D7E6D3]/60">
              <button
                onClick={handleFavoriteToggle}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handleCompareToggle}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isCompared
                    ? 'bg-[#173F32] text-white border-[#173F32]'
                    : 'bg-white text-[#173F32] border-[#D7E6D3] hover:bg-[#D7E6D3]'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{isCompared ? 'In Compare' : 'Compare'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 2 Columns (Details on Left, In-Page Enquiry Form on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Bio, Credentials, Areas, Availability */}
        <div className="lg:col-span-7 space-y-6">
          {/* About & Teaching Approach */}
          <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="font-editorial text-xl font-bold text-[#102C24]">
              About {tutor.fullName}
            </h2>
            <p className="text-xs sm:text-sm text-[#4E5B54] leading-relaxed whitespace-pre-line">
              {tutor.bio}
            </p>

            <div className="pt-3 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#173F32] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D99B58]" />
                Teaching Approach & Methodology
              </h3>
              <p className="text-xs sm:text-sm text-[#4E5B54] leading-relaxed bg-[#F5F3E9] p-4 rounded-2xl border border-[#D7E6D3]/60">
                {tutor.teachingApproach}
              </p>
            </div>
          </div>

          {/* Qualifications & Degrees */}
          <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="font-editorial text-xl font-bold text-[#102C24] flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#173F32]" />
              Verified Qualifications & Education
            </h2>
            <div className="space-y-2.5">
              {tutor.educationDegrees.map((deg, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#F5F3E9]/50 border border-[#D7E6D3]/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-[#102C24]">{deg}</span>
                </div>
              ))}
            </div>

            {/* Verification Badges */}
            <div className="pt-3 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#173F32] mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D99B58]" />
                Documentary Verification Checks
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {tutor.verificationRecords.map(rec => (
                  <div key={rec.id} className="p-3 rounded-xl bg-[#EEF5EC] border border-[#D7E6D3] text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                    <div className="text-[11px] font-bold text-[#173F32]">{rec.type}</div>
                    <div className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">
                      {rec.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Areas & Travel Radius */}
          <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="font-editorial text-xl font-bold text-[#102C24] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#D99B58]" />
              In-Home Service Neighborhoods
            </h2>
            <p className="text-xs text-[#4E5B54]">
              {tutor.fullName} provides 1-on-1 tutoring directly at your residence across these Mumbai areas:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tutor.serviceAreas.map((sa, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#F5F3E9] border border-[#D7E6D3]/60">
                  <div className="font-bold text-xs text-[#173F32]">{sa.locality}</div>
                  <div className="text-[11px] text-gray-500">Pincode: {sa.pincode}</div>
                  <div className="text-[10px] text-[#D99B58] font-semibold mt-1">
                    Within {sa.travelRadiusKm} km travel radius
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Schedule */}
          <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="font-editorial text-xl font-bold text-[#102C24] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#173F32]" />
              Weekly In-Home Availability
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-gray-200 text-[#4E5B54]">
                    <th className="py-2.5 font-bold">Day</th>
                    <th className="py-2.5 font-bold">Preferred Time Window</th>
                    <th className="py-2.5 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tutor.availability.map((slot, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-2.5 font-semibold text-[#102C24]">{slot.day}</td>
                      <td className="py-2.5 text-gray-600">{slot.timeSlot}</td>
                      <td className="py-2.5 text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          Open for booking
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Parent Reviews & Real Review Submission */}
          <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <h2 className="font-editorial text-xl font-bold text-[#102C24] flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  Parent Reviews & Feedback ({tutor.reviews.length})
                </h2>
                <p className="text-xs text-[#4E5B54] mt-0.5">
                  Verified testimonials from Mumbai parents whose children took in-home tuition.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-3.5 py-1.5 rounded-xl bg-[#F5F3E9] text-[#173F32] hover:bg-[#D7E6D3] font-bold text-xs border border-[#D7E6D3] transition-colors self-start sm:self-auto cursor-pointer"
              >
                {showReviewForm ? 'Cancel Review' : '+ Write a Review'}
              </button>
            </div>

            {/* Interactive Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-[#F5F3E9] border border-[#D7E6D3] space-y-3">
                <div className="font-bold text-xs text-[#173F32]">Share Your Experience with {tutor.fullName}</div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#4E5B54]">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#173F32] mb-1">Parent Name</label>
                    <input
                      type="text"
                      value={reviewerName}
                      onChange={e => setReviewerName(e.target.value)}
                      placeholder="e.g. Kavita Shah (Bandra)"
                      className="w-full text-xs p-2 rounded-xl border border-[#D7E6D3] bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#173F32] mb-1">Subject</label>
                    <select
                      value={reviewSubject}
                      onChange={e => setReviewSubject(e.target.value)}
                      className="w-full text-xs p-2 rounded-xl border border-[#D7E6D3] bg-white focus:outline-none"
                    >
                      {tutor.subjects.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#173F32] mb-1">Your Review Comment</label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    placeholder="Describe teaching clarity, punctuality, and student improvement..."
                    className="w-full text-xs p-2.5 rounded-xl border border-[#D7E6D3] bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-colors cursor-pointer"
                >
                  Publish Verified Review
                </button>
              </form>
            )}

            <div className="space-y-3">
              {tutor.reviews.length === 0 ? (
                <p className="text-xs text-gray-500 italic">Be the first parent to leave a review for {tutor.fullName}.</p>
              ) : (
                tutor.reviews.map(rev => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-[#F5F3E9]/60 border border-[#D7E6D3]/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs text-[#173F32]">{rev.parentName}</div>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#4E5B54] leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                    <div className="text-[10px] text-gray-400 flex items-center gap-2">
                      <span>{rev.subject} • {rev.board} {rev.grade}</span>
                      <span>•</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: In-Page Enquiry Form */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="bg-white rounded-3xl border-2 border-[#173F32] p-6 sm:p-7 shadow-lg">
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99B58]">
                Direct In-Home Consultation
              </span>
              <h3 className="font-editorial text-xl font-bold text-[#102C24] mt-0.5">
                Enquire with {tutor.fullName}
              </h3>
              <p className="text-xs text-[#4E5B54] mt-1">
                Zero booking fees. Book an introductory 30-minute diagnostic session right in your home.
              </p>
            </div>

            {isSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-base text-[#102C24]">Enquiry Recorded!</h4>
                <p className="text-xs text-[#4E5B54] leading-relaxed">
                  Your enquiry has been saved to your <strong className="text-[#173F32]">Parent Dashboard</strong> and sent to <strong className="text-[#173F32]">{tutor.fullName}</strong>.
                </p>
                <div className="pt-2">
                  <Link
                    to="/parent/dashboard"
                    className="inline-block px-4 py-2 rounded-xl bg-[#173F32] text-white text-xs font-bold"
                  >
                    View Status in Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#173F32] mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={e => setParentName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                    placeholder="e.g. Sunita Mehra"
                  />
                  {errors.parentName && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.parentName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#173F32] mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={parentPhone}
                    onChange={e => setParentPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                    placeholder="e.g. +91 98201 54321"
                  />
                  {errors.parentPhone && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.parentPhone}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#173F32] mb-1">
                      Board
                    </label>
                    <select
                      value={selectedBoard}
                      onChange={e => setSelectedBoard(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-white focus:outline-none"
                    >
                      {tutor.boards.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#173F32] mb-1">
                      Subject
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={e => setSelectedSubject(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-white focus:outline-none"
                    >
                      {tutor.subjects.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#173F32] mb-1">
                    Student Grade / Class
                  </label>
                  <select
                    value={selectedGrade}
                    onChange={e => setSelectedGrade(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-white focus:outline-none"
                  >
                    {tutor.grades.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#173F32] mb-1">
                    Your Neighborhood / Locality
                  </label>
                  <input
                    type="text"
                    value={locality}
                    onChange={e => setLocality(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:outline-none"
                    placeholder="e.g. Bandra West, Pali Hill"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#173F32] mb-1">
                    Message / Current Challenges *
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:outline-none"
                    placeholder="Explain target exams, topics needing improvement..."
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#D99B58]" />
                  {isSubmitting ? 'Sending Enquiry...' : `Send Enquiry to ${tutor.fullName}`}
                </button>
              </form>
            )}
          </div>

          {/* Related Tutors */}
          {relatedTutors.length > 0 && (
            <div className="bg-white rounded-3xl border border-[#D7E6D3] p-5 space-y-3">
              <h4 className="font-bold text-xs text-[#173F32] uppercase tracking-wider">
                Other Tutors in Mumbai
              </h4>
              <div className="space-y-2">
                {relatedTutors.map(rel => (
                  <Link
                    key={rel.id}
                    to={`/tutor/${rel.id}`}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F5F3E9] transition-colors group"
                  >
                    <img
                      src={rel.profilePhoto}
                      alt={rel.fullName}
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1 text-xs">
                      <div className="font-bold text-[#102C24] group-hover:text-[#173F32] truncate">
                        {rel.fullName}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">
                        {rel.subjects.slice(0, 2).join(', ')} • ₹{rel.fee.amountInr}/hr
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
