import React from 'react';
import {
  RotateCcw,
  MapPin,
  BookOpen,
  GraduationCap,
  Sparkles,
  Sliders,
  DollarSign,
  Clock,
  UserCheck
} from 'lucide-react';
import { SearchFilterState } from '../../types';
import { BOARDS, GRADES, SUBJECTS, MUMBAI_LOCALITIES } from '../../data/mockTutors';

interface FilterSidebarProps {
  filters: SearchFilterState;
  onChange: (updated: SearchFilterState) => void;
  onReset: () => void;
  resultsCount: number;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  resultsCount,
  className = ''
}) => {
  const updateField = <K extends keyof SearchFilterState>(key: K, value: SearchFilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className={`bg-white rounded-2xl border border-[#D7E6D3] p-5 shadow-xs space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h2 className="font-editorial text-lg font-bold text-[#102C24] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#D99B58]" />
            Filter Tutors
          </h2>
          <span className="text-xs text-[#4E5B54]">
            Showing <strong className="text-[#173F32]">{resultsCount}</strong> verified tutors
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-[#173F32] hover:text-[#D99B58] flex items-center gap-1 transition-colors cursor-pointer"
          title="Reset all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* 1. Locality Filter */}
      <div>
        <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#D99B58]" />
          Neighborhood / Locality
        </label>
        <select
          value={filters.locality}
          onChange={e => updateField('locality', e.target.value)}
          className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
        >
          <option value="all">All Mumbai Neighborhoods</option>
          {MUMBAI_LOCALITIES.map(loc => (
            <option key={loc} value={loc.split('(')[0].trim()}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Education Board */}
      <div>
        <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-[#D99B58]" />
          Education Board
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => updateField('board', 'all')}
            className={`text-xs py-2 px-2.5 rounded-lg font-semibold text-center transition-colors cursor-pointer ${
              filters.board === 'all'
                ? 'bg-[#173F32] text-white shadow-xs'
                : 'bg-[#F5F3E9] text-[#173F32] hover:bg-[#D7E6D3]'
            }`}
          >
            All Boards
          </button>
          {BOARDS.map(b => (
            <button
              key={b.id}
              type="button"
              onClick={() => updateField('board', b.code)}
              className={`text-xs py-2 px-2 rounded-lg font-semibold text-center truncate transition-colors cursor-pointer ${
                filters.board === b.code
                  ? 'bg-[#173F32] text-white shadow-xs'
                  : 'bg-[#F5F3E9] text-[#173F32] hover:bg-[#D7E6D3]'
              }`}
              title={b.name}
            >
              {b.code}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Class / Grade */}
      <div>
        <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-[#D99B58]" />
          Class / Grade
        </label>
        <select
          value={filters.grade}
          onChange={e => updateField('grade', e.target.value)}
          className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
        >
          <option value="all">All Classes (1 to 12)</option>
          {GRADES.map(g => (
            <option key={g.id} value={g.displayName}>
              {g.displayName} ({g.category})
            </option>
          ))}
        </select>
      </div>

      {/* 4. Subject */}
      <div>
        <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D99B58]" />
          Key Subject
        </label>
        <select
          value={filters.subject}
          onChange={e => updateField('subject', e.target.value)}
          className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] focus:ring-2 focus:ring-[#173F32] focus:outline-none"
        >
          <option value="all">All Subjects</option>
          {SUBJECTS.map(s => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* 5. Hourly Fee Budget Range */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-[#173F32] uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#D99B58]" />
            Budget (Max Hourly Fee)
          </label>
          <span className="text-xs font-extrabold text-[#173F32]">
            ₹{filters.maxFee}/hr
          </span>
        </div>
        <input
          type="range"
          min="400"
          max="2500"
          step="50"
          value={filters.maxFee}
          onChange={e => updateField('maxFee', Number(e.target.value))}
          className="w-full accent-[#173F32] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>₹400/hr</span>
          <span>₹1,500/hr</span>
          <span>₹2,500/hr</span>
        </div>
      </div>

      {/* 6. Experience */}
      <div>
        <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-[#D99B58]" />
          Minimum Experience
        </label>
        <div className="grid grid-cols-4 gap-1">
          {[0, 3, 5, 10].map(exp => (
            <button
              key={exp}
              type="button"
              onClick={() => updateField('minExperience', exp)}
              className={`text-xs py-2 rounded-lg font-semibold text-center transition-colors cursor-pointer ${
                filters.minExperience === exp
                  ? 'bg-[#173F32] text-white shadow-xs'
                  : 'bg-[#F5F3E9] text-[#173F32] hover:bg-[#D7E6D3]'
              }`}
            >
              {exp === 0 ? 'Any' : `${exp}+ yrs`}
            </button>
          ))}
        </div>
      </div>

      {/* 7. Preferred Timing */}
      <div>
        <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#D99B58]" />
          Preferred Time Slot
        </label>
        <select
          value={filters.availabilitySlot}
          onChange={e => updateField('availabilitySlot', e.target.value)}
          className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-[#F5F3E9]/50 text-[#102C24] focus:outline-none"
        >
          <option value="all">Any Timing</option>
          <option value="Morning">Morning (8 AM - 12 PM)</option>
          <option value="Afternoon">Afternoon (12 PM - 4 PM)</option>
          <option value="Evening">Evening (4 PM - 8 PM)</option>
        </select>
      </div>

      {/* 8. Tutor Gender Preference */}
      <div>
        <label className="block text-xs font-bold text-[#173F32] uppercase tracking-wider mb-2">
          Tutor Gender Preference
        </label>
        <div className="grid grid-cols-3 gap-1">
          {['all', 'Female', 'Male'].map(g => (
            <button
              key={g}
              type="button"
              onClick={() => updateField('gender', g)}
              className={`text-xs py-2 rounded-lg font-semibold text-center capitalize transition-colors cursor-pointer ${
                filters.gender === g
                  ? 'bg-[#173F32] text-white shadow-xs'
                  : 'bg-[#F5F3E9] text-[#173F32] hover:bg-[#D7E6D3]'
              }`}
            >
              {g === 'all' ? 'No Pref' : g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
