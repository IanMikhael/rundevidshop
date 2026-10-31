import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ categories, filters }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.categories.index'), { search: search }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout header="Kelola Kategori">
            <Head title="Admin Kategori" />

            <div className="max-w-7xl mx-auto pb-12">
                
                {/* Header Action Bar (Search & Tambah) */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Daftar Kategori</h2>
                        <p className="text-sm text-slate-500 mt-1">Kelola pengelompokan produk toko Anda agar mudah dicari.</p>
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
                                placeholder="Cari nama kategori..." 
                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
                            />
                            <button type="submit" className="hidden">Cari</button>
                        </form>

                        {/* Tombol Tambah Kategori */}
                        <Link 
                            href={route('admin.categories.create')} 
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 border border-transparent rounded-xl font-semibold text-sm text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md shadow-blue-500/30 whitespace-nowrap"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Kategori
                        </Link>
                    </div>
                </div>

                {/* Card Tabel Modern */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-slate-50/80 border-b border-slate-200">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">Informasi Kategori</th>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">Slug (URL)</th>
                                    <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-1/3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {categories.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                                <p className="text-slate-500 text-base font-medium">Belum ada kategori terdaftar.</p>
                                                <p className="text-slate-400 text-sm mt-1">Silakan tambahkan kategori baru untuk mulai mengelompokkan produk.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((category) => (
                                        <tr key={category.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {/* Ikon penanda list kategori */}
                                                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center border border-indigo-100">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800">{category.name}</div>
                                                        <div className="text-xs text-slate-400 font-mono mt-0.5">ID: {category.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 text-slate-600 border border-slate-200">
                                                    /{category.slug}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                    
                                                    {/* Tombol Edit */}
                                                    <Link 
                                                        href={route('admin.categories.edit', category.id)} 
                                                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                        title="Edit Kategori"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </Link>

                                                    {/* Tombol Hapus */}
                                                    <button 
                                                        onClick={() => {
                                                            if(confirm(`Yakin ingin menghapus kategori "${category.name}"? Produk yang terkait mungkin akan terpengaruh.`)) {
                                                                router.delete(route('admin.categories.destroy', category.id));
                                                            }
                                                        }} 
                                                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Hapus Kategori"
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
                    {categories.length > 0 && (
                        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                                Menampilkan total <span className="font-bold text-slate-700">{categories.length}</span> kategori
                            </span>
                        </div>
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}