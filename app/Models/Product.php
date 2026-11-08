<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'category_id', 'title', 'description', 
        'price', 'stock', 'image_url', 'custom_label','views'
    ];

    // Tambahkan relasi ini di dalam class Product
    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function discounts(): HasMany
    {
        return $this->hasMany(Discount::class);
    }
}
