<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Model; // 👈 Tambahan import Model

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // 🛡️ Mencegah aplikasi berjalan jika ada N+1 Query Problem (Non-Production)
        Model::preventLazyLoading(! app()->isProduction());
        
        // 🛡️ Mencegah data diisi ke kolom yang tidak diizinkan / Mass Assignment (Non-Production)
        Model::preventSilentlyDiscardingAttributes(! app()->isProduction());
    }
}