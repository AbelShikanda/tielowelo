<?php

namespace Tests\Unit;

use App\Models\Departure;
use App\Models\Tour;
use App\Services\PricingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PricingServiceTest extends TestCase
{
    use RefreshDatabase;
    public function test_calculate_total_price(): void
    {
        $tour = Tour::factory()->create(['price' => 100.00]);
        $departure = Departure::factory()->create([
            'tour_id' => $tour->id,
            'price_adjustment' => 50.00,
        ]);

        $service = new PricingService();
        $total = $service->calculateTotalPrice($departure, 2, 1);

        $this->assertEquals(450.00, $total); // (100 + 50) * 3
    }

    public function test_calculate_per_person_price(): void
    {
        $tour = Tour::factory()->create(['price' => 150.00]);
        $departure = Departure::factory()->create([
            'tour_id' => $tour->id,
            'price_adjustment' => 0.00,
        ]);

        $service = new PricingService();
        $price = $service->calculatePerPersonPrice($departure);

        $this->assertEquals(150.00, $price);
    }

    public function test_calculate_price_breakdown(): void
    {
        $tour = Tour::factory()->create(['price' => 200.00]);
        $departure = Departure::factory()->create([
            'tour_id' => $tour->id,
            'price_adjustment' => 0.00,
        ]);

        $service = new PricingService();
        $breakdown = $service->calculatePriceBreakdown($departure, 2, 1);

        $this->assertEquals(200.00, $breakdown['per_person_price']);
        $this->assertEquals(3, $breakdown['traveler_count']);
        $this->assertEquals(2, $breakdown['adults']);
        $this->assertEquals(1, $breakdown['children']);
        $this->assertEquals(600.00, $breakdown['base_total']);
        $this->assertEquals(600.00, $breakdown['total']);
    }
}
