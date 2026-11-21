'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  ShieldCheck,
  Search,
  Filter,
  Plus,
  Download,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  Shirt,
  DollarSign,
  LogOut,
  RefreshCw,
  X,
  AlertCircle,
  Eye,
  Check,
  UserCheck,
  Phone,
  Mail,
  Home,
  School
} from 'lucide-react';
import {
  getAuthToken,
  setAuthToken,
  getAdminStats,
  getAdminParticipants,
  createParticipantAdmin,
  updateParticipantAdmin,
  deleteParticipantAdmin,
  toggleCheckInAdmin,
  getExportCSVUrl
} from '../../../lib/api';

const TSHIRT_OPTIONS = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];
const SCHOOL_GROUPS = [
  'Science Group',
  'Business Studies (Commerce)',
  'Humanities (Arts)',
  'General / Junior Section',
  'Faculty & Staff Member',
  'Alumni',
  'Other',
];
const BATCH_OPTIONS = [
  'Class 10 / SSC Batch 2026 (Graduating)',
  'Class 10 / SSC Batch 2025',
  'Class 9 / Junior Organizers',
  'Alumni Batch',
  'Faculty / School Staff',
  'Other',
];

export default function AdminDashboardPage() {
  const router = useRouter();

  // Data states
  const [stats, setStats] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);
  const [viewingParticipant, setViewingParticipant] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Verify auth on mount
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  // Load stats
  const fetchStats = async () => {
    try {
      const res = await getAdminStats();
      setStats(res.stats);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  // Load participants
  const fetchParticipants = useCallback(async () => {
    setTableLoading(true);
    try {
      const res = await getAdminParticipants({
        search,
        batch: batchFilter,
        tshirtSize: sizeFilter,
        paymentStatus: paymentFilter,
        attendanceStatus: attendanceFilter,
        page,
        limit: 50,
      });
      setParticipants(res.participants || []);
      setTotalCount(res.total || 0);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      if (err.status === 401) {
        setAuthToken(null);
        router.push('/admin/login');
      } else {
        showFeedback(err.message || 'Failed to load participants', 'error');
      }
    } finally {
      setTableLoading(false);
      setLoading(false);
    }
  }, [search, batchFilter, sizeFilter, paymentFilter, attendanceFilter, page, router]);

  useEffect(() => {
    fetchStats();
    fetchParticipants();
  }, [fetchParticipants]);

  const showFeedback = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleLogout = () => {
    setAuthToken(null);
    router.push('/admin/login');
  };

  // Toggle Check-in
  const handleToggleCheckIn = async (participant) => {
    try {
      const res = await toggleCheckInAdmin(participant._id);
      showFeedback(res.message);
      fetchParticipants();
      fetchStats();
    } catch (err) {
      showFeedback(err.message || 'Check-in update failed', 'error');
    }
  };

  // Delete participant
  const handleDelete = async (id) => {
    try {
      const res = await deleteParticipantAdmin(id);
      showFeedback(res.message);
      setDeleteConfirm(null);
      fetchParticipants();
      fetchStats();
    } catch (err) {
      showFeedback(err.message || 'Delete failed', 'error');
    }
  };

  // CSV Export
  const handleExportCSV = async () => {
    try {
      const token = getAuthToken();
      const res = await fetch(getExportCSVUrl(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bornomala-farewell-participants-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      showFeedback('CSV report downloaded successfully!');
    } catch (err) {
      showFeedback(err.message || 'CSV Export failed', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#060813] text-slate-100">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-pink-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-black text-white text-sm sm:text-base">Bornomala Multimedia School</span>
              <span className="text-[9px] text-pink-400 block -mt-1 font-bold">FAREWELL CONTROL DESK</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">Festival Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Toast Alert */}
        {feedback && (
          <div
            className={`p-3.5 rounded-2xl flex items-center justify-between text-xs sm:text-sm shadow-xl ${feedback.type === 'error'
              ? 'bg-rose-500/20 border border-rose-500 text-rose-200'
              : 'bg-emerald-500/20 border border-emerald-500 text-emerald-200'
              }`}
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{feedback.msg}</span>
            </div>
            <button onClick={() => setFeedback(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Total BMS Passes
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white">{stats.total}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Registered students & guests</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Checked-In
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">{stats.checkedIn}</div>
              <div className="text-[10px] text-emerald-400/80 mt-0.5">{stats.attendanceRate}% at school venue</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Paid Passes
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {stats.paid} <span className="text-xs text-slate-400 font-normal">/ {stats.total}</span>
              </div>
              <div className="text-[10px] text-yellow-400 mt-0.5">{stats.pendingPayment} pending</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                T-Shirt Inventory
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {Object.entries(stats.tshirtSizes || {}).map(([size, count]) => (
                  <span
                    key={size}
                    className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] font-mono border border-slate-800"
                  >
                    <strong className="text-orange-400">{size}:</strong> {count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search Bornomala students by name, roll, phone, ticket ID..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  fetchStats();
                  fetchParticipants();
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={handleExportCSV}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-orange-400" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={() => setIsAddOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white text-xs font-black shadow-lg flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Student</span>
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
            <select
              value={batchFilter}
              onChange={(e) => { setBatchFilter(e.target.value); setPage(1); }}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
            >
              <option value="">All Batches</option>
              {BATCH_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>

            <select
              value={sizeFilter}
              onChange={(e) => { setSizeFilter(e.target.value); setPage(1); }}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
            >
              <option value="">All Sizes</option>
              {TSHIRT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
            >
              <option value="">All Payments</option>
              <option value="Completed">Paid</option>
              <option value="Pending">Pending</option>
            </select>

            <select
              value={attendanceFilter}
              onChange={(e) => { setAttendanceFilter(e.target.value); setPage(1); }}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
            >
              <option value="">All Attendance</option>
              <option value="Checked-in">Checked-In</option>
              <option value="Not Checked-in">Not Checked-In</option>
            </select>
          </div>
        </div>

        {/* 📱 MOBILE VIEW: CARDS */}
        <div className="block md:hidden space-y-3">
          {participants.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-slate-900 rounded-2xl">
              No student registrations match the search/filters.
            </div>
          ) : (
            participants.map((p) => {
              const isCheckedIn = p.attendanceStatus === 'Checked-in';
              return (
                <div key={p._id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-xs font-black text-orange-400">{p.ticketId}</span>
                      <h4 className="text-sm font-bold text-white">{p.name}</h4>
                      <p className="text-[11px] text-slate-400">{p.phone} • {p.batch}</p>
                      <p className="text-[10px] text-pink-400">{p.department} {p.studentId ? `• Roll: ${p.studentId}` : ''}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg bg-pink-500/20 text-yellow-300 font-mono text-xs font-black">
                      {p.tshirtSize}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <button
                      onClick={() => handleToggleCheckIn(p)}
                      className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 ${isCheckedIn
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      {isCheckedIn ? 'Checked-In' : 'Check-In'}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setViewingParticipant(p)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300"
                        title="View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingParticipant(p)}
                        className="p-1.5 rounded-lg bg-slate-800 text-blue-400"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(p)}
                        className="p-1.5 rounded-lg bg-slate-800 text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 💻 DESKTOP VIEW: DATA TABLE */}
        <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Ticket ID</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Phone / Email</th>
                  <th className="py-3 px-4">Batch / Group</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Attendance</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {participants.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500">
                      No Bornomala Multimedia School participants found.
                    </td>
                  </tr>
                ) : (
                  participants.map((p) => {
                    const isCheckedIn = p.attendanceStatus === 'Checked-in';
                    return (
                      <tr key={p._id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-mono font-bold text-orange-400">{p.ticketId}</td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-white">{p.name}</div>
                          {p.studentId && <div className="text-[10px] text-slate-500 font-mono">Roll: {p.studentId}</div>}
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          <div>{p.phone}</div>
                          <div className="text-[10px] text-slate-500">{p.email}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          <div>{p.batch}</div>
                          <div className="text-[10px] text-pink-400">{p.department}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-pink-500/10 text-yellow-300 font-bold">
                            {p.tshirtSize}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.paymentStatus === 'Completed' ? 'text-emerald-400' : 'text-yellow-400'
                            }`}>
                            {p.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleCheckIn(p)}
                            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 ${isCheckedIn ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                              }`}
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            {isCheckedIn ? 'Checked-In' : 'Check-In'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setViewingParticipant(p)}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingParticipant(p)}
                              className="p-1.5 rounded-lg bg-slate-800 text-blue-400 hover:text-blue-300"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(p)}
                              className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:text-rose-300"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modals for Add, Edit, View, Delete */}
      {isAddOpen && (
        <ParticipantFormModal
          title="Add Bornomala Student"
          onClose={() => setIsAddOpen(false)}
          onSuccess={(msg) => {
            setIsAddOpen(false);
            showFeedback(msg);
            fetchParticipants();
            fetchStats();
          }}
        />
      )}

      {editingParticipant && (
        <ParticipantFormModal
          title="Edit Student Pass"
          initialData={editingParticipant}
          onClose={() => setEditingParticipant(null)}
          onSuccess={(msg) => {
            setEditingParticipant(null);
            showFeedback(msg);
            fetchParticipants();
            fetchStats();
          }}
        />
      )}

      {viewingParticipant && (
        <ViewDetailsModal
          participant={viewingParticipant}
          onClose={() => setViewingParticipant(null)}
        />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-500" /> Confirm Deletion
            </h3>
            <p className="text-xs text-slate-400">
              Remove <strong>{deleteConfirm.name}</strong> ({deleteConfirm.ticketId})?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm._id)}
                className="px-3 py-1.5 rounded-xl bg-rose-600 text-xs font-bold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Form Modal for Add & Edit
function ParticipantFormModal({ title, initialData, onClose, onSuccess }) {
  const isEdit = Boolean(initialData?._id);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    phone: initialData?.phone || '',
    batch: initialData?.batch || '',
    tshirtSize: initialData?.tshirtSize || 'L',
    attendanceStatus: initialData?.attendanceStatus || 'Not Checked-in',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (isEdit) {
        const res = await updateParticipantAdmin(initialData._id, formData);
        onSuccess(res.message || 'Updated successfully');
      } else {
        const res = await createParticipantAdmin(formData);
        onSuccess(res.message || 'Created successfully');
      }
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 overflow-y-auto">
      <div className="bg-[#0a0f1d] border border-pink-500/25 rounded-3xl max-w-md w-full p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] text-pink-400 font-bold uppercase">Bornomala Multimedia School</span>
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Student Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Tanvir Ahmed"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="017XXXXXXXX"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Batch / Class *</label>
            <input
              type="text"
              name="batch"
              required
              value={formData.batch}
              onChange={handleChange}
              placeholder="e.g. SSC 2026 / Class 10 / Alumni"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">T-Shirt Size *</label>
            <select
              name="tshirtSize"
              value={formData.tshirtSize}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
            >
              {TSHIRT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Attendance Status</label>
            <select
              name="attendanceStatus"
              value={formData.attendanceStatus}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
            >
              <option value="Not Checked-in">Not Checked-in</option>
              <option value="Checked-in">Checked-in</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-xs font-bold text-white"
            >
              {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Attendee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Details Modal
function ViewDetailsModal({ participant, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-[#0a0f1d] border border-pink-500/30 rounded-3xl max-w-sm w-full p-5 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <div>
            <span className="text-[9px] text-pink-400 font-mono uppercase block font-bold">BORNOMALA MULTIMEDIA SCHOOL</span>
            <span className="text-[10px] text-orange-400 font-mono">FESTIVAL PASS</span>
            <h3 className="text-xl font-black text-white">{participant.ticketId}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div><span className="text-slate-500">Student:</span> <strong className="text-white">{participant.name}</strong></div>
          {participant.studentId && <div><span className="text-slate-500">Roll:</span> {participant.studentId}</div>}
          <div><span className="text-slate-500">Phone:</span> {participant.phone}</div>
          <div><span className="text-slate-500">Email:</span> {participant.email}</div>
          <div><span className="text-slate-500">Batch:</span> {participant.batch}</div>
          <div><span className="text-slate-500">Group:</span> {participant.department}</div>
          <div><span className="text-slate-500">T-Shirt Size:</span> <strong className="text-yellow-300 font-bold">{participant.tshirtSize}</strong></div>
          <div><span className="text-slate-500">Attendance:</span> <span className="text-emerald-400 font-bold">{participant.attendanceStatus}</span></div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl bg-slate-800 text-xs font-bold text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}
