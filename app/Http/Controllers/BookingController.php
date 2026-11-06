<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Departure;
use App\Events\BookingCreated;
use App\Notifications\BookingConfirmedNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Show the booking wizard step 1: traveler details.
     */
    public function create(Request $request, Departure $departure): Response
    {
        $departure->load('tour');

        return Inertia::render('Booking/TravelerDetails', [
            'departure' => $departure,
        ]);
    }

    /**
     * Store a new booking.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'departure_id' => ['required', 'exists:departures,id'],
            'adults' => ['required', 'integer', 'min:1', 'max:10'],
            'children' => ['required', 'integer', 'min:0', 'max:10'],
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_email' => ['required', 'email', 'max:255'],
            'customer_phone' => ['nullable', 'string', 'max:255'],
            'special_requests' => ['nullable', 'string', 'max:1000'],
        ]);

        $departure = Departure::findOrFail($validated['departure_id']);
        $totalPrice = $departure->total_price * ($validated['adults'] + $validated['children']);

        $booking = Booking::create([
            'user_id' => $request->user()?->id,
            'departure_id' => $validated['departure_id'],
            'adults' => $validated['adults'],
            'children' => $validated['children'],
            'total_price' => $totalPrice,
            'status' => 'pending',
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'] ?? null,
            'special_requests' => $validated['special_requests'] ?? null,
        ]);

        // Fire booking created event (listeners handle emails)
        event(new BookingCreated($booking));

        // Send notification to authenticated user
        if ($request->user()) {
            $request->user()->notify(new BookingConfirmedNotification($booking));
        }

        return redirect()->route('booking.review', $booking);
    }

    /**
     * Show booking review page.
     */
    public function review(Booking $booking): Response
    {
        $booking->load('departure.tour');

        return Inertia::render('Booking/Review', [
            'booking' => $booking,
        ]);
    }

    /**
     * Show booking confirmation.
     */
    public function confirm(Booking $booking): Response
    {
        $booking->load('departure.tour');

        return Inertia::render('Booking/Confirm', [
            'booking' => $booking,
        ]);
    }
}
