<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'shape',
        'category',
        'item_code',
        'description',
        'image_path',
        'gallery',
        'specifications',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'gallery' => 'array',
        'specifications' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
