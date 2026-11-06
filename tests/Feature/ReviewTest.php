<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Departure;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_review(): void
    {
        $tour = Tour::factory()->create();
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('reviews.store', $tour), [
            'rating' => 5,
            'comment' => 'Amazing tour!',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('reviews', [
            'tour_id' => $tour->id,
            'user_id' => $user->id,
            'rating' => 5,
            'comment' => 'Amazing tour!',
        ]);
    }

    public function test_cannot_create_duplicate_review(): void
    {
        $tour = Tour::factory()->create();
        $user = User::factory()->create();
        \App\Models\Review::factory()->create([
            'tour_id' => $tour->id,
            'user_id' => $user->id,
            'rating' => 3,
        ]);

        $response = $this->actingAs($user)->post(route('reviews.store', $tour), [
            'rating' => 5,
            'comment' => 'Updated review',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('reviews', [
            'tour_id' => $tour->id,
            'user_id' => $user->id,
            'rating' => 5,
            'comment' => 'Updated review',
        ]);
        $this->assertDatabaseHas('reviews', [
            'tour_id' => $tour->id,
            'user_id' => $user->id,
        ]);
        $this->assertDatabaseCount('reviews', 1);
    }
}
