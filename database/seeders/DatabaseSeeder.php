<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Departure;
use App\Models\Payment;
use App\Models\Review;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        User::factory(9)->create();

        $this->call(DestinationSeeder::class);

        // Seed additional tours, departures, bookings, reviews, payments using factories
        Tour::factory(15)->create()->each(function ($tour) {
            Departure::factory(3)->create(['tour_id' => $tour->id]);
        });

        Booking::factory(20)->create()->each(function ($booking) {
            Payment::factory()->create(['booking_id' => $booking->id]);
        });

        Review::factory(25)->create();
    }
}
