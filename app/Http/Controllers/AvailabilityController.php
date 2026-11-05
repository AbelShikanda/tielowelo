<?php

namespace App\Http\Controllers;

use App\Models\Departure;
use App\Models\Tour;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AvailabilityController extends Controller
{
    /**
     * Display available departures for a tour.
     */
    public function index(Request $request, Tour $tour): Response
    {
        $departures = $tour->departures()
            ->available()
            ->orderBy('departure_date')
            ->get();

        return Inertia::render('Availability/Index', [
            'tour' => $tour->load('destination'),
            'departures' => $departures,
        ]);
    }

    /**
     * Check availability for a specific departure date.
     */
    public function check(Request $request, Tour $tour): Response
    {
        $request->validate([
            'departure_date' => ['required', 'date', 'after_or_equal:today'],
        ]);

        $departure = $tour->departures()
            ->where('departure_date', $request->get('departure_date'))
            ->first();

        if (!$departure) {
            return Inertia::render('Availability/NotAvailable', [
                'tour' => $tour->load('destination'),
                'requestedDate' => $request->get('departure_date'),
            ]);
        }

        return redirect()->route('availability.book', [
            'tour' => $tour,
            'departure' => $departure,
        ]);
    }

    /**
     * Show the booking form for a selected departure.
     */
    public function book(Tour $tour, Departure $departure): Response
    {
        $departure->load('tour');

        return Inertia::render('Availability/Book', [
            'tour' => $tour,
            'departure' => $departure,
        ]);
    }
}
