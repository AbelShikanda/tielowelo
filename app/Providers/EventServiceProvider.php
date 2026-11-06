<?php

namespace App\Providers;

use App\Events\BookingCreated;
use App\Events\PaymentCompleted;
use App\Listeners\SendBookingConfirmationListener;
use App\Listeners\SendNewBookingAlertListener;
use App\Listeners\SendPaymentConfirmationListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The map of event to listener mappings.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        BookingCreated::class => [
            SendBookingConfirmationListener::class,
            SendNewBookingAlertListener::class,
        ],
        PaymentCompleted::class => [
            SendPaymentConfirmationListener::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
