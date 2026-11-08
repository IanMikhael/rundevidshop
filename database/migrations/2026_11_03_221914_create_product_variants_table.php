<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('name'); // Contoh: "1 Bulan", "Lifetime"
            $table->decimal('price', 15, 2); // Harga khusus untuk varian ini
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};