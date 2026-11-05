<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Tour extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'destination_id',
        'title',
        'slug',
        'description',
        'duration',
        'price',
        'rating',
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

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images')
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);
    }

    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }

    public function departures(): HasMany
    {
        return $this->hasMany(Departure::class)->orderBy('departure_date');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class)->orderBy('created_at', 'desc');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
