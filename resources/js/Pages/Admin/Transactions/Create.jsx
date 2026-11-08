import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ products }) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        customer_info: '',
        variant_name: '',
        qty: 1,
        total_price: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.transactions.store'));
    };

    return (
        <AuthenticatedLayout header="Catat Transaksi Manual">
            <Head title="Catat Transaksi Baru" />

            <div className="max-w-3xl mx-auto pb-12">
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-slate-900">Catat Pesanan Masuk</h2>
                        <p className="text-slate-500 text-sm mt-1">Data ini akan memperbarui grafik pendapatan di Dashboard dan memotong stok produk secara otomatis.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* 1. Pilih Produk */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Produk Terjual <span className="text-red-500">*</span></label>
                            <select
                                value={data.product_id}
                                onChange={e => setData('product_id', e.target.value)}
                                className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                            >
                                <option value="" disabled>-- Pilih Produk --</option>
                                {products.map(p => (
                                    <option key={p.id} value={p.id}>{p.title}</option>
                                ))}
                            </select>
                            {errors.product_id && <p className="text-red-500 text-xs mt-1">{errors.product_id}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 2. Info Pembeli */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Info Pembeli (Nama / No WA) <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={data.customer_info}
                                    onChange={e => setData('customer_info', e.target.value)}
                                    placeholder="Cth: 0812345... (Broky)"
                                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                />
                                {errors.customer_info && <p className="text-red-500 text-xs mt-1">{errors.customer_info}</p>}
                            </div>

                            {/* 3. Varian (Opsional) */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Varian Paket (Opsional)</label>
                                <input
                                    type="text"
                                    value={data.variant_name}
                                    onChange={e => setData('variant_name', e.target.value)}
                                    placeholder="Cth: 1 Bulan Premium"
                                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                            {/* 4. Qty */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Jumlah Beli (Qty) <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.qty}
                                    onChange={e => setData('qty', e.target.value)}
                                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>

                            {/* 5. Total Pendapatan */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Total Transfer Masuk <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-slate-500 font-bold">Rp</span>
                                    <input
                                        type="number"
                                        value={data.total_price}
                                        onChange={e => setData('total_price', e.target.value)}
                                        placeholder="50000"
                                        className="w-full rounded-xl border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-1">Masukkan nominal uang yang dibayarkan tanpa titik (contoh: 50000)</p>
                                {errors.total_price && <p className="text-red-500 text-xs mt-1">{errors.total_price}</p>}
                            </div>
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Link href={route('dashboard')} className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition">Batal</Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-8 py-3 rounded-xl bg-emerald-600 text-white font-black hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/30 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Transaksi'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}