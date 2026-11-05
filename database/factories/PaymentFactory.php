<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory(),
            'stripe_payment_intent_id' => 'pi_' . fake()->unique()->bothify('????????????????'),
            'stripe_checkout_session_id' => 'cs_' . fake()->unique()->bothify('????????????????'),
            'amount' => fake()->randomElement([499, 749, 999, 1299, 1599]),
            'currency' => 'usd',
            'status' => fake()->randomElement(['pending', 'completed', 'failed', 'refunded']),
            'receipt_url' => fake()->optional()->url(),
            'stripe_response' => fake()->optional()->text(200),
        ];
    }
}
