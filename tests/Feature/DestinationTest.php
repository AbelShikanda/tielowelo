<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Departure;
use App\Models\Destination;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DestinationTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_destinations(): void
    {
        Destination::factory()->count(3)->create();

        $response = $this->get(route('destinations.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Destinations/Index')
            ->has('destinations', 3)
        );
    }

    public function test_can_view_destination_detail(): void
    {
        $destination = Destination::factory()->create();

        $response = $this->get(route('destinations.show', $destination));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Destinations/Show')
            ->where('destination.name', $destination->name)
        );
    }

    public function test_destination_has_tours_relationship(): void
    {
        $destination = Destination::factory()->create();
        Tour::factory()->count(2)->create(['destination_id' => $destination->id]);

        $this->assertCount(2, $destination->tours);
    }
}
