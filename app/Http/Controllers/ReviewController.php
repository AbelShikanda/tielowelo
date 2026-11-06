<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Tour;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    /**
     * Display a listing of reviews for a tour.
     */
    public function index(Tour $tour): Response
    {
        $reviews = $tour->reviews()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        $averageRating = $reviews->isEmpty()
            ? 0
            : round($reviews->avg('rating'), 1);

        return Inertia::render('Reviews/Index', [
            'tour' => $tour->load('destination'),
            'reviews' => $reviews,
            'averageRating' => $averageRating,
            'reviewCount' => $reviews->count(),
        ]);
    }

    /**
     * Store a newly created review.
     */
    public function store(Request $request, Tour $tour): RedirectResponse
    {
        $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ]);

        $review = Review::updateOrCreate(
            [
                'tour_id' => $tour->id,
                'user_id' => $request->user()->id,
            ],
            [
                'rating' => $request->get('rating'),
                'comment' => $request->get('comment'),
            ]
        );

        return back()->with('status', 'Thank you for your review!');
    }
}
