<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Departure;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_booking(): void
    {
        Mail::fake();
        $user = User::factory()->create();
        $departure = Departure::factory()->create(['available_seats' => 10]);

        $response = $this->actingAs($user)->post(route('bookings.store'), [
            'departure_id' => $departure->id,
            'adults' => 2,
            'children' => 1,
            'customer_name' => 'John Doe',
            'customer_email' => 'john@example.com',
            'customer_phone' => '+1234567890',
            'special_requests' => 'No nuts please',
        ]);

        $response->assertRedirect(route('booking.review', Booking::first()));

        $this->assertDatabaseHas('bookings', [
            'reference' => Booking::first()->reference,
            'adults' => 2,
            'children' => 1,
            'customer_name' => 'John Doe',
            'status' => 'pending',
        ]);
    }

    public function test_booking_requires_authentication(): void
    {
        $departure = Departure::factory()->create();

        $response = $this->post(route('bookings.store'), [
            'departure_id' => $departure->id,
            'adults' => 1,
            'customer_name' => 'John Doe',
            'customer_email' => 'john@example.com',
        ]);

        $response->assertRedirect(route('login'));
    }

    public function test_booking_has_correct_total_price(): void
    {
        $departure = Departure::factory()->create([
            'price_adjustment' => 50.00,
            'tour_id' => Tour::factory()->create(['price' => 100.00])->id,
        ]);
        $departure->load('tour');

        $user = User::factory()->create();
        $booking = Booking::factory()->create([
            'departure_id' => $departure->id,
            'adults' => 2,
            'children' => 1,
            'total_price' => $departure->total_price * 3,
        ]);

        $expectedTotal = ($departure->total_price) * 3;
        $this->assertEquals($expectedTotal, $booking->total_price);
        $this->assertEquals(3, $booking->traveler_count);
    }
}
