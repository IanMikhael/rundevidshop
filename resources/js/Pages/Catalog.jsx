import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Catalog({ products, categories, filters }) {
    // State untuk menyimpan nilai pencarian & filter
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');

    // Fungsi untuk menjalankan pencarian saat form di-submit
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('catalog'), { search, category }, { preserveState: true, replace: true });
    };

    // Fungsi otomatis saat dropdown kategori diubah
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        router.get(route('catalog'), { search, category: selectedCategory }, { preserveState: true, replace: true });
    };

    // Fungsi cek diskon aktif
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

    return (
        <PublicLayout>
            <Head title="Katalog Produk" />
            
            <div className="bg-slate-50 min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Halaman & Form Filter */}
                    <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h1 className="text-2xl font-extrabold text-slate-800 border-l-4 border-emerald-500 pl-3">Katalog Produk</h1>
                        
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            {/* Input Pencarian */}
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Cari produk..." 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full sm:w-64 pl-4 pr-10 py-2 border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                                />
                                <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-emerald-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </button>
                            </div>

                            {/* Dropdown Kategori */}
                            <select 
                                value={category}
                                onChange={handleCategoryChange}
                                className="border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm cursor-pointer"
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </form>
                    </div>

                    {/* Grid Produk */}
                    {products.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                            <h3 className="text-lg font-medium text-gray-900">Produk Tidak Ditemukan</h3>
                            <p className="mt-1 text-gray-500">Coba gunakan kata kunci atau filter kategori yang berbeda.</p>
                            {/* Tombol Reset */}
                            {(search || category) && (
                                <Link href={route('catalog')} className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200">
                                    Reset Filter
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => {
                                const activeDiscount = getActiveDiscount(product.discounts);
                                const originalPrice = parseInt(product.price);
                                const finalPrice = activeDiscount 
                                    ? originalPrice - (originalPrice * (activeDiscount.discount_percentage / 100))
                                    : originalPrice;

                                return (
                                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col group relative">
                                        {activeDiscount && (
                                            <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-md shadow-md animate-pulse">
                                                -{activeDiscount.discount_percentage}%
                                            </div>
                                        )}
                                        <div className="aspect-w-4 aspect-h-3 bg-gray-100 overflow-hidden relative">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-48 flex items-center justify-center text-gray-400 bg-gray-200">No Image</div>
                                            )}
                                        </div>
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-md border border-emerald-200">{product.category?.name}</span>
                                                <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-200">Stok: {product.stock}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-2">{product.title}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{product.description || 'Tidak ada deskripsi.'}</p>
                                            
                                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                                                <div className="flex flex-col">
                                                    {activeDiscount && (
                                                        <span className="text-xs text-red-500 line-through font-semibold mb-0.5">Rp {originalPrice.toLocaleString('id-ID')}</span>
                                                    )}
                                                    <span className="text-lg font-extrabold text-slate-800">Rp {finalPrice.toLocaleString('id-ID')}</span>
                                                </div>
                                                <Link href={route('product.show', product.id)} className="bg-slate-900 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                                                    Beli
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}