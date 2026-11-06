<?php

namespace App\Listeners;

use App\Events\PaymentCompleted;
use App\Jobs\SendPaymentConfirmationJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendPaymentConfirmationListener implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(PaymentCompleted $event): void
    {
        SendPaymentConfirmationJob::dispatch(
            $event->booking,
            $event->booking->customer_email
        );
    }
}
