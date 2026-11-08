<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DiscountController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TransactionController;
use App\Http\Controllers\Auth\AuthenticatedSessionController; // ⬅️ Controller Autentikasi
use App\Models\Product;
use App\Models\Setting;
use App\Models\Category;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Rute Publik (Dilindungi Rate Limiter 60 request/menit per IP)
|--------------------------------------------------------------------------
*/
Route::middleware('throttle:60,1')->group(function () {
    
    // Beranda Utama
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'products' => Product::with(['category', 'discounts', 'variants'])->latest()->get(),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    })->name('home');

    // Rute Katalog Publik
    Route::get('/katalog', function (Request $request) {
        $query = Product::with(['category', 'discounts', 'variants'])->latest();

        $query->when($request->search, function ($q, $search) {
            $q->where('title', 'like', '%' . $search . '%')
              ->orWhere('description', 'like', '%' . $search . '%');
        });

        $query->when($request->category, function ($q, $category) {
            $q->where('category_id', $category);
        });

        return Inertia::render('Catalog', [
            'products' => $query->get(),
            'categories' => Category::all(),
            'filters' => $request->only(['search', 'category'])
        ]);
    })->name('catalog');

    // Rute Detail Produk
    Route::get('/product/{product}', function (Product $product) {
        $product->increment('views');

        $product->load(['category', 'discounts', 'variants']);
        $setting = App\Models\Setting::first();
        
        return Inertia::render('ProductDetail', [
            'product' => $product,
            'whatsappNumber' => $setting ? $setting->whatsapp_number : '6281234567890',
            'waTemplate' => $setting ? $setting->wa_template : "Halo Admin! Saya tertarik beli [produk] harga [harga]."
        ]);
    })->name('product.show');

});

// ==========================================
// RUTE DASHBOARD ADMIN
// ==========================================
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// ==========================================
// RUTE MENU ADMIN LAINNYA
// ==========================================
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    // Rute Produk
    Route::get('/products', [ProductController::class, 'index'])->name('admin.products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('admin.products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('admin.products.store');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('admin.products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('admin.products.destroy');
    
    // Rute Kategori
    Route::get('/categories', [CategoryController::class, 'index'])->name('admin.categories.index');
    Route::get('/categories/create', [CategoryController::class, 'create'])->name('admin.categories.create');
    Route::post('/categories', [CategoryController::class, 'store'])->name('admin.categories.store');
    Route::get('/categories/{category}/edit', [CategoryController::class, 'edit'])->name('admin.categories.edit');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('admin.categories.destroy');

    // Rute Diskon
    Route::get('/discounts', [DiscountController::class, 'index'])->name('admin.discounts.index');
    Route::get('/discounts/create', [DiscountController::class, 'create'])->name('admin.discounts.create');
    Route::post('/discounts', [DiscountController::class, 'store'])->name('admin.discounts.store');
    Route::get('/discounts/{discount}/edit', [DiscountController::class, 'edit'])->name('admin.discounts.edit');
    Route::put('/discounts/{discount}', [DiscountController::class, 'update'])->name('admin.discounts.update');
    Route::delete('/discounts/{discount}', [DiscountController::class, 'destroy'])->name('admin.discounts.destroy');

    // Rute Transaksi
    Route::get('/transactions', [TransactionController::class, 'index'])->name('admin.transactions.index');
    Route::get('/transactions/create', [TransactionController::class, 'create'])->name('admin.transactions.create');
    Route::post('/transactions', [TransactionController::class, 'store'])->name('admin.transactions.store');

    // Rute Pengaturan Toko
    Route::get('/settings', [SettingController::class, 'edit'])->name('admin.settings.edit');
    Route::put('/settings', [SettingController::class, 'update'])->name('admin.settings.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ==========================================
// RUTE LOGIN RAHASIA (MENGGANTIKAN /login BAWAAN)
// ==========================================
Route::get('rundev-masuk-rahasia', [AuthenticatedSessionController::class, 'create'])
    ->name('login');

Route::post('rundev-masuk-rahasia', [AuthenticatedSessionController::class, 'store']);

// Sisa rute auth bawaan (seperti logout, password reset, dll) tetap dimuat dari sini
require __DIR__.'/auth.php';