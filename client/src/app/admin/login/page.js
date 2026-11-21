'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, ArrowLeft, Loader2, AlertCircle, KeyRound, Flame, School } from 'lucide-react';
import { adminLogin, setAuthToken } from '../../../lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await adminLogin({ email, password });
      if (res.token) {
        setAuthToken(res.token);
        router.push('/admin/dashboard');
      } else {
        throw new Error('অথেনটিকেশন সফল হয়েছে কিন্তু টোকেন পাওয়া যায়নি।');
      }
    } catch (err) {
      setError(err.message || 'লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড যাচাই করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@firewell.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#060813] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="festival-glow w-[400px] h-[400px] bg-pink-600/20 top-1/4 left-1/2 -translate-x-1/2" />

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> বর্ণমালা বিদায় উৎসব সাইটে ফিরে যান
        </Link>

        {/* Card */}
        <div className="bg-[#0a0f1d] border border-pink-500/25 rounded-3xl p-7 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold border border-orange-500/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black text-pink-400 tracking-wider block">
                বর্ণমালা মাল্টিমিডিয়া স্কুল
              </span>
              <h1 className="text-xl font-bold text-white">অ্যাডমিন পোর্টাল</h1>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                অ্যাডমিন ইমেইল
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@firewell.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1.5">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-600/25 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> তথ্য যাচাই হচ্ছে...
                </>
              ) : (
                'ড্যাশবোর্ডে প্রবেশ করুন'
              )}
            </button>
          </form>

          {/* Quick Demo Access Box */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1 font-semibold text-slate-300">
                <KeyRound className="w-3.5 h-3.5 text-orange-400" /> ডিফল্ট লগইন তথ্য
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-pink-400 hover:text-pink-300 font-semibold underline"
              >
                স্বয়ংক্রিয় পূরণ
              </button>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl text-xs font-mono text-slate-400 space-y-1 border border-slate-800/80">
              <div>ইমেইল: <span className="text-slate-200">admin@firewell.com</span></div>
              <div>পাসওয়ার্ড: <span className="text-slate-200">admin123</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
