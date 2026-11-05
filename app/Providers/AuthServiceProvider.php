<?php

namespace App\Providers;

use App\Models\Booking;
use App\Models\Departure;
use App\Models\Review;
use App\Models\Tour;
use App\Models\User;
use App\Policies\BookingPolicy;
use App\Policies\DeparturePolicy;
use App\Policies\ReviewPolicy;
use App\Policies\TourPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Tour::class => TourPolicy::class,
        Departure::class => DeparturePolicy::class,
        Booking::class => BookingPolicy::class,
        Review::class => ReviewPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Define admin gate
        Gate::define('admin', function (User $user) {
            return in_array($user->email, config('admin.emails', []));
        });
    }
}
