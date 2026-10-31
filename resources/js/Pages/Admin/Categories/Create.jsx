import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.categories.store'));
    };

    return (
        <AuthenticatedLayout header="Tambah Kategori Baru">
            <Head title="Tambah Kategori" />

            <div className="max-w-4xl mx-auto pb-12">
                
                {/* Header Section Halaman */}
                <div className="mb-6 flex items-center gap-3">
                    <Link 
                        href={route('admin.categories.index')} 
                        className="p-2 bg-white rounded-full border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
                        title="Kembali ke Daftar Kategori"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Form Kategori Baru</h2>
                        <p className="text-sm text-slate-500">Tambahkan kategori baru untuk mengelompokkan produk Anda.</p>
                    </div>
                </div>

                {/* Card Form Utama */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <form onSubmit={submit}>
                        
                        {/* Area Input */}
                        <div className="p-6 sm:p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Nama Kategori <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)} 
                                    placeholder="Contoh: Tools AI, Akun Game Premium"
                                    className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors" 
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                            </div>

                            {/* Info Box (Micro-copy UI) */}
                            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex gap-3">
                                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    Sistem akan otomatis menghasilkan <strong>Slug (URL)</strong> yang ramah SEO berdasarkan nama kategori yang Anda masukkan di atas.
                                </p>
                            </div>
                        </div>

                        {/* Footer / Area Tombol Aksi */}
                        <div className="bg-slate-50 px-6 py-5 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-3">
                            <Link 
                                href={route('admin.categories.index')} 
                                className="flex items-center justify-center px-6 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                Batal
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="flex items-center justify-center px-6 py-2.5 border border-transparent rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/30"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Menyimpan...
                                    </span>
                                ) : 'Simpan Kategori'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}