import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Edit({ product, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: product.title || '',
        category_id: product.category_id || '',
        price: product.price || '',
        stock: product.stock || '',
        description: product.description || '',
        image: null,
        _method: 'put', // Trik Wajib Laravel untuk upload file di route PUT
    });

    // State untuk preview gambar jika user memilih file baru
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setData('image', null);
            setPreviewUrl(null);
        }
    };

    // Bersihkan memory URL saat komponen unmount untuk mencegah memory leak
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.update', product.id));
    };

    // Tentukan gambar apa yang sedang ditampilkan (Gambar baru vs Gambar lama)
    const displayImage = previewUrl || product.image_url;

    return (
        <AuthenticatedLayout header="Edit Data Produk">
            <Head title={`Edit - ${product.title}`} />

            <div className="max-w-5xl mx-auto pb-12">
                
                {/* Header Section Halaman */}
                <div className="mb-6 flex items-center gap-3">
                    <Link href={route('admin.products.index')} className="p-2 bg-white rounded-full border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 line-clamp-1">{product.title}</h2>
                        <p className="text-sm text-slate-500">Perbarui informasi, harga, stok, atau gambar produk ini.</p>
                    </div>
                </div>

                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* KOLOM KIRI (Informasi Utama) */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="text-base font-bold text-slate-800 mb-5 pb-3 border-b border-slate-100">Informasi Dasar</h3>
                                
                                <div className="space-y-5">
                                    {/* Input Nama Produk */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Produk <span className="text-red-500">*</span></label>
                                        <input 
                                            type="text" 
                                            value={data.title} 
                                            onChange={e => setData('title', e.target.value)} 
                                            className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors"
                                        />
                                        {errors.title && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.title}</p>}
                                    </div>

                                    {/* Input Deskripsi */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Deskripsi Produk</label>
                                        <textarea 
                                            rows="5" 
                                            value={data.description} 
                                            onChange={e => setData('description', e.target.value)}
                                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors resize-y"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Card Harga & Stok */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="text-base font-bold text-slate-800 mb-5 pb-3 border-b border-slate-100">Harga & Inventaris</h3>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* Input Harga */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Harga Normal <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-slate-500 font-medium sm:text-sm">Rp</span>
                                            </div>
                                            <input 
                                                type="number" 
                                                value={data.price} 
                                                onChange={e => setData('price', e.target.value)} 
                                                className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors" 
                                            />
                                        </div>
                                        {errors.price && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.price}</p>}
                                    </div>
                                    
                                    {/* Input Stok */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Stok Tersedia <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                            </div>
                                            <input 
                                                type="number" 
                                                value={data.stock} 
                                                onChange={e => setData('stock', e.target.value)} 
                                                className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors" 
                                            />
                                        </div>
                                        {errors.stock && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.stock}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* KOLOM KANAN (Gambar, Kategori & Aksi) */}
                        <div className="space-y-6">
                            
                            {/* Card Media / Upload Gambar */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
                                    <h3 className="text-base font-bold text-slate-800">Media Produk</h3>
                                    {/* Indikator status gambar */}
                                    {previewUrl && <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-md uppercase">Foto Baru</span>}
                                </div>
                                
                                <div className="space-y-4">
                                    <label className="block text-sm font-semibold text-slate-700">Foto Utama</label>
                                    
                                    {/* Area Drag & Drop / Preview */}
                                    <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors relative overflow-hidden group ${previewUrl ? 'border-amber-300' : 'border-slate-300'}`}>
                                        
                                        {displayImage ? (
                                            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                                                <img src={displayImage} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <svg className="w-8 h-8 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                                    <span className="text-white text-sm font-medium">Ubah Foto</span>
                                                </div>
                                            </div>
                                        ) : (
                                            /* State Kosong (Jika produk sebelumnya tidak punya foto) */
                                            <div className="space-y-2 text-center py-4">
                                                <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="flex text-sm text-slate-600 justify-center">
                                                    <span className="relative cursor-pointer bg-transparent rounded-md font-bold text-blue-600 hover:text-blue-500">
                                                        Pilih file foto
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Input file */}
                                        <input 
                                            type="file" 
                                            onChange={handleImageChange} 
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                            accept="image/*" 
                                        />
                                    </div>
                                    <p className="text-xs text-slate-400 text-center">Abaikan jika tidak ingin mengganti foto.</p>
                                    {errors.image && <p className="text-red-500 text-xs font-medium">{errors.image}</p>}
                                </div>
                            </div>

                            {/* Card Kategori */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="text-base font-bold text-slate-800 mb-5 pb-3 border-b border-slate-100">Kategori</h3>
                                
                                <div>
                                    <select 
                                        value={data.category_id} 
                                        onChange={e => setData('category_id', e.target.value)}
                                        className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white cursor-pointer transition-colors"
                                    >
                                        <option value="" disabled>Pilih Kategori Produk...</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.category_id}</p>}
                                </div>
                            </div>

                            {/* Area Tombol Aksi */}
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3">
                                <Link 
                                    href={route('admin.products.index')} 
                                    className="flex-1 flex justify-center py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                >
                                    Batal
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing} 
                                    className="flex-1 flex justify-center py-2.5 border border-transparent rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/30"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Menyimpan...
                                        </span>
                                    ) : 'Perbarui Produk'}
                                </button>
                            </div>

                        </div>
                    </div>
                </form>

            </div>
        </AuthenticatedLayout>
    );
}