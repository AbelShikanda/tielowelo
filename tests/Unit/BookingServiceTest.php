<?php

namespace Tests\Unit;

use App\Models\Departure;
use App\Services\BookingService;
use App\Services\PricingService;
use Tests\TestCase;

class BookingServiceTest extends TestCase
{
    public function test_service_can_be_instantiated(): void
    {
        $pricingService = new PricingService();
        $availabilityService = new \App\Services\AvailabilityService();
        $service = new BookingService($pricingService, $availabilityService);

        $this->assertInstanceOf(BookingService::class, $service);
    }
}
