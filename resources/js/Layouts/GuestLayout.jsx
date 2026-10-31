import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            
            {/* Soft Animated Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200/40 mix-blend-multiply filter blur-[100px] animate-pulse"></div>
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-200/40 mix-blend-multiply filter blur-[100px]"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-200/40 mix-blend-multiply filter blur-[100px] animate-pulse"></div>

            {/* Floating Glass Card */}
            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden relative z-10 p-8 sm:p-10">
                <div className="flex justify-center mb-8">
                    <Link href="/">
                        <img src="/Logo RunDev.png" alt="RunDev Logo" className="h-14 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105 duration-300" />
                    </Link>
                </div>
                
                {children}
            </div>
            
            {/* Footer Text */}
            <div className="absolute bottom-6 text-xs text-slate-400 z-10 font-medium tracking-wide">
                &copy; {new Date().getFullYear()} RunDevidshop. All rights reserved.
            </div>
        </div>
    );
}