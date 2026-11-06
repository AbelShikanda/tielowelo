<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Laravel\Scout\Searchable;

class Destination extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, Searchable;

    protected $fillable = [
        'name',
        'slug',
        'country',
        'description',
        'featured',
        'tour_count',
    ];

    protected static function booted(): void
    {
        static::creating(function (Destination $destination) {
            $destination->slug = Str::slug($destination->name);
        });
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images')
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp'])
            ->singleFile();
    }

    public function tours(): HasMany
    {
        return $this->hasMany(Tour::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function searchableAs(): string
    {
        return 'destinations';
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'country' => $this->country,
            'description' => $this->description,
        ];
    }
}
