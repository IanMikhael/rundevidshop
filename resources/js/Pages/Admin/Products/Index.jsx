import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ products, filters }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.products.index'), { search: search }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout header="Kelola Produk">
            <Head title="Admin Produk" />

            {/* Container Utama dengan padding yang disesuaikan */}
            <div className="max-w-7xl mx-auto pb-12">
                
                {/* Header Action Bar (Search & Tambah) */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Daftar Produk</h2>
                        <p className="text-sm text-slate-500 mt-1">Kelola inventaris produk, harga, dan stok toko Anda.</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                        {/* Form Pencarian Modern */}
                        <form onSubmit={handleSearch} className="relative w-full sm:w-72">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                value={search} 
                                onChange={e => setSearch(e.target.value)} 
                                placeholder="Cari nama atau kategori..." 
                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
                            />
                            {/* Tombol submit disembunyikan, user cukup tekan Enter */}
                            <button type="submit" className="hidden">Cari</button>
                        </form>

                        {/* Tombol Tambah Produk Premium */}
                        <Link 
                            href={route('admin.products.create')} 
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 border border-transparent rounded-xl font-semibold text-sm text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md shadow-blue-500/30 whitespace-nowrap"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Produk
                        </Link>
                    </div>
                </div>

                {/* Card Tabel Modern */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-slate-50/80 border-b border-slate-200">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Info Produk</th>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori</th>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Harga</th>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Stok</th>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                </svg>
                                                <p className="text-slate-500 text-base font-medium">Belum ada data produk.</p>
                                                <p className="text-slate-400 text-sm mt-1">Silakan tambahkan produk baru atau ubah kata kunci pencarian.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex-shrink-0 w-12 h-12 relative">
                                                        {product.image_url ? (
                                                            <img src={product.image_url} alt={product.title} className="w-12 h-12 object-cover rounded-xl border border-slate-200 shadow-sm group-hover:scale-105 transition-transform" />
                                                        ) : (
                                                            <div className="w-12 h-12 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400">
                                                                <svg className="w-6 h-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800 mb-0.5">{product.title}</div>
                                                        <div className="text-xs text-slate-500 font-mono">ID: {product.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
                                                    {product.category?.name || 'Tanpa Kategori'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-extrabold text-slate-700">
                                                    Rp {parseInt(product.price).toLocaleString('id-ID')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {/* Logika warna stok: Merah jika tipis (<=5), Hijau jika aman */}
                                                <span className={`inline-flex items-center justify-center min-w-[2.5rem] px-2.5 py-1 rounded-md text-xs font-bold border ${
                                                    product.stock <= 5 
                                                    ? 'bg-red-50 text-red-600 border-red-100' 
                                                    : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                }`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                    
                                                    {/* Tombol Edit (Icon) */}
                                                    <Link 
                                                        href={route('admin.products.edit', product.id)} 
                                                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                        title="Edit Produk"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </Link>

                                                    {/* Tombol Hapus (Icon) */}
                                                    <button 
                                                        onClick={() => {
                                                            if(confirm('Yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.')) {
                                                                router.delete(route('admin.products.destroy', product.id));
                                                            }
                                                        }} 
                                                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Hapus Produk"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Tambahan Info Footer Tabel (Opsional) */}
                    {products.length > 0 && (
                        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                                Menampilkan total <span className="font-bold text-slate-700">{products.length}</span> produk
                            </span>
                        </div>
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}