<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with('category')
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', '%' . $search . '%')
                      ->orWhereHas('category', function ($q) use ($search) {
                          $q->where('name', 'like', '%' . $search . '%');
                      });
            })
            ->latest()
            ->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => $request->only('search')
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            // Validasi untuk array varian dinamis
            'variants' => 'nullable|array',
            'variants.*.name' => 'required_with:variants|string|max:255',
            'variants.*.price' => 'required_with:variants|numeric|min:0',
        ]);

        // Proses upload gambar
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        // 1. Simpan Produk Utama
        $product = Product::create($validated);

        // 2. Simpan Varian Produk (Jika form varian diisi)
        if ($request->has('variants') && is_array($request->variants) && count($request->variants) > 0) {
            $product->variants()->createMany($request->variants);
        }

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil ditambahkan!');
    }

    public function edit(Product $product)
    {
        // PENTING: Load relasi 'variants' agar data muncul di halaman form edit
        $product->load('variants');

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => Category::all()
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'custom_label' => 'nullable|string|max:50',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', 
            // Validasi untuk array varian dinamis
            'variants' => 'nullable|array',
            'variants.*.name' => 'required_with:variants|string|max:255',
            'variants.*.price' => 'required_with:variants|numeric|min:0',
        ]);

        // Proses jika ada upload gambar baru
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($product->image_url && str_starts_with($product->image_url, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $product->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            
            // Simpan gambar baru
            $path = $request->file('image')->store('products', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        // 1. Update Produk Utama
        $product->update($validated);

        // 2. Update Varian Produk
        if ($request->has('variants') && is_array($request->variants) && count($request->variants) > 0) {
            // Hapus varian lama, ganti dengan setingan varian yang baru dari form
            $product->variants()->delete();
            $product->variants()->createMany($request->variants);
        } else {
            // Jika form varian dikosongkan oleh admin, hapus semua varian yang menempel
            $product->variants()->delete();
        }

        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil diupdate!');
    }

    public function destroy(Product $product)
    {
        // Hapus gambar dari server saat produk dihapus
        if ($product->image_url && str_starts_with($product->image_url, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $product->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Produk berhasil dihapus!');
    }
}