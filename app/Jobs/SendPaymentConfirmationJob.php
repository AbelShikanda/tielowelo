<?php

namespace App\Jobs;

use App\Mail\PaymentConfirmationMail;
use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;

class SendPaymentConfirmationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public Booking $booking;
    public string $customerEmail;

    public function __construct(Booking $booking, string $customerEmail)
    {
        $this->booking = $booking;
        $this->customerEmail = $customerEmail;
    }

    public function handle(): void
    {
        Mail::to($this->customerEmail)->send(new PaymentConfirmationMail($this->booking));
    }
}
