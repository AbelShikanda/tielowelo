<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Departure;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BookingService
{
    protected PricingService $pricingService;
    protected AvailabilityService $availabilityService;

    /**
     * Create a new service instance.
     */
    public function __construct(
        PricingService $pricingService,
        AvailabilityService $availabilityService
    ) {
        $this->pricingService = $pricingService;
        $this->availabilityService = $availabilityService;
    }

    /**
     * Create a new booking with payment and seat reservation in a transaction.
     */
    public function createBooking(array $data): Booking
    {
        return DB::transaction(function () use ($data) {
            $departure = Departure::findOrFail($data['departure_id']);

            // Verify seats are still available
            if (!$this->availabilityService->isAvailable($departure)) {
                throw new \Exception('No seats available for this departure.');
            }

            $travelerCount = $data['adults'] + $data['children'];

            // Reserve seats
            if (!$this->availabilityService->reserveSeats($departure, $travelerCount)) {
                throw new \Exception('Failed to reserve seats. Please try again.');
            }

            // Calculate total price
            $totalPrice = $this->pricingService->calculateTotalPrice(
                $departure,
                $data['adults'],
                $data['children']
            );

            // Create the booking
            $booking = Booking::create([
                'user_id' => $data['user_id'] ?? null,
                'departure_id' => $data['departure_id'],
                'reference' => 'TLW' . strtoupper(\Illuminate\Support\Str::random(8)),
                'adults' => $data['adults'],
                'children' => $data['children'],
                'total_price' => $totalPrice,
                'status' => 'pending',
                'customer_name' => $data['customer_name'],
                'customer_email' => $data['customer_email'],
                'customer_phone' => $data['customer_phone'] ?? null,
                'special_requests' => $data['special_requests'] ?? null,
            ]);

            Log::info('Booking created', [
                'booking_id' => $booking->id,
                'reference' => $booking->reference,
                'departure_id' => $departure->id,
                'total_price' => $totalPrice,
            ]);

            return $booking;
        });
    }

    /**
     * Cancel a booking and release seats.
     */
    public function cancelBooking(Booking $booking): bool
    {
        return DB::transaction(function () use ($booking) {
            $booking->status = 'cancelled';
            $booking->save();

            if ($booking->payment_completed) {
                $departure = $booking->departure;
                $travelerCount = $booking->adults + $booking->children;
                $this->availabilityService->releaseSeats($departure, $travelerCount);
            }

            return true;
        });
    }
}
