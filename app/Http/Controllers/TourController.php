<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TourController extends Controller
{
    /**
     * Display a listing of tours with search/filter.
     */
    public function index(Request $request): Response
    {
        $query = Tour::with('destination');

        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('destination_id', 'like', "%{$search}%");
            });
        }

        if ($request->filled('destination')) {
            $query->where('destination_id', $request->get('destination'));
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->get('min_price'));
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->get('max_price'));
        }

        $tours = $query->orderBy('featured', 'desc')
            ->orderBy('title')
            ->paginate(9)
            ->withQueryString();

        $destinations = \App\Models\Destination::orderBy('name')->get();

        return Inertia::render('Tours/Index', [
            'tours' => $tours,
            'destinations' => $destinations,
            'filters' => $request->only(['search', 'destination', 'min_price', 'max_price']),
        ]);
    }

    /**
     * Display the specified tour.
     */
    public function show(Tour $tour): Response
    {
        $tour->load('destination');

        return Inertia::render('Tours/Show', [
            'tour' => $tour,
        ]);
    }
}
