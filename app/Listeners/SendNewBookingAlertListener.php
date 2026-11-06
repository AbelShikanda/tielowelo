<?php

namespace App\Listeners;

use App\Events\BookingCreated;
use App\Jobs\SendNewBookingAlertJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendNewBookingAlertListener implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(BookingCreated $event): void
    {
        $adminEmails = config('admin.emails', []);
        foreach ($adminEmails as $adminEmail) {
            SendNewBookingAlertJob::dispatch($event->booking, $adminEmail);
        }
    }
}
