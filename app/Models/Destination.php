<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'country',
        'description',
        'image',
        'featured',
        'tour_count',
    ];

    protected static function booted(): void
    {
        static::creating(function (Destination $destination) {
            $destination->slug = Str::slug($destination->name);
        });
    }

    public function tours(): HasMany
    {
        return $this->hasMany(Tour::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
