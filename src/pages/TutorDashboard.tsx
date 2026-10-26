import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  Eye,
  Sliders,
  Sparkles,
  Send,
  Phone,
  Mail,
  MapPin,
  Check
} from 'lucide-react';
import { storage } from '../services/storage';
import { Enquiry, TutorProfile, AvailabilitySlot } from '../types';

export const TutorDashboard: React.FC = () => {
  const currentUser = storage.getCurrentUser();

  // Find tutor profile corresponding to logged in user or default to tut-1 (Ananya)
  const [tutor, setTutor] = useState<TutorProfile>(() => {
    const list = storage.getTutors();
    return list.find(t => (currentUser && t.userId === currentUser.id) || t.id === 'tut-1') || list[0];
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    return storage.getEnquiries().filter(e => e.tutorId === tutor.id || tutor.id === 'tut-1');
  });

  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [responseStatus, setResponseStatus] = useState<Enquiry['status']>('responded');

  // Availability schedule editor state
  const [schedule, setSchedule] = useState<AvailabilitySlot[]>(tutor.availability);
  const [scheduleSaved, setScheduleSaved] = useState(false);

  const handleToggleSlot = (day: AvailabilitySlot['day'], timeSlot: AvailabilitySlot['timeSlot']) => {
    const existing = schedule.find(s => s.day === day && s.timeSlot === timeSlot);
    let updated: AvailabilitySlot[];
    if (existing) {
      updated = schedule.map(s => (s.day === day && s.timeSlot === timeSlot ? { ...s, isAvailable: !s.isAvailable } : s));
    } else {
      updated = [...schedule, { day, timeSlot, isAvailable: true }];
    }
    setSchedule(updated);
    setScheduleSaved(false);
  };

  const handleSaveSchedule = () => {
    const updatedTutor = { ...tutor, availability: schedule };
    storage.updateTutor(updatedTutor);
    setTutor(updatedTutor);
    setScheduleSaved(true);
    setTimeout(() => setScheduleSaved(false), 3000);
  };

  const handleOpenResponse = (enq: Enquiry, status: Enquiry['status']) => {
    setSelectedEnquiry(enq);
    setResponseStatus(status);
    setResponseText(
      status === 'accepted'
        ? 'Thank you! I am delighted to confirm our 30-minute introductory diagnostic session at your home on Saturday at 5 PM.'
        : 'Hello! I have reviewed your child’s syllabus needs. I am available for in-home sessions on Monday and Wednesday evenings.'
    );
    setResponseModalOpen(true);
  };

  const handleSubmitResponse = () => {
    if (!selectedEnquiry) return;
    storage.updateEnquiryStatus(selectedEnquiry.id, responseStatus, responseText);
    setEnquiries(storage.getEnquiries().filter(e => e.tutorId === tutor.id || tutor.id === 'tut-1'));
    setResponseModalOpen(false);
  };

  const days: AvailabilitySlot['day'][] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  const timeSlots: AvailabilitySlot['timeSlot'][] = [
    'Morning (8 AM - 12 PM)',
    'Afternoon (12 PM - 4 PM)',
    'Evening (4 PM - 8 PM)'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={tutor.profilePhoto}
            alt={tutor.fullName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D7E6D3]"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D99B58]">
                Tutor Dashboard
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  tutor.listingStatus === 'approved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {tutor.listingStatus.replace('_', ' ')}
              </span>
            </div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#102C24]">
              Namaste, {tutor.fullName}
            </h1>
            <p className="text-xs text-[#4E5B54] mt-0.5">
              {tutor.headline} • <strong className="text-[#173F32]">₹{tutor.fee.amountInr}/hr</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/tutor/${tutor.id}`}
            className="px-4 py-2.5 rounded-xl bg-[#F5F3E9] text-[#173F32] hover:bg-[#D7E6D3] font-bold text-xs border border-[#D7E6D3] transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#D99B58]" />
            Preview Public Listing
          </Link>
          <Link
            to="/become-a-tutor"
            className="px-4 py-2.5 rounded-xl bg-[#173F32] text-white hover:bg-[#102C24] font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Sliders className="w-3.5 h-3.5" />
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Received Enquiries */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h2 className="font-editorial text-xl font-bold text-[#102C24] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#D99B58]" />
                  Received Student Enquiries ({enquiries.length})
                </h2>
                <p className="text-xs text-[#4E5B54] mt-0.5">
                  Direct requests from parents in your neighborhood for home tuition.
                </p>
              </div>
            </div>

            {enquiries.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-8 text-center">
                No new enquiries received yet. Tutors with open weekend slots receive 3x more bookings!
              </p>
            ) : (
              <div className="space-y-4">
                {enquiries.map(enq => (
                  <div
                    key={enq.id}
                    className="p-5 rounded-2xl bg-[#F5F3E9]/50 border border-[#D7E6D3] space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-gray-500 font-mono">#{enq.id}</span>
                        <h4 className="font-bold text-base text-[#173F32]">
                          Enquiry from {enq.parentName}
                        </h4>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 capitalize">
                        {enq.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#4E5B54] bg-white p-3 rounded-xl border border-gray-100">
                      <div>
                        <span className="text-gray-400 block text-[10px]">Subject & Class:</span>
                        <strong className="text-[#102C24]">{enq.subject}</strong> ({enq.board} {enq.grade})
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Locality:</span>
                        <span className="font-medium text-[#102C24]">{enq.locality}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Timing:</span>
                        <span className="font-medium text-[#102C24]">{enq.preferredSchedule}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-700 bg-white/70 p-3 rounded-xl border border-gray-100">
                      <span className="font-semibold text-[#173F32] block mb-1">Parent Message:</span>
                      &ldquo;{enq.message}&rdquo;
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#4E5B54]">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-emerald-700" />
                        {enq.parentPhone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-blue-700" />
                        {enq.parentEmail}
                      </span>
                    </div>

                    {enq.tutorResponseNote && (
                      <div className="p-3 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 text-xs">
                        <strong className="block text-[11px] text-purple-950">Your Response Note:</strong>
                        {enq.tutorResponseNote}
                      </div>
                    )}

                    <div className="pt-2 border-t border-gray-200 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleOpenResponse(enq, 'accepted')}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors cursor-pointer"
                      >
                        Accept & Propose Trial
                      </button>
                      <button
                        onClick={() => handleOpenResponse(enq, 'responded')}
                        className="px-3.5 py-1.5 rounded-lg bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-colors cursor-pointer"
                      >
                        Send Message Note
                      </button>
                      <button
                        onClick={() => handleOpenResponse(enq, 'declined')}
                        className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-100 cursor-pointer"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weekly In-Home Availability Manager */}
          <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <h2 className="font-editorial text-xl font-bold text-[#102C24] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#173F32]" />
                  Manage Weekly In-Home Availability
                </h2>
                <p className="text-xs text-[#4E5B54]">
                  Click to toggle which slots are open for home visits.
                </p>
              </div>

              <button
                onClick={handleSaveSchedule}
                className="px-4 py-2 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Check className="w-4 h-4 text-[#D99B58]" />
                {scheduleSaved ? 'Schedule Saved!' : 'Save Availability'}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="border-b border-[#D7E6D3] bg-[#F5F3E9]">
                    <th className="p-3 text-left font-bold text-[#173F32]">Day</th>
                    {timeSlots.map(ts => (
                      <th key={ts} className="p-3 font-bold text-[#173F32] text-xs">
                        {ts.split('(')[0].trim()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {days.map(day => (
                    <tr key={day} className="hover:bg-gray-50/50">
                      <td className="p-3 text-left font-semibold text-[#102C24]">{day}</td>
                      {timeSlots.map(slot => {
                        const isAvailable = schedule.some(s => s.day === day && s.timeSlot === slot && s.isAvailable);
                        return (
                          <td key={slot} className="p-2">
                            <button
                              type="button"
                              onClick={() => handleToggleSlot(day, slot)}
                              className={`w-full py-2 px-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                                isAvailable
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs'
                                  : 'bg-gray-100 text-gray-400 border border-transparent hover:bg-gray-200'
                              }`}
                            >
                              {isAvailable ? 'Available' : 'Unavailable'}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Completeness & Review Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Completeness Ring */}
          <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-sm text-[#173F32]">Profile Completeness</h3>
              <span className="text-base font-extrabold text-[#173F32]">
                {tutor.profileCompleteness}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-[#F5F3E9] rounded-full overflow-hidden border border-[#D7E6D3]">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all"
                style={{ width: `${tutor.profileCompleteness}%` }}
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Government ID Submitted</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Degree Certificate Uploaded</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Primary Locality & Commute Defined</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Hourly Fee & Subjects Configured</span>
              </div>
            </div>
          </div>

          {/* Verification Status Card */}
          <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-[#173F32] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D99B58]" />
              Verification Documents
            </h3>
            <div className="space-y-2">
              {tutor.verificationRecords.map(rec => (
                <div key={rec.id} className="p-3 rounded-xl bg-[#F5F3E9] border border-[#D7E6D3]/60 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#102C24]">{rec.type}</span>
                  <span className="capitalize font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                    {rec.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Response Note Modal */}
      {responseModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="font-editorial text-xl font-bold text-[#102C24]">
              Respond to {selectedEnquiry.parentName}
            </h3>
            <p className="text-xs text-[#4E5B54]">
              Update the enquiry status to <strong className="capitalize text-[#173F32]">{responseStatus}</strong> and send an explanatory note.
            </p>

            <textarea
              rows={4}
              value={responseText}
              onChange={e => setResponseText(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-[#D7E6D3] focus:outline-none"
              placeholder="Write your note to the parent..."
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setResponseModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitResponse}
                className="px-5 py-2 rounded-xl bg-[#173F32] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-[#D99B58]" />
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
