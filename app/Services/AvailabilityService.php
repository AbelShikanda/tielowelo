<?php

namespace App\Services;

use App\Models\Departure;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class AvailabilityService
{
    /**
     * Check if a departure has available seats.
     */
    public function isAvailable(Departure $departure): bool
    {
        return $departure->is_available && $departure->available_seats > 0;
    }

    /**
     * Check availability for a specific departure date on a tour.
     */
    public function checkAvailability(int $tourId, string $departureDate): ?Departure
    {
        return Departure::where('tour_id', $tourId)
            ->where('departure_date', $departureDate)
            ->where('is_available', true)
            ->where('available_seats', '>', 0)
            ->first();
    }

    /**
     * Get all available departures for a tour.
     */
    public function getAvailableDepartures(int $tourId): array
    {
        return Cache::remember(
            "tour.{$tourId}.available_departures",
            300,
            function () use ($tourId) {
                return Departure::where('tour_id', $tourId)
                    ->where('is_available', true)
                    ->where('available_seats', '>', 0)
                    ->orderBy('departure_date')
                    ->get();
            }
        );
    }

    /**
     * Reserve seats on a departure (decrement available seats).
     * Uses a database transaction and Redis lock for concurrency safety.
     */
    public function reserveSeats(Departure $departure, int $seats): bool
    {
        $lockKey = "departure.{$departure->id}.lock";

        return Cache::lock($lockKey, 10)->get(function () use ($departure, $seats) {
            return DB::transaction(function () use ($departure, $seats) {
                $departure->refresh();

                if (!$departure->is_available || $departure->available_seats < $seats) {
                    return false;
                }

                $departure->decrement('available_seats', $seats);

                if ($departure->available_seats <= 0) {
                    $departure->update(['is_available' => false]);
                }

                // Clear the cache for this tour's departures
                Cache::forget("tour.{$departure->tour_id}.available_departures");

                return true;
            });
        });
    }

    /**
     * Release reserved seats back to a departure.
     */
    public function releaseSeats(Departure $departure, int $seats): bool
    {
        return DB::transaction(function () use ($departure, $seats) {
            $departure->increment('available_seats', $seats);

            if ($departure->available_seats > 0 && !$departure->is_available) {
                $departure->update(['is_available' => true]);
            }

            Cache::forget("tour.{$departure->tour_id}.available_departures");

            return true;
        });
    }
}
