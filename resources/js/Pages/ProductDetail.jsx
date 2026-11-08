import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import DOMPurify from 'dompurify';

export default function ProductDetail({ product, whatsappNumber, waTemplate }) {
    // 1. Logika Diskon
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

    const activeDiscount = getActiveDiscount(product.discounts);
    
    // Cek apakah produk memiliki varian
    const hasVariants = product.variants && product.variants.length > 0;

    // State untuk menyimpan varian yang sedang dipilih pembeli
    // Default: pilih varian pertama jika ada, jika tidak null
    const [selectedVariant, setSelectedVariant] = useState(hasVariants ? product.variants[0] : null);

    // 2. Logika Harga (Dinamis: Harga Varian terpilih ATAU Harga Utama)
    const originalPrice = selectedVariant 
        ? parseInt(selectedVariant.price) 
        : parseInt(product.price);

    const finalPrice = activeDiscount 
        ? originalPrice - (originalPrice * (activeDiscount.discount_percentage / 100))
        : originalPrice;

    // --- 3. LOGIKA REPLACE TEKS WA OTOMATIS ---
    const noWhatsApp = whatsappNumber; 
    let rawWaText = waTemplate || "Halo Admin! Saya tertarik beli [produk] harga [harga].";
    
    // Gabungkan nama produk utama dengan nama varian (jika ada varian terpilih)
    const productTitleWithVariant = selectedVariant 
        ? `${product.title} (${selectedVariant.name})`
        : product.title;

    rawWaText = rawWaText.replace(/\[produk\]/gi, productTitleWithVariant);
    rawWaText = rawWaText.replace(/\[harga\]/gi, `Rp ${finalPrice.toLocaleString('id-ID')}`);

    const textWa = encodeURIComponent(rawWaText);
    const waLink = `https://wa.me/${noWhatsApp}?text=${textWa}`;

    return (
        <PublicLayout>
            <Head title={`Jual ${product.title}`} />
            
            <div className="bg-slate-50 min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumb Navigation */}
                    <nav className="flex mb-8 text-sm text-gray-500">
                        <Link href="/" className="hover:text-emerald-600 transition">Beranda</Link>
                        <span className="mx-2">/</span>
                        <span className="hover:text-emerald-600 transition cursor-pointer">{product.category?.name}</span>
                        <span className="mx-2">/</span>
                        <span className="text-slate-800 font-semibold">{product.title}</span>
                    </nav>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
                            
                            {/* Kolom Kiri: Foto Produk */}
                            <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-w-4 aspect-h-3 md:aspect-square flex items-center justify-center">
                                {activeDiscount && (
                                    <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-sm font-extrabold px-3 py-1.5 rounded-md shadow-lg animate-pulse">
                                        Diskon {activeDiscount.discount_percentage}%
                                    </div>
                                )}
                                {product.image_url ? (
                                    <img 
                                        src={product.image_url} 
                                        alt={product.title} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-400">No Image Available</span>
                                )}
                            </div>

                            {/* Kolom Kanan: Detail Produk */}
                            <div className="flex flex-col justify-center">
                                <div className="mb-2">
                                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-md border border-emerald-200">
                                        {product.category?.name}
                                    </span>
                                </div>
                                
                                <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{product.title}</h1>
                                
                                {/* Harga */}
                                <div className="mb-6 pb-6 border-b border-gray-100">
                                    {activeDiscount && (
                                        <p className="text-gray-500 line-through text-lg mb-1">
                                            Rp {originalPrice.toLocaleString('id-ID')}
                                        </p>
                                    )}
                                    <p className="text-4xl font-extrabold text-emerald-600">
                                        Rp {finalPrice.toLocaleString('id-ID')}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Stok Tersedia: <span className="font-semibold text-slate-700">{product.stock} pcs</span>
                                    </p>
                                </div>

                                {/* --- AREA VARIAN PRODUK (Akan Muncul Jika Varian > 0) --- */}
                                {hasVariants && (
                                    <div className="mb-8">
                                        <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                                            Pilih Varian
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {product.variants.map((variant) => (
                                                <button
                                                    key={variant.id}
                                                    onClick={() => setSelectedVariant(variant)}
                                                    className={`px-4 py-2.5 rounded-lg border-2 text-sm font-bold transition-all duration-200 ${
                                                        selectedVariant?.id === variant.id
                                                            ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-sm'
                                                            : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {variant.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* --- END AREA VARIAN --- */}

                                {/* Deskripsi */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-bold text-slate-800 mb-2">Deskripsi Produk</h3>
                                        <div 
                                            className="text-gray-600 whitespace-pre-line leading-relaxed"
                                            dangerouslySetInnerHTML={{ 
                                                __html: product.description 
                                                    ? DOMPurify.sanitize(product.description) 
                                                    : 'Belum ada deskripsi mendetail untuk produk ini.' 
                                            }} 
                                        />
                                    </div>

                                {/* Tombol Aksi */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a 
                                        href={waLink} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold py-3 px-6 rounded-xl shadow-md transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.937 0 3.825-3.113 6.938-6.938 6.938z"/></svg>
                                        Beli via WhatsApp
                                    </a>
                                    <Link 
                                        href="/" 
                                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-slate-800 font-semibold rounded-xl text-center transition"
                                    >
                                        Kembali
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}