<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\UserBookingsController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/destinations', [DestinationController::class, 'index'])->name('destinations.index');
Route::get('/destinations/{destination}', [DestinationController::class, 'show'])->name('destinations.show');
Route::get('/tours', [TourController::class, 'index'])->name('tours.index');
Route::get('/tours/{tour}', [TourController::class, 'show'])->name('tours.show');

Route::get('/tours/{tour}/reviews', [ReviewController::class, 'index'])->name('reviews.index');
Route::middleware('auth')->group(function () {
    Route::post('/tours/{tour}/reviews', [ReviewController::class, 'store'])->name('reviews.store');
});

Route::get('/tours/{tour}/availability', [AvailabilityController::class, 'index'])->name('availability.index');
Route::post('/tours/{tour}/availability/check', [AvailabilityController::class, 'check'])->name('availability.check');
Route::get('/tours/{tour}/availability/book/{departure}', [AvailabilityController::class, 'book'])->name('availability.book');

Route::get('/bookings/{booking}/review', [BookingController::class, 'review'])->name('booking.review');
Route::get('/bookings/{booking}/confirm', [BookingController::class, 'confirm'])->name('booking.confirm');
Route::get('/bookings/create/{departure}', [BookingController::class, 'create'])->name('bookings.create');

Route::middleware('auth')->group(function () {
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/bookings', [UserBookingsController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/{booking}', [UserBookingsController::class, 'show'])->name('bookings.show');
});

Route::get('/payments/checkout/{booking}', [PaymentController::class, 'checkout'])->name('payment.checkout');
Route::get('/payments/success/{booking}', [PaymentController::class, 'success'])->name('payment.success');
Route::get('/payments/cancel/{booking}', [PaymentController::class, 'cancel'])->name('payment.cancel');
Route::post('/payments/webhook', [PaymentController::class, 'webhook'])->name('payment.webhook');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/locale/{locale}', function ($locale) {
    session(['locale' => $locale]);
    return back();
})->name('locale.switch');

Route::get('/sitemap.xml', function () {
    $tours = \App\Models\Tour::all();
    $destinations = \App\Models\Destination::all();
    $bookings = \App\Models\Booking::all();

    $xml = '<?xml version="1.0" encoding="UTF-8"?>';
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    $pages = ['/', '/tours', '/destinations'];
    foreach ($pages as $page) {
        $xml .= '<url>';
        $xml .= '<loc>' . config('app.url', 'http://localhost') . $page . '</loc>';
        $xml .= '<lastmod>' . now()->toISOString() . '</lastmod>';
        $xml .= '<changefreq>daily</changefreq>';
        $xml .= '<priority>0.8</priority>';
        $xml .= '</url>';
    }

    foreach ($destinations as $destination) {
        $xml .= '<url>';
        $xml .= '<loc>' . config('app.url', 'http://localhost') . '/destinations/' . $destination->slug . '</loc>';
        $xml .= '<lastmod>' . $destination->updated_at->toISOString() . '</lastmod>';
        $xml .= '<changefreq>weekly</changefreq>';
        $xml .= '<priority>0.7</priority>';
        $xml .= '</url>';
    }

    foreach ($tours as $tour) {
        $xml .= '<url>';
        $xml .= '<loc>' . config('app.url', 'http://localhost') . '/tours/' . $tour->slug . '</loc>';
        $xml .= '<lastmod>' . $tour->updated_at->toISOString() . '</lastmod>';
        $xml .= '<changefreq>weekly</changefreq>';
        $xml .= '<priority>0.8</priority>';
        $xml .= '</url>';
    }

    $xml .= '</urlset>';

    return response($xml, 200, ['Content-Type' => 'application/xml']);
})->name('sitemap');

require __DIR__.'/auth.php';