'use client';

import { useState } from 'react';
import { X, Search, Ticket, CheckCircle, AlertCircle, Loader2, QrCode, Phone } from 'lucide-react';
import { searchTicket } from '../lib/api';

export default function TicketSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await searchTicket(query);
      setResult(res.participant);
    } catch (err) {
      setError(err.message || 'কোনো তথ্য খুঁজে পাওয়া যায়নি। অনুগ্রহ করে টিকেট আইডি বা মোবাইল নম্বর সঠিক কিনা দেখুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setResult(null);
    setError(null);
    setQuery('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0a0f1d] border border-pink-500/25 rounded-3xl shadow-2xl p-5 sm:p-7 space-y-4">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Ticket className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg sm:text-xl font-black text-white font-['Space_Grotesk']">
              আপনার পূর্ণমিলনী পাস খুঁজুন
            </h3>
          </div>
          <p className="text-slate-400 text-xs">
            বর্ণমালা মাল্টিমিডিয়া স্কুল • আপনার টিকেট আইডি অথবা মোবাইল নম্বর দিয়ে সার্চ করুন।
          </p>
        </div>

        <form onSubmit={handleSearch}>
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="টিকেট আইডি / মোবাইল নম্বর"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-pink-600 disabled:opacity-50 text-white text-xs font-black rounded-xl flex items-center gap-1.5 transition-all"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              খুঁজুন
            </button>
          </div>
        </form>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="ticket-edge rounded-2xl border border-pink-500/40 bg-slate-950 p-4 space-y-3">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-800">
              <div>
                <span className="text-[9px] text-orange-400 font-mono uppercase font-black">
                  বর্ণমালা মাল্টিমিডিয়া স্কুল
                </span>
                <div className="text-lg font-black text-white font-mono">{result.ticketId}</div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${result.attendanceStatus === 'Checked-in'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                }`}>
                {result.attendanceStatus === 'Checked-in' ? 'উপস্থিত (চেক-ইন)' : 'অপেক্ষমাণ'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] block uppercase">শিক্ষার্থীর নাম</span>
                <span className="font-bold text-white">{result.name}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block uppercase">মোবাইল নম্বর</span>
                <span className="font-bold text-white">{result.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block uppercase">ব্যাচ / শ্রেণি</span>
                <span className="font-bold text-white">{result.batch}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block uppercase">টি-শার্ট সাইজ</span>
                <span className="font-black text-yellow-300">{result.tshirtSize}</span>
              </div>
            </div>

            {/* Payment Status Display */}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400 text-[11px]">পেমেন্ট স্ট্যাটাস:</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                result.paymentStatus === 'Completed'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {result.paymentStatus === 'Completed' ? 'পরিশোধিত (Completed)' : 'পেন্ডিং (Pending)'}
              </span>
            </div>
          </div>
        )}

        {/* Emergency Contacts Box */}
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl text-[11px] space-y-1">
          <div className="text-orange-400 font-bold flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> জরুরি যোগাযোগ (পেমেন্ট নিশ্চিতকরণে):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-300">
            <div>মাজেদ স্যার: <a href="tel:01714785807" className="font-bold text-yellow-300 hover:underline">01714785807</a></div>
            <div>মিঠু স্যার: <a href="tel:01316050399" className="font-bold text-yellow-300 hover:underline">01316050399</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
