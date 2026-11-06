<?php

namespace App\Filament\Pages;

use App\Models\Booking;
use App\Models\Destination;
use App\Models\Tour;
use Filament\Pages\Page;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Filament\Widgets\StatsOverviewWidget as StatsWidget;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class Reports extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';

    protected static ?string $title = 'Reports';

    protected static ?string $navigationGroup = 'Reports';

    protected static ?int $navigationSort = 1;

    protected static string $view = 'filament.pages.reports';

    public function getStats(): array
    {
        $totalRevenue = Booking::where('status', 'paid')->sum('total_price');
        $totalBookings = Booking::count();
        $totalTours = Tour::count();
        $totalDestinations = Destination::count();

        return [
            Stat::make('Total Revenue', '$' . number_format($totalRevenue, 2))
                ->description('All paid bookings')
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->color('success'),
            Stat::make('Total Bookings', $totalBookings)
                ->description('All bookings')
                ->descriptionIcon('heroicon-m-ticket')
                ->color('primary'),
            Stat::make('Total Tours', $totalTours)
                ->description('Active tours')
                ->descriptionIcon('heroicon-m-map-pin')
                ->color('warning'),
            Stat::make('Total Destinations', $totalDestinations)
                ->description('Available destinations')
                ->descriptionIcon('heroicon-m-globe-alt')
                ->color('info'),
        ];
    }

    public function getRevenueData(): array
    {
        $months = [];
        $revenue = [];

        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i)->format('M Y');
            $months[] = $month;
            $revenue[] = Booking::where('status', 'paid')
                ->whereMonth('created_at', now()->subMonths($i)->month)
                ->whereYear('created_at', now()->subMonths($i)->year)
                ->sum('total_price');
        }

        return [
            'datasets' => [
                [
                    'label' => 'Revenue',
                    'data' => $revenue,
                    'borderColor' => '#f59e0b',
                    'backgroundColor' => 'rgba(245, 158, 11, 0.1)',
                ],
            ],
            'labels' => $months,
        ];
    }

    public function getOccupancyData(): array
    {
        $tours = Tour::withCount('bookings as booking_count')->get();
        $labels = $tours->pluck('title');
        $data = $tours->pluck('booking_count');

        return [
            'datasets' => [
                [
                    'label' => 'Bookings per Tour',
                    'data' => $data,
                    'borderColor' => '#3b82f6',
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                ],
            ],
            'labels' => $labels,
        ];
    }
}
