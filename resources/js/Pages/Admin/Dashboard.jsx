import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ totalRevenue, totalOrders, chartData, topViewed }) {
    
    // Format Rupiah
    const formatRp = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
    };

    // Custom Tooltip untuk Grafik
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-xl">
                    <p className="text-slate-300 text-xs font-bold mb-1">{label}</p>
                    <p className="text-emerald-400 font-extrabold text-lg">
                        {formatRp(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <AuthenticatedLayout header="Dashboard Analitik">
            <Head title="Dashboard - RunDev Admin" />

            <div className="max-w-7xl mx-auto pb-12">
                
                {/* 1. KARTU STATISTIK UTAMA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Kartu Pendapatan */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/10 relative overflow-hidden border border-slate-700">
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-emerald-500/20 blur-2xl pointer-events-none"></div>
                        <div className="relative z-10 flex items-start justify-between">
                            <div>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-2">Total Pendapatan</p>
                                <h3 className="text-3xl sm:text-4xl font-black text-white">{formatRp(totalRevenue)}</h3>
                            </div>
                            <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Kartu Total Order */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden border border-slate-100">
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none"></div>
                        <div className="relative z-10 flex items-start justify-between">
                            <div>
                                <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Total Transaksi Selesai</p>
                                <h3 className="text-3xl sm:text-4xl font-black text-slate-900">{totalOrders} <span className="text-lg text-slate-400 font-medium">Order</span></h3>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. AREA GRAFIK & TOP VIEWED */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    
                    {/* Kiri: Grafik Pendapatan 6 Bulan Terakhir (Ambil 2 Kolom) */}
                    <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-extrabold text-slate-900">Grafik Pendapatan</h3>
                                <p className="text-sm text-slate-500 mt-1">Performa penjualan 6 bulan terakhir</p>
                            </div>
                        </div>
                        
                        <div className="w-full h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `Rp ${val / 1000}k`} dx={-10} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Kanan: Daftar Produk Paling Sering Dilihat (Top Views) */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                                <span>👀</span> Paling Sering Dilihat
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">Produk dengan traffic tertinggi</p>
                        </div>

                        {topViewed.length === 0 ? (
                            <div className="flex-grow flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <span className="text-3xl mb-2">📊</span>
                                <p className="text-sm font-bold text-slate-600">Belum ada data</p>
                                <p className="text-xs text-slate-400 mt-1">Traffic produk akan muncul di sini</p>
                            </div>
                        ) : (
                            <div className="space-y-5 flex-grow">
                                {topViewed.map((product, index) => (
                                    <div key={product.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                                        <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No IMG</div>
                                            )}
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <h4 className="text-sm font-bold text-slate-900 truncate">{product.title}</h4>
                                            <p className="text-xs text-emerald-600 font-semibold mt-0.5">{product.category?.name}</p>
                                        </div>
                                        <div className="flex-shrink-0 text-right">
                                            <div className="text-sm font-black text-slate-800">{product.views}</div>
                                            <div className="text-[10px] font-semibold text-slate-400 uppercase">Views</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <Link href={route('admin.products.index')} className="w-full block text-center px-4 py-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-sm font-bold rounded-xl transition border border-slate-200 hover:border-emerald-200">
                                Kelola Katalog Produk &rarr;
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}