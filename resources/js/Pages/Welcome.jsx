import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function Welcome({ products }) {
  const [activeTab, setActiveTab] = useState('Semua');

  // Fungsi cek diskon aktif
  const getActiveDiscount = (discounts) => {
    if (!discounts || discounts.length === 0) return null;
    const today = new Date();
    return discounts.find((discount) => {
      if (!discount.start_date && !discount.end_date) return true;
      const start = discount.start_date ? new Date(discount.start_date) : null;
      const end = discount.end_date ? new Date(discount.end_date) : null;
      if (start && start > today) return false;
      if (end && end < today) return false;
      return true;
    });
  };

  // Ekstrak daftar kategori unik untuk tab filter
  const categoriesList = useMemo(() => {
    const cats = products
      .map((p) => p.category?.name)
      .filter((name, index, self) => name && self.indexOf(name) === index);
    return ['Semua', ...cats];
  }, [products]);

  // Filter produk berdasarkan tab
  const displayedProducts = useMemo(() => {
    if (activeTab === 'Semua') return products;
    return products.filter((p) => p.category?.name === activeTab);
  }, [products, activeTab]);

  return (
    <PublicLayout>
      <Head title="RunDev.shop — Pusat AI Tools Pro, Akun Game & Produk Digital Terpercaya" />

      {/* =========================================================
         1. HERO SECTION: BENTO GRID MODERN TECH & GAMING VIBE
      ========================================================= */}
      <section className="relative overflow-hidden pt-8 pb-24 lg:pt-16 lg:pb-32 bg-slate-950 text-white">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-cyan-500/0 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-emerald-500/10 blur-[100px] pointer-events-none" />
        
        {/* Dot Pattern Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Kolom Kiri: Headline & CTA Utama (7 Kolom) */}
            <div className="lg:col-span-7 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/10 text-emerald-400 font-bold text-xs sm:text-sm mb-6 shadow-inner">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                Platform Marketplace Produk Digital #1 di Indonesia
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6">
                Level Up <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Produktivitas & Gaming
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Dapatkan akses instan ke <strong className="text-white font-bold">AI Tools Pro</strong> (ChatGPT Plus, Claude), <strong className="text-white font-bold">Akun Game Sultan</strong> (Valorant, Steam), dan <strong className="text-white font-bold">Streaming Apps</strong> dengan garansi penuh & harga terbaik.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link
                  href={route('catalog')}
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-extrabold text-base transition-all shadow-xl shadow-emerald-500/25 hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                >
                  Mulai Belanja Sekarang
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a
                  href="#katalog-populer"
                  className="w-full sm:w-auto px-7 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2"
                >
                  Lihat Promo Minggu Ini 🔥
                </a>
              </div>

              {/* Mini Stats di bawah CTA */}
              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Legal & Bergaransi</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">Instan</div>
                  <div className="text-xs text-slate-400 mt-0.5">Kirim via WhatsApp</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">24/7</div>
                  <div className="text-xs text-slate-400 mt-0.5">Admin Responsif</div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Floating Bento Showcase Card (5 Kolom) */}
            <div className="lg:col-span-5 relative z-10">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-cyan-500/30 rounded-3xl blur-3xl transform rotate-3" />

                {/* Container Kartu Bergaya Glassmorphism */}
                <div className="relative space-y-4 p-3 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl">
                  
                  {/* Header Card Showcase */}
                  <div className="flex items-center justify-between px-3 pt-2 pb-1 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-400 tracking-wider uppercase">
                      Live Store Preview
                    </span>
                  </div>

                  {/* Item 1: AI Tools */}
                  <div className="group rounded-2xl bg-white/[0.04] border border-white/10 p-4 hover:border-emerald-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">AI Tools Pro</span>
                            <span className="text-[10px] text-slate-400">Garansi Full</span>
                          </div>
                          <h4 className="font-extrabold text-white text-sm sm:text-base mt-0.5">ChatGPT Plus / Claude Pro</h4>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-slate-500 line-through">Rp 350rb</span>
                        <span className="text-sm font-black text-emerald-400">Mulai 45rb</span>
                      </div>
                    </div>
                  </div>

                  {/* Item 2: Akun Game & Top Up */}
                  <div className="group rounded-2xl bg-white/[0.04] border border-white/10 p-4 hover:border-indigo-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Gaming & Top Up</span>
                            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Ready
                            </span>
                          </div>
                          <h4 className="font-extrabold text-white text-sm sm:text-base mt-0.5">Akun Valorant & Steam Siltan</h4>
                        </div>
                      </div>
                      <Link href={route('catalog')} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-xs font-extrabold text-white transition">
                        Beli &rarr;
                      </Link>
                    </div>
                  </div>

                  {/* Item 3: Streaming Apps */}
                  <div className="group rounded-2xl bg-white/[0.04] border border-white/10 p-4 hover:border-rose-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">Entertainment</span>
                            <span className="text-[10px] text-slate-400">1 Bln - Lifetime</span>
                          </div>
                          <h4 className="font-extrabold text-white text-sm sm:text-base mt-0.5">Netflix 4K UHD & Canva Pro</h4>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        Instant
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
         2. OVERLAPPING TRUST BAR
      ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-12 sm:-mt-16">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          
          <div className="flex items-center gap-4 pt-2 sm:pt-0 sm:px-4 first:pt-0 first:pl-0">
            <div className="w-12 h-12 flex-shrink-0 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">Pengiriman Kilat</h3>
              <p className="text-xs sm:text-sm text-slate-500">Proses langsung via WhatsApp</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="w-12 h-12 flex-shrink-0 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">100% Legal & Aman</h3>
              <p className="text-xs sm:text-sm text-slate-500">Garansi penuh anti-suspend</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="w-12 h-12 flex-shrink-0 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center border border-purple-100 shadow-sm">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">Varian Fleksibel</h3>
              <p className="text-xs sm:text-sm text-slate-500">Tersedia 1 Bulan s/d Lifetime</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="w-12 h-12 flex-shrink-0 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100 shadow-sm">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">Support 24/7</h3>
              <p className="text-xs sm:text-sm text-slate-500">Admin siap bantu kendalamu</p>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================
         3. BENTO GRID KATEGORI UNGGULAN
      ========================================================= */}
      <section className="pt-24 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-sm">
              Eksplorasi Pilar Layanan
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight">
              Solusi Digital & Game Terbaik
            </h2>
            <p className="text-slate-500 text-base mt-2">
              Pilih kategori produk impianmu dan nikmati kemudahan transaksi instan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pilar 1: AI Tools */}
            <Link
              href={route('catalog')}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between min-h-[260px]"
            >
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              <div className="flex justify-between items-start relative z-10">
                <div className="p-3.5 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-white/20 text-xs font-black backdrop-blur-md">
                  Paling Laris 🔥
                </span>
              </div>
              <div className="mt-8 relative z-10">
                <h3 className="text-2xl font-black mb-1.5 tracking-tight">AI Tools & Produktivitas</h3>
                <p className="text-emerald-100 text-sm mb-5 font-medium leading-relaxed">ChatGPT Plus, Claude Pro, Midjourney, Canva Pro, dan Notion.</p>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider bg-white text-emerald-900 px-4 py-2.5 rounded-xl group-hover:bg-emerald-50 transition shadow-md">
                  Cek Katalog AI <span>&rarr;</span>
                </span>
              </div>
            </Link>

            {/* Pilar 2: Gaming */}
            <Link
              href={route('catalog')}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between min-h-[260px]"
            >
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              <div className="flex justify-between items-start relative z-10">
                <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-inner">
                  <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-black">
                  Gamer Choice 🎮
                </span>
              </div>
              <div className="mt-8 relative z-10">
                <h3 className="text-2xl font-black mb-1.5 tracking-tight">Akun Game & Top Up</h3>
                <p className="text-slate-300 text-sm mb-5 font-medium leading-relaxed">Akun Valorant rank tinggi, Steam, ML, & voucher game instan.</p>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl transition shadow-md">
                  Eksplor Gaming <span>&rarr;</span>
                </span>
              </div>
            </Link>

            {/* Pilar 3: Streaming & Software */}
            <Link
              href={route('catalog')}
              className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 p-8 text-slate-900 shadow-xl hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between min-h-[260px]"
            >
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-100/60 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              <div className="flex justify-between items-start relative z-10">
                <div className="p-3.5 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 shadow-inner">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-black">
                  Hemat s/d 70% ⚡
                </span>
              </div>
              <div className="mt-8 relative z-10">
                <h3 className="text-2xl font-black mb-1.5 tracking-tight text-slate-900">Streaming & Software</h3>
                <p className="text-slate-500 text-sm mb-5 font-medium leading-relaxed">Netflix 4K, Spotify, Windows Key, & Office Original resmi.</p>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider bg-slate-900 group-hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl transition shadow-md">
                  Lihat Semua App <span>&rarr;</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
         4. PRODUCT SECTION DENGAN TAB FILTER DINAMIS
      ========================================================= */}
      <section id="katalog-populer" className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Category Tab Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-600 font-extrabold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 mb-2">
                <span>🔥</span> Produk Pilihan Minggu Ini
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Paling Dicari & Siap Kirim
              </h2>
            </div>

            {/* Tab Kategori Interaktif */}
            {categoriesList.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                {categoriesList.map((catName) => (
                  <button
                    key={catName}
                    onClick={() => setActiveTab(catName)}
                    className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all shadow-sm ${
                      activeTab === catName
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 scale-105'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
                    }`}
                  >
                    {catName}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid Produk */}
          {displayedProducts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-slate-200 border-dashed px-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Belum Ada Produk di Kategori Ini</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">Admin sedang menyiapkan produk terbaik untuk kategori ini. Coba pilih tab lainnya!</p>
              {activeTab !== 'Semua' && (
                <button
                  onClick={() => setActiveTab('Semua')}
                  className="mt-6 px-6 py-3 bg-emerald-600 text-white text-sm font-extrabold rounded-2xl hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
                >
                  Tampilkan Semua Produk
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayedProducts.map((product) => {
                const activeDiscount = getActiveDiscount(product.discounts);
                const originalPrice = parseInt(product.price);
                const finalPrice = activeDiscount
                  ? originalPrice - originalPrice * (activeDiscount.discount_percentage / 100)
                  : originalPrice;
                const variantCount = product.variants?.length || 0;

                return (
                  <Link
                    key={product.id}
                    href={route('product.show', product.id)}
                    className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:shadow-2xl hover:shadow-emerald-950/10 hover:border-emerald-400 transition-all duration-300 flex flex-col"
                  >
                    {/* Gambar Produk & Badge */}
                    <div className="relative aspect-square sm:aspect-[4/3] bg-slate-100 overflow-hidden">
                      {activeDiscount && (
                        <div className="absolute top-3 left-3 z-10 bg-rose-600 text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-xl shadow-lg">
                          Hemat {activeDiscount.discount_percentage}%
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 z-10 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Instan
                      </div>

                      {variantCount > 0 && (
                        <div className="absolute bottom-3 right-3 z-10 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
                          {variantCount} Paket Varian
                        </div>
                      )}

                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                          <svg className="w-10 h-10 mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Informasi Produk */}
                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] sm:text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 truncate">
                          {product.category?.name || 'Digital Product'}
                        </span>
                        <span className="text-[10px] sm:text-xs font-semibold text-slate-400 whitespace-nowrap">
                          Stok: <strong className="text-slate-700">{product.stock}</strong>
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-black text-slate-900 mb-1.5 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
                        {product.title}
                      </h3>

                      {product.description && (
                        <p className="text-xs text-slate-500 line-clamp-1 mb-4 font-normal">
                          {product.description}
                        </p>
                      )}

                      <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col">
                        <div className="mb-3.5">
                          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            {variantCount > 0 ? 'Mulai dari' : 'Harga Terbaik'}
                          </span>
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-base sm:text-lg font-black text-slate-900">
                              Rp {finalPrice.toLocaleString('id-ID')}
                            </span>
                            {activeDiscount && (
                              <span className="text-[10px] sm:text-xs text-rose-500 line-through font-bold">
                                Rp {originalPrice.toLocaleString('id-ID')}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="w-full text-center bg-slate-900 group-hover:bg-emerald-600 text-white px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                          <span>Pilih & Beli</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Tombol Lihat Seluruh Katalog */}
          <div className="mt-14 text-center">
            <Link
              href={route('catalog')}
              className="inline-flex items-center gap-2.5 bg-white hover:bg-emerald-50 text-slate-900 hover:text-emerald-700 border-2 border-slate-200 hover:border-emerald-300 px-9 py-4 rounded-2xl font-black text-sm sm:text-base transition-all shadow-sm hover:shadow-md"
            >
              Eksplor Seluruh Katalog Produk
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================
         5. CARA ORDER (3 LANGKAH MUDAH)
      ========================================================= */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-[2.5rem] p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
            
            <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
                Alur Transaksi Aman & Cepat
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mt-4 tracking-tight">
                3 Langkah Mudah Langsung Aktif
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              
              <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 p-7 rounded-3xl hover:border-emerald-500/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center mb-5 text-xl shadow-lg shadow-emerald-500/30">
                  1
                </div>
                <h3 className="font-extrabold text-lg mb-2 text-white">Pilih Produk & Paket</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  Cari AI tools atau akun game incaranmu, lalu tentukan pilihan durasi paket yang paling sesuai kebutuhanmu.
                </p>
              </div>

              <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 p-7 rounded-3xl hover:border-emerald-500/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center mb-5 text-xl shadow-lg shadow-emerald-500/30">
                  2
                </div>
                <h3 className="font-extrabold text-lg mb-2 text-white">Klik Beli via WhatsApp</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  Sistem otomatis menyusun pesananmu. Kirim pesan ke WhatsApp admin dan selesaikan pembayaran via QRIS/Transfer.
                </p>
              </div>

              <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 p-7 rounded-3xl hover:border-emerald-500/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center mb-5 text-xl shadow-lg shadow-emerald-500/30">
                  3
                </div>
                <h3 className="font-extrabold text-lg mb-2 text-white">Terima Akun & Nikmati</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  Detail akun atau proses top up langsung dikirimkan oleh admin dalam hitungan menit beserta garansi penuh.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}