<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\UserBookingsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/destinations', [DestinationController::class, 'index'])->name('destinations.index');
Route::get('/destinations/{destination}', [DestinationController::class, 'show'])->name('destinations.show');
Route::get('/tours', [TourController::class, 'index'])->name('tours.index');
Route::get('/tours/{tour}', [TourController::class, 'show'])->name('tours.show');

Route::get('/tours/{tour}/availability', [AvailabilityController::class, 'index'])->name('availability.index');
Route::post('/tours/{tour}/availability/check', [AvailabilityController::class, 'check'])->name('availability.check');
Route::get('/tours/{tour}/availability/book/{departure}', [AvailabilityController::class, 'book'])->name('availability.book');

Route::get('/bookings/{booking}/review', [BookingController::class, 'review'])->name('booking.review');
Route::get('/bookings/{booking}/confirm', [BookingController::class, 'confirm'])->name('booking.confirm');
Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
Route::get('/bookings/create/{departure}', [BookingController::class, 'create'])->name('bookings.create');

Route::get('/payments/checkout/{booking}', [PaymentController::class, 'checkout'])->name('payment.checkout');
Route::get('/payments/success/{booking}', [PaymentController::class, 'success'])->name('payment.success');
Route::get('/payments/cancel/{booking}', [PaymentController::class, 'cancel'])->name('payment.cancel');
Route::post('/payments/webhook', [PaymentController::class, 'webhook'])->name('payment.webhook');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/bookings', [UserBookingsController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/{booking}', [UserBookingsController::class, 'show'])->name('bookings.show');
});

require __DIR__.'/auth.php';
