<?php

namespace Database\Factories;

use App\Models\Destination;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Destination>
 */
class DestinationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $names = [
            'Serengeti', 'Maasai Mara', 'Zanzibar', 'Amboseli', 'Ngorongoro',
            'Tarangire', 'Lake Manyara', 'Selous', 'Ruaha', 'Mikumi',
            'Bwindi', 'Queen Elizabeth', 'Murchison Falls', 'Volcanoes',
            'Simien Mountains', 'Lalibela', 'Axum', 'Gonder', 'Bahir Dar',
        ];
        $countries = ['Tanzania', 'Kenya', 'Uganda', 'Rwanda', 'Ethiopia'];
        $name = $names[array_rand($names)] . ' ' . fake()->numberBetween(1, 999);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'country' => fake()->randomElement($countries),
            'description' => fake()->paragraph(),
            'image' => 'https://images.unsplash.com/photo-' . fake()->bothify('??????????') . '?w=800&q=80',
            'featured' => fake()->boolean(30),
            'tour_count' => fake()->numberBetween(1, 20),
        ];
    }
}
