<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Departure;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'departure_id' => Departure::factory(),
            'reference' => 'TLW' . strtoupper(fake()->unique()->bothify('??????')),
            'adults' => fake()->numberBetween(1, 4),
            'children' => fake()->numberBetween(0, 2),
            'total_price' => fake()->randomElement([499, 749, 999, 1299, 1599]),
            'status' => fake()->randomElement(['pending', 'confirmed', 'paid', 'cancelled']),
            'customer_name' => fake()->name(),
            'customer_email' => fake()->unique()->safeEmail(),
            'customer_phone' => fake()->optional()->phoneNumber(),
            'special_requests' => fake()->optional()->sentence(),
            'stripe_payment_intent_id' => fake()->boolean(60) ? 'pi_' . fake()->unique()->bothify('????????????????') : null,
            'payment_completed' => fake()->boolean(60),
        ];
    }
}
