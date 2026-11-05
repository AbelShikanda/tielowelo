<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Tour extends Model
{
    use HasFactory;

    protected $fillable = [
        'destination_id',
        'title',
        'slug',
        'description',
        'duration',
        'price',
        'rating',
        'image',
        'itinerary',
        'inclusions',
        'featured',
        'capacity',
    ];

    protected static function booted(): void
    {
        static::creating(function (Tour $tour) {
            $tour->slug = Str::slug($tour->title);
        });
    }

    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
