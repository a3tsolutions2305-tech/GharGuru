import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/ToastContainer';
import { Home } from './pages/Home';
import { FindTutors } from './pages/FindTutors';
import { TutorProfilePage } from './pages/TutorProfilePage';
import { RequirementBuilder } from './pages/RequirementBuilder';
import { CompareTutors } from './pages/CompareTutors';
import { BecomeTutor } from './pages/BecomeTutor';
import { ParentDashboard } from './pages/ParentDashboard';
import { TutorDashboard } from './pages/TutorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthPage } from './pages/AuthPage';

// Scroll to top on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Real-time Global Feedback Toasts */}
      <ToastContainer />

      <div className="min-h-screen flex flex-col bg-[#F5F3E9] text-[#102C24]">
        {/* Production Brand Header */}
        <Navbar />

        {/* Main Content View */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutors" element={<FindTutors />} />
            <Route path="/tutor/:id" element={<TutorProfilePage />} />
            <Route path="/requirement-builder" element={<RequirementBuilder />} />
            <Route path="/compare" element={<CompareTutors />} />
            <Route path="/become-a-tutor" element={<BecomeTutor />} />
            <Route path="/parent/dashboard" element={<ParentDashboard />} />
            <Route path="/tutor/dashboard" element={<TutorDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Production Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
