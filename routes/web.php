<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DiscountController;
use App\Http\Controllers\Admin\SettingController; // Tambahan ini
use App\Models\Product;
use App\Models\Setting; // Tambahan ini
use App\Models\Category;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'products' => Product::with(['category', 'discounts'])->latest()->get(),
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Tambahkan Rute Katalog Khusus ini di bawah rute beranda
Route::get('/katalog', function (Request $request) {
    // Mulai query pemanggilan produk
    $query = Product::with(['category', 'discounts'])->latest();

    // Jika ada kata kunci pencarian
    $query->when($request->search, function ($q, $search) {
        $q->where('title', 'like', '%' . $search . '%')
          ->orWhere('description', 'like', '%' . $search . '%');
    });

    // Jika ada filter kategori (berdasarkan ID)
    $query->when($request->category, function ($q, $category) {
        $q->where('category_id', $category);
    });

    return Inertia::render('Catalog', [
        'products' => $query->get(),
        'categories' => Category::all(),
        'filters' => $request->only(['search', 'category'])
    ]);
})->name('catalog');

Route::get('/product/{product}', function (Product $product) {
    $product->load(['category', 'discounts']);
    $setting = App\Models\Setting::first();
    
    return Inertia::render('ProductDetail', [
        'product' => $product,
        'whatsappNumber' => $setting ? $setting->whatsapp_number : '6281234567890',
        'waTemplate' => $setting ? $setting->wa_template : "Halo Admin! Saya tertarik beli [produk] harga [harga]."
    ]);
})->name('product.show');

// Ini rute dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('admin.products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('admin.products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('admin.products.store');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('admin.products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('admin.products.destroy');
    
    Route::get('/categories', [CategoryController::class, 'index'])->name('admin.categories.index');
    Route::get('/categories/create', [CategoryController::class, 'create'])->name('admin.categories.create');
    Route::post('/categories', [CategoryController::class, 'store'])->name('admin.categories.store');
    Route::get('/categories/{category}/edit', [CategoryController::class, 'edit'])->name('admin.categories.edit');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('admin.categories.destroy');

    Route::get('/discounts', [DiscountController::class, 'index'])->name('admin.discounts.index');
    Route::get('/discounts/create', [DiscountController::class, 'create'])->name('admin.discounts.create');
    Route::post('/discounts', [DiscountController::class, 'store'])->name('admin.discounts.store');
    Route::get('/discounts/{discount}/edit', [DiscountController::class, 'edit'])->name('admin.discounts.edit');
    Route::put('/discounts/{discount}', [DiscountController::class, 'update'])->name('admin.discounts.update');
    Route::delete('/discounts/{discount}', [DiscountController::class, 'destroy'])->name('admin.discounts.destroy');

    // Rute Pengaturan Toko
    Route::get('/settings', [SettingController::class, 'edit'])->name('admin.settings.edit');
    Route::put('/settings', [SettingController::class, 'update'])->name('admin.settings.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';