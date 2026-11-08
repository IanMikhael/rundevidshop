// import { Link, usePage } from '@inertiajs/react';
// import { useEffect, useState } from 'react';

// /* ============================================================
//    ICONS — inline SVG, tanpa library eksternal
// ============================================================ */
// const IconBase = ({ children, className = 'h-5 w-5' }) => (
//     <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
//         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//         {children}
//     </svg>
// );

// const MenuIcon         = ({ className }) => (<IconBase className={className}><path d="M4 7h16M4 12h16M4 17h10" /></IconBase>);
// const CloseIcon        = ({ className }) => (<IconBase className={className}><path d="M6 6l12 12M18 6L6 18" /></IconBase>);
// const HomeIcon         = ({ className }) => (<IconBase className={className}><path d="M3 10.5L12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-5a1 1 0 011-1h3a1 1 0 011 1v5" /></IconBase>);
// const GridIcon         = ({ className }) => (<IconBase className={className}><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></IconBase>);
// const ArrowRightIcon   = ({ className }) => (<IconBase className={className}><path d="M4 12h15" /><path d="M13 6l6 6-6 6" /></IconBase>);
// const ArrowUpIcon      = ({ className }) => (<IconBase className={className}><path d="M12 19V5" /><path d="M6 11l6-6 6 6" /></IconBase>);
// const ShieldIcon       = ({ className }) => (<IconBase className={className}><path d="M12 3l7 2.8v5.4c0 4.4-2.9 8.3-7 9.8-4.1-1.5-7-5.4-7-9.8V5.8L12 3z" /><path d="M9.3 12.2l1.9 1.9 3.5-3.9" /></IconBase>);
// const ChatIcon         = ({ className }) => (<IconBase className={className}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></IconBase>);
// const MailIcon         = ({ className }) => (<IconBase className={className}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7.5l8.5 5.7 8.5-5.7" /></IconBase>);
// const SendIcon         = ({ className }) => (<IconBase className={className}><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></IconBase>);
// const ChevronRightIcon = ({ className }) => (<IconBase className={className}><path d="M9 6l6 6-6 6" /></IconBase>);

// /* ============================================================
//    KONFIGURASI
// ============================================================ */
// const LOGO = '/Logo RunDev.png';
// const WA_LINK = 'https://wa.me/6281234567890'; // TODO: ganti dengan nomor asli

// const TICKER = [
//     'Promo pengguna baru — diskon hingga 20%',
//     'Aktivasi instan & garansi penuh',
//     'Support responsif 24/7',
//     'Pembayaran aman & terenkripsi',
// ];

// const GLOBAL_CSS = `
// @keyframes rd-marquee   { to { transform: translateX(-100%); } }
// @keyframes rd-float     { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(28px,-30px,0) scale(1.08); } }
// @keyframes rd-float-rev { 0%,100% { transform: translate3d(0,0,0) scale(1.06); } 50% { transform: translate3d(-32px,26px,0) scale(0.94); } }
// @keyframes rd-page      { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
// @keyframes rd-item      { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

// .rd-marquee    { animation: rd-marquee 30s linear infinite; }
// .rd-marquee-wrap:hover .rd-marquee { animation-play-state: paused; }
// .rd-float      { animation: rd-float 16s ease-in-out infinite; }
// .rd-float-rev  { animation: rd-float-rev 20s ease-in-out infinite; }
// .rd-page-enter { animation: rd-page .6s cubic-bezier(.22,1,.36,1) both; }

// @media (prefers-reduced-motion: reduce) {
//     .rd-marquee, .rd-float, .rd-float-rev, .rd-page-enter { animation: none !important; }
//     .animate-ping { animation: none !important; }
// }
// `;

// /* ============================================================
//    SUB-KOMPONEN KECIL
// ============================================================ */
// const StatusPill = ({ className = '' }) => (
//     <div className={`inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 ${className}`}>
//         <span className="relative flex h-2 w-2">
//             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
//             <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
//         </span>
//         Semua sistem beroperasi normal
//     </div>
// );

// /* ============================================================
//    LAYOUT UTAMA
// ============================================================ */
// export default function PublicLayout({ children }) {
//     const { url } = usePage();
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
//     const [progress, setProgress] = useState(0);

//     /* Scroll: progress bar + state navbar */
//     useEffect(() => {
//         const onScroll = () => {
//             const y = window.scrollY;
//             const max = document.documentElement.scrollHeight - window.innerHeight;
//             setScrolled(y > 24);
//             setProgress(max > 0 ? Math.min((y / max) * 100, 100) : 0);
//         };
//         onScroll();
//         window.addEventListener('scroll', onScroll, { passive: true });
//         return () => window.removeEventListener('scroll', onScroll);
//     }, []);

//     /* Tutup menu mobile saat pindah halaman */
//     useEffect(() => { setMenuOpen(false); }, [url]);

//     /* ESC untuk menutup + lock scroll saat menu terbuka */
//     useEffect(() => {
//         const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
//         window.addEventListener('keydown', onKey);
//         document.body.style.overflow = menuOpen ? 'hidden' : '';
//         return () => {
//             window.removeEventListener('keydown', onKey);
//             document.body.style.overflow = '';
//         };
//     }, [menuOpen]);

//     /* Deteksi halaman aktif (mendukung /catalog & /katalog) */
//     const isCatalog = url.startsWith('/catalog') || url.startsWith('/katalog');
//     const isHome = url === '/' || url === '';

//     const navItems = [
//         { label: 'Beranda', desc: 'Kembali ke halaman utama', href: '/', active: isHome, Icon: HomeIcon },
//         { label: 'Katalog Produk', desc: 'Jelajahi semua produk & tools', href: route('catalog'), active: isCatalog, Icon: GridIcon },
//     ];

//     const footerCols = [
//         {
//             title: 'Navigasi', className: 'md:col-start-7 md:col-span-3',
//             links: [
//                 { label: 'Beranda', href: '/' },
//                 { label: 'Katalog Produk', href: route('catalog') },
//             ],
//         },
//         {
//             title: 'Bantuan', className: 'md:col-span-3',
//             links: [
//                 { label: 'Cara Order', href: '#' },
//                 { label: 'Hubungi Kami', href: '#' },
//                 { label: 'Syarat & Ketentuan', href: '#' },
//                 { label: 'Kebijakan Privasi', href: '#' },
//             ],
//         },
//     ];

//     const socials = [
//         { label: 'WhatsApp', href: WA_LINK, Icon: ChatIcon },
//         { label: 'Telegram', href: '#', Icon: SendIcon },
//         { label: 'Email', href: 'mailto:hello@rundev.id', Icon: MailIcon },
//     ];

//     const year = new Date().getFullYear();

//     return (
//         <div className="relative flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
//             <style>{GLOBAL_CSS}</style>

//             {/* ===== AMBIENT AURORA BACKGROUND ===== */}
//             <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[110vh] overflow-hidden">
//                 <div className="rd-float absolute -left-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-emerald-300/40 blur-3xl" />
//                 <div className="rd-float-rev absolute -right-32 top-[30%] h-[30rem] w-[30rem] rounded-full bg-teal-300/35 blur-3xl" />
//                 <div className="rd-float absolute -bottom-32 left-1/4 h-[24rem] w-[24rem] rounded-full bg-cyan-200/40 blur-3xl" style={{ animationDelay: '-6s' }} />
//                 <div
//                     className="absolute inset-0"
//                     style={{
//                         backgroundImage: 'linear-gradient(to right, rgba(15,23,42,.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,.045) 1px, transparent 1px)',
//                         backgroundSize: '52px 52px',
//                         maskImage: 'radial-gradient(ellipse 90% 65% at 50% 0%, black 35%, transparent 78%)',
//                         WebkitMaskImage: 'radial-gradient(ellipse 90% 65% at 50% 0%, black 35%, transparent 78%)',
//                     }}
//                 />
//             </div>

//             {/* ===== HEADER FIXED: PROGRESS + TICKER + NAVBAR ===== */}
//             <div className="fixed inset-x-0 top-0 z-50">
//                 {/* Scroll progress bar */}
//                 <div
//                     className="absolute left-0 top-0 z-10 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-150 ease-out"
//                     style={{ width: `${progress}%` }}
//                 />

//                 {/* Announcement ticker (auto-hide saat scroll) */}
//                 <div className={`overflow-hidden transition-all duration-500 ease-out ${scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}>
//                     <div className="relative bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">
//                         <div
//                             className="rd-marquee-wrap flex overflow-hidden"
//                             style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
//                         >
//                             {[0, 1].map((copy) => (
//                                 <div key={copy} className="rd-marquee flex shrink-0 items-center" aria-hidden={copy === 1}>
//                                     {TICKER.map((text, i) => (
//                                         <span key={i} className="flex items-center whitespace-nowrap text-xs font-medium text-white/95">
//                                             <span className="px-6">{text}</span>
//                                             <span className="text-white/50">✦</span>
//                                         </span>
//                                     ))}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Navbar kapsul */}
//                 <div className="px-4 sm:px-6 lg:px-8">
//                     <header
//                         className={`mx-auto mt-3 flex max-w-7xl items-center justify-between gap-4 rounded-2xl border px-4 transition-all duration-500 sm:px-5 ${
//                             scrolled
//                                 ? 'border-slate-200/80 bg-white/85 py-2.5 shadow-xl shadow-slate-900/[0.08] backdrop-blur-2xl'
//                                 : 'border-white/60 bg-white/70 py-3 shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl'
//                         }`}
//                     >
//                         {/* Logo */}
//                         <Link href="/" aria-label="RunDev — Beranda" className="group relative flex items-center focus:outline-none">
//                             <span className="absolute -inset-2 rounded-xl bg-gradient-to-r from-emerald-400/0 via-emerald-400/25 to-teal-400/0 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
//                             <img src={LOGO} alt="RunDev" className="relative h-9 w-auto object-contain transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110" />
//                         </Link>

//                         {/* Nav desktop */}
//                         <nav aria-label="Navigasi utama" className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-slate-100/70 p-1.5 md:flex">
//                             {navItems.map(({ label, href, active }) => (
//                                 <Link
//                                     key={label}
//                                     href={href}
//                                     aria-current={active ? 'page' : undefined}
//                                     className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
//                                         active ? 'text-white' : 'text-slate-500 hover:bg-white/70 hover:text-slate-900'
//                                     }`}
//                                 >
//                                     {active && <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md shadow-emerald-500/40" />}
//                                     <span className="relative">{label}</span>
//                                     {active && <span className="relative h-1.5 w-1.5 rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,.9)]" />}
//                                 </Link>
//                             ))}
//                         </nav>

//                         {/* Kanan desktop */}
//                         <div className="hidden items-center gap-3 md:flex">
//                             <div className="hidden items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600 lg:flex">
//                                 <ShieldIcon className="h-3.5 w-3.5" />
//                                 Secure Store 24/7
//                             </div>
//                             <Link
//                                 href={route('catalog')}
//                                 className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
//                             >
//                                 <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//                                 <span className="relative">Mulai Belanja</span>
//                                 <ArrowRightIcon className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                             </Link>
//                         </div>

//                         {/* Hamburger mobile */}
//                         <button
//                             onClick={() => setMenuOpen(true)}
//                             aria-label="Buka menu"
//                             aria-expanded={menuOpen}
//                             className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-emerald-300 hover:text-emerald-600 active:scale-95 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
//                         >
//                             <MenuIcon className="h-5 w-5" />
//                         </button>
//                     </header>
//                 </div>
//             </div>

//             {/* ===== MOBILE MENU FULL-SCREEN ===== */}
//             <div
//                 className={`fixed inset-0 z-[60] md:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
//                 role="dialog"
//                 aria-modal="true"
//                 aria-label="Menu navigasi"
//             >
//                 <div
//                     onClick={() => setMenuOpen(false)}
//                     className={`absolute inset-0 bg-slate-900/70 backdrop-blur-md transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
//                 />
//                 <div
//                     className={`absolute inset-x-4 top-4 rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl shadow-slate-900/20 backdrop-blur-2xl transition-all duration-300 ease-out ${
//                         menuOpen ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-6 scale-[0.98] opacity-0'
//                     }`}
//                 >
//                     <div className="flex items-center justify-between">
//                         <img src={LOGO} alt="RunDev" className="h-8 w-auto object-contain" />
//                         <button
//                             onClick={() => setMenuOpen(false)}
//                             aria-label="Tutup menu"
//                             className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
//                         >
//                             <CloseIcon className="h-5 w-5" />
//                         </button>
//                     </div>

//                     <nav className="mt-6 space-y-3">
//                         {navItems.map(({ label, desc, href, active, Icon: NIcon }, i) => (
//                             <Link
//                                 key={label}
//                                 href={href}
//                                 style={menuOpen ? { animation: `rd-item .5s cubic-bezier(.22,1,.36,1) ${120 + i * 80}ms both` } : undefined}
//                                 className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 active:scale-[0.98] ${
//                                     active
//                                         ? 'border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50'
//                                         : 'border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-white'
//                                 }`}
//                             >
//                                 <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
//                                     active ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30' : 'bg-white text-slate-400 shadow-sm group-hover:text-emerald-500'
//                                 }`}>
//                                     <NIcon className="h-5 w-5" />
//                                 </span>
//                                 <span className="flex-1">
//                                     <span className={`block text-[15px] font-bold ${active ? 'text-emerald-700' : 'text-slate-800'}`}>{label}</span>
//                                     <span className="block text-xs text-slate-400">{desc}</span>
//                                 </span>
//                                 <ChevronRightIcon className="h-4 w-4 text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-400" />
//                             </Link>
//                         ))}
//                     </nav>

//                     <div className="mt-6 space-y-4" style={menuOpen ? { animation: 'rd-item .5s cubic-bezier(.22,1,.36,1) 300ms both' } : undefined}>
//                         <a
//                             href={WA_LINK}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 active:scale-[0.98]"
//                         >
//                             <ChatIcon className="h-4 w-4" /> Butuh bantuan? Chat Kami
//                         </a>
//                         <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
//                             <span className="relative flex h-2 w-2">
//                                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
//                                 <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
//                             </span>
//                             Semua sistem beroperasi normal
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Spacer navbar fixed */}
//             <div className="h-28 md:h-32" />

//             {/* ===== KONTEN + TRANSISI HALAMAN ===== */}
//             <main className="relative z-10 flex-grow">
//                 <div key={url} className="rd-page-enter">
//                     {children}
//                 </div>
//             </main>

//             {/* ===== FOOTER ===== */}
//             <footer className="relative z-10 mt-auto overflow-hidden bg-slate-900 text-slate-400">
//                 <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
//                 <div aria-hidden="true" className="pointer-events-none absolute -top-36 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

//                 <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
//                     <div className="grid gap-12 md:grid-cols-12">
//                         {/* Brand */}
//                         <div className="md:col-span-5">
//                             <img src={LOGO} alt="RunDev" className="h-10 w-auto object-contain" />
//                             <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
//                                 Platform digital & AI tools terpercaya — produk premium, aktivasi instan, dan dukungan penuh kapan pun kamu butuh.
//                             </p>
//                             <StatusPill className="mt-5" />
//                             <div className="mt-6 flex items-center gap-3">
//                                 {socials.map(({ label, href, Icon: SIcon }) => (
//                                     <a
//                                         key={label}
//                                         href={href}
//                                         target="_blank"
//                                         rel="noreferrer"
//                                         aria-label={label}
//                                         className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
//                                     >
//                                         <SIcon className="h-4 w-4" />
//                                     </a>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Kolom link */}
//                         {footerCols.map((col) => (
//                             <div key={col.title} className={col.className}>
//                                 <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">{col.title}</h3>
//                                 <ul className="mt-4 space-y-3 text-sm">
//                                     {col.links.map((l) => (
//                                         <li key={l.label}>
//                                             <Link href={l.href} className="inline-block text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-emerald-400">
//                                                 {l.label}
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Wordmark raksasa */}
//                     <div aria-hidden="true" className="mt-14 select-none overflow-hidden text-center">
//                         <span className="block bg-gradient-to-b from-white/5 to-transparent bg-clip-text text-[20vw] font-black leading-[0.8] tracking-tighter text-transparent md:text-[11rem]">
//                             RUNDEV
//                         </span>
//                     </div>

//                     <div className="flex flex-col items-center justify-between gap-3 border-t border-white/5 py-6 text-xs text-slate-500 sm:flex-row">
//                         <p>&copy; {year} RunDev — All rights reserved.</p>
//                         <p className="flex items-center gap-1.5">
//                             Dibuat dengan <span className="text-emerald-400">♥</span> oleh RunDev Team
//                         </p>
//                     </div>
//                 </div>
//             </footer>

//             {/* ===== BACK TO TOP + RING PROGRESS ===== */}
//             <button
//                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                 aria-label="Kembali ke atas"
//                 className={`fixed bottom-6 right-6 z-40 rounded-full p-[2.5px] shadow-xl shadow-slate-900/20 ring-1 ring-slate-900/5 transition-all duration-500 hover:scale-110 active:scale-95 ${
//                     scrolled ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
//                 }`}
//                 style={{ background: `conic-gradient(#10b981 ${progress}%, rgba(255,255,255,0.4) ${progress}%)` }}
//             >
//                 <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700">
//                     <ArrowUpIcon className="h-5 w-5" />
//                 </span>
//             </button>
//         </div>
//     );
// }


import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

/* ============================================================
   ICONS — Custom Crisp SVG (Tanpa Library Eksternal)
============================================================ */
const IconBase = ({ children, className = 'h-5 w-5' }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {children}
    </svg>
);

const MenuIcon         = ({ className }) => (<IconBase className={className}><path d="M4 7h16M4 12h12M4 17h16" /></IconBase>);
const CloseIcon        = ({ className }) => (<IconBase className={className}><path d="M6 6l12 12M18 6L6 18" /></IconBase>);
const HomeIcon         = ({ className }) => (<IconBase className={className}><path d="M3 10.5L12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-5a1 1 0 011-1h3a1 1 0 011 1v5" /></IconBase>);
const GridIcon         = ({ className }) => (<IconBase className={className}><rect x="3.5" y="3.5" width="7" height="7" rx="1.8" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.8" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.8" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.8" /></IconBase>);
const SearchIcon       = ({ className }) => (<IconBase className={className}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></IconBase>);
const SparklesIcon     = ({ className }) => (<IconBase className={className}><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" /><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" /></IconBase>);
const BoltIcon         = ({ className }) => (<IconBase className={className}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></IconBase>);
const ArrowRightIcon   = ({ className }) => (<IconBase className={className}><path d="M4 12h15" /><path d="M13 6l6 6-6 6" /></IconBase>);
const ArrowUpIcon      = ({ className }) => (<IconBase className={className}><path d="M12 19V5" /><path d="M6 11l6-6 6 6" /></IconBase>);
const ShieldIcon       = ({ className }) => (<IconBase className={className}><path d="M12 3l7 2.8v5.4c0 4.4-2.9 8.3-7 9.8-4.1-1.5-7-5.4-7-9.8V5.8L12 3z" /><path d="M9.3 12.2l1.9 1.9 3.5-3.9" /></IconBase>);
const ChatIcon         = ({ className }) => (<IconBase className={className}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></IconBase>);
const MailIcon         = ({ className }) => (<IconBase className={className}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7.5l8.5 5.7 8.5-5.7" /></IconBase>);
const SendIcon         = ({ className }) => (<IconBase className={className}><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></IconBase>);
const ChevronRightIcon = ({ className }) => (<IconBase className={className}><path d="M9 6l6 6-6 6" /></IconBase>);

/* ============================================================
   KONFIGURASI GLOBAL
============================================================ */
const LOGO = '/Logo RunDev.png';
const WA_LINK = 'https://wa.me/6281234567890?text=Halo%20Admin%20RunDev!%20Saya%20ingin%20bertanya%20tentang%20produk%20digital.';

const TICKER_ITEMS = [
    { badge: 'PROMO', text: 'Diskon pengguna baru hingga 20% untuk semua AI Tools' },
    { badge: 'INSTANT', text: 'Pengiriman otomatis & garansi penuh anti-suspend' },
    { badge: 'GAMING', text: 'Ready Akun Sultan Valorant, Steam & Top Up Termurah' },
    { badge: 'SUPPORT', text: 'Layanan bantuan admin responsif 24/7 via WhatsApp' },
];

const QUICK_SEARCH_TAGS = [
    { label: 'ChatGPT Plus', query: 'ChatGPT', tag: 'AI Tools' },
    { label: 'Claude Pro', query: 'Claude', tag: 'AI Tools' },
    { label: 'Canva Pro', query: 'Canva', tag: 'Desain' },
    { label: 'Valorant', query: 'Valorant', tag: 'Akun Game' },
    { label: 'Netflix 4K', query: 'Netflix', tag: 'Streaming' },
    { label: 'Spotify Premium', query: 'Spotify', tag: 'Musik' },
];

const PAYMENT_BADGES = ['QRIS', 'GoPay', 'OVO', 'DANA', 'ShopeePay', 'BCA', 'Mandiri', 'BNI'];

const GLOBAL_CSS = `
@keyframes rd-marquee   { to { transform: translateX(-100%); } }
@keyframes rd-float     { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(24px,-26px,0) scale(1.06); } }
@keyframes rd-float-rev { 0%,100% { transform: translate3d(0,0,0) scale(1.04); } 50% { transform: translate3d(-28px,22px,0) scale(0.95); } }
@keyframes rd-page      { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes rd-item      { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes rd-shimmer   { 100% { transform: translateX(100%); } }

.rd-marquee    { animation: rd-marquee 34s linear infinite; }
.rd-marquee-wrap:hover .rd-marquee { animation-play-state: paused; }
.rd-float      { animation: rd-float 16s ease-in-out infinite; }
.rd-float-rev  { animation: rd-float-rev 20s ease-in-out infinite; }
.rd-page-enter { animation: rd-page .55s cubic-bezier(.22,1,.36,1) both; }

/* Custom Scrollbar */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: #f8fafc; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 9999px; }
::-webkit-scrollbar-thumb:hover { background: #10b981; }

@media (prefers-reduced-motion: reduce) {
    .rd-marquee, .rd-float, .rd-float-rev, .rd-page-enter { animation: none !important; }
    .animate-ping { animation: none !important; }
}
`;

/* ============================================================
   SUB-KOMPONEN
============================================================ */
const StatusPill = ({ className = '' }) => (
    <div className={`inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md ${className}`}>
        <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Server & Pengiriman Otomatis Normal
    </div>
);

/* ============================================================
   LAYOUT UTAMA
============================================================ */
export default function PublicLayout({ children }) {
    const { url } = usePage();
    const [menuOpen, setMenuOpen] = useState(false);
    const [cmdOpen, setCmdOpen] = useState(false);
    const [quickQuery, setQuickQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const searchInputRef = useRef(null);

    /* Scroll: progress bar + state navbar */
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setScrolled(y > 20);
            setProgress(max > 0 ? Math.min((y / max) * 100, 100) : 0);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* Tutup menu & modal saat berpindah halaman */
    useEffect(() => {
        setMenuOpen(false);
        setCmdOpen(false);
    }, [url]);

    /* Shortcut Keyboard: Ctrl+K / Cmd+K untuk buka Command Search, ESC untuk tutup */
    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setCmdOpen((prev) => !prev);
                setMenuOpen(false);
            }
            if (e.key === 'Escape') {
                setMenuOpen(false);
                setCmdOpen(false);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    /* Lock body scroll saat menu mobile atau Command Modal terbuka */
    useEffect(() => {
        document.body.style.overflow = menuOpen || cmdOpen ? 'hidden' : '';
        if (cmdOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 60);
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen, cmdOpen]);

    /* Fungsi eksekusi pencarian dari Command Palette */
    const executeQuickSearch = (e) => {
        e?.preventDefault();
        const trimmed = quickQuery.trim();
        setCmdOpen(false);
        router.get(route('catalog'), trimmed ? { search: trimmed } : {});
    };

    const handleTagClick = (queryValue) => {
        setQuickQuery(queryValue);
        setCmdOpen(false);
        router.get(route('catalog'), { search: queryValue });
    };

    /* Deteksi halaman aktif */
    const isCatalog = url.startsWith('/catalog') || url.startsWith('/katalog');
    const isHome = url === '/' || url === '';

    const navItems = [
        { label: 'Beranda', desc: 'Halaman utama & promo mingguan', href: '/', active: isHome, Icon: HomeIcon },
        { label: 'Katalog Produk', desc: 'Eksplor AI Tools, Game & Aplikasi', href: route('catalog'), active: isCatalog, Icon: GridIcon },
    ];

    const footerCols = [
        {
            title: 'Eksplorasi',
            className: 'md:col-start-6 md:col-span-2',
            links: [
                { label: 'Beranda Utama', href: '/' },
                { label: 'Semua Katalog', href: route('catalog') },
                { label: 'AI Tools Pro', href: `${route('catalog')}?search=AI` },
                { label: 'Akun & Top Up Game', href: `${route('catalog')}?search=Game` },
            ],
        },
        {
            title: 'Layanan & Bantuan',
            className: 'md:col-span-2',
            links: [
                { label: 'Cara Pembelian', href: '/#produk-populer' },
                { label: 'Klaim Garansi', href: WA_LINK, external: true },
                { label: 'Konfirmasi Pembayaran', href: WA_LINK, external: true },
                { label: 'Hubungi Admin 24/7', href: WA_LINK, external: true },
            ],
        },
        {
            title: 'Informasi Legal',
            className: 'md:col-span-3',
            links: [
                { label: 'Syarat & Ketentuan Layanan', href: '#' },
                { label: 'Kebijakan Privasi Data', href: '#' },
                { label: 'Kebijakan Refund & Garansi', href: '#' },
            ],
        },
    ];

    const socials = [
        { label: 'WhatsApp', href: WA_LINK, Icon: ChatIcon },
        { label: 'Telegram', href: '#', Icon: SendIcon },
        { label: 'Email', href: 'mailto:hello@rundev.id', Icon: MailIcon },
    ];

    const year = new Date().getFullYear();

    return (
        <div className="relative flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
            <style>{GLOBAL_CSS}</style>

            {/* ===== AMBIENT AURORA MESH BACKGROUND ===== */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[105vh] overflow-hidden">
                <div className="rd-float absolute -left-28 -top-32 h-[28rem] w-[28rem] rounded-full bg-emerald-300/35 blur-3xl" />
                <div className="rd-float-rev absolute -right-32 top-[22%] h-[30rem] w-[30rem] rounded-full bg-teal-300/30 blur-3xl" />
                <div className="rd-float absolute -bottom-32 left-1/3 h-[24rem] w-[24rem] rounded-full bg-cyan-200/35 blur-3xl" style={{ animationDelay: '-6s' }} />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(15,23,42,.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,.04) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                        maskImage: 'radial-gradient(ellipse 90% 65% at 50% 0%, black 35%, transparent 80%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 90% 65% at 50% 0%, black 35%, transparent 80%)',
                    }}
                />
            </div>

            {/* ===== FIXED HEADER: PROGRESS BAR + TICKER + FLOATING NAVBAR ===== */}
            <div className="fixed inset-x-0 top-0 z-50">
                {/* Top Reading / Scroll Progress Bar */}
                <div
                    className="absolute left-0 top-0 z-20 h-[2.5px] bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 shadow-[0_0_10px_rgba(16,185,129,0.7)] transition-all duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                />

                {/* Top Announcement Ticker (Auto-collapse saat scroll) */}
                <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
                    }`}
                >
                    <div className="relative border-b border-white/10 bg-slate-950 text-white">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-500/10 to-cyan-500/20" />
                        <div
                            className="rd-marquee-wrap relative flex overflow-hidden py-2"
                            style={{
                                maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                            }}
                        >
                            {[0, 1].map((copy) => (
                                <div key={copy} className="rd-marquee flex shrink-0 items-center" aria-hidden={copy === 1}>
                                    {TICKER_ITEMS.map((item, i) => (
                                        <span key={i} className="flex items-center whitespace-nowrap text-xs font-medium text-slate-200">
                                            <span className="mx-6 inline-flex items-center gap-2">
                                                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider text-emerald-300 border border-emerald-500/30">
                                                    {item.badge}
                                                </span>
                                                <span>{item.text}</span>
                                            </span>
                                            <span className="text-emerald-400/50">✦</span>
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Floating Capsule Navbar */}
                <div className="px-3 sm:px-6 lg:px-8">
                    <header
                        className={`mx-auto mt-2.5 flex max-w-7xl items-center justify-between gap-3 rounded-2xl border px-3.5 transition-all duration-500 sm:px-5 ${
                            scrolled
                                ? 'border-slate-200/80 bg-white/85 py-2.5 shadow-xl shadow-slate-900/[0.06] backdrop-blur-2xl'
                                : 'border-white/80 bg-white/75 py-3 shadow-lg shadow-slate-900/[0.04] backdrop-blur-xl'
                        }`}
                    >
                        {/* Kiri: Brand Identity */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/"
                                aria-label="RunDev — Beranda"
                                className="group relative flex items-center gap-3 focus:outline-none"
                            >
                                <div className="relative flex items-center justify-center">
                                    <span className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/25 to-teal-400/0 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                                    <img
                                        src={LOGO}
                                        alt="RunDev"
                                        className="relative h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="hidden sm:flex flex-col border-l border-slate-200/80 pl-3">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm font-extrabold tracking-tight text-slate-900">
                                            RunDev<span className="text-emerald-600">.shop</span>
                                        </span>
                                        <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-700 border border-emerald-500/20">
                                            PRO
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-400">
                                        Digital & AI Marketplace
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Tengah: Segmented Navigation Pill (Desktop) */}
                        <nav
                            aria-label="Navigasi utama"
                            className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-slate-100/80 p-1 shadow-inner md:flex"
                        >
                            {navItems.map(({ label, href, active, Icon: NavIcon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`group relative flex items-center gap-2 rounded-full px-4 py-1.5 text-xs lg:text-sm font-bold transition-all duration-300 focus:outline-none ${
                                        active
                                            ? 'text-white shadow-sm'
                                            : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
                                    }`}
                                >
                                    {active && (
                                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 shadow-md shadow-slate-900/20" />
                                    )}
                                    <NavIcon className={`relative h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${active ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-600'}`} />
                                    <span className="relative">{label}</span>
                                    {active && (
                                        <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Kanan: Command Search Trigger + CTA (Desktop) */}
                        <div className="hidden items-center gap-2.5 md:flex">
                            {/* Tombol Command Palette (Ctrl+K) */}
                            <button
                                type="button"
                                onClick={() => setCmdOpen(true)}
                                className="group flex items-center gap-3 rounded-full border border-slate-200/90 bg-slate-50/90 pl-3.5 pr-2.5 py-1.5 text-xs font-medium text-slate-400 shadow-inner transition-all hover:border-emerald-300 hover:bg-white hover:text-slate-600 hover:shadow-sm"
                                title="Cari produk cepat (Ctrl + K)"
                            >
                                <SearchIcon className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-emerald-600" />
                                <span className="hidden lg:inline pr-2">Cari AI, Game, App...</span>
                                <span className="lg:hidden pr-1">Cari...</span>
                                <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-sans text-[10px] font-bold text-slate-400 shadow-sm">
                                    ⌘K
                                </kbd>
                            </button>

                            {/* Primary CTA */}
                            <Link
                                href={route('catalog')}
                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-600 px-4 py-2 text-xs lg:text-sm font-bold text-white shadow-md shadow-emerald-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/35 focus:outline-none"
                            >
                                <BoltIcon className="relative h-4 w-4 text-emerald-100 transition-transform duration-300 group-hover:scale-110" />
                                <span className="relative">Belanja Instan</span>
                                <ArrowRightIcon className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </Link>
                        </div>

                        {/* Kanan Mobile: Search Icon + Hamburger */}
                        <div className="flex items-center gap-2 md:hidden">
                            <button
                                type="button"
                                onClick={() => setCmdOpen(true)}
                                aria-label="Cari produk"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/80 text-slate-600 shadow-sm transition-all hover:border-emerald-300 hover:text-emerald-600 active:scale-95"
                            >
                                <SearchIcon className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMenuOpen(true)}
                                aria-label="Buka menu navigasi"
                                aria-expanded={menuOpen}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-700 shadow-sm transition-all hover:border-emerald-300 hover:text-emerald-600 active:scale-95"
                            >
                                <MenuIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </header>
                </div>
            </div>

            {/* ===== COMMAND PALETTE / QUICK SEARCH MODAL (⌘K) ===== */}
            <div
                className={`fixed inset-0 z-[70] flex items-start justify-center px-4 pt-20 sm:pt-28 transition-all duration-200 ${
                    cmdOpen ? ' opacity-100' : 'pointer-events-none opacity-0'
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Pencarian cepat produk"
            >
                {/* Backdrop */}
                <div
                    onClick={() => setCmdOpen(false)}
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
                />

                {/* Modal Box */}
                <div
                    className={`relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-950/40 transition-all duration-200 ${
                        cmdOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
                    }`}
                >
                    <form onSubmit={executeQuickSearch} className="relative flex items-center border-b border-slate-100 px-4 py-3.5">
                        <SearchIcon className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={quickQuery}
                            onChange={(e) => setQuickQuery(e.target.value)}
                            placeholder="Ketik nama produk (cth: ChatGPT, Valorant, Netflix)..."
                            className="w-full border-none bg-transparent px-3 text-sm sm:text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0"
                        />
                        {quickQuery && (
                            <button
                                type="button"
                                onClick={() => setQuickQuery('')}
                                className="mr-2 rounded-lg p-1 text-xs font-bold text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            >
                                Hapus
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => setCmdOpen(false)}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold uppercase text-slate-400 hover:bg-slate-100"
                        >
                            ESC
                        </button>
                    </form>

                    <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <SparklesIcon className="h-3.5 w-3.5 text-emerald-500" />
                                Pencarian Populer Minggu Ini
                            </span>
                            <span className="text-[11px] text-slate-400">Klik untuk langsung mencari</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {QUICK_SEARCH_TAGS.map((item) => (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={() => handleTagClick(item.query)}
                                    className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2.5 text-left transition-all hover:border-emerald-300 hover:bg-emerald-50/50"
                                >
                                    <div>
                                        <span className="block text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                                            {item.label}
                                        </span>
                                        <span className="text-[10px] font-semibold text-slate-400">{item.tag}</span>
                                    </div>
                                    <ArrowRightIcon className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600" />
                                </button>
                            ))}
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs text-slate-400">
                            <span>Tekan <strong className="text-slate-600">Enter</strong> untuk mencari semua hasil</span>
                            <Link
                                href={route('catalog')}
                                onClick={() => setCmdOpen(false)}
                                className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                            >
                                Buka Katalog Penuh &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== MOBILE MENU FULL-SCREEN DRAWER ===== */}
            <div
                className={`fixed inset-0 z-[60] md:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
                role="dialog"
                aria-modal="true"
                aria-label="Menu navigasi mobile"
            >
                <div
                    onClick={() => setMenuOpen(false)}
                    className={`absolute inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 ${
                        menuOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                />
                <div
                    className={`absolute inset-x-3 top-3 rounded-3xl border border-white/60 bg-white/95 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl transition-all duration-300 ease-out ${
                        menuOpen ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-6 scale-[0.98] opacity-0'
                    }`}
                >
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2.5">
                            <img src={LOGO} alt="RunDev" className="h-8 w-auto object-contain" />
                            <span className="text-sm font-extrabold text-slate-900">
                                RunDev<span className="text-emerald-600">.shop</span>
                            </span>
                        </div>
                        <button
                            onClick={() => setMenuOpen(false)}
                            aria-label="Tutup menu"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 active:scale-95"
                        >
                            <CloseIcon className="h-5 w-5" />
                        </button>
                    </div>

                    <nav className="mt-4 space-y-2.5">
                        {navItems.map(({ label, desc, href, active, Icon: NIcon }, i) => (
                            <Link
                                key={label}
                                href={href}
                                style={
                                    menuOpen
                                        ? { animation: `rd-item .45s cubic-bezier(.22,1,.36,1) ${100 + i * 70}ms both` }
                                        : undefined
                                }
                                className={`group flex items-center gap-3.5 rounded-2xl border p-3.5 transition-all duration-300 active:scale-[0.98] ${
                                    active
                                        ? 'border-emerald-200 bg-gradient-to-r from-emerald-50/90 to-teal-50/90'
                                        : 'border-slate-100 bg-slate-50/70 hover:border-slate-200 hover:bg-white'
                                }`}
                            >
                                <span
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                        active
                                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25'
                                            : 'bg-white text-slate-500 shadow-sm group-hover:text-emerald-600'
                                    }`}
                                >
                                    <NIcon className="h-5 w-5" />
                                </span>
                                <span className="flex-1">
                                    <span className={`block text-sm font-extrabold ${active ? 'text-emerald-800' : 'text-slate-800'}`}>
                                        {label}
                                    </span>
                                    <span className="block text-xs text-slate-400">{desc}</span>
                                </span>
                                <ChevronRightIcon className="h-4 w-4 text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-500" />
                            </Link>
                        ))}
                    </nav>

                    <div
                        className="mt-5 space-y-3 pt-4 border-t border-slate-100"
                        style={menuOpen ? { animation: 'rd-item .45s cubic-bezier(.22,1,.36,1) 260ms both' } : undefined}
                    >
                        <a
                            href={WA_LINK}
                            target="_blank"
                            rel="noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all active:scale-[0.98]"
                        >
                            <ChatIcon className="h-4 w-4" /> Chat Admin via WhatsApp
                        </a>
                        <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            Layanan Otomatis Aktif 24 Jam
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer agar konten tidak tertutup fixed header */}
            <div className="h-24 sm:h-28" />

            {/* ===== MAIN CONTENT DENGAN SMOOTH TRANSITION ===== */}
            <main className="relative z-10 flex-grow">
                <div key={url} className="rd-page-enter">
                    {children}
                </div>
            </main>

            {/* ===== PRE-FOOTER CTA & MEGA FOOTER ===== */}
            <footer className="relative z-10 mt-20 overflow-hidden bg-slate-950 text-slate-400">
                {/* Garis Cahaya Atas */}
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent" />
                <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
                    
                    {/* Pre-Footer Banner: Konsultasi / Custom Order */}
                    <div className="mb-14 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300 mb-3">
                                    <SparklesIcon className="h-3.5 w-3.5" /> Butuh Bantuan atau Cari Produk Khusus?
                                </div>
                                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                                    Konsultasikan Kebutuhan AI Tools & Akun Game Kamu Bersama Admin
                                </h3>
                                <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                                    Bingung memilih paket berlangganan atau ingin beli borongan untuk tim/kantor? Chat kami sekarang, respons cepat dalam hitungan menit!
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 shrink-0">
                                <a
                                    href={WA_LINK}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
                                >
                                    <ChatIcon className="h-4 w-4" />
                                    Hubungi via WhatsApp
                                </a>
                                <Link
                                    href={route('catalog')}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-all"
                                >
                                    Lihat Katalog
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Grid Utama Footer */}
                    <div className="grid gap-10 pb-12 md:grid-cols-12 border-b border-white/10">
                        {/* Kolom Brand (Kiri) */}
                        <div className="md:col-span-5">
                            <div className="flex items-center gap-3">
                                <img src={LOGO} alt="RunDev" className="h-10 w-auto object-contain" />
                                <div>
                                    <span className="text-lg font-extrabold tracking-tight text-white">
                                        RunDev<span className="text-emerald-400">.shop</span>
                                    </span>
                                    <span className="block text-xs text-slate-400">Trusted Digital Store</span>
                                </div>
                            </div>
                            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
                                Marketplace produk digital, AI Tools Pro, akun game premium, dan layanan top up instan dengan jaminan legalitas 100% serta garansi penuh.
                            </p>
                            <StatusPill className="mt-5" />
                            <div className="mt-6 flex items-center gap-3">
                                {socials.map(({ label, href, Icon: SIcon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={label}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-400"
                                    >
                                        <SIcon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Kolom Navigasi Dinamis */}
                        {footerCols.map((col) => (
                            <div key={col.title} className={col.className}>
                                <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">{col.title}</h3>
                                <ul className="mt-4 space-y-2.5 text-sm">
                                    {col.links.map((l) => (
                                        <li key={l.label}>
                                            {l.external ? (
                                                <a
                                                    href={l.href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-block text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-emerald-400"
                                                >
                                                    {l.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    href={l.href}
                                                    className="inline-block text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-emerald-400"
                                                >
                                                    {l.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Payment Trust Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-b border-white/5">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                            <ShieldIcon className="h-4 w-4 text-emerald-400" />
                            <span>Metode Pembayaran Didukung:</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {PAYMENT_BADGES.map((method) => (
                                <span
                                    key={method}
                                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-bold tracking-wide text-slate-300"
                                >
                                    {method}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Giant Watermark */}
                    <div aria-hidden="true" className="mt-10 select-none overflow-hidden text-center">
                        <span className="block bg-gradient-to-b from-white/[0.06] to-transparent bg-clip-text text-[18vw] font-black leading-[0.8] tracking-tighter text-transparent md:text-[10rem]">
                            RUNDEV.SHOP
                        </span>
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row">
                        <p>&copy; {year} RunDev Digital Store. Seluruh hak cipta dilindungi.</p>
                        <p className="flex items-center gap-1.5">
                            Dirancang dengan standar kualitas tinggi oleh <strong className="text-emerald-400 font-semibold">RunDev Team</strong>
                        </p>
                    </div>
                </div>
            </footer>

            {/* ===== FLOATING QUICK-ACTION DOCK (WHATSAPP + SCROLL PROGRESS TOP) ===== */}
            <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
                {/* Tombol Back to Top dengan Conic Progress Ring */}
                <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Kembali ke atas"
                    className={`rounded-full p-[2.5px] shadow-xl shadow-slate-900/20 transition-all duration-500 hover:scale-110 active:scale-95 ${
                        scrolled ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
                    }`}
                    style={{
                        background: `conic-gradient(#10b981 ${progress}%, rgba(226,232,240,0.5) ${progress}%)`,
                    }}
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 hover:text-emerald-600 transition-colors">
                        <ArrowUpIcon className="h-4 w-4" />
                    </span>
                </button>

                {/* Tombol Floating WhatsApp Support */}
                <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Chat Admin via WhatsApp"
                    className="group relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-600/30 ring-2 ring-white transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50 active:scale-95"
                >
                    {/* Online Dot */}
                    <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                        <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
                    </span>
                    <ChatIcon className="h-5 w-5" />

                    {/* Hover Tooltip */}
                    <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100 hidden sm:block">
                        Butuh bantuan? Chat Admin
                    </span>
                </a>
            </div>
        </div>
    );
}