<?php

namespace App\Jobs;

use App\Mail\NewBookingAlertMail;
use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;

class SendNewBookingAlertJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public Booking $booking;
    public string $adminEmail;

    public function __construct(Booking $booking, string $adminEmail)
    {
        $this->booking = $booking;
        $this->adminEmail = $adminEmail;
    }

    public function handle(): void
    {
        Mail::to($this->adminEmail)->send(new NewBookingAlertMail($this->booking));
    }
}
