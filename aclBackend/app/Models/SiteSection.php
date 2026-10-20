<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSection extends Model
{
    protected $fillable = [
        'key',
        'title',
        'subtitle',
        'tagline',
        'content',
        'media_path',
        'thumb_path',
        'data',
    ];

    protected $casts = [
        'data' => 'array',
    ];
}
