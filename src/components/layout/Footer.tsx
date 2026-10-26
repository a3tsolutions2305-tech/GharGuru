import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  BookOpen,
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Logo } from '../branding/Logo';
import { storage } from '../../services/storage';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      storage.notify('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    storage.notify('Subscribed to GharGuru Digest', 'You will receive monthly board exam tips and tutor spotlights.', 'success');
  };

  return (
    <footer className="bg-[#102C24] text-[#F5F3E9] border-t-4 border-[#D99B58] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="white" size="lg" />
            <p className="text-sm text-[#F5F3E9]/80 leading-relaxed max-w-sm mt-3">
              GharGuru connects discerning parents with verified, high-calibre home educators in their neighborhood. Focused on conceptual foundation, board exam excellence, and individual attention right at home.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173F32] text-[#D7E6D3] border border-[#D7E6D3]/20">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D99B58]" />
                100% In-Person Verified Tutors
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173F32] text-[#D7E6D3] border border-[#D7E6D3]/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D99B58]" />
                1-on-1 Trial At Home
              </span>
            </div>

            {/* Newsletter */}
            <div className="pt-3 max-w-sm">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#D99B58] mb-1.5">
                Join Mumbai Parent Learning Circle
              </span>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-[#173F32] p-2.5 rounded-xl border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4 text-[#D99B58]" />
                  <span>Subscribed! Check your inbox for study planners.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter parent email..."
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:border-[#D99B58]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#D99B58] text-[#102C24] font-bold text-xs hover:bg-[#D99B58]/90 transition-all shrink-0 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Localities in Mumbai */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D99B58] mb-4 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Mumbai Suburbs
            </h3>
            <ul className="space-y-2.5 text-xs text-[#F5F3E9]/80">
              <li>
                <Link to="/tutors?locality=Bandra+West" className="hover:text-white transition-colors">
                  Bandra West (Pali Hill)
                </Link>
              </li>
              <li>
                <Link to="/tutors?locality=Andheri+West" className="hover:text-white transition-colors">
                  Andheri West (Lokhandwala)
                </Link>
              </li>
              <li>
                <Link to="/tutors?locality=Powai" className="hover:text-white transition-colors">
                  Powai (Hiranandani)
                </Link>
              </li>
              <li>
                <Link to="/tutors?locality=Juhu" className="hover:text-white transition-colors">
                  Juhu & Vile Parle
                </Link>
              </li>
              <li>
                <Link to="/tutors?locality=Dadar" className="hover:text-white transition-colors">
                  Dadar & Matunga
                </Link>
              </li>
              <li>
                <Link to="/tutors?locality=Borivali+West" className="hover:text-white transition-colors">
                  Borivali & Kandivali
                </Link>
              </li>
              <li>
                <Link to="/tutors?locality=Chembur" className="hover:text-white transition-colors">
                  Chembur & Ghatkopar
                </Link>
              </li>
            </ul>
          </div>

          {/* Education Boards */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D99B58] mb-4 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Education Boards
            </h3>
            <ul className="space-y-2.5 text-xs text-[#F5F3E9]/80">
              <li>
                <Link to="/tutors?board=CBSE" className="hover:text-white transition-colors">
                  CBSE (Class 1-12)
                </Link>
              </li>
              <li>
                <Link to="/tutors?board=Maharashtra+SSC" className="hover:text-white transition-colors">
                  Maharashtra SSC (Balbharati)
                </Link>
              </li>
              <li>
                <Link to="/tutors?board=ICSE" className="hover:text-white transition-colors">
                  ICSE / ISC Curriculum
                </Link>
              </li>
              <li>
                <Link to="/tutors?board=NIOS" className="hover:text-white transition-colors">
                  NIOS Open Schooling
                </Link>
              </li>
              <li>
                <Link to="/tutors?subject=Mathematics" className="hover:text-white transition-colors">
                  Mathematics Specialists
                </Link>
              </li>
              <li>
                <Link to="/tutors?subject=Physics" className="hover:text-white transition-colors">
                  Physics & Chemistry Mentors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D99B58] mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Help & Support
            </h3>
            <ul className="space-y-2.5 text-xs text-[#F5F3E9]/80">
              <li>
                <Link to="/requirement-builder" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D99B58]" />
                  Match Wizard
                </Link>
              </li>
              <li>
                <Link to="/become-a-tutor" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#D99B58]" />
                  Teach with GharGuru
                </Link>
              </li>
              <li className="pt-2 text-xs text-[#F5F3E9]/70 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D99B58]" />
                  namaste@gharguru.in
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D99B58]" />
                  +91 (022) 2650-GURU
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D99B58]" />
                  Bandra Kurla Complex, Mumbai
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#173F32] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5F3E9]/60 gap-4">
          <p>© 2026 GharGuru Technologies Private Limited. All rights reserved. Mumbai, India.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#D99B58]">Quality Home Tutoring</span>
            <span>•</span>
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
