<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Catalog extends Model
{
    protected $fillable = [
        'title',
        'date_text',
        'year',
        'thumbnail_path',
        'file_path',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'year' => 'integer',
        'sort_order' => 'integer',
    ];

    public function requests()
    {
        return $this->hasMany(CatalogRequest::class);
    }
}
