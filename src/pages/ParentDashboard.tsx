import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Heart,
  MessageSquare,
  Clock,
  Sparkles,
  Search,
  BookOpen,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Trash2
} from 'lucide-react';
import { storage } from '../services/storage';
import { Enquiry, TutorProfile, ChildRequirement } from '../types';
import { EnquiryModal } from '../components/tutor/EnquiryModal';

export const ParentDashboard: React.FC = () => {
  const currentUser = storage.getCurrentUser();
  const [childReq, setChildReq] = useState<ChildRequirement>(() => storage.getChildRequirement());
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    return storage.getEnquiries().filter(e => !currentUser || e.parentId === currentUser.id || e.parentEmail === currentUser.email);
  });
  const [savedIds, setSavedIds] = useState<string[]>(() => storage.getSavedTutorIds());
  const [activeTab, setActiveTab] = useState<'all' | 'submitted' | 'under_review' | 'responded' | 'accepted'>('all');
  const [selectedForEnquiry, setSelectedForEnquiry] = useState<TutorProfile | null>(null);

  // Saved tutors list
  const savedTutors = savedIds
    .map(id => storage.getTutorById(id))
    .filter((t): t is TutorProfile => Boolean(t));

  // Recommended tutors
  const recommendedTutors = storage
    .getTutors()
    .filter(t => t.listingStatus === 'approved' && !savedIds.includes(t.id))
    .slice(0, 2);

  const handleRemoveFavorite = (tutorId: string) => {
    storage.toggleSavedTutor(tutorId);
    setSavedIds(storage.getSavedTutorIds());
  };

  const filteredEnquiries = enquiries.filter(e => {
    if (activeTab === 'all') return true;
    return e.status === activeTab;
  });

  const getStatusBadge = (status: Enquiry['status']) => {
    switch (status) {
      case 'submitted':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Submitted</span>;
      case 'under_review':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">Under Review</span>;
      case 'responded':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">Tutor Responded</span>;
      case 'accepted':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Trial Confirmed</span>;
      case 'declined':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700">Declined</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#173F32] text-white flex items-center justify-center font-bold text-xl">
            {currentUser?.full_name ? currentUser.full_name.charAt(0) : 'S'}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#D99B58]">
              Parent Dashboard
            </div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#102C24]">
              Namaste, {currentUser?.full_name || 'Sunita Mehra'}
            </h1>
            <p className="text-xs text-[#4E5B54] mt-0.5">
              Managing home tuition for <strong className="text-[#173F32]">{childReq.studentName}</strong> • {childReq.board} {childReq.grade}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/requirement-builder"
            className="px-4 py-2.5 rounded-xl bg-[#F5F3E9] text-[#173F32] hover:bg-[#D7E6D3] font-bold text-xs border border-[#D7E6D3] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D99B58]" />
            Edit Requirements
          </Link>
          <Link
            to="/tutors"
            className="px-4 py-2.5 rounded-xl bg-[#173F32] text-white hover:bg-[#102C24] font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Search className="w-3.5 h-3.5" />
            Find Tutors
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Enquiries Tracker */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <h2 className="font-editorial text-xl font-bold text-[#102C24] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#D99B58]" />
                  Your Tuition Enquiries ({enquiries.length})
                </h2>
                <p className="text-xs text-[#4E5B54] mt-0.5">
                  Track communication, trial confirmations, and schedule requests.
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap gap-1 bg-[#F5F3E9] p-1 rounded-xl border border-[#D7E6D3]/60">
                {(['all', 'submitted', 'responded', 'accepted'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                      activeTab === tab
                        ? 'bg-[#173F32] text-white shadow-xs'
                        : 'text-[#173F32] hover:bg-[#D7E6D3]'
                    }`}
                  >
                    {tab === 'all' ? 'All' : tab.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {filteredEnquiries.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#F5F3E9] text-[#173F32] flex items-center justify-center mx-auto">
                  <MessageSquare className="w-6 h-6 text-[#D99B58]" />
                </div>
                <h3 className="font-bold text-sm text-[#102C24]">No enquiries in this status</h3>
                <p className="text-xs text-[#4E5B54]">
                  Browse the tutor directory and request a home diagnostic trial.
                </p>
                <div className="pt-2">
                  <Link
                    to="/tutors"
                    className="inline-block px-4 py-2 rounded-xl bg-[#173F32] text-white font-bold text-xs"
                  >
                    Browse Tutors
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEnquiries.map(enq => (
                  <div
                    key={enq.id}
                    className="p-5 rounded-2xl bg-[#F5F3E9]/60 border border-[#D7E6D3] space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-gray-500 font-mono">#{enq.id}</span>
                        <h4 className="font-bold text-base text-[#173F32]">
                          Enquiry to {enq.tutorName}
                        </h4>
                      </div>
                      <div>{getStatusBadge(enq.status)}</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#4E5B54] bg-white p-3 rounded-xl border border-gray-100">
                      <div>
                        <span className="text-gray-400 block text-[10px]">Subject & Board:</span>
                        <strong className="text-[#102C24]">{enq.subject}</strong> ({enq.board} {enq.grade})
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Preferred Timing:</span>
                        <span className="font-medium text-[#102C24]">{enq.preferredSchedule}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Locality:</span>
                        <span className="font-medium text-[#102C24]">{enq.locality}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-700 italic bg-white/60 p-3 rounded-xl border border-gray-100">
                      &ldquo;{enq.message}&rdquo;
                    </p>

                    {enq.tutorResponseNote && (
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                        <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          Message from {enq.tutorName}:
                        </div>
                        <p className="text-emerald-800 leading-relaxed">
                          {enq.tutorResponseNote}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 text-[11px] text-gray-400">
                      <span>Submitted: {new Date(enq.createdAt).toLocaleDateString()}</span>
                      <Link
                        to={`/tutor/${enq.tutorId}`}
                        className="font-bold text-[#173F32] hover:underline"
                      >
                        View {enq.tutorName}&apos;s Profile →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Tutors Section */}
          <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="font-editorial text-xl font-bold text-[#102C24] flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />
              Saved Tutors ({savedTutors.length})
            </h2>

            {savedTutors.length === 0 ? (
              <p className="text-xs text-gray-400 italic">
                No tutors saved yet. Click the heart icon on any profile to save for later review.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedTutors.map(tutor => (
                  <div
                    key={tutor.id}
                    className="p-4 rounded-2xl bg-[#F5F3E9]/50 border border-[#D7E6D3] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={tutor.profilePhoto}
                            alt={tutor.fullName}
                            className="w-12 h-12 rounded-xl object-cover border border-[#D7E6D3]"
                          />
                          <div>
                            <Link
                              to={`/tutor/${tutor.id}`}
                              className="font-bold text-xs text-[#173F32] hover:underline truncate block"
                            >
                              {tutor.fullName}
                            </Link>
                            <span className="text-[10px] text-gray-500 truncate block">
                              {tutor.primaryLocality.split('(')[0].trim()}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveFavorite(tutor.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs font-extrabold text-[#173F32] mb-3">
                        ₹{tutor.fee.amountInr}/hr
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                      <button
                        onClick={() => setSelectedForEnquiry(tutor)}
                        className="flex-1 py-1.5 rounded-lg bg-[#D99B58] text-[#102C24] font-bold text-[11px] text-center"
                      >
                        Enquire
                      </button>
                      <Link
                        to={`/tutor/${tutor.id}`}
                        className="flex-1 py-1.5 rounded-lg bg-[#173F32] text-white font-bold text-[11px] text-center"
                      >
                        Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Child Profile & Recommendations */}
        <div className="lg:col-span-4 space-y-6">
          {/* Child Requirement Card */}
          <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-sm text-[#173F32] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#D99B58]" />
                Student Learning Profile
              </h3>
              <Link
                to="/requirement-builder"
                className="text-[11px] font-bold text-[#D99B58] hover:underline"
              >
                Edit
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Student:</span>
                <span className="font-semibold text-[#102C24]">{childReq.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Curriculum Board:</span>
                <span className="font-bold text-[#173F32]">{childReq.board}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Current Standard:</span>
                <span className="font-semibold text-[#102C24]">{childReq.grade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Neighborhood:</span>
                <span className="font-semibold text-[#102C24]">{childReq.locality.split('(')[0].trim()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Max Budget:</span>
                <span className="font-extrabold text-[#173F32]">₹{childReq.hourlyBudgetInr}/hr</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-bold">
                Target Subjects
              </div>
              <div className="flex flex-wrap gap-1">
                {childReq.subjects.map(s => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-[#F5F3E9] text-[#173F32] border border-[#D7E6D3] text-[11px] font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Tutors based on Child Profile */}
          <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-[#173F32] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D99B58]" />
              Recommended for {childReq.studentName}
            </h3>

            <div className="space-y-3">
              {recommendedTutors.map(rec => (
                <div key={rec.id} className="p-3.5 rounded-2xl bg-[#F5F3E9] border border-[#D7E6D3]/60 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rec.profilePhoto}
                      alt={rec.fullName}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/tutor/${rec.id}`}
                        className="font-bold text-xs text-[#102C24] hover:text-[#173F32] truncate block"
                      >
                        {rec.fullName}
                      </Link>
                      <span className="text-[10px] text-gray-500 truncate block">
                        {rec.subjects.slice(0, 2).join(', ')} • ₹{rec.fee.amountInr}/hr
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/tutor/${rec.id}`}
                    className="w-full py-1.5 text-center text-[11px] font-bold block rounded-lg bg-[#173F32] text-white hover:bg-[#102C24]"
                  >
                    View Compatibility
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
