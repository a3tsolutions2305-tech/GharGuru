import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Scale,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Calendar,
  Heart,
  SlidersHorizontal
} from 'lucide-react';
import { Logo } from '../branding/Logo';
import { storage } from '../../services/storage';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentUser = storage.getCurrentUser();
  const compareCount = storage.getCompareList().length;

  const handleLogout = () => {
    storage.logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Value Banner */}
      <div className="bg-[#102C24] text-[#F5F3E9] text-xs font-medium py-1.5 px-4 text-center border-b border-[#D7E6D3]/15 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D99B58]/20 text-[#D99B58] font-bold text-[11px]">
          Mumbai
        </span>
        <span className="font-medium">
          Verified Home Tutors in Bandra, Andheri, Powai, Juhu, Dadar & Chembur
        </span>
        <span className="hidden md:inline text-white/40">•</span>
        <span className="hidden md:inline text-[#D99B58] font-semibold">
          1-on-1 In-Person Sessions
        </span>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#F5F3E9]/95 backdrop-blur-md border-b border-[#D7E6D3] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                to="/tutors"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  isActive('/tutors')
                    ? 'bg-[#173F32] text-white shadow-xs'
                    : 'text-[#173F32] hover:bg-[#D7E6D3]/60'
                }`}
              >
                <Search className="w-4 h-4 text-[#D99B58]" />
                Find Tutors
              </Link>

              <Link
                to="/requirement-builder"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  isActive('/requirement-builder')
                    ? 'bg-[#173F32] text-white shadow-xs'
                    : 'text-[#173F32] hover:bg-[#D7E6D3]/60'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#D99B58]" />
                Match Wizard
              </Link>

              <Link
                to="/compare"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 relative ${
                  isActive('/compare')
                    ? 'bg-[#173F32] text-white shadow-xs'
                    : 'text-[#173F32] hover:bg-[#D7E6D3]/60'
                }`}
              >
                <Scale className="w-4 h-4" />
                Compare
                {compareCount > 0 && (
                  <span className="w-5 h-5 bg-[#D99B58] text-[#102C24] text-[11px] font-extrabold rounded-full flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>

              <Link
                to="/become-a-tutor"
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  isActive('/become-a-tutor')
                    ? 'bg-[#173F32] text-white shadow-xs'
                    : 'text-[#173F32] hover:bg-[#D7E6D3]/60'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Become a Tutor
              </Link>
            </nav>
          </div>

          {/* Right Actions: Real User Account or Sign In / Sign Up */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 px-3 py-1.5 rounded-2xl border border-[#D7E6D3] bg-white hover:border-[#173F32]/50 transition-all text-left shadow-xs cursor-pointer"
                  aria-expanded={userDropdownOpen}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#173F32] text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.full_name} className="w-full h-full object-cover" />
                    ) : (
                      currentUser.full_name.charAt(0)
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-xs font-bold text-[#102C24] leading-tight flex items-center gap-1.5">
                      <span className="truncate max-w-[110px]">{currentUser.full_name}</span>
                      <span className="capitalize text-[10px] px-1.5 py-0.2 rounded bg-[#173F32]/10 text-[#173F32] font-semibold">
                        {currentUser.role}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#4E5B54]" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#D7E6D3] py-2 z-50 text-xs">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="font-bold text-[#102C24] text-sm truncate">{currentUser.full_name}</p>
                      <p className="text-[11px] text-[#4E5B54] truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-1">
                      {currentUser.role === 'parent' && (
                        <>
                          <Link
                            to="/parent/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-[#102C24] hover:bg-[#F5F3E9] font-medium"
                          >
                            <Calendar className="w-4 h-4 text-[#173F32]" />
                            My Enquiries & Consultations
                          </Link>
                          <Link
                            to="/parent/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-[#102C24] hover:bg-[#F5F3E9] font-medium"
                          >
                            <Heart className="w-4 h-4 text-rose-500" />
                            Saved Tutors
                          </Link>
                        </>
                      )}

                      {currentUser.role === 'tutor' && (
                        <Link
                          to="/tutor/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-[#102C24] hover:bg-[#F5F3E9] font-medium"
                        >
                          <SlidersHorizontal className="w-4 h-4 text-[#173F32]" />
                          Tutor Portal & Schedule
                        </Link>
                      )}

                      {currentUser.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-[#102C24] hover:bg-[#F5F3E9] font-medium"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#173F32]" />
                          Administrative Review Desk
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-gray-100 pt-1 mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 font-medium text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#173F32] hover:bg-[#D7E6D3]/60 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-[#173F32] text-white hover:bg-[#102C24] font-bold text-xs transition-colors shadow-xs"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#173F32] hover:bg-[#D7E6D3]/50 rounded-xl"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F5F3E9] border-b border-[#D7E6D3] px-5 pt-3 pb-6 space-y-2">
            <Link
              to="/tutors"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-[#173F32] hover:bg-[#D7E6D3]"
            >
              <Search className="w-4 h-4 text-[#D99B58]" />
              Find Home Tutors
            </Link>

            <Link
              to="/requirement-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-[#173F32] hover:bg-[#D7E6D3]"
            >
              <Sparkles className="w-4 h-4 text-[#D99B58]" />
              Match Wizard
            </Link>

            <Link
              to="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-[#173F32] hover:bg-[#D7E6D3]"
            >
              <div className="flex items-center gap-3">
                <Scale className="w-4 h-4 text-[#D99B58]" />
                Compare Tutors
              </div>
              {compareCount > 0 && (
                <span className="w-5 h-5 bg-[#D99B58] text-[#102C24] text-xs font-extrabold rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>

            <Link
              to="/become-a-tutor"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-[#173F32] hover:bg-[#D7E6D3]"
            >
              <BookOpen className="w-4 h-4 text-[#D99B58]" />
              Become a Tutor
            </Link>

            <div className="pt-4 border-t border-[#D7E6D3] flex flex-col gap-2">
              {currentUser ? (
                <Link
                  to={currentUser.role === 'tutor' ? '/tutor/dashboard' : currentUser.role === 'admin' ? '/admin' : '/parent/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 px-4 rounded-xl font-bold bg-[#173F32] text-white shadow-xs text-xs"
                >
                  Go to {currentUser.role === 'tutor' ? 'Tutor Portal' : currentUser.role === 'admin' ? 'Admin Desk' : 'Parent Dashboard'}
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 px-4 rounded-xl font-bold border border-[#173F32] text-[#173F32] bg-white text-xs"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 px-4 rounded-xl font-bold bg-[#173F32] text-white text-xs"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
