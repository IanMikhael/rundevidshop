import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ transactions }) {
    const formatRp = (angka) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    return (
        <AuthenticatedLayout header="Riwayat Transaksi">
            <Head title="Transaksi - Admin" />

            <div className="max-w-7xl mx-auto pb-12">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 sm:p-8 flex justify-between items-center border-b border-slate-100">
                        <div>
                            <h2 className="text-xl font-black text-slate-900">Riwayat Penjualan</h2>
                            <p className="text-sm text-slate-500 mt-1">Daftar semua transaksi yang berhasil diselesaikan.</p>
                        </div>
                        <Link href={route('admin.transactions.create')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition">
                            + Catat Transaksi Baru
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                    <th className="p-4 font-bold border-b border-slate-100">Tanggal</th>
                                    <th className="p-4 font-bold border-b border-slate-100">Info Pembeli (WA)</th>
                                    <th className="p-4 font-bold border-b border-slate-100">Produk & Varian</th>
                                    <th className="p-4 font-bold border-b border-slate-100 text-center">Qty</th>
                                    <th className="p-4 font-bold border-b border-slate-100 text-right">Total Nominal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {transactions.length === 0 ? (
                                    <tr><td colSpan="5" className="p-8 text-center text-slate-400">Belum ada transaksi tercatat.</td></tr>
                                ) : (
                                    transactions.map(trx => (
                                        <tr key={trx.id} className="hover:bg-slate-50/50 transition">
                                            <td className="p-4 text-slate-500">{formatDate(trx.created_at)}</td>
                                            <td className="p-4 font-bold text-slate-800">{trx.customer_info}</td>
                                            <td className="p-4">
                                                <span className="font-bold text-emerald-700 block">{trx.product?.title || 'Produk Dihapus'}</span>
                                                {trx.variant_name && <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md mt-1 inline-block">{trx.variant_name}</span>}
                                            </td>
                                            <td className="p-4 text-center font-bold text-slate-700">{trx.qty}</td>
                                            <td className="p-4 text-right font-black text-slate-900">{formatRp(trx.total_price)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}