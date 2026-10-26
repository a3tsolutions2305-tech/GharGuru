import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  Scale,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { SearchFilterState, TutorProfile } from '../types';
import { api } from '../services/api';
import { storage } from '../services/storage';
import { FilterSidebar } from '../components/search/FilterSidebar';
import { TutorCard } from '../components/tutor/TutorCard';
import { EnquiryModal } from '../components/tutor/EnquiryModal';

const INITIAL_FILTERS: SearchFilterState = {
  searchQuery: '',
  locality: 'all',
  board: 'all',
  grade: 'all',
  subject: 'all',
  minFee: 300,
  maxFee: 2500,
  minExperience: 0,
  gender: 'all',
  availabilitySlot: 'all',
  sortBy: 'relevance'
};

export const FindTutors: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<SearchFilterState>(() => {
    return {
      searchQuery: searchParams.get('q') || '',
      locality: searchParams.get('locality') || 'all',
      board: searchParams.get('board') || 'all',
      grade: searchParams.get('grade') || 'all',
      subject: searchParams.get('subject') || 'all',
      minFee: 300,
      maxFee: Number(searchParams.get('max_fee')) || 2500,
      minExperience: 0,
      gender: 'all',
      availabilitySlot: 'all',
      sortBy: 'relevance'
    };
  });

  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedForEnquiry, setSelectedForEnquiry] = useState<TutorProfile | null>(null);
  const [compareCount, setCompareCount] = useState(() => storage.getCompareList().length);

  // Sync state with filters
  useEffect(() => {
    setLoading(true);
    api.searchTutors(filters).then(res => {
      setTutors(res);
      setLoading(false);
    });
  }, [filters]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchParams(new URLSearchParams());
  };

  const removeFilter = (key: keyof SearchFilterState, defaultVal: any) => {
    setFilters(prev => ({ ...prev, [key]: defaultVal }));
  };

  // Determine active filter chips
  const activeChips: { label: string; onRemove: () => void }[] = [];
  if (filters.searchQuery) {
    activeChips.push({
      label: `"${filters.searchQuery}"`,
      onRemove: () => removeFilter('searchQuery', '')
    });
  }
  if (filters.locality !== 'all') {
    activeChips.push({
      label: `Locality: ${filters.locality}`,
      onRemove: () => removeFilter('locality', 'all')
    });
  }
  if (filters.board !== 'all') {
    activeChips.push({
      label: `Board: ${filters.board}`,
      onRemove: () => removeFilter('board', 'all')
    });
  }
  if (filters.grade !== 'all') {
    activeChips.push({
      label: `Grade: ${filters.grade}`,
      onRemove: () => removeFilter('grade', 'all')
    });
  }
  if (filters.subject !== 'all') {
    activeChips.push({
      label: `Subject: ${filters.subject}`,
      onRemove: () => removeFilter('subject', 'all')
    });
  }
  if (filters.maxFee < 2500) {
    activeChips.push({
      label: `Max ₹${filters.maxFee}/hr`,
      onRemove: () => removeFilter('maxFee', 2500)
    });
  }
  if (filters.minExperience > 0) {
    activeChips.push({
      label: `${filters.minExperience}+ yrs exp`,
      onRemove: () => removeFilter('minExperience', 0)
    });
  }
  if (filters.gender !== 'all') {
    activeChips.push({
      label: `Gender: ${filters.gender}`,
      onRemove: () => removeFilter('gender', 'all')
    });
  }
  if (filters.availabilitySlot !== 'all') {
    activeChips.push({
      label: `Time: ${filters.availabilitySlot}`,
      onRemove: () => removeFilter('availabilitySlot', 'all')
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Search Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-[#D7E6D3] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#102C24]">
              Find Verified Home Tutors in Mumbai
            </h1>
            <p className="text-xs text-[#4E5B54] mt-1">
              Filter by curriculum board, neighborhood travel radius, subject specialization, and hourly rates.
            </p>
          </div>

          {/* Quick Requirement Builder CTA */}
          <Link
            to="/requirement-builder"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F5F3E9] text-[#173F32] hover:bg-[#D7E6D3] text-xs font-bold border border-[#D7E6D3] transition-colors self-start shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D99B58]" />
            Launch 4-Step Requirement Wizard
          </Link>
        </div>

        {/* Search Input & Sort Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={e => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="Search by tutor name, subject (e.g. Physics, ICSE Maths), or qualification..."
              className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-[#D7E6D3] bg-[#F5F3E9]/40 focus:ring-2 focus:ring-[#173F32] focus:outline-none"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden w-full sm:w-auto px-4 py-3 rounded-xl bg-[#173F32] text-white font-bold text-xs flex items-center justify-center gap-2 shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters {activeChips.length > 0 && `(${activeChips.length})`}
          </button>

          {/* Sort Dropdown */}
          <div className="w-full sm:w-auto shrink-0 flex items-center gap-2">
            <span className="text-xs font-semibold text-[#4E5B54] whitespace-nowrap">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={e => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="text-xs px-3 py-2.5 rounded-xl border border-[#D7E6D3] bg-white text-[#102C24] font-medium focus:outline-none w-full sm:w-auto"
            >
              <option value="relevance">Best Match & Relevance</option>
              <option value="rating_desc">Highest Parent Rating</option>
              <option value="experience_desc">Teaching Experience (High to Low)</option>
              <option value="fee_asc">Tuition Fee (Low to High)</option>
              <option value="fee_desc">Tuition Fee (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
            <span className="text-xs font-semibold text-[#4E5B54]">Applied Filters:</span>
            {activeChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D7E6D3] text-[#173F32] text-xs font-medium"
              >
                {chip.label}
                <button
                  onClick={chip.onRemove}
                  className="hover:text-black transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#D99B58] font-bold hover:underline ml-1 cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-4 sticky top-28">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            resultsCount={tutors.length}
          />
        </div>

        {/* Tutor Cards Results */}
        <div className="lg:col-span-8 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="bg-white rounded-2xl p-6 border border-[#D7E6D3] animate-pulse space-y-4">
                  <div className="flex gap-4">
                    <div className="w-18 h-18 rounded-2xl bg-gray-200 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : tutors.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#D7E6D3] space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F3E9] text-[#173F32] flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-[#D99B58]" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#102C24]">
                No tutors found matching your specific filters
              </h3>
              <p className="text-xs text-[#4E5B54] max-w-md mx-auto leading-relaxed">
                Try widening your neighborhood travel radius, relaxing the maximum hourly fee, or selecting &ldquo;All Boards&rdquo;.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#173F32] text-white font-bold text-xs hover:bg-[#102C24] transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset All Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tutors.map(tutor => (
                <TutorCard
                  key={tutor.id}
                  tutor={tutor}
                  onSelectEnquiry={t => setSelectedForEnquiry(t)}
                  onCompareChange={() => setCompareCount(storage.getCompareList().length)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Compare Notification Bar (when tutors are selected) */}
      {compareCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#102C24] text-white px-6 py-3.5 rounded-full shadow-2xl border border-[#D99B58] flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 text-xs">
            <Scale className="w-4 h-4 text-[#D99B58]" />
            <span>
              <strong className="text-[#D99B58]">{compareCount}</strong> tutor{compareCount > 1 ? 's' : ''} in comparison tray
            </span>
          </div>

          <Link
            to="/compare"
            className="text-xs font-bold px-4 py-1.5 rounded-full bg-[#D99B58] text-[#102C24] hover:bg-white transition-colors flex items-center gap-1"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              resultsCount={tutors.length}
            />

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-[#173F32] text-white font-bold text-xs"
              >
                Apply Filters ({tutors.length} Tutors)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Enquiry Modal */}
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
