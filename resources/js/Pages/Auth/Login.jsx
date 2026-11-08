import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        username_bot_trap: '', // 👈 State untuk jebakan bot
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in Admin" />

            {status && (
                <div className="mb-4 font-medium text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg text-center">
                    {status}
                </div>
            )}

            <div className="text-center mb-8">
                <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">Selamat Datang</h3>
                <p className="text-sm text-slate-500 mt-2">Masuk ke panel admin untuk mengelola toko.</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                {/* 🛡️ JEBAKAN BOT (Honeypot) - Disembunyikan dari manusia, bot otomatis akan mengisinya */}
                <div className="hidden" aria-hidden="true">
                    <input
                        type="text"
                        name="username_bot_trap"
                        value={data.username_bot_trap}
                        onChange={(e) => setData('username_bot_trap', e.target.value)}
                        tabIndex="-1"
                        autoComplete="off"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="text-slate-700 font-semibold ml-1" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="admin@rundev.com"
                        className="mt-1.5 block w-full border-slate-200 bg-slate-50/50 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 focus:ring-2 rounded-xl py-3 px-4 transition-all duration-200 text-sm"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2 text-red-500 ml-1" />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1.5 ml-1 mr-1">
                        <InputLabel htmlFor="password" value="Password" className="text-slate-700 font-semibold mb-0" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
                            >
                                Lupa Sandi?
                            </Link>
                        )}
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="••••••••"
                        className="block w-full border-slate-200 bg-slate-50/50 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 focus:ring-2 rounded-xl py-3 px-4 transition-all duration-200 text-sm"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2 text-red-500 ml-1" />
                </div>

                <div className="block pt-1 ml-1">
                    <label className="flex items-center cursor-pointer w-max group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="text-emerald-500 focus:ring-emerald-500 rounded border-slate-300 group-hover:border-emerald-400 transition-colors"
                        />
                        <span className="ms-2 text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                            Ingat Saya
                        </span>
                    </label>
                </div>

                <div className="pt-5">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full flex justify-center items-center px-4 py-3.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        {processing ? 'Memproses...' : 'Masuk ke Dashboard'}
                    </button>
                </div>
                
                <div className="text-center mt-6">
                    <Link 
                        href="/" 
                        className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Kembali ke Beranda
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}