<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function edit()
    {
        $setting = Setting::firstOrCreate(
            ['id' => 1], 
            [
                'whatsapp_number' => '6281234567890',
                // Default template WA pertama kali
                'wa_template' => "Halo Admin rundevidshop! 👋\n\nSaya tertarik untuk membeli produk berikut:\n*Produk:* [produk]\n*Harga:* [harga]\n\nApakah stoknya masih tersedia?"
            ]
        );

        return Inertia::render('Admin/Settings/Edit', [
            'setting' => $setting
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'whatsapp_number' => 'required|string|max:20',
            'wa_template' => 'required|string', // Validasi template
        ]);

        $setting = Setting::first();
        $setting->update($request->only('whatsapp_number', 'wa_template'));

        return back()->with('success', 'Pengaturan berhasil diperbarui!');
    }
}