import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        {
            name: 'Dashboard',
            href: route('dashboard'),
            active: route().current('dashboard'),
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
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
            <aside className="hidden lg:flex w-[260px] flex-col bg-white border-r border-slate-200">
                
                {/* Logo Area - Fokus pada gambar logo yang proporsional */}
                <div className="h-20 flex items-center justify-center border-b border-slate-100 px-6">
                    <Link href="/" className="block w-full max-w-[160px] transition-transform hover:scale-105 duration-300">
                        {/* 
                            Pastikan file 'Logo RunDev-2.png' ada di folder public.
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
                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                        Menu Utama
                    </p>
                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                    item.active 
                                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                                }`}
                            >
                                <span className={item.active ? 'text-blue-600' : 'text-slate-400'}>
                                    {item.icon}
                                </span>
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Footer Sidebar */}
                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium px-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        RunDev Admin v2.0
                    </div>
                </div>
            </aside>

            {/* HEADER MOBILE */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-50">
                <Link href="/" className="flex items-center h-full py-2">
                    <img src="/Logo RunDev-2.png" alt="RunDev" className="h-full w-auto object-contain" />
                </Link>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg text-slate-600 bg-slate-100 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                    </svg>
                </button>
            </div>

            {/* MOBILE MENU */}
            <div className={`lg:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full pt-20 pb-6 px-4">
                    <nav className="space-y-2 flex-1">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-bold transition-all ${
                                    item.active ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {item.icon} {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* 2. AREA KONTEN UTAMA */}
            <main className="flex-1 flex flex-col min-w-0 mt-16 lg:mt-0 relative">
                
                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-20">
                    
                    {/* Bagian Judul Halaman */}
                    <div className="flex-1 min-w-0 pr-4">
                        {header ? (
                            <h1 className="text-2xl font-bold text-slate-800 tracking-tight truncate">
                                {header}
                            </h1>
                        ) : <div />}
                    </div>

                    {/* Bagian Kanan (Search & User Profile) */}
                    <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                        
                        {/* Search Input (Opsional, untuk hiasan UI) */}
                        <div className="hidden md:block relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </span>
                            <input type="text" placeholder="Cari data..." className="w-64 bg-slate-100 border-transparent text-sm focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-lg py-2 pl-10 pr-4 text-slate-700 transition-colors" />
                        </div>

                        {/* Notification Bell */}
                        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                        </button>

                        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

                        {/* Dropdown Profil Admin */}
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-none">
                                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="hidden sm:flex flex-col items-start pr-2">
                                            <span className="text-sm font-semibold text-slate-700 leading-tight">
                                                {user.name}
                                            </span>
                                            <span className="text-xs text-slate-400">Admin Utama</span>
                                        </div>
                                        <svg className="w-4 h-4 text-slate-400 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="right" width="48" classes="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden mt-1">
                                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                                        <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                    </div>
                                    <Dropdown.Link href={route('profile.edit')} className="hover:bg-slate-50 hover:text-blue-600 font-medium py-2">
                                        Pengaturan Profil
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="hover:bg-red-50 hover:text-red-600 font-medium py-2">
                                        Keluar
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Konten Utama */}
                <div className="flex-1 overflow-auto p-6 lg:p-8">
                    {/* 
                        Wrapper putih untuk membungkus konten utama (opsional, tergantung isi dari children)
                        Jika children sudah berupa card, div putih ini bisa dihapus. 
                    */}
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}