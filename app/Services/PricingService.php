<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Departure;
use Illuminate\Support\Carbon;

class PricingService
{
    /**
     * Calculate the total price for a booking.
     */
    public function calculateTotalPrice(Departure $departure, int $adults, int $children): float
    {
        $travelerCount = $adults + $children;
        $perPersonPrice = $departure->total_price;

        return round($perPersonPrice * $travelerCount, 2);
    }

    /**
     * Calculate the per-person price for a departure including adjustments.
     */
    public function calculatePerPersonPrice(Departure $departure): float
    {
        return round($departure->total_price, 2);
    }

    /**
     * Calculate price breakdown for a booking.
     */
    public function calculatePriceBreakdown(Departure $departure, int $adults, int $children): array
    {
        $travelerCount = $adults + $children;
        $perPersonPrice = $departure->total_price;
        $baseTotal = $perPersonPrice * $travelerCount;

        return [
            'per_person_price' => $perPersonPrice,
            'traveler_count' => $travelerCount,
            'adults' => $adults,
            'children' => $children,
            'base_total' => $baseTotal,
            'total' => $baseTotal,
        ];
    }
}
