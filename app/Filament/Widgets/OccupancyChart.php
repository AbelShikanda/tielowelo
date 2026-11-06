<?php

namespace App\Filament\Widgets;

use App\Models\Tour;
use Filament\Widgets\ChartWidget;

class OccupancyChart extends ChartWidget
{
    protected static ?string $heading = 'Bookings per Tour';

    protected function getData(): array
    {
        $tours = Tour::withCount('bookings as booking_count')->limit(10)->get();

        return [
            'datasets' => [
                [
                    'label' => 'Bookings',
                    'data' => $tours->pluck('booking_count'),
                    'borderColor' => '#3b82f6',
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                ],
            ],
            'labels' => $tours->pluck('title'),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
