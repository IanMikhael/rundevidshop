<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('variant_name')->nullable(); // Mencatat jika pembeli beli varian tertentu
            $table->integer('qty')->default(1);
            $table->bigInteger('total_price'); // Total harga transaksi
            $table->string('customer_info')->nullable(); // Nama atau No WA pembeli
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('transactions');
    }
};