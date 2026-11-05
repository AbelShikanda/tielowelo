<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;
use Inertia\Response;

class DestinationController extends Controller
{
    /**
     * Display a listing of destinations.
     */
    public function index(): Response
    {
        $destinations = Destination::orderBy('featured', 'desc')
            ->orderBy('name')
            ->get();

        return Inertia::render('Destinations/Index', [
            'destinations' => $destinations,
        ]);
    }

    /**
     * Display the specified destination.
     */
    public function show(Destination $destination): Response
    {
        $destination->load('tours');

        return Inertia::render('Destinations/Show', [
            'destination' => $destination,
        ]);
    }
}
