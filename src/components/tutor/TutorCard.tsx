import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Heart,
  Scale,
  Sparkles,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { TutorProfile } from '../../types';
import { storage } from '../../services/storage';
import { SmartMatchBadge } from './SmartMatchBadge';

interface TutorCardProps {
  tutor: TutorProfile;
  onSelectEnquiry?: (tutor: TutorProfile) => void;
  onCompareChange?: () => void;
  showMatchScore?: boolean;
}

export const TutorCard: React.FC<TutorCardProps> = ({
  tutor,
  onSelectEnquiry,
  onCompareChange,
  showMatchScore = true
}) => {
  const [isSaved, setIsSaved] = useState(() => storage.isTutorSaved(tutor.id));
  const [imageError, setImageError] = useState(false);

  const compareList = storage.getCompareList();
  const isCompared = compareList.includes(tutor.id);

  const childReq = storage.getChildRequirement();
  const matchResult = storage.calculateSmartMatch(tutor, childReq);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = storage.toggleSavedTutor(tutor.id);
    setIsSaved(saved);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    storage.toggleCompare(tutor.id);
    if (onCompareChange) onCompareChange();
  };

  // Get first letters for avatar fallback
  const initials = tutor.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2);

  return (
    <div className="group bg-white rounded-2xl border border-[#D7E6D3] hover:border-[#173F32]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      {/* Top Banner & Status */}
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Smart Match Pill */}
          {showMatchScore ? (
            <SmartMatchBadge matchResult={matchResult} />
          ) : (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F5F3E9] text-[#173F32] border border-[#D7E6D3]">
              {tutor.yearsOfExperience}+ Years Experience
            </span>
          )}

          <div className="flex items-center gap-1.5">
            {/* Compare Checkbox Button */}
            <button
              onClick={handleCompare}
              title={isCompared ? 'Remove from comparison' : 'Add to compare'}
              className={`p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                isCompared
                  ? 'bg-[#173F32] text-white border-[#173F32]'
                  : 'bg-[#F5F3E9] text-[#4E5B54] border-[#D7E6D3] hover:bg-[#D7E6D3]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">{isCompared ? 'Comparing' : 'Compare'}</span>
            </button>

            {/* Favorite Button */}
            <button
              onClick={handleFavorite}
              title={isSaved ? 'Remove from saved tutors' : 'Save tutor'}
              className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                isSaved
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-white text-gray-400 border-gray-200 hover:text-rose-500 hover:bg-rose-50'
              }`}
              aria-label="Save tutor"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Profile Info Header */}
        <div className="flex gap-4 items-start">
          {/* Tutor Photo */}
          <Link to={`/tutor/${tutor.id}`} className="shrink-0 relative">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#F5F3E9] border-2 border-[#D7E6D3] shadow-xs">
              {!imageError && tutor.profilePhoto ? (
                <img
                  src={tutor.profilePhoto}
                  alt={tutor.fullName}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-xl text-[#173F32]">
                  {initials}
                </div>
              )}
            </div>
            {tutor.verificationStatus === 'verified' && (
              <span
                className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs"
                title="100% In-Person & Credential Verified"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-700 fill-emerald-100" />
              </span>
            )}
          </Link>

          {/* Name & Headline */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Link
                to={`/tutor/${tutor.id}`}
                className="font-editorial text-lg sm:text-xl font-bold text-[#102C24] hover:text-[#173F32] transition-colors truncate"
              >
                {tutor.fullName}
              </Link>
              {tutor.featured && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D99B58]/20 text-[#D99B58] border border-[#D99B58]/40">
                  Featured
                </span>
              )}
            </div>

            <p className="text-xs text-[#4E5B54] line-clamp-2 leading-relaxed mb-1.5">
              {tutor.headline}
            </p>

            <div className="flex items-center gap-3 text-xs text-[#4E5B54]">
              {/* Rating */}
              <div className="flex items-center gap-1 font-bold text-[#173F32]">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{tutor.rating.toFixed(1)}</span>
                <span className="text-gray-400 font-normal">({tutor.totalReviews})</span>
              </div>

              <span>•</span>

              {/* Experience */}
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#173F32]" />
                {tutor.yearsOfExperience} yrs exp
              </span>
            </div>
          </div>
        </div>

        {/* Locality & Qualification */}
        <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-xs text-[#4E5B54]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#D99B58] shrink-0" />
            <span className="truncate font-medium text-[#102C24]">{tutor.primaryLocality}</span>
          </div>
          <div className="truncate text-gray-500 pl-5">
            {tutor.qualificationSummary}
          </div>
        </div>

        {/* Subjects & Board Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tutor.boards.map(b => (
            <span
              key={b}
              className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#173F32]/10 text-[#173F32]"
            >
              {b}
            </span>
          ))}
          {tutor.subjects.slice(0, 3).map(s => (
            <span
              key={s}
              className="text-[11px] px-2 py-0.5 rounded-md bg-[#F5F3E9] text-[#102C24] border border-[#D7E6D3]"
            >
              {s}
            </span>
          ))}
          {tutor.subjects.length > 3 && (
            <span className="text-[11px] px-1.5 py-0.5 text-[#4E5B54] font-medium">
              +{tutor.subjects.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Fees & Actions */}
      <div className="p-5 pt-4 mt-4 bg-[#F5F3E9]/50 border-t border-[#D7E6D3]/60 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-[#4E5B54]">Tuition Fee</div>
          <div className="text-lg font-extrabold text-[#173F32] flex items-baseline gap-1">
            ₹{tutor.fee.amountInr.toLocaleString('en-IN')}
            <span className="text-xs font-normal text-gray-500">
              /{tutor.fee.pricingType === 'hourly' ? 'hr' : 'session'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onSelectEnquiry && (
            <button
              onClick={() => onSelectEnquiry(tutor)}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-[#D99B58] text-[#102C24] hover:bg-[#D99B58]/90 transition-colors shadow-xs cursor-pointer"
            >
              Enquire
            </button>
          )}

          <Link
            to={`/tutor/${tutor.id}`}
            className="text-xs font-bold px-3 py-2 rounded-xl bg-[#173F32] text-white hover:bg-[#102C24] transition-colors flex items-center gap-1 shadow-xs"
          >
            Profile
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
