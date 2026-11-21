'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Ticket,
  CheckCircle,
  AlertCircle,
  Loader2,
  Download,
  Shirt,
  User,
  Phone,
  GraduationCap,
  PartyPopper,
  Zap,
  QrCode,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { registerParticipant } from '../../lib/api';

const TSHIRT_SIZES = [
  { size: 'S', desc: 'বুক ৩৬"' },
  { size: 'M', desc: 'বুক ৩৮"' },
  { size: 'L', desc: 'বুক ৪০"' },
  { size: 'XL', desc: 'বুক ৪২"' },
  { size: 'XXL', desc: 'বুক ৪৪"' },
  { size: '3XL', desc: 'বুক ৪৬"' },
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    batch: '',
    tshirtSize: 'L',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff5722', '#ff007a', '#7928ca', '#ffb703', '#00f0ff'],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await registerParticipant(formData);
      setSuccessData(res.participant);
      fireConfetti();
    } catch (err) {
      setError(err.message || 'রেজিস্ট্রেশন সম্পন্ন করা যায়নি। অনুগ্রহ করে তথ্য যাচাই করে পুনরায় চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyFormLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#060813] text-slate-100 py-6 sm:py-12 px-3 sm:px-6 relative overflow-hidden flex flex-col justify-center">
      {/* Background Neon Glows */}
      <div className="festival-glow w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-orange-600/25 to-pink-600/25 top-0 left-1/4 -translate-x-1/2" />
      <div className="festival-glow w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gradient-to-br from-purple-600/20 to-rose-600/20 bottom-10 right-0" />

      <div className="max-w-lg mx-auto w-full relative z-10 space-y-5">
        {/* Navigation & Share Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> হোম পেজে ফিরে যান
          </Link>

          <button
            onClick={handleCopyFormLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 border border-pink-500/25 text-xs font-bold text-pink-300 hover:bg-pink-500/20 transition-all"
            title="ফর্মের লিংক কপি করুন"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">কপি হয়েছে!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-pink-400" />
                <span>লিংক শেয়ার করুন</span>
              </>
            )}
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-[#0a0f1d] border border-pink-500/30 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 p-5 sm:p-6 text-white relative">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-yellow-400 text-black inline-block mb-1.5">
              বর্ণমালা মাল্টিমিডিয়া স্কুল
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight font-['Space_Grotesk']">
              পূর্ণমিলনী রেজিস্ট্রেশন ফর্ম
            </h1>
            <p className="text-pink-100 text-xs mt-1">
              তারিখ: ১৯-১২-২০২৬ • পাস পেতে নিচের ৪টি তথ্য পূরণ করুন
            </p>
          </div>

          <div className="p-5 sm:p-7 space-y-4">
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>{error}</div>
              </div>
            )}

            {successData ? (
              /* Success / Pass View */
              <div className="space-y-4 text-center py-1">
                <div className="w-14 h-14 bg-pink-500/20 text-pink-400 rounded-2xl flex items-center justify-center mx-auto border border-pink-500/30">
                  <PartyPopper className="w-8 h-8 text-yellow-300 animate-bounce" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">রেজিস্ট্রেশন সফল হয়েছে!</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    বর্ণমালা মাল্টিমিডিয়া স্কুল পূর্ণমিলনী ২০২৬
                  </p>
                </div>

                {/* Festival Ticket Stub */}
                <div className="ticket-edge rounded-2xl border-2 border-pink-500/40 bg-slate-900 p-5 text-left shadow-2xl space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-mono text-orange-400 uppercase font-black">
                        বর্ণমালা মাল্টিমিডিয়া স্কুল
                      </span>
                      <div className="text-xl font-black text-white tracking-wider font-mono">
                        {successData.ticketId}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-xl text-xs font-black uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      পূর্ণমিলনী পাস
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">শিক্ষার্থীর নাম</span>
                      <span className="font-bold text-white text-sm">{successData.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">মোবাইল নাম্বার</span>
                      <span className="font-bold text-white text-sm">{successData.phone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">ব্যাচ / শ্রেণি</span>
                      <span className="font-bold text-white text-sm">{successData.batch}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">টি-শার্ট সাইজ</span>
                      <span className="font-black text-yellow-300 text-sm">{successData.tshirtSize}</span>
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div className="pt-2 pb-1 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">পেমেন্ট স্ট্যাটাস:</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      successData.paymentStatus === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {successData.paymentStatus === 'Completed' ? 'পরিশোধিত (Completed)' : 'পেন্ডিং (অ্যাডমিন অনুমোদনের অপেক্ষায়)'}
                    </span>
                  </div>

                  <div className="pt-2 border-t-2 border-dashed border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-orange-400" />
                      <span>গেট এন্ট্রি টিকেট</span>
                    </div>
                    <span className="font-bold text-yellow-300">১৯-১২-২০২৬ (সকাল ০৮:০০ টা)</span>
                  </div>
                </div>

                {/* Emergency Contact Information */}
                <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-2xl text-xs space-y-1">
                  <div className="text-orange-400 font-bold flex items-center gap-1.5 text-[11px]">
                    <Phone className="w-3.5 h-3.5" /> জরুরি যোগাযোগ ও পেমেন্ট নিশ্চিতকরণ:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-300 text-[11px]">
                    <div>মাজেদ স্যার: <a href="tel:01714785807" className="font-bold text-yellow-300 hover:underline">01714785807</a></div>
                    <div>মিঠু স্যার: <a href="tel:01316050399" className="font-bold text-yellow-300 hover:underline">01316050399</a></div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-1 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handlePrint}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Download className="w-4 h-4" /> পাস ডাউনলোড / প্রিন্ট
                  </button>
                  <Link
                    href="/"
                    className="w-full py-3.5 rounded-2xl bg-slate-800 text-slate-300 hover:text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700"
                  >
                    হোম পেজে ফিরুন
                  </Link>
                </div>
              </div>
            ) : (
              /* Clean 4-Field Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Name */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-pink-400" /> শিক্ষার্থীর পুরো নাম *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>

                {/* 2. Phone */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-pink-400" /> মোবাইল নাম্বার *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="০১XXXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>

                {/* 3. Batch */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-pink-400" /> ব্যাচ / শ্রেণি *
                  </label>
                  <input
                    type="text"
                    name="batch"
                    required
                    value={formData.batch}
                    onChange={handleChange}
                    placeholder="যেমন: এসএসসি ২০২৬ / দশম শ্রেণি / প্রাক্তন"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>

                {/* 4. T-Shirt Size */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                      <Shirt className="w-3.5 h-3.5" /> টি-শার্টের সাইজ *
                    </label>
                    <span className="text-xs text-yellow-400 font-bold">বাছাইকৃত: {formData.tshirtSize}</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {TSHIRT_SIZES.map((item) => {
                      const isSelected = formData.tshirtSize === item.size;
                      return (
                        <button
                          key={item.size}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, tshirtSize: item.size }))}
                          className={`py-3 px-1 rounded-xl border text-center transition-all ${isSelected
                              ? 'bg-pink-600/30 border-pink-500 text-yellow-300 font-black shadow-lg shadow-pink-600/20 ring-1 ring-pink-500'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                        >
                          <div className="text-base font-black">{item.size}</div>
                          <div className="text-[9px] text-slate-400">{item.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Emergency Contacts Banner inside form */}
                <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl text-[11px] space-y-1">
                  <span className="text-orange-400 font-bold block">জরুরি যোগাযোগ নম্বর:</span>
                  <div className="flex flex-col sm:flex-row sm:justify-between text-slate-300 gap-1">
                    <span>মাজেদ স্যার: <a href="tel:01714785807" className="text-yellow-300 font-semibold hover:underline">01714785807</a></span>
                    <span>মিঠু স্যার: <a href="tel:01316050399" className="text-yellow-300 font-semibold hover:underline">01316050399</a></span>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-95 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-pink-600/30 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> তথ্য যাচাই হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-yellow-300" /> জমা দিন ও পাস গ্রহণ করুন
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
