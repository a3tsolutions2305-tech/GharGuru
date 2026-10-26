import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Send,
  CheckCircle2,
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  MapPin,
  Sparkles
} from 'lucide-react';
import { TutorProfile } from '../../types';
import { storage } from '../../services/storage';
import { BOARDS, GRADES } from '../../data/mockTutors';

interface EnquiryModalProps {
  tutor: TutorProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ tutor, isOpen, onClose }) => {
  const currentUser = storage.getCurrentUser();
  const childReq = storage.getChildRequirement();

  const [parentName, setParentName] = useState(currentUser?.full_name || 'Sunita Mehra');
  const [parentPhone, setParentPhone] = useState(currentUser?.phone || '+91 98201 54321');
  const [parentEmail, setParentEmail] = useState(currentUser?.email || 'sunita.mehra@gmail.com');
  const [board, setBoard] = useState(childReq.board || tutor.boards[0] || 'CBSE');
  const [grade, setGrade] = useState(childReq.grade || tutor.grades[0] || 'Class 10 (Board Exam)');
  const [subject, setSubject] = useState(childReq.subjects[0] || tutor.subjects[0] || 'Mathematics');
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('Evening (5:00 PM - 7:00 PM)');
  const [locality, setLocality] = useState(tutor.primaryLocality.split('(')[0].trim());
  const [message, setMessage] = useState(
    `Hello ${tutor.fullName}, we would like to schedule an introductory 1-on-1 home diagnostic session for our child in ${subject}. Please let us know your availability.`
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!parentName.trim()) errs.parentName = 'Parent name is required';
    if (!parentPhone.trim() || parentPhone.length < 8) errs.parentPhone = 'Valid 10-digit phone number is required';
    if (!message.trim() || message.length < 15) errs.message = 'Please provide at least 15 characters describing your requirements';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const scheduleSummary = `${preferredDate} • ${timeSlot}`;

    const newEnq = storage.createEnquiry({
      parentId: currentUser?.id || 'usr_parent_01',
      parentName,
      parentEmail,
      parentPhone,
      tutorId: tutor.id,
      tutorName: tutor.fullName,
      board,
      grade,
      subject,
      preferredSchedule: scheduleSummary,
      locality,
      message
    });

    setIsSubmitting(false);
    setSubmittedEnquiryId(newEnq.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-[#D7E6D3] max-w-xl w-full p-6 sm:p-8 my-8 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedEnquiryId ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#102C24]">
              Consultation Request Sent!
            </h3>
            <p className="text-xs sm:text-sm text-[#4E5B54] max-w-md mx-auto leading-relaxed">
              Your home tuition consultation request has been delivered to <strong className="text-[#173F32]">{tutor.fullName}</strong>.
              The educator typically responds within 2 to 4 hours.
            </p>

            <div className="p-4 bg-[#F5F3E9] rounded-2xl text-xs text-left max-w-md mx-auto space-y-2 border border-[#D7E6D3]">
              <div className="flex justify-between">
                <span className="text-gray-500">Booking Reference:</span>
                <span className="font-mono font-bold text-[#173F32]">#{submittedEnquiryId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Educator:</span>
                <span className="font-semibold text-[#102C24]">{tutor.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Curriculum & Subject:</span>
                <span className="font-semibold">{subject} ({board} {grade})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Proposed Slot:</span>
                <span className="font-semibold">{preferredDate} • {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">In-Home Rate:</span>
                <span className="font-bold text-emerald-800">₹{tutor.fee.amountInr}/hr</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/parent/dashboard"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-colors"
              >
                View in Parent Dashboard
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D99B58] mb-1">
                <CalendarIcon className="w-3.5 h-3.5" />
                Book 1-on-1 In-Home Consultation
              </div>
              <h2 className="font-editorial text-2xl font-bold text-[#102C24]">
                Schedule with {tutor.fullName}
              </h2>
              <div className="flex items-center gap-3 text-xs text-[#4E5B54] mt-1">
                <span className="font-bold text-[#173F32]">₹{tutor.fee.amountInr}/hr</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  ID & Degree Verified
                </span>
                <span>•</span>
                <span>{tutor.primaryLocality.split('(')[0].trim()}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#173F32] mb-1">
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
                  <label className="block text-xs font-semibold text-[#173F32] mb-1">
                    Contact Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={parentPhone}
                    onChange={e => setParentPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                    placeholder="+91 98201 54321"
                  />
                  {errors.parentPhone && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.parentPhone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-[#173F32] mb-1">
                    Curriculum Board
                  </label>
                  <select
                    value={board}
                    onChange={e => setBoard(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-white focus:outline-none"
                  >
                    {tutor.boards.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#173F32] mb-1">
                    Class / Standard
                  </label>
                  <select
                    value={grade}
                    onChange={e => setGrade(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-white focus:outline-none"
                  >
                    {tutor.grades.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#173F32] mb-1">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-white focus:outline-none"
                  >
                    {tutor.subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#173F32] mb-1">
                    Preferred Trial Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={e => setPreferredDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#173F32] mb-1">
                    Preferred Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={e => setTimeSlot(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-white focus:outline-none"
                  >
                    <option value="Morning (9:00 AM - 11:00 AM)">Morning (9:00 AM - 11:00 AM)</option>
                    <option value="Afternoon (2:00 PM - 4:00 PM)">Afternoon (2:00 PM - 4:00 PM)</option>
                    <option value="Evening (5:00 PM - 7:00 PM)">Evening (5:00 PM - 7:00 PM)</option>
                    <option value="Weekend Special (10:00 AM - 12:00 PM)">Weekend Special (10:00 AM - 12:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#173F32] mb-1">
                  Child&apos;s Specific Needs & Message *
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D7E6D3] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
                  placeholder="Mention topics needing improvement, exam deadlines, or learning temperament..."
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#D99B58]" />
                  {isSubmitting ? 'Dispatching Request...' : `Confirm & Request Session with ${tutor.fullName}`}
                </button>
                <p className="text-[11px] text-[#4E5B54] text-center mt-2">
                  No advance payment. You meet the tutor right at home and pay directly after confirming mutual rapport.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
