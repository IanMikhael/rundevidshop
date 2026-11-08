import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // ==========================================
    // DAFTAR MENU SIDEBAR ADMIN
    // ==========================================
    const navItems = [
        {
            name: 'Dashboard',
            href: route('dashboard'),
            active: route().current('dashboard'),
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            )
        },
        // 👇 Menu Baru: Pencatatan Transaksi 👇
        {
            name: 'Catat Transaksi',
            href: route('admin.transactions.index'),
            active: route().current('admin.transactions.*'),
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )
        },
        {
            name: 'Kelola Produk',
            href: route('admin.products.index'),
            active: route().current('admin.products.*'),
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            )
        },
        {
            name: 'Kategori',
            href: route('admin.categories.index'),
            active: route().current('admin.categories.*'),
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            )
        },
        {
            name: 'Manajemen Diskon',
            href: route('admin.discounts.index'),
            active: route().current('admin.discounts.*'),
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
            )
        },
        {
            name: 'Pengaturan Toko',
            href: route('admin.settings.edit'),
            active: route().current('admin.settings.edit'),
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            )
        },
    ];

    return (
        // Menggunakan background abu-abu sangat muda yang elegan, sering dipakai di SaaS modern
        <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
            
            {/* 1. SIDEBAR (Putih Bersih) */}
            <aside className="hidden lg:flex w-[260px] flex-col bg-white border-r border-slate-200 shadow-sm z-30">
                
                {/* Logo Area - Fokus pada gambar logo yang proporsional */}
                <div className="h-20 flex items-center justify-center border-b border-slate-100 px-6">
                    <Link href="/" className="block w-full max-w-[160px] transition-transform hover:scale-105 duration-300">
                        {/* 
                            Pastikan file 'Logo RunDev.png' ada di folder public.
                            Gunakan object-contain agar logo tampil penuh dan rapi.
                        */}
                        <img 
                            src="/Logo RunDev.png" 
                            alt="Logo RunDev" 
                            className="w-full h-auto object-contain drop-shadow-sm" 
                        />
                    </Link>
                </div>

                {/* Bagian Navigasi */}
                <div className="flex-1 overflow-y-auto py-6 px-4 no-scrollbar">
                    <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                        Menu Utama
                    </p>
                    <nav className="space-y-1.5">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                                    item.active 
                                    ? 'bg-emerald-50 text-emerald-700 shadow-[inset_0px_0px_0px_1px_rgba(16,185,129,0.2)]' 
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <span className={item.active ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}>
                                    {item.icon}
                                </span>
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Footer Sidebar */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] font-bold uppercase tracking-wider px-2">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        RunDev Admin v2.0
                    </div>
                </div>
            </aside>

            {/* HEADER MOBILE */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-50">
                <Link href="/" className="flex items-center h-full py-2">
                    <img src="/Logo RunDev.png" alt="RunDev" className="h-full w-auto object-contain max-h-8" />
                </Link>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg text-slate-600 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                    </svg>
                </button>
            </div>

            {/* MOBILE MENU FULLSCREEN DRAWER */}
            <div className={`lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
                <div 
                    className={`absolute top-0 left-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam menu menutup menu
                >
                    <div className="flex flex-col h-full pt-20 pb-6 px-4 overflow-y-auto">
                        <nav className="space-y-2 flex-1">
                            {navItems.map((item) => (
                                <Link 
                                    key={item.name} 
                                    href={item.href} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                                        item.active 
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <span className={item.active ? 'text-emerald-600' : 'text-slate-400'}>
                                        {item.icon}
                                    </span>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* 2. AREA KONTEN UTAMA */}
            <main className="flex-1 flex flex-col min-w-0 mt-16 lg:mt-0 relative overflow-hidden">
                
                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 z-20 sticky top-0">
                    
                    {/* Bagian Judul Halaman */}
                    <div className="flex-1 min-w-0 pr-4">
                        {header ? (
                            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate flex items-center gap-2">
                                <span className="w-2 h-6 bg-emerald-500 rounded-full hidden sm:block"></span>
                                {header}
                            </h1>
                        ) : <div />}
                    </div>

                    {/* Bagian Kanan (User Profile) */}
                    <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                        {/* Dropdown Profil Admin */}
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-slate-50 transition-colors focus:outline-none border border-transparent hover:border-slate-200">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="hidden sm:flex flex-col items-start text-left">
                                            <span className="text-sm font-bold text-slate-800 leading-tight">
                                                {user.name}
                                            </span>
                                            <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">
                                                Super Admin
                                            </span>
                                        </div>
                                        <svg className="w-4 h-4 text-slate-400 hidden sm:block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="right" width="48" classes="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden mt-2">
                                    <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                                        <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                                        <p className="text-xs font-medium text-slate-500 truncate">{user.email}</p>
                                    </div>
                                    <div className="p-1.5">
                                        <Dropdown.Link href={route('profile.edit')} className="rounded-xl hover:bg-slate-50 hover:text-emerald-600 font-bold text-sm py-2 px-3 transition-colors flex items-center gap-2">
                                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            Pengaturan Akun
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="rounded-xl hover:bg-rose-50 hover:text-rose-600 font-bold text-sm py-2 px-3 transition-colors flex items-center gap-2 mt-1">
                                            <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                            Keluar (Logout)
                                        </Dropdown.Link>
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Konten Utama (Scrollable Area) */}
                <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 no-scrollbar relative">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}