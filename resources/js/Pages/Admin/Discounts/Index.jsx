import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ discounts, filters }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.discounts.index'), { search: search }, {
            preserveState: true,
            replace: true,
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Selamanya (Aktif)';
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <AuthenticatedLayout header="Kelola Diskon">
            <Head title="Admin Diskon" />

            <div className="max-w-7xl mx-auto pb-12">
                
                {/* Header Action Bar (Search & Tambah) */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Daftar Promo & Diskon</h2>
                        <p className="text-sm text-slate-500 mt-1">Atur potongan harga khusus dan jadwal promo produk toko Anda.</p>
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
                                placeholder="Cari nama produk..." 
                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
                            />
                            <button type="submit" className="hidden">Cari</button>
                        </form>

                        {/* Tombol Tambah Diskon */}
                        <Link 
                            href={route('admin.discounts.create')} 
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 border border-transparent rounded-xl font-semibold text-sm text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md shadow-blue-500/30 whitespace-nowrap"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Diskon
                        </Link>
                    </div>
                </div>

                {/* Card Tabel Modern */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-slate-50/80 border-b border-slate-200">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Produk Promo</th>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Potongan</th>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Mulai</th>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Berakhir</th>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {discounts.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                                </svg>
                                                <p className="text-slate-500 text-base font-medium">Belum ada promo diskon aktif.</p>
                                                <p className="text-slate-400 text-sm mt-1">Silakan tambahkan diskon baru untuk produk di toko Anda.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    discounts.map((discount) => (
                                        <tr key={discount.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center border border-rose-100">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                        </svg>
                                                    </div>
                                                    <div className="font-bold text-slate-800">{discount.product?.title || 'Produk Tidak Ditemukan'}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold bg-rose-50 text-rose-600 border border-rose-100 shadow-sm">
                                                    -{discount.discount_percentage}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">
                                                {formatDate(discount.start_date)}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">
                                                {formatDate(discount.end_date)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                    
                                                    {/* Tombol Edit */}
                                                    <Link 
                                                        href={route('admin.discounts.edit', discount.id)} 
                                                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                        title="Edit Diskon"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </Link>

                                                    {/* Tombol Hapus */}
                                                    <button 
                                                        onClick={() => {
                                                            if(confirm('Yakin ingin menghapus diskon ini?')) {
                                                                router.delete(route('admin.discounts.destroy', discount.id));
                                                            }
                                                        }} 
                                                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Hapus Diskon"
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
                    
                    {/* Footer Info Tabel */}
                    {discounts.length > 0 && (
                        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                                Menampilkan total <span className="font-bold text-slate-700">{discounts.length}</span> data promo
                            </span>
                        </div>
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}