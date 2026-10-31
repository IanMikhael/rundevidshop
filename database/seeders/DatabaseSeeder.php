<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Data Kategori
        $catGame = Category::create([
            'name' => 'Akun Game',
            'slug' => 'akun-game'
        ]);

        $catAi = Category::create([
            'name' => 'Tools AI',
            'slug' => 'tools-ai'
        ]);

        // 2. Buat Data Produk
        Product::create([
            'category_id' => $catGame->id,
            'title' => 'Akun Valorant Premium',
            'description' => 'Akun Valorant rank Ascendant, full skin premium.',
            'price' => 550000.00,
            'stock' => 2,
        ]);

        Product::create([
            'category_id' => $catAi->id,
            'title' => 'ChatGPT Plus 1 Bulan',
            'description' => 'Akses ChatGPT Plus private (bukan shared account).',
            'price' => 250000.00,
            'stock' => 15,
        ]);

        Product::create([
            'category_id' => $catAi->id,
            'title' => 'Midjourney Pro Plan',
            'description' => 'Akses Midjourney untuk generate gambar AI sepuasnya.',
            'price' => 300000.00,
            'stock' => 5,
        ]);
    }
}
