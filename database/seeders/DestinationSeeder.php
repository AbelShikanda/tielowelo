<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Destination;
use App\Models\Tour;
use App\Models\Departure;
use Carbon\Carbon;

class DestinationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $serengeti = Destination::create([
            'name' => 'Serengeti',
            'slug' => 'serengeti',
            'country' => 'Tanzania',
            'description' => 'Home to the Great Migration, the Serengeti offers unparalleled wildlife viewing across endless plains.',
            'image' => 'https://images.unsplash.com/photo-1516483638261-f4dbaf034963?w=800&q=80',
            'featured' => true,
            'tour_count' => 12,
        ]);

        $maasaiMara = Destination::create([
            'name' => 'Maasai Mara',
            'slug' => 'maasai-mara',
            'country' => 'Kenya',
            'description' => 'Famous for its exceptional population of lions, leopards, cheetahs, and the annual wildebeest migration.',
            'image' => 'https://images.unsplash.com/photo-1533168232545-b2b04b9e0301?w=800&q=80',
            'featured' => true,
            'tour_count' => 15,
        ]);

        $zanzibar = Destination::create([
            'name' => 'Zanzibar',
            'slug' => 'zanzibar',
            'country' => 'Tanzania',
            'description' => 'Tropical paradise with white sand beaches, turquoise waters, and the historic Stone Town.',
            'image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
            'featured' => true,
            'tour_count' => 8,
        ]);

        $amboseli = Destination::create([
            'name' => 'Amboseli',
            'slug' => 'amboseli',
            'country' => 'Kenya',
            'description' => 'Renowned for its large elephant herds and stunning views of Mount Kilimanjaro.',
            'image' => 'https://images.unsplash.com/photo-1540209672_420227968b2d?w=800&q=80',
            'featured' => true,
            'tour_count' => 6,
        ]);

        $serengetiTour = Tour::create([
            'destination_id' => $serengeti->id,
            'title' => 'Serengeti Great Migration Safari',
            'slug' => 'serengeti-great-migration-safari',
            'description' => 'Witness the greatest wildlife spectacle on Earth with this 5-day safari through the Serengeti.',
            'duration' => '5 days',
            'price' => 1299.00,
            'rating' => 5,
            'image' => 'https://images.unsplash.com/photo-1516483638261-f4dbaf034963?w=600&q=80',
            'itinerary' => 'Day 1: Arrival in Arusha. Day 2-4: Serengeti game drives. Day 5: Departure.',
            'inclusions' => 'Accommodation, meals, park fees, professional guide, 4x4 vehicle.',
            'featured' => true,
            'capacity' => 20,
        ]);

        Departure::create([
            'tour_id' => $serengetiTour->id,
            'departure_date' => Carbon::parse('2026-12-15'),
            'capacity' => 20,
            'available_seats' => 15,
            'price_adjustment' => 0.00,
            'is_available' => true,
        ]);

        Departure::create([
            'tour_id' => $serengetiTour->id,
            'departure_date' => Carbon::parse('2026-12-22'),
            'capacity' => 20,
            'available_seats' => 8,
            'price_adjustment' => 50.00,
            'is_available' => true,
        ]);

        Departure::create([
            'tour_id' => $serengetiTour->id,
            'departure_date' => Carbon::parse('2027-01-05'),
            'capacity' => 20,
            'available_seats' => 20,
            'price_adjustment' => 0.00,
            'is_available' => true,
        ]);

        $maasaiMaraTour = Tour::create([
            'destination_id' => $maasaiMara->id,
            'title' => 'Maasai Mara Big Cats Expedition',
            'slug' => 'maasai-mara-big-cats-expedition',
            'description' => 'Track lions, leopards, and cheetahs in the legendary Maasai Mara.',
            'duration' => '4 days',
            'price' => 999.00,
            'rating' => 5,
            'image' => 'https://images.unsplash.com/photo-1533168232545-b2b04b9e0301?w=600&q=80',
            'itinerary' => 'Day 1: Nairobi to Maasai Mara. Day 2-3: Game drives. Day 4: Return to Nairobi.',
            'inclusions' => 'Accommodation, meals, park fees, professional guide, transport.',
            'featured' => true,
            'capacity' => 15,
        ]);

        Departure::create([
            'tour_id' => $maasaiMaraTour->id,
            'departure_date' => Carbon::parse('2026-12-10'),
            'capacity' => 15,
            'available_seats' => 12,
            'price_adjustment' => 0.00,
            'is_available' => true,
        ]);

        Departure::create([
            'tour_id' => $maasaiMaraTour->id,
            'departure_date' => Carbon::parse('2026-12-28'),
            'capacity' => 15,
            'available_seats' => 3,
            'price_adjustment' => 75.00,
            'is_available' => true,
        ]);

        Departure::create([
            'tour_id' => $maasaiMaraTour->id,
            'departure_date' => Carbon::parse('2027-01-12'),
            'capacity' => 15,
            'available_seats' => 15,
            'price_adjustment' => 0.00,
            'is_available' => true,
        ]);

        $zanzibarTour = Tour::create([
            'destination_id' => $zanzibar->id,
            'title' => 'Zanzibar Beach & Spice Tour',
            'slug' => 'zanzibar-beach-spice-tour',
            'description' => 'Relax on white sand beaches and explore the spice farms of Zanzibar.',
            'duration' => '3 days',
            'price' => 549.00,
            'rating' => 5,
            'image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
            'itinerary' => 'Day 1: Stone Town tour. Day 2: Spice farm and beach. Day 3: Departure.',
            'inclusions' => 'Accommodation, meals, spice tour, boat trip.',
            'featured' => false,
            'capacity' => 25,
        ]);

        Departure::create([
            'tour_id' => $zanzibarTour->id,
            'departure_date' => Carbon::parse('2026-12-05'),
            'capacity' => 25,
            'available_seats' => 20,
            'price_adjustment' => 0.00,
            'is_available' => true,
        ]);

        Departure::create([
            'tour_id' => $zanzibarTour->id,
            'departure_date' => Carbon::parse('2026-12-20'),
            'capacity' => 25,
            'available_seats' => 2,
            'price_adjustment' => 30.00,
            'is_available' => true,
        ]);

        Departure::create([
            'tour_id' => $zanzibarTour->id,
            'departure_date' => Carbon::parse('2027-01-08'),
            'capacity' => 25,
            'available_seats' => 25,
            'price_adjustment' => 0.00,
            'is_available' => true,
        ]);

        $amboseliTour = Tour::create([
            'destination_id' => $amboseli->id,
            'title' => 'Amboseli Elephant Viewing',
            'slug' => 'amboseli-elephant-viewing',
            'description' => 'Close encounters with elephants against the backdrop of Mount Kilimanjaro.',
            'duration' => '3 days',
            'price' => 749.00,
            'rating' => 5,
            'image' => 'https://images.unsplash.com/photo-1540209672_420227968b2d?w=600&q=80',
            'itinerary' => 'Day 1: Nairobi to Amboseli. Day 2: Elephant viewing. Day 3: Return.',
            'inclusions' => 'Accommodation, meals, park fees, guide, transport.',
            'featured' => false,
            'capacity' => 18,
        ]);

        Departure::create([
            'tour_id' => $amboseliTour->id,
            'departure_date' => Carbon::parse('2026-12-12'),
            'capacity' => 18,
            'available_seats' => 10,
            'price_adjustment' => 0.00,
            'is_available' => true,
        ]);

        Departure::create([
            'tour_id' => $amboseliTour->id,
            'departure_date' => Carbon::parse('2026-12-26'),
            'capacity' => 18,
            'available_seats' => 0,
            'price_adjustment' => 0.00,
            'is_available' => false,
        ]);

        Departure::create([
            'tour_id' => $amboseliTour->id,
            'departure_date' => Carbon::parse('2027-01-15'),
            'capacity' => 18,
            'available_seats' => 18,
            'price_adjustment' => 0.00,
            'is_available' => true,
        ]);
    }
}
