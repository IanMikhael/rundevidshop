<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Discount;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscountController extends Controller
{
    public function index(Request $request)
    {
        // Ambil data diskon, filter pencarian berdasarkan nama produk
        $discounts = Discount::with('product')
            ->when($request->search, function ($query, $search) {
                $query->whereHas('product', function ($q) use ($search) {
                    $q->where('title', 'like', '%' . $search . '%');
                });
            })
            ->latest()
            ->get();

        return Inertia::render('Admin/Discounts/Index', [
            'discounts' => $discounts,
            'filters' => $request->only('search')
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Discounts/Create', [
            'products' => Product::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'discount_percentage' => 'required|integer|min:1|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        Discount::create($validated);

        return redirect()->route('admin.discounts.index')->with('success', 'Diskon berhasil ditambahkan!');
    }

    public function edit(Discount $discount)
    {
        return Inertia::render('Admin/Discounts/Edit', [
            'discount' => $discount,
            'products' => Product::all()
        ]);
    }

    public function update(Request $request, Discount $discount)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'discount_percentage' => 'required|integer|min:1|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $discount->update($validated);

        return redirect()->route('admin.discounts.index')->with('success', 'Diskon berhasil diupdate!');
    }

    public function destroy(Discount $discount)
    {
        $discount->delete();
        return redirect()->route('admin.discounts.index')->with('success', 'Diskon dihapus!');
    }
}