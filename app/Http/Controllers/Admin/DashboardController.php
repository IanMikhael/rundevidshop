<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Total Pendapatan & Pesanan Keseluruhan
        $totalRevenue = Transaction::sum('total_price');
        $totalOrders = Transaction::count();

        // 2. Data Grafik: Pendapatan 6 Bulan Terakhir
        $chartData = collect(range(5, 0))->map(function ($i) {
            $date = Carbon::now()->subMonths($i);
            $revenue = Transaction::whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->sum('total_price');
                
            return [
                'name' => $date->translatedFormat('M Y'), // Contoh: Nov 2026
                'total' => $revenue
            ];
        })->values();

        // 3. Data Produk Paling Sering Dilihat (Top Views)
        $topViewed = Product::with('category')
            ->orderByDesc('views')
            ->take(5)
            ->get(['id', 'title', 'views', 'image_url', 'category_id', 'price']);

        return Inertia::render('Admin/Dashboard', [
            'totalRevenue' => $totalRevenue,
            'totalOrders' => $totalOrders,
            'chartData' => $chartData,
            'topViewed' => $topViewed,
        ]);
    }
}