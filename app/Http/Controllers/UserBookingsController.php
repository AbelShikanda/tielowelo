<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserBookingsController extends Controller
{
    /**
     * Display a listing of the user's bookings.
     */
    public function index(Request $request): Response
    {
        $bookings = $request->user()->bookings()
            ->with('departure.tour')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($booking) {
                $booking->is_upcoming = $booking->departure->departure_date >= now()->toDateString();
                return $booking;
            });

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Display the specified booking.
     */
    public function show(Request $request, Booking $booking): Response
    {
        $this->authorize('view', $booking);

        $booking->load('departure.tour');

        return Inertia::render('Bookings/Show', [
            'booking' => $booking,
        ]);
    }
}
