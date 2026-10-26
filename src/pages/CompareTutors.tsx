import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  X,
  Star,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Plus
} from 'lucide-react';
import { storage } from '../services/storage';
import { TutorProfile } from '../types';
import { EnquiryModal } from '../components/tutor/EnquiryModal';

export const CompareTutors: React.FC = () => {
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    const list = storage.getCompareList();
    // If empty on first visit, pre-seed with 2 featured tutors for immediate demo satisfaction!
    if (list.length === 0) {
      return ['tut-1', 'tut-2'];
    }
    return list;
  });

  const [selectedForEnquiry, setSelectedForEnquiry] = useState<TutorProfile | null>(null);

  const tutors: TutorProfile[] = compareIds
    .map(id => storage.getTutorById(id))
    .filter((t): t is TutorProfile => Boolean(t));

  const childReq = storage.getChildRequirement();

  const handleRemove = (tutorId: string) => {
    storage.toggleCompare(tutorId);
    setCompareIds(storage.getCompareList());
  };

  const handleClearAll = () => {
    storage.clearCompare();
    setCompareIds([]);
  };

  const handleAddSample = (tutorId: string) => {
    storage.toggleCompare(tutorId);
    setCompareIds(storage.getCompareList());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7E6D3] text-[#173F32] font-semibold text-xs border border-[#173F32]/10 mb-2">
            <Scale className="w-3.5 h-3.5 text-[#D99B58]" />
            <span>Tutor Comparison Matrix</span>
          </div>
          <h1 className="font-editorial text-3xl font-bold text-[#102C24]">
            Compare Home Tutors Side-by-Side
          </h1>
          <p className="text-xs text-[#4E5B54] mt-1">
            Evaluate qualifications, boards, experience, neighborhood commute, and rates for up to 3 mentors.
          </p>
        </div>

        {tutors.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors"
            >
              Clear Comparison Tray
            </button>
            <Link
              to="/tutors"
              className="px-4 py-2 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-colors"
            >
              Add More Tutors
            </Link>
          </div>
        )}
      </div>

      {tutors.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#D7E6D3] space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F5F3E9] text-[#173F32] flex items-center justify-center mx-auto">
            <Scale className="w-8 h-8 text-[#D99B58]" />
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#102C24]">
            Your comparison tray is empty
          </h3>
          <p className="text-xs text-[#4E5B54] leading-relaxed">
            Select the &ldquo;Compare&rdquo; checkbox on any tutor card in the directory to inspect their credentials side-by-side.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleAddSample('tut-1')}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-[#F5F3E9] border border-[#D7E6D3] text-[#173F32] hover:bg-[#D7E6D3]"
            >
              + Add Ananya Sharma (Maths)
            </button>
            <button
              onClick={() => handleAddSample('tut-2')}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-[#F5F3E9] border border-[#D7E6D3] text-[#173F32] hover:bg-[#D7E6D3]"
            >
              + Add Dr. Vikramaditya (Physics)
            </button>
          </div>
          <div className="pt-4">
            <Link
              to="/tutors"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#173F32] text-white font-bold text-xs"
            >
              <span>Explore All Tutors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#D7E6D3] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#D7E6D3] bg-[#F5F3E9]/80">
                  <th className="p-5 font-bold text-[#173F32] w-48 text-sm">Comparison Feature</th>
                  {tutors.map(tutor => (
                    <th key={tutor.id} className="p-5 min-w-[260px] align-top">
                      <div className="relative">
                        <button
                          onClick={() => handleRemove(tutor.id)}
                          className="absolute -top-1 -right-1 p-1 rounded-full bg-white text-gray-400 hover:text-rose-600 shadow-xs"
                          title="Remove tutor from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={tutor.profilePhoto}
                            alt={tutor.fullName}
                            className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D7E6D3]"
                          />
                          <div>
                            <Link
                              to={`/tutor/${tutor.id}`}
                              className="font-editorial text-base font-bold text-[#102C24] hover:text-[#173F32] line-clamp-1"
                            >
                              {tutor.fullName}
                            </Link>
                            <div className="text-[11px] text-[#4E5B54] line-clamp-1">{tutor.headline}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedForEnquiry(tutor)}
                          className="w-full py-2 rounded-xl bg-[#D99B58] text-[#102C24] font-bold text-xs hover:bg-[#D99B58]/90 transition-colors shadow-xs"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </th>
                  ))}
                  {tutors.length < 3 && (
                    <th className="p-5 min-w-[200px] align-middle text-center bg-gray-50/50">
                      <Link
                        to="/tutors"
                        className="inline-flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#D7E6D3] rounded-2xl text-gray-400 hover:border-[#173F32] hover:text-[#173F32] transition-colors"
                      >
                        <Plus className="w-6 h-6 mb-1 text-[#D99B58]" />
                        <span className="font-bold text-xs">Add 3rd Tutor</span>
                      </Link>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {/* Hourly Fee */}
                <tr>
                  <td className="p-4 font-bold text-[#173F32] bg-[#F5F3E9]/30">Hourly Rate</td>
                  {tutors.map(tutor => (
                    <td key={tutor.id} className="p-4">
                      <span className="text-base font-extrabold text-[#173F32]">
                        ₹{tutor.fee.amountInr}/hr
                      </span>
                      <div className="text-[10px] text-gray-500">{tutor.fee.notes || 'Includes mock tests'}</div>
                    </td>
                  ))}
                </tr>

                {/* Compatibility Score */}
                <tr>
                  <td className="p-4 font-bold text-[#173F32] bg-[#F5F3E9]/30">Compatibility Score</td>
                  {tutors.map(tutor => {
                    const match = storage.calculateSmartMatch(tutor, childReq);
                    return (
                      <td key={tutor.id} className="p-4">
                        <span className="inline-flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-full bg-[#173F32] text-white">
                          <Sparkles className="w-3 h-3 text-[#D99B58]" />
                          {match.scorePercentage}% Match
                        </span>
                        <div className="text-[10px] text-gray-500 mt-1">{match.summary}</div>
                      </td>
                    );
                  })}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="p-4 font-bold text-[#173F32] bg-[#F5F3E9]/30">Parent Rating</td>
                  {tutors.map(tutor => (
                    <td key={tutor.id} className="p-4">
                      <div className="flex items-center gap-1 font-bold text-[#173F32]">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{tutor.rating.toFixed(2)}</span>
                        <span className="text-gray-400 font-normal">({tutor.totalReviews} reviews)</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Experience */}
                <tr>
                  <td className="p-4 font-bold text-[#173F32] bg-[#F5F3E9]/30">Experience</td>
                  {tutors.map(tutor => (
                    <td key={tutor.id} className="p-4 font-semibold text-[#102C24]">
                      {tutor.yearsOfExperience} Years
                    </td>
                  ))}
                </tr>

                {/* Primary Locality */}
                <tr>
                  <td className="p-4 font-bold text-[#173F32] bg-[#F5F3E9]/30">Neighborhood Base</td>
                  {tutors.map(tutor => (
                    <td key={tutor.id} className="p-4">
                      <div className="flex items-start gap-1 text-[#102C24] font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#D99B58] shrink-0 mt-0.5" />
                        <span>{tutor.primaryLocality}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Education Boards */}
                <tr>
                  <td className="p-4 font-bold text-[#173F32] bg-[#F5F3E9]/30">Curriculum Boards</td>
                  {tutors.map(tutor => (
                    <td key={tutor.id} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {tutor.boards.map(b => (
                          <span key={b} className="px-2 py-0.5 rounded bg-[#173F32]/10 text-[#173F32] font-semibold text-[11px]">
                            {b}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Subjects */}
                <tr>
                  <td className="p-4 font-bold text-[#173F32] bg-[#F5F3E9]/30">Subjects Taught</td>
                  {tutors.map(tutor => (
                    <td key={tutor.id} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {tutor.subjects.map(s => (
                          <span key={s} className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Qualifications */}
                <tr>
                  <td className="p-4 font-bold text-[#173F32] bg-[#F5F3E9]/30">Degree & Pedagogy</td>
                  {tutors.map(tutor => (
                    <td key={tutor.id} className="p-4 text-gray-700 leading-relaxed">
                      {tutor.qualificationSummary}
                    </td>
                  ))}
                </tr>

                {/* Verification */}
                <tr>
                  <td className="p-4 font-bold text-[#173F32] bg-[#F5F3E9]/30">Safety Audit</td>
                  {tutors.map(tutor => (
                    <td key={tutor.id} className="p-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        ID, Degree & Address Audited
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
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
