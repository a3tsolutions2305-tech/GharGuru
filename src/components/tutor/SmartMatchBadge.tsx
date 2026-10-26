import React, { useState } from 'react';
import { Sparkles, Check, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { SmartMatchResult } from '../../types';

interface SmartMatchBadgeProps {
  matchResult: SmartMatchResult;
  compact?: boolean;
}

export const SmartMatchBadge: React.FC<SmartMatchBadgeProps> = ({ matchResult, compact = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { scorePercentage, matchedCriteria, unmatchedCriteria, summary } = matchResult;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-[#173F32] text-white border-[#173F32]';
    if (score >= 60) return 'bg-[#D99B58] text-white border-[#D99B58]';
    return 'bg-amber-700 text-white border-amber-700';
  };

  if (compact) {
    return (
      <span
        title={summary}
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getScoreColor(
          scorePercentage
        )} shadow-xs`}
      >
        <Sparkles className="w-3 h-3 text-[#D99B58]" />
        {scorePercentage}% Match
      </span>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-xs ${getScoreColor(
          scorePercentage
        )}`}
        aria-expanded={isOpen}
      >
        <Sparkles className="w-3.5 h-3.5 text-[#F5F3E9]" />
        <span>{scorePercentage}% Compatibility</span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#D7E6D3] p-4 z-30 text-xs text-[#102C24]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
            <span className="font-bold text-[#173F32] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D99B58]" />
              Smart Match Explanation
            </span>
            <span className="font-extrabold text-sm text-[#173F32]">{scorePercentage}%</span>
          </div>

          <p className="text-[#4E5B54] mb-3 leading-relaxed">{summary}</p>

          {/* Matched Points */}
          {matchedCriteria.length > 0 && (
            <div className="mb-2">
              <p className="font-semibold text-emerald-800 mb-1 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Matching Requirements:
              </p>
              <ul className="space-y-1 pl-4">
                {matchedCriteria.map((c, i) => (
                  <li key={i} className="text-gray-700 list-disc">{c}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Differences */}
          {unmatchedCriteria.length > 0 && (
            <div className="pt-1">
              <p className="font-semibold text-amber-900 mb-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Considerations:
              </p>
              <ul className="space-y-1 pl-4">
                {unmatchedCriteria.map((c, i) => (
                  <li key={i} className="text-gray-600 list-disc">{c}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400">
            Deterministic rule-based score based on your active child requirement preferences.
          </div>
        </div>
      )}
    </div>
  );
};
