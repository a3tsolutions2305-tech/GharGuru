import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'horizontal' | 'compact' | 'white' | 'editorial';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  asLink?: boolean;
}

export const BrandMark: React.FC<{ size?: number; className?: string; colorScheme?: 'default' | 'white' | 'forest' }> = ({
  size = 36,
  className = '',
  colorScheme = 'default'
}) => {
  const isWhite = colorScheme === 'white';
  const strokeColor = isWhite ? '#FFFFFF' : '#173F32';
  const accentColor = isWhite ? '#F5F3E9' : '#D99B58';
  const roofFill = isWhite ? 'rgba(255,255,255,0.1)' : '#F5F3E9';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 ${className}`}
      aria-label="GharGuru Logo Symbol"
      role="img"
    >
      <title>GharGuru - Home and Book Logo Symbol</title>
      {/* Chimney */}
      <path
        d="M34 14V7H38.5V18"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* House outline with warm fill */}
      <path
        d="M24 5L7 19.8V39.5C7 41.4 8.6 43 10.5 43H37.5C39.4 43 41 41.4 41 39.5V19.8L24 5Z"
        fill={roofFill}
        stroke={strokeColor}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Open Book Spine */}
      <path
        d="M24 23V36.5"
        stroke={strokeColor}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Left Book Page */}
      <path
        d="M24 24.5C20.5 22.8 16.5 22.8 12.5 24.5V36C16.5 34.2 20.5 34.2 24 36"
        stroke={strokeColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Book Page */}
      <path
        d="M24 24.5C27.5 22.8 31.5 22.8 35.5 24.5V36C31.5 34.2 27.5 34.2 24 36"
        stroke={strokeColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Knowledge Lines in Open Book */}
      <path d="M15 28.5H19" stroke={accentColor} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M15 32H19" stroke={accentColor} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M29 28.5H33" stroke={accentColor} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M29 32H33" stroke={accentColor} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showTagline = true,
  className = '',
  asLink = true
}) => {
  const isDark = variant === 'white';
  const sizeMap = {
    sm: { mark: 28, text: 'text-lg', tagline: 'text-[9px]' },
    md: { mark: 36, text: 'text-2xl', tagline: 'text-[11px]' },
    lg: { mark: 44, text: 'text-3xl', tagline: 'text-xs' },
    xl: { mark: 56, text: 'text-4xl', tagline: 'text-sm' }
  };

  const currentSize = sizeMap[size];

  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <BrandMark
        size={currentSize.mark}
        colorScheme={isDark ? 'white' : 'default'}
      />
      {variant !== 'compact' && (
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-baseline">
            <span
              className={`font-editorial font-bold tracking-tight ${currentSize.text} ${
                isDark ? 'text-white' : 'text-[#173F32]'
              }`}
            >
              Ghar<span className={isDark ? 'text-[#D99B58]' : 'text-[#D99B58]'}>Guru</span>
            </span>
          </div>
          {showTagline && (
            <span
              className={`font-sans font-medium tracking-wide ${currentSize.tagline} ${
                isDark ? 'text-white/80' : 'text-[#4E5B54]'
              }`}
            >
              The right tutor. Right at home.
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" className="inline-block group hover:opacity-95 transition-opacity" aria-label="GharGuru Home">
        {content}
      </Link>
    );
  }

  return content;
};
