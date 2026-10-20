<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CatalogRequest extends Model
{
    protected $fillable = [
        'catalog_id',
        'catalog_name',
        'name',
        'email',
        'company',
        'phone',
        'message',
        'status',
    ];

    public function catalog()
    {
        return $this->belongsTo(Catalog::class);
    }
}
