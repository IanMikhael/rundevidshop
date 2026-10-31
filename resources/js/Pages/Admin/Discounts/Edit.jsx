import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function Edit({ discount, products }) {
    const { data, setData, put, processing, errors } = useForm({
        product_id: discount.product_id || '',
        discount_percentage: discount.discount_percentage || '',
        start_date: discount.start_date ? discount.start_date.slice(0, 10) : '',
        end_date: discount.end_date ? discount.end_date.slice(0, 10) : '',
    });

    // Cari nama produk awal berdasarkan product_id dari diskon yang sedang diedit
    const initialProduct = products.find(p => p.id === discount.product_id);

    // State khusus untuk custom searchable dropdown
    const [searchProduct, setSearchProduct] = useState(initialProduct ? initialProduct.title : '');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Menutup dropdown jika user klik di luar area
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter produk berdasarkan ketikan user
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchProduct.toLowerCase())
    );

    // Fungsi saat produk dipilih dari list
    const handleSelectProduct = (product) => {
        setData('product_id', product.id); // Simpan ID ke form
        setSearchProduct(product.title);   // Tampilkan nama di input
        setIsDropdownOpen(false);          // Tutup dropdown
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.discounts.update', discount.id));
    };

    return (
        <AuthenticatedLayout header="Edit Data Diskon">
            <Head title={`Edit Diskon - ID #${discount.id}`} />

            <div className="max-w-4xl mx-auto pb-12">
                
                {/* Header Section Halaman */}
                <div className="mb-6 flex items-center gap-3">
                    <Link 
                        href={route('admin.discounts.index')} 
                        className="p-2 bg-white rounded-full border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
                        title="Kembali ke Daftar Diskon"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Perbarui Promo & Diskon</h2>
                        <p className="text-sm text-slate-500">Ubah besaran potongan atau jadwal periode diskon produk.</p>
                    </div>
                </div>

                {/* Card Form Utama */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <form onSubmit={submit}>
                        
                        <div className="p-6 sm:p-8 space-y-6">
                            
                            {/* Custom Searchable Dropdown Produk */}
                            <div className="relative" ref={dropdownRef}>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Pilih Produk <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={searchProduct}
                                        onChange={(e) => {
                                            setSearchProduct(e.target.value);
                                            setData('product_id', ''); // Reset ID jika diketik ulang
                                            setIsDropdownOpen(true);
                                        }}
                                        onFocus={() => setIsDropdownOpen(true)}
                                        placeholder="Ketik untuk mencari nama produk..."
                                        className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                
                                {isDropdownOpen && (
                                    <ul className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto divide-y divide-slate-50">
                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.map(product => (
                                                <li
                                                    key={product.id}
                                                    onClick={() => handleSelectProduct(product)}
                                                    className="cursor-pointer select-none py-3 px-4 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-sm font-medium transition-colors flex items-center justify-between"
                                                >
                                                    <span>{product.title}</span>
                                                    <span className="text-xs text-slate-400 font-mono">Stok: {product.stock}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="cursor-default select-none py-4 px-4 text-slate-400 text-sm text-center">
                                                Produk tidak ditemukan.
                                            </li>
                                        )}
                                    </ul>
                                )}
                                {errors.product_id && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.product_id}</p>}
                            </div>

                            {/* Input Potongan Harga */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Potongan Harga (%) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        min="1" max="100"
                                        value={data.discount_percentage} 
                                        onChange={e => setData('discount_percentage', e.target.value)} 
                                        placeholder="Contoh: 20"
                                        className="block w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors" 
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                        <span className="text-slate-400 font-bold">%</span>
                                    </div>
                                </div>
                                {errors.discount_percentage && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.discount_percentage}</p>}
                            </div>

                            {/* Grid Tanggal Mulai & Berakhir */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Tanggal Mulai <span className="text-slate-400 font-normal">(Opsional)</span>
                                    </label>
                                    <input 
                                        type="date" 
                                        value={data.start_date} 
                                        onChange={e => setData('start_date', e.target.value)} 
                                        className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors" 
                                    />
                                    {errors.start_date && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.start_date}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Tanggal Berakhir <span className="text-slate-400 font-normal">(Opsional)</span>
                                    </label>
                                    <input 
                                        type="date" 
                                        value={data.end_date} 
                                        onChange={e => setData('end_date', e.target.value)} 
                                        className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors" 
                                    />
                                    {errors.end_date && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.end_date}</p>}
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex gap-3">
                                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    Mengubah tanggal mulai atau berakhir akan langsung memperbarui masa aktif promo diskon pada halaman katalog publik.
                                </p>
                            </div>

                        </div>

                        {/* Footer / Area Tombol Aksi */}
                        <div className="bg-slate-50 px-6 py-5 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-3">
                            <Link 
                                href={route('admin.discounts.index')} 
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
                                ) : 'Perbarui Diskon'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}