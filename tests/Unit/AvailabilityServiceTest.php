<?php

namespace Tests\Unit;

use App\Models\Departure;
use App\Services\AvailabilityService;
use Tests\TestCase;

class AvailabilityServiceTest extends TestCase
{
    public function test_is_available_returns_true_when_available(): void
    {
        $service = new AvailabilityService();
        $departure = new Departure([
            'is_available' => true,
            'available_seats' => 5,
        ]);

        $this->assertTrue($service->isAvailable($departure));
    }

    public function test_is_available_returns_false_when_unavailable(): void
    {
        $service = new AvailabilityService();
        $departure = new Departure([
            'is_available' => false,
            'available_seats' => 0,
        ]);

        $this->assertFalse($service->isAvailable($departure));
    }

    public function test_is_available_returns_false_when_no_seats(): void
    {
        $service = new AvailabilityService();
        $departure = new Departure([
            'is_available' => true,
            'available_seats' => 0,
        ]);

        $this->assertFalse($service->isAvailable($departure));
    }
}
