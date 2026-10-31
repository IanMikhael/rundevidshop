import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ products }) {
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

      {/* 1. HERO SECTION - Tampilan Terang & Segar */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-16 pb-28 lg:pt-24 lg:pb-32 overflow-hidden border-b border-emerald-100">
        {/* Ornamen Latar Belakang */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-200/40 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Teks Hero di Kiri */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm mb-6 border border-emerald-200">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                Toko Produk Digital #1
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Kebutuhan Digitalmu, <br className="hidden lg:block" />
                <span className="text-emerald-600">Lebih Cepat & Murah.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Temukan AI Tools premium dan Akun Game favoritmu di sini. Transaksi aman, proses instan, dan langsung bisa kamu gunakan sekarang juga.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href={route('catalog')} 
                  className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Belanja Sekarang
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Ilustrasi/Mockup di Kanan (Floating Cards) */}
            <div className="w-full lg:w-1/2 hidden lg:flex justify-center relative">
              <div className="relative w-full max-w-md">
                <div className="absolute top-0 -left-4 w-72 h-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 transform -rotate-6 animate-pulse-slow z-10">
                  <div className="flex gap-4 items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-20 bg-slate-50 rounded-lg border border-slate-100"></div>
                </div>
                
                <div className="absolute top-20 right-0 w-72 h-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 transform rotate-3 z-20">
                  <div className="w-full h-28 bg-emerald-50 rounded-lg mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-emerald-200 rounded w-1/3"></div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="h-6 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-8 bg-emerald-600 rounded-lg w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST BAR - Pindah ke atas, gaya menumpuk (Overlapping) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-12 sm:-mt-16">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8 flex flex-col md:flex-row justify-around gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="flex items-center gap-4 md:px-4">
            <div className="w-12 h-12 flex-shrink-0 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Proses Instan</h3>
              <p className="text-sm text-slate-500">Otomatis masuk email</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:px-4 pt-4 md:pt-0">
            <div className="w-12 h-12 flex-shrink-0 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">100% Legal</h3>
              <p className="text-sm text-slate-500">Garansi anti-suspend</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:px-4 pt-4 md:pt-0">
            <div className="w-12 h-12 flex-shrink-0 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Harga Terbaik</h3>
              <p className="text-sm text-slate-500">Banyak diskon menarik</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PRODUCT SECTION - Tampilan Grid Minimalis */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Sedang Populer 🔥</h2>
              <p className="text-slate-500 mt-2">Produk yang paling banyak dibeli minggu ini.</p>
            </div>
            <Link href={route('catalog')} className="hidden sm:inline-flex text-emerald-600 font-bold hover:text-emerald-700 transition-colors items-center gap-1">
              Lihat Semua <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-200 border-dashed">
              <div className="text-slate-300 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Produk Kosong</h3>
              <p className="mt-2 text-slate-500">Admin sedang menyiapkan produk terbaik untuk Anda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => {
                const activeDiscount = getActiveDiscount(product.discounts);
                const originalPrice = parseInt(product.price);
                const finalPrice = activeDiscount 
                  ? originalPrice - (originalPrice * (activeDiscount.discount_percentage / 100))
                  : originalPrice;

                return (
                  <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col">
                    
                    {/* Gambar Produk */}
                    <div className="relative aspect-square sm:aspect-[4/3] bg-slate-100 overflow-hidden">
                      {activeDiscount && (
                        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                          Diskon {activeDiscount.discount_percentage}%
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
                          <svg className="w-10 h-10 mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                      )}
                    </div>

                    {/* Info Produk */}
                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 mb-2 block uppercase tracking-wider">
                        {product.category?.name || 'Umum'}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors">
                        {product.title}
                      </h3>
                      
                      <div className="mt-auto pt-4 flex flex-col">
                        {activeDiscount && (
                          <span className="text-[10px] sm:text-xs text-slate-400 line-through mb-0.5">
                            Rp {originalPrice.toLocaleString('id-ID')}
                          </span>
                        )}
                        <span className="text-base sm:text-lg font-extrabold text-slate-900 mb-4">
                          Rp {finalPrice.toLocaleString('id-ID')}
                        </span>
                        
                        <Link 
                          href={route('product.show', product.id)} 
                          className="w-full text-center bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-100 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
                        >
                          Beli Sekarang
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
            <Link href={route('catalog')} className="inline-block bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold">
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}