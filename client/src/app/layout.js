import './globals.css';

export const metadata = {
  title: 'বর্ণমালা মাল্টিমিডিয়া স্কুল | বিদায় উৎসব ২০২৬',
  description: 'বর্ণমালা মাল্টিমিডিয়া স্কুল বিদায় উৎসব ২০২৬-এর অফিশিয়াল রেজিস্ট্রেশন পোর্টাল। আপনার পাস সংগ্রহ করুন এবং উৎসবে অংশ নিন!',
  keywords: ['Bornomala Multimedia School', 'farewell festival', 'BMS farewell', 'registration', 'school farewell 2026'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#060813] text-slate-100 antialiased selection:bg-pink-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
