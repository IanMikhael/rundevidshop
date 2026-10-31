import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ setting }) {
    const { data, setData, put, processing, errors } = useForm({
        whatsapp_number: setting?.whatsapp_number || '',
        wa_template: setting?.wa_template || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.settings.update'));
    };

    return (
        <AuthenticatedLayout header="Pengaturan Toko">
            <Head title="Pengaturan Toko" />

            <div className="max-w-4xl mx-auto pb-12">
                
                {/* Header Section Halaman */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-800">Konfigurasi WhatsApp & Toko</h2>
                    <p className="text-sm text-slate-500 mt-1">Atur nomor WhatsApp admin dan format pesan otomatis untuk transaksi pembeli.</p>
                </div>

                {/* Card Form Utama */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <form onSubmit={submit}>
                        
                        <div className="p-6 sm:p-8 space-y-6">
                            
                            {/* Input Nomor WhatsApp Admin */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Nomor WhatsApp Admin <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <span className="text-slate-400 font-bold">+</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        value={data.whatsapp_number} 
                                        onChange={e => setData('whatsapp_number', e.target.value)} 
                                        placeholder="6289624501390"
                                        className="block w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors" 
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-1.5">Gunakan format kode negara di depan, contoh: 628123456789 (tanpa spasi atau tanda hubung).</p>
                                {errors.whatsapp_number && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.whatsapp_number}</p>}
                            </div>

                            {/* Input Template WA */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Format Pesan WhatsApp (Otomatis)
                                </label>
                                <textarea 
                                    rows="6" 
                                    value={data.wa_template} 
                                    onChange={e => setData('wa_template', e.target.value)}
                                    placeholder="Halo Admin, saya ingin memesan..."
                                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors resize-y"
                                ></textarea>
                                {errors.wa_template && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.wa_template}</p>}
                                
                                {/* Info Box Panduan Kode Unik */}
                                <div className="mt-4 p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 flex gap-3">
                                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="text-sm text-emerald-900 space-y-1">
                                        <p className="font-bold">Tips Kode Unik Template Pesan:</p>
                                        <ul className="list-disc list-inside text-xs text-emerald-800 space-y-0.5">
                                            <li>Gunakan <code className="bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-700 font-mono font-bold">[produk]</code> untuk memunculkan nama produk secara otomatis.</li>
                                            <li>Gunakan <code className="bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-700 font-mono font-bold">[harga]</code> untuk memunculkan nominal harga secara otomatis.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Footer / Area Tombol Aksi */}
                        <div className="bg-slate-50 px-6 py-5 border-t border-slate-200 flex justify-end">
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
                                ) : 'Simpan Pengaturan'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}