'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  X,
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
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { registerParticipant } from '../lib/api';

const TSHIRT_SIZES = [
  { size: 'S', desc: 'বুক ৩৬"' },
  { size: 'M', desc: 'বুক ৩৮"' },
  { size: 'L', desc: 'বুক ৪০"' },
  { size: 'XL', desc: 'বুক ৪২"' },
  { size: 'XXL', desc: 'বুক ৪৪"' },
  { size: '3XL', desc: 'বুক ৪৬"' },
];

export default function RegistrationModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
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

  const handleReset = () => {
    setSuccessData(null);
    setFormData({
      name: '',
      phone: '',
      batch: '',
      tshirtSize: 'L',
    });
    onClose();
  };

  const handleCopyFormLink = () => {
    if (typeof window !== 'undefined') {
      const registerUrl = `${window.location.origin}/register`;
      navigator.clipboard.writeText(registerUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-lg bg-[#0a0f1d] sm:border sm:border-pink-500/25 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* Festival Header */}
        <div className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 p-4 sm:p-5 text-white relative flex-shrink-0">
          <div className="flex items-center justify-between pr-10 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-yellow-400 text-black">
              বর্ণমালা মাল্টিমিডিয়া স্কুল
            </span>
            <button
              onClick={handleCopyFormLink}
              className="text-[11px] font-bold text-yellow-300 hover:text-white flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-lg"
              title="ফর্মের লিংক কপি করুন"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copiedLink ? 'কপি হয়েছে' : 'ফর্ম শেয়ার করুন'}
            </button>
          </div>

          <button
            onClick={handleReset}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-black tracking-tight font-['Space_Grotesk']">
            বিদায় উৎসব রেজিস্ট্রেশন ফর্ম
          </h2>
          <p className="text-pink-100 text-xs mt-0.5">
            অফিশিয়াল উৎসব পাস পেতে নিচের ৪টি তথ্য পূরণ করুন!
          </p>
        </div>

        {/* Scrollable Form Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {successData ? (
            /* Festival Pass Card View */
            <div className="space-y-4 py-2">
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-pink-500/30">
                  <PartyPopper className="w-7 h-7 text-yellow-300" />
                </div>
                <h3 className="text-xl font-black text-white">রেজিস্ট্রেশন সম্পন্ন হয়েছে!</h3>
                <p className="text-xs text-slate-400">
                  এই যে আপনার <strong>বর্ণমালা মাল্টিমিডিয়া স্কুল</strong> বিদায় উৎসবের অফিশিয়াল পাস।
                </p>
              </div>

              {/* Realistic Concert Pass Ticket Stub */}
              <div className="ticket-edge rounded-2xl border-2 border-pink-500/40 bg-slate-900 overflow-hidden shadow-2xl p-4 sm:p-5 relative">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-orange-400 uppercase font-black">
                      বর্ণমালা মাল্টিমিডিয়া স্কুল
                    </span>
                    <div className="text-xl font-black text-white tracking-wider font-mono">
                      {successData.ticketId}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl text-xs font-black uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    ভিআইপি পাস
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">শিক্ষার্থীর নাম</span>
                    <span className="font-bold text-white text-sm">{successData.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">মোবাইল নম্বর</span>
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

                {/* Barcode Mockup */}
                <div className="pt-3 border-t-2 border-dashed border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-orange-400" />
                    <span>গেট এন্ট্রি টিকেট</span>
                  </div>
                  <span className="font-bold text-yellow-300">১৯-১২-২০২৬ (সকাল ০৮:০০ টা)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={handlePrint}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <Download className="w-4 h-4" /> পাস ডাউনলোড / প্রিন্ট করুন
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs uppercase hover:bg-slate-700"
                >
                  সম্পন্ন
                </button>
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

              {/* Submit CTA */}
              <div className="pt-2">
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
  );
}
