<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    // 1. Halaman Daftar Transaksi
    public function index()
    {
        $transactions = Transaction::with('product')->latest()->get();
        return Inertia::render('Admin/Transactions/Index', [
            'transactions' => $transactions
        ]);
    }

    // 2. Halaman Form Catat Transaksi Baru
    public function create()
    {
        // Ambil produk yang stoknya masih ada
        $products = Product::where('stock', '>', 0)->get(['id', 'title', 'price']);
        return Inertia::render('Admin/Transactions/Create', [
            'products' => $products
        ]);
    }

    // 3. Proses Simpan Transaksi & Potong Stok
        public function store(Request $request)
            {
                // 1. Validasi Super Ketat (Tolak angka minus/nol, pastikan produk valid)
                $validated = $request->validate([
                    'product_id' => 'required|exists:products,id',
                    'customer_info' => 'required|string|max:255',
                    'variant_name' => 'nullable|string|max:255',
                    'qty' => 'required|integer|min:1', // WAJIB minimal 1
                    'total_price' => 'required|numeric|min:0', // Tidak boleh negatif
                ]);

                // 2. Mencegah BOLA/IDOR: Gunakan findOrFail agar langsung error 404 jika ID ditembak sembarangan
                $product = Product::findOrFail($request->product_id);

                // 3. Pengecekan Logika: Jangan izinkan transaksi jika stok kurang!
                if ($product->stock < $request->qty) {
                    return back()->withErrors([
                        'qty' => 'Sistem Keamanan: Transaksi ditolak karena sisa stok hanya ' . $product->stock
                    ]);
                }

                // 4. Eksekusi Aman
                Transaction::create($validated);
                $product->decrement('stock', $request->qty);

                return redirect()->route('admin.transactions.index')
                    ->with('success', 'Transaksi berhasil dicatat dengan aman & Stok otomatis dikurangi!');
            }
}