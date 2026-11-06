<?php

namespace App\Listeners;

use App\Events\BookingCreated;
use App\Jobs\SendBookingConfirmationJob;
use App\Jobs\SendNewBookingAlertJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendBookingConfirmationListener implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(BookingCreated $event): void
    {
        SendBookingConfirmationJob::dispatch(
            $event->booking,
            $event->booking->customer_email
        );
    }
}
