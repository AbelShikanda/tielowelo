<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Queue\SerializesModels;

class BookingConfirmedNotification extends Notification implements ShouldQueue
{
    use Queueable, SerializesModels;

    public Booking $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Booking Confirmed - ' . $this->booking->departure->tour->title)
            ->line('Your booking has been confirmed!')
            ->line('Reference: ' . $this->booking->reference)
            ->line('Tour: ' . $this->booking->departure->tour->title)
            ->line('Destination: ' . $this->booking->departure->tour->destination->name . ', ' . $this->booking->departure->tour->destination->country)
            ->line('Departure Date: ' . $this->booking->departure->departure_date)
            ->line('Total: $' . $this->booking->total_price)
            ->action('View Booking', url('/bookings/' . $this->booking->id))
            ->line('Thank you for traveling with Tielowelo!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'booking_id' => $this->booking->id,
            'reference' => $this->booking->reference,
            'status' => 'confirmed',
        ];
    }
}
