<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

class Departure extends Model
{
    use HasFactory;

    protected $fillable = [
        'tour_id',
        'departure_date',
        'capacity',
        'available_seats',
        'price_adjustment',
        'is_available',
    ];

    protected $casts = [
        'departure_date' => 'date',
        'capacity' => 'integer',
        'available_seats' => 'integer',
        'price_adjustment' => 'decimal:2',
        'is_available' => 'boolean',
    ];

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function scopeAvailable($query)
    {
        return $query->where('is_available', true)
            ->where('available_seats', '>', 0)
            ->where('departure_date', '>=', Carbon::today());
    }

    public function getTotalPriceAttribute(): float
    {
        $basePrice = $this->tour->price;
        $adjustment = $this->price_adjustment;

        return $basePrice + $adjustment;
    }

    public function getIsFullyBookedAttribute(): bool
    {
        return $this->available_seats <= 0;
    }
}
