<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'departure_id',
        'reference',
        'adults',
        'children',
        'total_price',
        'status',
        'customer_name',
        'customer_email',
        'customer_phone',
        'special_requests',
        'stripe_payment_intent_id',
        'payment_completed',
    ];

    protected $casts = [
        'adults' => 'integer',
        'children' => 'integer',
        'total_price' => 'decimal:2',
        'payment_completed' => 'boolean',
    ];

    public static function boot(): void
    {
        parent::boot();

        static::creating(function (Booking $booking) {
            $booking->reference = 'TLW' . strtoupper(Str::random(8));
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function departure(): BelongsTo
    {
        return $this->belongsTo(Departure::class);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    public function getTravelerCountAttribute(): int
    {
        return $this->adults + $this->children;
    }
}
