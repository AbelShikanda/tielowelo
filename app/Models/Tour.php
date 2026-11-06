<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Laravel\Scout\Searchable;

class Tour extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, Searchable;

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

        static::saved(function (Tour $tour) {
            Cache::forget("tour.{$tour->id}.available_departures");
        });

        static::deleted(function (Tour $tour) {
            Cache::forget("tour.{$tour->id}.available_departures");
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

    public function searchableAs(): string
    {
        return 'tours';
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'destination' => $this->destination->name,
            'country' => $this->destination->country,
            'price' => $this->price,
            'duration' => $this->duration,
        ];
    }
}
