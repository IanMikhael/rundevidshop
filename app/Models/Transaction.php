<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['product_id', 'variant_name', 'qty', 'total_price', 'customer_info'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}