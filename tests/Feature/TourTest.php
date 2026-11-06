<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Departure;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TourTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_tours(): void
    {
        Tour::factory()->count(3)->create();

        $response = $this->get(route('tours.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Tours/Index')
            ->has('tours.data', 3)
        );
    }

    public function test_can_view_tour_detail(): void
    {
        $tour = Tour::factory()->create();

        $response = $this->get(route('tours.show', $tour));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Tours/Show')
            ->where('tour.title', $tour->title)
        );
    }

    public function test_tour_has_departures_relationship(): void
    {
        $tour = Tour::factory()->create();
        Departure::factory()->count(3)->create(['tour_id' => $tour->id]);

        $this->assertCount(3, $tour->departures);
    }

    public function test_tour_has_reviews_relationship(): void
    {
        $tour = Tour::factory()->create();
        User::factory()->count(2)->create()->each(fn ($user) => \App\Models\Review::factory()->create([
            'tour_id' => $tour->id,
            'user_id' => $user->id,
        ]));

        $this->assertCount(2, $tour->reviews);
    }
}
