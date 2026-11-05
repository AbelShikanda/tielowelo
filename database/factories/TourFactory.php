<?php

namespace Database\Factories;

use App\Models\Destination;
use App\Models\Tour;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Tour>
 */
class TourFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titles = [
            'Great Migration Safari', 'Big Cats Expedition', 'Beach & Spice Tour',
            'Elephant Viewing', 'Gorilla Trekking', 'Chimpanzee Safari',
            'Cultural Village Tour', 'Hot Air Balloon Safari', 'Walking Safari',
            'Photography Expedition',
        ];
        $durations = ['3 days', '4 days', '5 days', '7 days', '10 days'];
        $prices = [499, 749, 999, 1299, 1599, 1999, 2499];
        $title = $titles[array_rand($titles)] . ' ' . fake()->numberBetween(1, 999);

        return [
            'destination_id' => Destination::factory(),
            'title' => $title,
            'slug' => Str::slug($title . '-' . fake()->numberBetween(1000, 9999)),
            'description' => fake()->paragraph(),
            'duration' => fake()->randomElement($durations),
            'price' => fake()->randomElement($prices),
            'rating' => fake()->numberBetween(1, 5),
            'image' => 'https://images.unsplash.com/photo-' . fake()->bothify('??????????') . '?w=600&q=80',
            'itinerary' => fake()->paragraphs(3, true),
            'inclusions' => fake()->sentence(),
            'featured' => fake()->boolean(20),
            'capacity' => fake()->numberBetween(10, 30),
        ];
    }
}
