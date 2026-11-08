import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo, useEffect, useRef } from 'react';

export default function Catalog({ products, categories, filters }) {
    // State pencarian, filter kategori, dan sorting
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category ? String(filters.category) : '');
    const [sortBy, setSortBy] = useState('latest'); 
    
    // State BARU untuk deteksi proses loading agar UI tidak berkedip (smooth transition)
    const [isSearching, setIsSearching] = useState(false);
    
    const initialRender = useRef(true);

    // ====================================================================
    // FITUR REAL-TIME SEARCH DENGAN SMOOTH TRANSITION
    // ====================================================================
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        // 1. Begitu user ngetik, langsung trigger mode loading (meredupkan layar)
        setIsSearching(true);

        const delaySearch = setTimeout(() => {
            router.get(
                route('catalog'), 
                { search, category }, 
                { 
                    preserveState: true, 
                    preserveScroll: true, 
                    replace: true,
                    // 2. Setelah server selesai kirim data, matikan mode loading
                    onFinish: () => setIsSearching(false)
                }
            );
        }, 400); // 400ms terasa lebih "snappy" dibanding 500ms

        return () => clearTimeout(delaySearch);
    }, [search, category]); 

    const handleSearchSubmit = (e) => { e.preventDefault(); };

    // Logika perhitungan harga & diskon
    const getActiveDiscount = (discounts) => {
        if (!discounts || discounts.length === 0) return null;
        const today = new Date();
        return discounts.find(discount => {
            if (!discount.start_date && !discount.end_date) return true;
            const start = discount.start_date ? new Date(discount.start_date) : null;
            const end = discount.end_date ? new Date(discount.end_date) : null;
            if (start && start > today) return false;
            if (end && end < today) return false;
            return true;
        });
    };

    const getFinalPrice = (product) => {
        const activeDiscount = getActiveDiscount(product.discounts);
        const originalPrice = parseInt(product.price);
        return activeDiscount
            ? originalPrice - (originalPrice * (activeDiscount.discount_percentage / 100))
            : originalPrice;
    };

    const clearSearch = () => setSearch('');
    
    const handleCategorySelect = (selectedCategoryId) => {
        setCategory(selectedCategoryId ? String(selectedCategoryId) : '');
    };

    const handleResetAll = () => {
        setSearch('');
        setCategory('');
        setSortBy('latest');
        router.get(route('catalog'), {}, { preserveState: true, replace: true });
    };

    const sortedProducts = useMemo(() => {
        const list = [...products];
        if (sortBy === 'price_asc') return list.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
        if (sortBy === 'price_desc') return list.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
        if (sortBy === 'discount') {
            return list.sort((a, b) => {
                const discA = getActiveDiscount(a.discounts)?.discount_percentage || 0;
                const discB = getActiveDiscount(b.discounts)?.discount_percentage || 0;
                return discB - discA;
            });
        }
        return list;
    }, [products, sortBy]);

    const activeCategoryName = useMemo(() => {
        if (!category) return null;
        const found = categories.find(c => String(c.id) === String(category));
        return found ? found.name : null;
    }, [category, categories]);

    return (
        <PublicLayout>
            <Head title="Katalog Produk - AI Tools, Game & Produk Digital" />

            <div className="bg-slate-50 min-h-screen pb-20">
                
                {/* 1. HEADER & SEARCH BANNER */}
                <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 pt-12 pb-16 overflow-hidden border-b border-slate-800">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-teal-500/15 blur-3xl pointer-events-none"></div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 font-bold text-xs mb-4 border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                            Stok Selalu Update & Siap Kirim
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
                            Eksplorasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Katalog Digital</span>
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
                            Ketik nama produk di bawah, hasil pencarian akan langsung muncul secara instan!
                        </p>

                        {/* Search Bar Real-Time */}
                        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
                            <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-xl shadow-slate-950/30 border border-white/20 focus-within:ring-2 focus-within:ring-emerald-400 transition">
                                
                                {/* Indikator Loading Spinner di Kiri (Ganti ikon kaca pembesar kalau lagi ngetik) */}
                                <div className="pl-4 pr-2 flex-shrink-0 transition-colors">
                                    {isSearching ? (
                                        <svg className="w-5 h-5 text-emerald-500 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    )}
                                </div>

                                <input
                                    type="text"
                                    placeholder="Cari ChatGPT, Valorant, Netflix, Canva..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full py-2.5 px-2 text-slate-800 placeholder-slate-400 bg-transparent border-none focus:ring-0 text-sm sm:text-base"
                                    autoComplete="off"
                                />
                                
                                {/* Tombol Clear Search (Silang) */}
                                {search && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="p-2 text-slate-400 hover:text-slate-600 transition flex-shrink-0 mr-1"
                                        title="Hapus pencarian"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* 2. FILTER BAR (KATEGORI PILLS & SORTING) */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
                    <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-100 p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                        
                        {/* Deretan Tombol Kategori (Pills) */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                            <button
                                type="button"
                                onClick={() => handleCategorySelect('')}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                                    category === ''
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                                        : 'bg-slate-50 text-slate-600 border border-slate-200/80 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/40'
                                }`}
                            >
                                <span></span> Semua Produk
                            </button>

                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => handleCategorySelect(cat.id)}
                                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                                        String(category) === String(cat.id)
                                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                                            : 'bg-slate-50 text-slate-600 border border-slate-200/80 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/40'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Dropdown Urutkan & Info Jumlah */}
                        <div className="flex items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 flex-shrink-0">
                            <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
                                Ditemukan <strong className="text-slate-700">{sortedProducts.length}</strong> produk
                            </span>

                            <div className="flex items-center gap-2">
                                <label className="text-xs font-bold text-slate-500 hidden sm:inline">Urutkan:</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
                                >
                                    <option value="latest">Terbaru</option>
                                    <option value="price_asc">Harga Termurah</option>
                                    <option value="price_desc">Harga Termahal</option>
                                    <option value="discount">Diskon Terbesar</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Indikator Filter Aktif */}
                    {(filters.search || activeCategoryName) && (
                        <div className="mt-4 flex flex-wrap items-center gap-2 px-1">
                            <span className="text-xs font-semibold text-slate-500">Filter aktif:</span>
                            
                            {filters.search && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                                    Pencarian: "{filters.search}"
                                    <button onClick={clearSearch} className="hover:text-emerald-900">✕</button>
                                </span>
                            )}

                            {activeCategoryName && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                                    Kategori: {activeCategoryName}
                                    <button onClick={() => handleCategorySelect('')} className="hover:text-emerald-900">✕</button>
                                </span>
                            )}

                            <button
                                onClick={handleResetAll}
                                className="text-xs font-bold text-rose-600 hover:text-rose-700 underline ml-2"
                            >
                                Reset Semua
                            </button>
                        </div>
                    )}
                </div>

                {/* 3. GRID PRODUK DENGAN SMOOTH FADE TRANSITION */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    {/* 👇 Wrapper ini yang bikin efek fade smooth saat mencari 👇 */}
                    <div className={`transition-all duration-300 ease-in-out ${isSearching ? 'opacity-40 scale-[0.99] pointer-events-none blur-[1px]' : 'opacity-100 scale-100 blur-0'}`}>
                        
                        {sortedProducts.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-200 border-dashed px-4">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900">Produk Tidak Ditemukan</h3>
                                <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                                    Maaf, kami tidak menemukan produk yang cocok dengan kata kunci "{search}". Coba gunakan kata kunci lain.
                                </p>
                                {(search || category) && (
                                    <button
                                        onClick={handleResetAll}
                                        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
                                    >
                                        Tampilkan Semua Produk
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {sortedProducts.map((product) => {
                                    const activeDiscount = getActiveDiscount(product.discounts);
                                    const originalPrice = parseInt(product.price);
                                    const finalPrice = getFinalPrice(product);
                                    const variantCount = product.variants?.length || 0;

                                    return (
                                        <Link
                                            key={product.id}
                                            href={route('product.show', product.id)}
                                            className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-400 transition-all duration-300 flex flex-col"
                                        >
                                            {/* Gambar Produk */}
                                            <div className="relative aspect-square sm:aspect-[4/3] bg-slate-100 overflow-hidden">
                                                {activeDiscount && (
                                                    <div className="absolute top-3 left-3 z-10 bg-rose-600 text-white text-[10px] sm:text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-md">
                                                        Hemat {activeDiscount.discount_percentage}%
                                                    </div>
                                                )}

                                                <div className="absolute bottom-2.5 left-2.5 z-10 bg-slate-900/75 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                    Instan
                                                </div>

                                                {variantCount > 0 && (
                                                    <div className="absolute bottom-2.5 right-2.5 z-10 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md">
                                                        {variantCount} Pilihan Paket
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

                                            {/* Info Produk */}
                                            <div className="p-4 sm:p-5 flex flex-col flex-grow">
                                                <div className="flex items-center justify-between gap-2 mb-2">
                                                    <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100 truncate">
                                                        {product.category?.name || 'Produk Digital'}
                                                    </span>
                                                    <span className="text-[10px] sm:text-xs font-medium text-slate-400 whitespace-nowrap">
                                                        Stok: <strong className="text-slate-600">{product.stock}</strong>
                                                    </span>
                                                </div>

                                                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1.5 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
                                                    {product.title}
                                                </h3>

                                                {product.description && (
                                                    <p className="text-xs text-slate-500 line-clamp-1 mb-3">
                                                        {product.description}
                                                    </p>
                                                )}

                                                <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col">
                                                    <div className="mb-3">
                                                        <span className="block text-[10px] text-slate-400 font-medium">
                                                            {variantCount > 0 ? 'Mulai dari' : 'Harga terbaik'}
                                                        </span>
                                                        <div className="flex items-baseline gap-1.5 flex-wrap">
                                                            <span className="text-base sm:text-lg font-extrabold text-slate-900">
                                                                Rp {finalPrice.toLocaleString('id-ID')}
                                                            </span>
                                                            {activeDiscount && (
                                                                <span className="text-[10px] sm:text-xs text-rose-500 line-through font-semibold">
                                                                    Rp {originalPrice.toLocaleString('id-ID')}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="w-full text-center bg-slate-900 group-hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                                                        <span>Pilih & Beli</span>
                                                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </PublicLayout>
    );
}