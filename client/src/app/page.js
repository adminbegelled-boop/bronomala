'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Search,
  ExternalLink,
  ChevronRight,
  Disc3,
  Shirt,
  Utensils,
  Camera,
  Award,
  Flame,
  PartyPopper,
  Zap,
  Copy,
  Check
} from 'lucide-react';
import RegistrationModal from '../components/RegistrationModal';
import TicketSearchModal from '../components/TicketSearchModal';

// 📸 REPLACEABLE FESTIVAL PHOTO URLS
// You can replace these image links with your actual school festival photos anytime!
export const EVENT_PHOTOS = {
  heroBanner: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80',
  stageDj: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
  crowdCheer: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  galaDinner: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
  tshirtMerch: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
  fireworksSky: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&w=800&q=80',
  friendsHugs: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
};

export default function LandingPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Synchronized countdown to 19-12-2026 08:00 AM (National Flag Hoisting)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-12-19T08:00:00+06:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyFormLink = () => {
    if (typeof window !== 'undefined') {
      const formUrl = `${window.location.origin}/register`;
      navigator.clipboard.writeText(formUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#060813] text-slate-100 overflow-x-hidden pb-24 md:pb-0">
      {/* Dynamic Festival Background Lighting */}
      <div className="festival-glow w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-orange-600/30 to-pink-600/30 top-[-100px] left-[-80px]" />
      <div className="festival-glow w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-br from-purple-600/25 to-rose-600/25 top-[30%] right-[-100px]" />
      <div className="festival-glow w-[400px] h-[400px] bg-gradient-to-t from-amber-500/20 to-orange-600/20 bottom-[10%] left-[-100px]" />

      {/* ⚡ FESTIVAL MARQUEE TICKER TAPE */}
      <div className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-widest py-2.5 overflow-hidden shadow-lg relative z-50">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span>🔥 বর্ণমালা মাল্টিমিডিয়া স্কুল বিদায় উৎসব ২০২৬</span>
          <span>•</span>
          <span>🎓 শিক্ষার্থীদের বর্ণাঢ্য বিদায় সংবর্ধনা</span>
          <span>📅 তারিখ: ১৯-১২-২০২৬</span>
          <span>•</span>
          <span>🇧🇩 জাতীয় পতাকা উত্তোলন: সকাল ০৮:০০ টা</span>
          <span>•</span>
          <span>🎤 স্মৃতিচারণ ও আলোচনা সভা: সকাল ১০:০০ টা</span>
          <span>•</span>
          <span>🕌 নামাজের বিরতি: দুপুর ১২:০০ টা</span>
          <span>•</span>
          <span>🍽️ উৎসবের স্পেশাল লাঞ্চ: দুপুর ০১:০০ টা</span>
          <span>•</span>
          <span>🎭 মনোজ্ঞ সাংস্কৃতিক অনুষ্ঠান: দুপুর ০১:০০ টা - বিকাল ০৫:০০ টা</span>
          <span>•</span>
          <span>👕 এক্সক্লুসিভ ফেয়ারওয়েল টি-শার্ট কিট</span>
          <span>•</span>
          <span>🎟️ আসন সীমিত — আজই রেজিস্ট্রেশন করুন!</span>
          <span>•</span>
          <span>🔥 বর্ণমালা মাল্টিমিডিয়া স্কুল বিদায় উৎসব ২০২৬</span>
          <span>•</span>
          <span>🎓 শিক্ষার্থীদের বর্ণাঢ্য বিদায় সংবর্ধনা</span>
        </div>
      </div>

      {/* Top Festival Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[#060813]/90 backdrop-blur-xl border-b border-pink-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-600/40 transform -rotate-3 hover:rotate-0 transition-transform">
              <PartyPopper className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-black text-lg sm:text-xl tracking-tight text-white flex items-center gap-1 font-['Space_Grotesk'] leading-none">
                বর্ণমালা <span className="text-pink-500">বিদায় উৎসব</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-orange-400 block mt-0.5">
                বর্ণমালা মাল্টিমিডিয়া স্কুল '২৬
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <a href="#lineup" className="hover:text-pink-400 transition-colors">উৎসবের আকর্ষণ</a>
            <a href="#ticket-pass" className="hover:text-pink-400 transition-colors">উৎসব পাস</a>
            <a href="#photos" className="hover:text-pink-400 transition-colors">স্মৃতি অ্যালবাম</a>
            <a href="#schedule" className="hover:text-pink-400 transition-colors">সময়সূচি</a>
            <Link href="/register" className="text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1">
              সরাসরি ফর্ম <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
              title="পাস খুঁজুন"
            >
              <Search className="w-4 h-4 text-orange-400" />
              <span className="hidden sm:inline">আমার পাস</span>
            </button>

            <button
              onClick={() => setIsRegisterOpen(true)}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-pink-600/30 transition-all transform active:scale-95 flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span>রেজিস্ট্রেশন করুন</span>
            </button>

            <Link
              href="/admin/login"
              className="hidden lg:flex p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="অ্যাডমিন পোর্টাল"
            >
              <ShieldCheck className="w-4 h-4 text-orange-400" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {/* Party Badges */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[11px] sm:text-xs font-bold tracking-wide">
            <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-ping" />
            <span className="text-orange-400 font-extrabold uppercase">বর্ণমালা মাল্টিমিডিয়া স্কুল</span>
            <span>•</span>
            <span>গ্র্যান্ড বিদায় উৎসব ২০২৬</span>
            <span className="text-yellow-300 font-extrabold">তারিখ: ১৯-১২-২০২৬ (সকাল ০৮:০০ - বিকাল ০৫:০০)</span>
          </div>

          {/* Main Festival Title */}
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.1] font-['Space_Grotesk']">
            বর্ণমালা মাল্টিমিডিয়া স্কুল <br />
            <span className="text-festival-gradient">বিদায় উৎসব ২০২৬</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal px-2">
            বর্ণমালা মাল্টিমিডিয়া স্কুলের শিক্ষার্থীদের স্মৃতির বিদায় উৎসব!
            আজই আপনার অফিশিয়াল ফেস্টিভ্যাল পাস সংগ্রহ করুন, পছন্দের টি-শার্টের সাইজ নির্বাচন করুন এবং আনন্দঘন স্মৃতিতে অংশ নিন।
          </p>

          {/* Mobile-Friendly CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-95 text-white font-black text-base shadow-2xl shadow-pink-600/40 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Ticket className="w-5 h-5 text-yellow-300" />
              <span>উৎসব পাস সংগ্রহ করুন</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link
              href="/register"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700 text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-pink-400" />
              <span>সরাসরি ফর্ম পেজ</span>
            </Link>
          </div>

          {/* Shareable Link Pill */}
          <div className="pt-1 flex items-center justify-center">
            <button
              onClick={handleCopyFormLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-pink-500/30 text-xs font-semibold text-slate-300 hover:text-white hover:border-pink-500 transition-all"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-pink-400" />}
              <span>{copiedLink ? 'সরাসরি ফর্মের লিংক কপি হয়েছে!' : 'বন্ধুদের সাথে শেয়ার করতে ফর্মের লিংক কপি করুন'}</span>
            </button>
          </div>

          {/* Festival Countdown */}
          <div className="pt-4 sm:pt-6">
            <div className="text-[11px] uppercase font-black tracking-widest text-orange-400 mb-2.5 flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> উৎসব শুরু হতে বাকি
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xs sm:max-w-md mx-auto">
              {[
                { label: 'দিন', val: timeLeft.days },
                { label: 'ঘণ্টা', val: timeLeft.hours },
                { label: 'মিনিট', val: timeLeft.minutes },
                { label: 'সেকেন্ড', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-pink-500/20 text-center shadow-lg relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500" />
                  <div className="text-2xl sm:text-4xl font-black text-white font-mono">
                    {String(item.val).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] sm:text-[11px] font-extrabold tracking-wider text-pink-400 mt-0.5">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Showcase */}
        <div className="mt-10 sm:mt-16">
          <div className="relative rounded-3xl overflow-hidden border-2 border-pink-500/30 shadow-2xl shadow-pink-950/40 group">
            <img
              src={EVENT_PHOTOS.heroBanner}
              alt="বর্ণমালা মাল্টিমিডিয়া স্কুল বিদায় উৎসব"
              className="w-full h-64 sm:h-[450px] object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-[#060813]/40 to-transparent" />

            {/* Overlaid Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase bg-pink-600 text-white shadow-lg">
                🔴 বর্ণমালা মাল্টিমিডিয়া স্কুল
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase bg-purple-600/90 text-white backdrop-blur-md">
                ক্যাম্পাস প্রাঙ্গণ ও অডিটোরিয়াম
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
              <div>
                <span className="text-xs font-black text-yellow-400 uppercase tracking-widest">
                  এসএসসি ব্যাচ ২০২৬ বিদায় সংবর্ধনা
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-white font-['Space_Grotesk']">
                  স্মৃতি • সুর • আনন্দঘন মিলনমেলা
                </h3>
              </div>
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-extrabold shadow-lg transition-transform active:scale-95 flex items-center gap-1.5"
              >
                <span>রেজিস্ট্রেশন করুন</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 🎪 FESTIVAL ZONES & ATTRACTIONS LINEUP */}
      <section id="lineup" className="py-16 sm:py-24 bg-[#0a0d1f]/80 border-y border-pink-500/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
              ⚡ বর্ণমালা স্মৃতি ও উৎসব
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 font-['Space_Grotesk']">
              উৎসবের বিশেষ আকর্ষণসমূহ
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              বর্ণমালা মাল্টিমিডিয়া স্কুলের বিদায় উৎসবে থাকছে সঙ্গীত, সংস্কৃতি, প্রীতিভোজ ও অমলিন স্মৃতির মিলনমেলা।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                zone: 'জোন ০১',
                title: 'লাইভ স্টেজ ও কনসার্ট',
                tag: 'সঙ্গীত ও পরিবেশনা',
                icon: Disc3,
                color: 'from-orange-500 to-amber-500',
                desc: 'শিক্ষার্থীদের লাইভ সঙ্গীত পরিবেশনা, ব্যান্ড পারফরম্যান্স ও উৎসবমুখর কনসার্ট।',
                badge: 'লাইভ কনসার্ট',
              },
              {
                zone: 'জোন ০২',
                title: 'অফিশিয়াল টি-শার্ট কিট',
                tag: 'বিশেষ স্মৃতি স্মারক',
                icon: Shirt,
                color: 'from-pink-500 to-rose-600',
                desc: 'আপনার পছন্দের সাইজ বেছে নিন (S থেকে 3XL)। প্রিমিয়াম কটন ব্যাচ টি-শার্ট ও উৎসব ব্যাজ।',
                badge: 'পাসের সাথে অন্তর্ভুক্ত',
              },
              {
                zone: 'জোন ০৩',
                title: 'গ্র্যান্ড প্রীতিভোজ',
                tag: 'উৎসবের লাঞ্চ',
                icon: Utensils,
                color: 'from-purple-500 to-indigo-600',
                desc: 'স্পেশাল সুস্বাদু দুপুরের খাবার, বিরিয়ানি, মিষ্টান্ন ও রিফ্রেশমেন্টের সুব্যবস্থা।',
                badge: 'উৎসবে স্পেশাল খাবার',
              },
              {
                zone: 'জোন ০৪',
                title: '৩৬০° ফটোবুথ ও স্মৃতি গ্যালারি',
                tag: 'ছবি ও স্মৃতি',
                icon: Camera,
                color: 'from-sky-500 to-blue-600',
                desc: 'বন্ধুদের সাথে সেরা মুহূর্তগুলো ফ্রেমবন্দি করতে বিশেষ সেলফি ও ফটোবুথ জোন।',
                badge: 'ইনস্ট্যান্ট ফটো',
              },
              {
                zone: 'জোন ০৫',
                title: 'সম্মাননা ও অ্যাওয়ার্ডস',
                tag: 'স্মৃতিচারণ ও পদক',
                icon: Award,
                color: 'from-amber-500 to-yellow-600',
                desc: 'শিক্ষক-শিক্ষার্থীদের স্মৃতিচারণ, বিদায়ী সংবর্ধনা স্মারক ও সম্মাননা পদক প্রদান।',
                badge: 'সম্মাননা পর্ব',
              },
              {
                zone: 'জোন ০৬',
                title: 'বর্ণিল সমাপ্তি ও শুভকামনা',
                tag: 'বিদায় সমাপন',
                icon: Flame,
                color: 'from-rose-500 to-red-600',
                desc: 'আবেগঘন বিদায় মুহূর্ত, স্মৃতিচারণ ও উজ্জ্বল ভবিষ্যতের শুভকামনায় সমাপনী পর্ব।',
                badge: 'উৎসব সমাপনী',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 relative overflow-hidden group hover:border-pink-500/40 transition-all hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">
                      {item.zone}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-pink-500/10 text-pink-400 border border-pink-500/20">
                      {item.badge}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-pink-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-bold text-orange-400 uppercase tracking-wider mt-0.5 mb-2">
                    {item.tag}
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🎟️ THE OFFICIAL FESTIVAL PASS PREVIEW */}
      <section id="ticket-pass" className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-pink-400">
            🎟️ লাইভ পাস প্রিভিউ
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-1 font-['Space_Grotesk']">
            উৎসব পাসের অন্তর্ভুক্ত সুবিধাসমূহ
          </h2>
        </div>

        {/* Realistic Mobile Ticket Stub Card */}
        <div className="ticket-edge rounded-3xl border-2 border-orange-500/30 overflow-hidden shadow-2xl bg-slate-900 max-w-xl mx-auto">
          {/* Top Holographic Header */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 p-5 text-white relative">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-black/30 px-2.5 py-0.5 rounded-full">
                  বর্ণমালা মাল্টিমিডিয়া স্কুল
                </span>
                <h4 className="text-2xl font-black mt-1 tracking-tight font-['Space_Grotesk']">
                  বিদায় উৎসব '২৬
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono opacity-80">পাস ধরন</span>
                <div className="text-sm font-black text-yellow-300">অল-অ্যাক্সেস পাস</div>
              </div>
            </div>
          </div>

          {/* Ticket Perks List */}
          <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center gap-3 text-slate-200">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                ✓
              </div>
              <span><strong>অফিশিয়াল কাস্টম টি-শার্ট</strong> (পছন্দের সাইজ S থেকে 3XL)</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                ✓
              </div>
              <span><strong>রাজকীয় প্রীতিভোজ ও স্পেশাল লাঞ্চ</strong></span>
            </div>
            <div className="flex items-center gap-3 text-slate-200">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                ✓
              </div>
              <span><strong>সাংস্কৃতিক অনুষ্ঠান ও লাইভ কনসার্টে প্রবেশাধিকার</strong></span>
            </div>
            <div className="flex items-center gap-3 text-slate-200">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                ✓
              </div>
              <span><strong>৩৬০° ফটোবুথ ও মুহূর্তগুলো ফ্রেমবন্দি করার সুযোগ</strong></span>
            </div>
            <div className="flex items-center gap-3 text-slate-200">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                ✓
              </div>
              <span><strong>অফিশিয়াল ফেয়ারওয়েল আইডি ব্যাজ ও ফিতা</strong></span>
            </div>

            {/* Perforated separator */}
            <div className="pt-4 border-t-2 border-dashed border-slate-700/80 flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>স্কুল গেটে স্ক্যান করুন</span>
              <span className="text-orange-400 font-bold">BMS-VALID-2026</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-pink-600/30 flex items-center justify-center gap-2 active:scale-98 transition-transform"
              >
                <Ticket className="w-4 h-4" />
                <span>রেজিস্ট্রেশন ফর্ম খুলুন</span>
              </button>
              <Link
                href="/register"
                className="py-3.5 px-4 rounded-2xl bg-slate-800 text-slate-200 hover:text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700"
              >
                <ExternalLink className="w-4 h-4 text-pink-400" />
                <span>সরাসরি পেজ লিংক</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 📸 FESTIVAL MEMORIES STREAM */}
      <section id="photos" className="py-16 bg-[#0a0d1f]/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-orange-400">
                📸 বর্ণমালা স্মৃতি অ্যালবাম
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-['Space_Grotesk'] mt-1">
                প্রিয় ক্যাম্পাসের অমলিন স্মৃতি
              </h2>
            </div>
          </div>

          {/* Swipeable Mobile Grid */}
          <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto pb-4 sm:pb-0 snap-x no-scrollbar">
            {[
              { img: EVENT_PHOTOS.stageDj, label: 'মঞ্চ ও সঙ্গীত পরিবেশনা', tag: 'লাইভ স্টেজ' },
              { img: EVENT_PHOTOS.crowdCheer, label: 'আনন্দ ও উচ্ছ্বাসের মুহূর্ত', tag: 'শিক্ষার্থী প্রাঙ্গণ' },
              { img: EVENT_PHOTOS.galaDinner, label: 'প্রীতিভোজ ও আড্ডা', tag: 'গ্র্যান্ড লাঞ্চ' },
              { img: EVENT_PHOTOS.tshirtMerch, label: 'টি-শার্ট উপহার কিট', tag: 'বিশেষ উপহার' },
              { img: EVENT_PHOTOS.fireworksSky, label: 'বর্ণিল আলোকসজ্জা', tag: 'উৎসবের আলো' },
              { img: EVENT_PHOTOS.friendsHugs, label: 'চিরসবুজ বন্ধুত্বের বাঁধন', tag: 'স্মৃতি অমলিন' },
            ].map((p, idx) => (
              <div
                key={idx}
                className="w-72 sm:w-auto flex-shrink-0 snap-start rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-[4/3] relative group"
              >
                <img
                  src={p.img}
                  alt={p.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-pink-500 text-white">
                      {p.tag}
                    </span>
                    <div className="text-sm font-bold text-white mt-1">{p.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⏰ FESTIVAL TIMELINE / SCHEDULE */}
      <section id="schedule" className="py-16 sm:py-20 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/25">
            📅 শনিবার, ১৯-১২-২০২৬ • অফিশিয়াল কর্মসূচি
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-['Space_Grotesk'] mt-2">
            উৎসবের পূর্ণাঙ্গ সময়সূচি
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            বর্ণমালা মাল্টিমিডিয়া স্কুল বিদায় উৎসব ২০২৬
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {[
            {
              time: 'সকাল ০৮:০০ টা',
              title: 'জাতীয় পতাকা উত্তোলন',
              note: 'জাতীয় সংগীত পরিবেশন, পতাকা উত্তোলন ও শিক্ষক-শিক্ষার্থীদের প্রাতঃকালীন সমাবেশ।',
              badge: 'পতাকা উত্তোলন',
              color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
            },
            {
              time: 'সকাল ১০:০০ টা',
              title: 'স্মৃতিচারণ ও আলোচনা সভা',
              note: 'শিক্ষক ও অতিথিবৃন্দের অনুপ্রেরণামূলক বক্তব্য এবং শিক্ষার্থীদের স্মৃতিচারণ ও বিদায়ী অনুভূতি।',
              badge: 'আলোচনা সভা',
              color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
            },
            {
              time: 'দুপুর ১২:০০ টা',
              title: 'নামাজের বিরতি',
              note: 'জোহরের নামাজ, বিশ্রাম ও বন্ধুদের সাথে ভাববিনিময়।',
              badge: 'নামাজ ও বিরতি',
              color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
            },
            {
              time: 'দুপুর ০১:০০ টা',
              title: 'প্রীতিভোজ',
              note: 'উৎসবের স্পেশাল দুপুরের খাবার ও আপ্যায়ন।',
              badge: 'গ্র্যান্ড লাঞ্চ',
              color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
            },
            {
              time: 'দুপুর ০১:০০ টা - বিকাল ০৫:০০ টা',
              title: 'মনোজ্ঞ সাংস্কৃতিক অনুষ্ঠান',
              note: 'নাটক, গান, নৃত্য, স্মৃতি স্মারক ও সম্মাননা বিতরণী বর্ণাঢ্য সাংস্কৃতিক উৎসব।',
              badge: 'সাংস্কৃতিক অনুষ্ঠান',
              color: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-4 hover:border-pink-500/30 transition-all"
            >
              <div className="flex-shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-orange-500/20 text-orange-400 font-mono text-xs sm:text-sm font-black block text-center">
                  {item.time}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-white">{item.title}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.color}`}>
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#04060d] border-t border-slate-900 py-10 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-extrabold text-slate-300">বর্ণমালা মাল্টিমিডিয়া স্কুল বিদায় উৎসব ২০২৬</span>
          </div>
          <div>ভালোবাসায় আয়োজিত • এসএসসি ব্যাচ ২০২৬ উদযাপন কমিটি</div>
          <div className="flex items-center gap-4">
            <Link href="/register" className="text-pink-400 hover:underline">
              রেজিস্ট্রেশন ফর্ম
            </Link>
            <Link href="/admin/login" className="text-orange-400 hover:underline">
              অ্যাডমিন পোর্টাল
            </Link>
          </div>
        </div>
      </footer>

      {/* 📱 STICKY BOTTOM ACTION BAR FOR MOBILE PHONES */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060813]/95 backdrop-blur-lg border-t border-pink-500/30 p-3 flex items-center gap-3">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center"
          title="পাস খুঁজুন"
        >
          <Search className="w-5 h-5 text-orange-400" />
        </button>

        <button
          onClick={() => setIsRegisterOpen(true)}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-pink-600/40 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Ticket className="w-4 h-4 text-yellow-300" />
          <span>উৎসব পাস নিন (ফর্ম)</span>
        </button>
      </div>

      {/* Modals */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
      <TicketSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
