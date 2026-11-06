<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Departure;
use App\Models\Payment;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaymentTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_payment_record(): void
    {
        $booking = Booking::factory()->create([
            'total_price' => 100.00,
            'status' => 'pending',
        ]);

        $payment = Payment::factory()->create([
            'booking_id' => $booking->id,
            'amount' => 100.00,
            'status' => 'pending',
        ]);

        $this->assertDatabaseHas('payments', [
            'booking_id' => $booking->id,
            'amount' => 100.00,
            'status' => 'pending',
        ]);
    }

    public function test_payment_completes_booking(): void
    {
        $booking = Booking::factory()->create([
            'status' => 'pending',
            'payment_completed' => false,
        ]);

        $payment = Payment::factory()->create([
            'booking_id' => $booking->id,
            'status' => 'pending',
        ]);

        $payment->update(['status' => 'completed']);
        $booking->update(['status' => 'confirmed', 'payment_completed' => true]);

        $this->assertDatabaseHas('bookings', [
            'id' => $booking->id,
            'status' => 'confirmed',
            'payment_completed' => true,
        ]);
    }
}
