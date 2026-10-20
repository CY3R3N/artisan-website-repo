<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UpcomingEvent extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'date_text',
        'start_date',
        'end_date',
        'location',
        'stand_no',
        'image_path',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'start_date' => 'date',
        'end_date' => 'date',
    ];
}
