<?php

namespace Database\Factories;

use App\Models\Departure;
use App\Models\Tour;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends Factory<Departure>
 */
class DepartureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departureDate = fake()->dateTimeBetween('+1 week', '+6 months');

        return [
            'tour_id' => Tour::factory(),
            'departure_date' => $departureDate,
            'capacity' => fake()->numberBetween(10, 30),
            'available_seats' => fake()->numberBetween(0, 30),
            'price_adjustment' => fake()->randomElement([0.00, 25.00, 50.00, 75.00, 100.00]),
            'is_available' => fake()->boolean(85),
        ];
    }
}
