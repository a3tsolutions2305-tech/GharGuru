import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  MessageSquare,
  Search,
  Filter,
  Check,
  Ban,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';
import { storage } from '../services/storage';
import { TutorProfile, Enquiry, Complaint, ListingStatus, VerificationStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const [tutors, setTutors] = useState<TutorProfile[]>(() => storage.getTutors());
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => storage.getEnquiries());
  const [complaints, setComplaints] = useState<Complaint[]>(() => storage.getComplaints());

  const [tutorStatusFilter, setTutorStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'listings' | 'enquiries' | 'complaints'>('listings');

  // Metrics
  const totalTutors = tutors.length;
  const verifiedTutors = tutors.filter(t => t.verificationStatus === 'verified').length;
  const pendingReviews = tutors.filter(t => t.listingStatus === 'pending_review').length;
  const totalEnquiriesCount = enquiries.length;
  const openComplaintsCount = complaints.filter(c => c.status !== 'resolved' && c.status !== 'dismissed').length;

  const handleUpdateListingStatus = (tutorId: string, status: ListingStatus, verifStatus?: VerificationStatus) => {
    const tutor = storage.getTutorById(tutorId);
    if (!tutor) return;

    const updated: TutorProfile = {
      ...tutor,
      listingStatus: status,
      ...(verifStatus ? { verificationStatus: verifStatus } : {})
    };
    storage.updateTutor(updated);
    setTutors(storage.getTutors());
  };

  const handleUpdateComplaint = (complaintId: string, status: Complaint['status']) => {
    const notes = prompt('Enter resolution or investigation note:', 'Reviewed and resolved by platform admin.');
    if (notes !== null) {
      storage.updateComplaintStatus(complaintId, status, notes);
      setComplaints(storage.getComplaints());
    }
  };

  const filteredTutors = tutors.filter(t => {
    if (tutorStatusFilter !== 'all' && t.listingStatus !== tutorStatusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        t.fullName.toLowerCase().includes(q) ||
        t.headline.toLowerCase().includes(q) ||
        t.primaryLocality.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7E6D3] text-[#173F32] font-semibold text-xs border border-[#173F32]/10 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D99B58]" />
            <span>Platform Administration & Compliance Desk</span>
          </div>
          <h1 className="font-editorial text-3xl font-bold text-[#102C24]">
            GharGuru Administrative Review Desk
          </h1>
          <p className="text-xs text-[#4E5B54] mt-0.5">
            Audit teacher documentary submissions, manage listing permissions, monitor parent enquiries, and handle dispute resolutions.
          </p>
        </div>

        <div className="text-xs text-[#173F32] bg-[#F5F3E9] px-3.5 py-2 rounded-xl border border-[#D7E6D3]">
          Role: <strong>Platform Administrator</strong>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#D7E6D3] shadow-xs">
          <div className="text-[11px] font-semibold text-gray-500">Total Tutors</div>
          <div className="text-2xl font-extrabold text-[#173F32] mt-1">{totalTutors}</div>
          <div className="text-[10px] text-gray-400 mt-1">Mumbai Pilot Base</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#D7E6D3] shadow-xs">
          <div className="text-[11px] font-semibold text-gray-500">Verified Profiles</div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">{verifiedTutors}</div>
          <div className="text-[10px] text-emerald-800 mt-1">100% ID Audited</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#D7E6D3] shadow-xs">
          <div className="text-[11px] font-semibold text-gray-500">Pending Review</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{pendingReviews}</div>
          <div className="text-[10px] text-amber-700 mt-1">Requires Approval</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#D7E6D3] shadow-xs">
          <div className="text-[11px] font-semibold text-gray-500">Total Enquiries</div>
          <div className="text-2xl font-extrabold text-blue-700 mt-1">{totalEnquiriesCount}</div>
          <div className="text-[10px] text-blue-800 mt-1">Active Parent Requests</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#D7E6D3] shadow-xs">
          <div className="text-[11px] font-semibold text-gray-500">Active Complaints</div>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">{openComplaintsCount}</div>
          <div className="text-[10px] text-rose-700 mt-1">Dispute Management</div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-[#D7E6D3] gap-6 text-sm font-bold text-[#4E5B54]">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'listings'
              ? 'border-[#173F32] text-[#173F32]'
              : 'border-transparent hover:text-black'
          }`}
        >
          Tutor Listings & Verification ({tutors.length})
        </button>
        <button
          onClick={() => setActiveTab('enquiries')}
          className={`pb-3 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'enquiries'
              ? 'border-[#173F32] text-[#173F32]'
              : 'border-transparent hover:text-black'
          }`}
        >
          Platform Enquiries ({enquiries.length})
        </button>
        <button
          onClick={() => setActiveTab('complaints')}
          className={`pb-3 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'complaints'
              ? 'border-[#173F32] text-[#173F32]'
              : 'border-transparent hover:text-black'
          }`}
        >
          Complaints & Moderation ({complaints.length})
        </button>
      </div>

      {/* TAB 1: TUTOR LISTINGS QUEUE */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tutor name or locality..."
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#D7E6D3] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-gray-500">Status:</span>
              <select
                value={tutorStatusFilter}
                onChange={e => setTutorStatusFilter(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl border border-[#D7E6D3] bg-[#F5F3E9] font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="pending_review">Pending Review</option>
                <option value="suspended">Suspended</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#D7E6D3] bg-[#F5F3E9]/80 text-[#173F32]">
                  <th className="p-3.5 font-bold">Tutor</th>
                  <th className="p-3.5 font-bold">Locality</th>
                  <th className="p-3.5 font-bold">Boards & Subjects</th>
                  <th className="p-3.5 font-bold">Fee</th>
                  <th className="p-3.5 font-bold">Listing Status</th>
                  <th className="p-3.5 font-bold">Verification</th>
                  <th className="p-3.5 font-bold text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTutors.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={t.profilePhoto}
                          alt={t.fullName}
                          className="w-9 h-9 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <Link to={`/tutor/${t.id}`} className="font-bold text-[#102C24] hover:underline">
                            {t.fullName}
                          </Link>
                          <div className="text-[10px] text-gray-400">{t.yearsOfExperience} yrs exp</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 text-gray-600">
                      {t.primaryLocality.split('(')[0].trim()}
                    </td>

                    <td className="p-3.5">
                      <div className="text-[#173F32] font-semibold">{t.boards.join(', ')}</div>
                      <div className="text-[10px] text-gray-500">{t.subjects.slice(0, 2).join(', ')}</div>
                    </td>

                    <td className="p-3.5 font-bold text-[#173F32]">
                      ₹{t.fee.amountInr}/hr
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          t.listingStatus === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : t.listingStatus === 'pending_review'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {t.listingStatus.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          t.verificationStatus === 'verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {t.verificationStatus}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {t.listingStatus !== 'approved' && (
                          <button
                            onClick={() => handleUpdateListingStatus(t.id, 'approved', 'verified')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-bold text-[11px] hover:bg-emerald-800 transition-colors"
                            title="Approve & Verify"
                          >
                            Approve
                          </button>
                        )}
                        {t.listingStatus === 'approved' && (
                          <button
                            onClick={() => handleUpdateListingStatus(t.id, 'suspended')}
                            className="px-2 py-1 rounded-lg border border-amber-300 text-amber-800 font-semibold text-[11px] hover:bg-amber-50"
                            title="Suspend listing"
                          >
                            Suspend
                          </button>
                        )}
                        <button
                          onClick={() => handleUpdateListingStatus(t.id, 'rejected')}
                          className="px-2 py-1 rounded-lg border border-rose-300 text-rose-700 font-semibold text-[11px] hover:bg-rose-50"
                          title="Reject"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PLATFORM ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 shadow-xs space-y-4">
          <h2 className="font-editorial text-xl font-bold text-[#102C24]">
            All Platform Enquiries ({enquiries.length})
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#D7E6D3] bg-[#F5F3E9]/80 text-[#173F32]">
                  <th className="p-3.5 font-bold">ID</th>
                  <th className="p-3.5 font-bold">Parent</th>
                  <th className="p-3.5 font-bold">Tutor</th>
                  <th className="p-3.5 font-bold">Curriculum</th>
                  <th className="p-3.5 font-bold">Status</th>
                  <th className="p-3.5 font-bold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.map(enq => (
                  <tr key={enq.id} className="hover:bg-gray-50">
                    <td className="p-3.5 font-mono text-gray-500">{enq.id}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-[#102C24]">{enq.parentName}</div>
                      <div className="text-[10px] text-gray-500">{enq.parentPhone}</div>
                    </td>
                    <td className="p-3.5 font-semibold text-[#173F32]">{enq.tutorName}</td>
                    <td className="p-3.5">
                      {enq.subject} ({enq.board} {enq.grade})
                    </td>
                    <td className="p-3.5">
                      <span className="capitalize font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                        {enq.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 text-gray-400">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: COMPLAINTS & RESOLUTION */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-3xl border border-[#D7E6D3] p-6 shadow-xs space-y-4">
          <h2 className="font-editorial text-xl font-bold text-[#102C24]">
            Complaints & Grievance Desk ({complaints.length})
          </h2>

          <div className="space-y-4">
            {complaints.map(cmp => (
              <div key={cmp.id} className="p-5 rounded-2xl bg-[#F5F3E9]/60 border border-[#D7E6D3] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-gray-500 font-mono">#{cmp.id}</span>
                    <h3 className="font-bold text-base text-rose-800">
                      {cmp.category} Concern
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                    {cmp.status}
                  </span>
                </div>

                <p className="text-xs text-[#4E5B54] bg-white p-3 rounded-xl border border-gray-100">
                  {cmp.description}
                </p>

                {cmp.resolutionNotes && (
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs">
                    <strong className="block text-[10px] text-emerald-950 uppercase tracking-wider">
                      Resolution Notes:
                    </strong>
                    {cmp.resolutionNotes}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="text-[11px] text-gray-500">
                    Reported by: <strong>{cmp.submittedByName}</strong> against tutor <strong>{cmp.tutorName}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateComplaint(cmp.id, 'investigating')}
                      className="px-3 py-1 rounded-lg border border-gray-300 text-xs font-semibold hover:bg-gray-50"
                    >
                      Investigate
                    </button>
                    <button
                      onClick={() => handleUpdateComplaint(cmp.id, 'resolved')}
                      className="px-3 py-1 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800"
                    >
                      Mark Resolved
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
