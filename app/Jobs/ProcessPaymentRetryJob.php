<?php

namespace App\Jobs;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Queue\SerializesModels;

class ProcessPaymentRetryJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 60;
    public int $backoff = 60;

    public Booking $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
    }

    public function handle(): void
    {
        $booking = $this->booking->fresh();

        if ($booking->payment_completed || $booking->status !== 'payment_failed') {
            return;
        }

        Log::info('Retrying payment for booking', [
            'booking_id' => $this->booking->id,
            'reference' => $this->booking->reference,
            'attempt' => $this->attempts(),
        ]);

        // In a real implementation, this would trigger a new Stripe payment intent
        // For now, we log the retry attempt
        $this->booking->refresh();

        if ($this->attempts() >= $this->tries) {
            $this->booking->update(['status' => 'payment_failed_final']);
            Log::warning('Payment retry exhausted for booking', [
                'booking_id' => $this->booking->id,
                'reference' => $this->booking->reference,
            ]);
        }
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('Payment retry job failed', [
            'booking_id' => $this->booking->id,
            'reference' => $this->booking->reference,
            'error' => $exception->getMessage(),
        ]);
    }
}
